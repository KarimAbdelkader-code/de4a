import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const widths = [320, 360, 375, 390, 414, 430, 768, 820, 1024, 1280, 1440, 1920];
const profile = await mkdtemp(join(tmpdir(), "invitation-layout-"));
const chrome = spawn(process.env.CHROME_PATH || "google-chrome", [
  "--headless=new", "--no-sandbox", "--disable-gpu", "--remote-debugging-port=0",
  `--user-data-dir=${profile}`, "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

try {
  let endpoint;
  for (let attempt = 0; attempt < 50; attempt++) {
    try {
      const [port] = (await readFile(join(profile, "DevToolsActivePort"), "utf8")).split("\n");
      endpoint = await fetch(`http://127.0.0.1:${port}/json/new?http://127.0.0.1:3100`, { method: "PUT" }).then((response) => response.json());
      break;
    } catch { await sleep(100); }
  }
  assert.ok(endpoint?.webSocketDebuggerUrl, "Could not connect to headless Chrome");

  const socket = new WebSocket(endpoint.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  let id = 0;
  const pending = new Map();
  socket.onmessage = ({ data }) => {
    const message = JSON.parse(data);
    if (message.id && pending.has(message.id)) { pending.get(message.id)(message); pending.delete(message.id); }
  };
  const send = (method, params = {}) => new Promise((resolve) => {
    const callId = ++id;
    pending.set(callId, resolve);
    socket.send(JSON.stringify({ id: callId, method, params }));
  });

  await send("Page.enable");
  for (const width of widths) {
    await send("Emulation.setDeviceMetricsOverride", { width, height: width < 700 ? 900 : 1000, deviceScaleFactor: 1, mobile: width < 700 });
    await send("Page.navigate", { url: "http://127.0.0.1:3100" });
    await sleep(1800);
    const response = await send("Runtime.evaluate", {
      expression: `(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        heroOpacity: getComputedStyle(document.querySelector('.hero h1')).opacity,
        hasTime: document.body.innerText.includes('7:00 PM'),
        arabicDirection: getComputedStyle(document.querySelector('.arabic')).direction
      }))()`,
      returnByValue: true,
    });
    const result = response.result.result.value;
    assert.equal(result.scrollWidth, result.clientWidth, `${width}px has horizontal overflow`);
    assert.equal(result.heroOpacity, "1", `${width}px hero did not finish its entrance`);
    assert.equal(result.hasTime, true, `${width}px is missing the event time`);
    assert.equal(result.arabicDirection, "rtl", `${width}px Quran text is not RTL`);
    console.log(`${width}px: layout, hero, time and RTL verified`);
  }
  socket.close();
} finally {
  chrome.kill();
  await Promise.race([once(chrome, "exit"), sleep(2000)]);
  await rm(profile, { recursive: true, force: true });
}

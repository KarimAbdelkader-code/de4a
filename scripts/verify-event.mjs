import assert from "node:assert/strict";
import { CALENDAR_URL, EVENT } from "../lib/event.ts";

assert.equal(new Date(EVENT.startsAt).toISOString(), "2026-09-25T15:30:00.000Z");
assert.equal(new URL(CALENDAR_URL).searchParams.get("dates"), "20260925T183000/20260925T193000");
assert.equal(new URL(CALENDAR_URL).searchParams.get("ctz"), "Africa/Cairo");

console.log("Event time and calendar timezone verified.");

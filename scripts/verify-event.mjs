import assert from "node:assert/strict";
import { CALENDAR_URL, EVENT } from "../lib/event.ts";

assert.equal(new Date(EVENT.startsAt).toISOString(), "2026-11-05T17:00:00.000Z");
assert.equal(new URL(CALENDAR_URL).searchParams.get("dates"), "20261105T190000/20261105T200000");
assert.equal(new URL(CALENDAR_URL).searchParams.get("ctz"), "Africa/Cairo");

console.log("Event time and calendar timezone verified.");

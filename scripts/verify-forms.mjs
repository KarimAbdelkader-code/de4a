import assert from "node:assert/strict";
import { rsvpSchema, wishSchema } from "../lib/validation.ts";

assert.equal(rsvpSchema.safeParse({ name: "  Guest  ", guests: 1, attending: "yes", message: "" }).data?.name, "Guest");
assert.equal(rsvpSchema.safeParse({ name: "Guest", guests: 0, attending: "no" }).success, true);
assert.equal(rsvpSchema.safeParse({ name: "Guest", guests: 0, attending: "yes" }).success, false);
assert.equal(rsvpSchema.safeParse({ name: "Guest", guests: 1, attending: "no" }).success, false);
assert.equal(wishSchema.safeParse({ name: " Guest ", message: " With love " }).data?.message, "With love");

console.log("RSVP and guestbook validation verified.");

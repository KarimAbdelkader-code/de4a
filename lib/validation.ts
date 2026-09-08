import { z } from "zod";

const name = z.string().trim().min(2, "Please enter your name").max(80);

export const rsvpSchema = z.object({
  name,
  guests: z.coerce.number().int().min(0).max(10),
  attending: z.enum(["yes", "no"], { required_error: "Please choose a response" }),
  message: z.string().trim().max(500).optional(),
}).superRefine(({ attending, guests }, context) => {
  if (attending === "yes" && guests < 1) context.addIssue({ code: "custom", path: ["guests"], message: "Please include at least one guest" });
  if (attending === "no" && guests !== 0) context.addIssue({ code: "custom", path: ["guests"], message: "Guest count must be zero when declining" });
});

export const wishSchema = z.object({
  name,
  message: z.string().trim().min(3, "Please write a short message").max(500),
});

export type RsvpInput = z.infer<typeof rsvpSchema>;
export type WishInput = z.infer<typeof wishSchema>;

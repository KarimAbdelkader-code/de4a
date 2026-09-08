"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { submitRsvp, submitWish } from "@/app/actions";
import { RsvpInput, rsvpSchema, WishInput, wishSchema } from "@/lib/validation";

const FieldError = ({ message }: { message?: string }) =>
  message ? <span className="field-error">{message}</span> : null;

export function RsvpForm() {
  const [status, setStatus] = useState("");
  const [pending, startTransition] = useTransition();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<RsvpInput>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { guests: 1 },
  });

  const send = (values: RsvpInput) => startTransition(async () => {
    const result = await submitRsvp(values);
    setStatus(result.message);
    if (result.ok) reset({ guests: 1 });
  });

  return (
    <form onSubmit={handleSubmit(send)} className="form-card">
      <label>Your name<input autoComplete="name" {...register("name")} /></label>
      <FieldError message={errors.name?.message} />
      <label>Number of guests<input type="number" inputMode="numeric" min="1" max="10" {...register("guests")} /></label>
      <FieldError message={errors.guests?.message} />
      <fieldset>
        <legend>Will you attend?</legend>
        <div className="radio-row">
          <label><input type="radio" value="yes" {...register("attending")} /> Joyfully accept</label>
          <label><input type="radio" value="no" {...register("attending")} /> Sadly decline</label>
        </div>
      </fieldset>
      <FieldError message={errors.attending?.message} />
      <label>Message for Karim &amp; Salma<textarea rows={3} {...register("message")} /></label>
      <button className="button dark" disabled={pending}>{pending ? "Sending…" : "Send RSVP"}<ArrowRight size={16} /></button>
      <p className="form-status" aria-live="polite">{status}</p>
    </form>
  );
}

export function WishForm({ onSent }: { onSent?: () => void }) {
  const [status, setStatus] = useState("");
  const [pending, startTransition] = useTransition();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<WishInput>({ resolver: zodResolver(wishSchema) });
  const send = (values: WishInput) => startTransition(async () => {
    const result = await submitWish(values);
    setStatus(result.message);
    if (result.ok) { reset(); onSent?.(); }
  });

  return (
    <form onSubmit={handleSubmit(send)} className="form-card compact">
      <label>Your name<input autoComplete="name" {...register("name")} /></label>
      <FieldError message={errors.name?.message} />
      <label>Your message<textarea rows={4} {...register("message")} /></label>
      <FieldError message={errors.message?.message} />
      <button className="button outline" disabled={pending}>{pending ? "Sending…" : "Send your wish"}<ArrowRight size={16} /></button>
      <p className="form-status" aria-live="polite">{status}</p>
    </form>
  );
}

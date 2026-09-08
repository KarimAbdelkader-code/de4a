"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useState, useTransition } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { FormResult, submitRsvp, submitWish } from "@/app/actions";
import { RsvpInput, rsvpSchema, WishInput, wishSchema } from "@/lib/validation";

const FieldError = ({ id, message }: { id: string; message?: string }) =>
  message ? <span className="field-error" id={id} role="alert">{message}</span> : null;

export function RsvpForm() {
  const [status, setStatus] = useState<FormResult | null>(null);
  const [pending, startTransition] = useTransition();
  const { control, getValues, register, handleSubmit, reset, setValue, formState: { errors } } = useForm<RsvpInput>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { guests: 1 },
  });
  const attendance = useWatch({ control, name: "attending" });

  const send = (values: RsvpInput) => {
    if (pending) return;
    setStatus(null);
    startTransition(async () => {
      const result = await submitRsvp(values);
      setStatus(result);
      if (result.ok) reset({ guests: 1 });
    });
  };

  return (
    <form onSubmit={handleSubmit(send)} className="form-card">
      <label>Your name<input autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "rsvp-name-error" : undefined} {...register("name")} /></label>
      <FieldError id="rsvp-name-error" message={errors.name?.message} />
      <label>Number of guests<input type="number" inputMode="numeric" min={attendance === "no" ? 0 : 1} max="10" readOnly={attendance === "no"} aria-disabled={attendance === "no"} aria-invalid={!!errors.guests} aria-describedby={errors.guests ? "rsvp-guests-error" : undefined} {...register("guests")} /></label>
      <FieldError id="rsvp-guests-error" message={errors.guests?.message} />
      <fieldset aria-describedby={errors.attending ? "rsvp-attending-error" : undefined}>
        <legend>Will you attend?</legend>
        <Controller name="attending" control={control} render={({ field }) => (
          <div className="radio-row">
            {[["yes", "Joyfully accept"], ["no", "Sadly decline"]].map(([value, label]) => (
              <label key={value}><input type="radio" name={field.name} value={value} checked={field.value === value} onBlur={field.onBlur} onChange={() => {
                field.onChange(value);
                setValue("guests", value === "no" ? 0 : Math.max(getValues("guests"), 1), { shouldValidate: true });
              }} /> {label}</label>
            ))}
          </div>
        )} />
      </fieldset>
      <FieldError id="rsvp-attending-error" message={errors.attending?.message} />
      <label>Message for Karim &amp; Salma<textarea rows={3} {...register("message")} /></label>
      <button className="button dark" disabled={pending} aria-busy={pending}>{pending ? "Sending…" : "Send RSVP"}<ArrowRight size={16} aria-hidden="true" /></button>
      <p className={`form-status ${status ? status.ok ? "success" : "error" : ""}`} aria-live="polite">{status?.message}</p>
    </form>
  );
}

export function WishForm({ onSent }: { onSent?: () => void }) {
  const [status, setStatus] = useState<FormResult | null>(null);
  const [pending, startTransition] = useTransition();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<WishInput>({ resolver: zodResolver(wishSchema) });
  const send = (values: WishInput) => {
    if (pending) return;
    setStatus(null);
    startTransition(async () => {
      const result = await submitWish(values);
      setStatus(result);
      if (result.ok) { reset(); onSent?.(); }
    });
  };

  return (
    <form onSubmit={handleSubmit(send)} className="form-card compact">
      <label>Your name<input autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "wish-name-error" : undefined} {...register("name")} /></label>
      <FieldError id="wish-name-error" message={errors.name?.message} />
      <label>Your message<textarea rows={4} aria-invalid={!!errors.message} aria-describedby={errors.message ? "wish-message-error" : undefined} {...register("message")} /></label>
      <FieldError id="wish-message-error" message={errors.message?.message} />
      <button className="button outline" disabled={pending} aria-busy={pending}>{pending ? "Sending…" : "Send your wish"}<ArrowRight size={16} aria-hidden="true" /></button>
      <p className={`form-status ${status ? status.ok ? "success" : "error" : ""}`} aria-live="polite">{status?.message}</p>
    </form>
  );
}

"use client";

import { useEffect, useState } from "react";
import { EVENT } from "@/lib/event";

export const eventTimestamp = new Date(EVENT.startsAt).getTime();

export function getRemaining(now = Date.now()) {
  const seconds = Math.max(0, Math.floor((eventTimestamp - now) / 1000));
  return [
    Math.floor(seconds / 86400),
    Math.floor((seconds % 86400) / 3600),
    Math.floor((seconds % 3600) / 60),
    seconds % 60,
  ];
}

export default function Countdown() {
  const [time, setTime] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const firstTick = window.setTimeout(() => setTime(getRemaining()), 0);
    const timer = window.setInterval(() => setTime(getRemaining()), 1000);
    return () => { window.clearTimeout(firstTick); window.clearInterval(timer); };
  }, []);

  return (
    <div className="countdown" aria-label={`${time[0]} days, ${time[1]} hours, ${time[2]} minutes and ${time[3]} seconds until the engagement`} role="timer">
      {time.map((value, index) => (
        <div key={index}>
          <span>{String(value).padStart(2, "0")}</span>
          <small>{["Days", "Hours", "Minutes", "Seconds"][index]}</small>
        </div>
      ))}
    </div>
  );
}

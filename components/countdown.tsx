"use client";

import { useEffect, useState } from "react";

const eventDate = new Date("2026-09-25T00:00:00+03:00").getTime();

function remaining() {
  const seconds = Math.max(0, Math.floor((eventDate - Date.now()) / 1000));
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
    setTime(remaining());
    const timer = window.setInterval(() => setTime(remaining()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="countdown" aria-label={`${time[0]} days, ${time[1]} hours, ${time[2]} minutes and ${time[3]} seconds until the engagement`}>
      {time.map((value, index) => (
        <div key={index}>
          <span>{String(value).padStart(2, "0")}</span>
          <small>{["Days", "Hours", "Minutes", "Seconds"][index]}</small>
        </div>
      ))}
    </div>
  );
}

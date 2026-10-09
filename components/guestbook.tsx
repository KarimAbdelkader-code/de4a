"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Wish } from "@/lib/database-types";
import { WishForm } from "./forms";

export default function Guestbook() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const reducedMotion = useReducedMotion();
  const load = useCallback(async () => {
    try {
      const response = await fetch("/api/wishes", { cache: "no-store" });
      if (!response.ok) throw new Error("Wishes request failed");
      setWishes(await response.json() as Wish[]);
      setState("ready");
    } catch {
      setState("error");
    }
  }, []);

  useEffect(() => {
    const initialLoad = window.setTimeout(load, 0);
    return () => window.clearTimeout(initialLoad);
  }, [load]);

  return (
    <>
      <WishForm onSent={load} />
      <div className="guestbook-status" aria-live="polite">
        {state === "loading" && "Loading wishes…"}
        {state === "ready" && wishes.length === 0 && "Be the first to share a wish for Mostafa & Roaa."}
        {state === "error" && "We couldn’t load the guestbook. Please try again shortly."}
      </div>
      {state === "ready" && wishes.length > 0 && (
        <div className="wishes" aria-label="Guest wishes">
          {wishes.map((wish, index) => <motion.blockquote key={wish.id} initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reducedMotion ? 0 : 0.55, delay: reducedMotion ? 0 : Math.min(index * 0.06, 0.3) }}><p>“{wish.message}”</p><cite>— {wish.name}</cite></motion.blockquote>)}
        </div>
      )}
    </>
  );
}

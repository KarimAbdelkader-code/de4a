"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { SUPABASE_CONFIGURATION_ERROR } from "@/lib/supabase/config";
import { Wish } from "@/lib/supabase/types";
import { WishForm } from "./forms";

export default function Guestbook() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error" | "unconfigured">("loading");
  const reducedMotion = useReducedMotion();
  const client = getSupabaseBrowserClient();
  const load = useCallback(async () => {
    if (!client) { setState("unconfigured"); return; }
    const { data, error } = await client.from("wishes").select("id,name,message,created_at").eq("approved", true).order("created_at", { ascending: false }).limit(12);
    if (error) { setState("error"); return; }
    setWishes(data ?? []);
    setState("ready");
  }, [client]);

  useEffect(() => {
    const initialLoad = window.setTimeout(load, 0);
    if (!client) return () => window.clearTimeout(initialLoad);
    const channel = client.channel("guestbook").on("postgres_changes", { event: "*", schema: "public", table: "wishes" }, load).subscribe();
    return () => { window.clearTimeout(initialLoad); client.removeChannel(channel); };
  }, [client, load]);

  return (
    <>
      <WishForm onSent={load} />
      <div className="guestbook-status" aria-live="polite">
        {state === "loading" && "Loading wishes…"}
        {state === "ready" && wishes.length === 0 && "Be the first to leave a wish for Karim & Salma."}
        {state === "error" && "We couldn’t load the guestbook. Please try again shortly."}
        {state === "unconfigured" && process.env.NODE_ENV === "development" && SUPABASE_CONFIGURATION_ERROR}
      </div>
      {state === "ready" && wishes.length > 0 && (
        <div className="wishes" aria-label="Guest wishes">
          {wishes.map((wish, index) => <motion.blockquote key={wish.id} initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reducedMotion ? 0 : 0.55, delay: reducedMotion ? 0 : Math.min(index * 0.06, 0.3) }}><p>“{wish.message}”</p><cite>— {wish.name}</cite></motion.blockquote>)}
        </div>
      )}
    </>
  );
}

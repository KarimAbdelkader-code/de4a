"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { createClient, Wish } from "@/lib/supabase";
import { WishForm } from "./forms";

export default function Guestbook() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const reducedMotion = useReducedMotion();
  const load = useCallback(async () => {
    const client = createClient();
    if (!client) return;
    const { data } = await client.from("wishes").select("id,name,message,created_at").eq("approved", true).order("created_at", { ascending: false }).limit(12);
    if (data) setWishes(data);
  }, []);

  useEffect(() => {
    const client = createClient();
    if (!client) return;
    const initialLoad = window.setTimeout(load, 0);
    const channel = client.channel("guestbook").on("postgres_changes", { event: "INSERT", schema: "public", table: "wishes" }, load).subscribe();
    return () => { window.clearTimeout(initialLoad); client.removeChannel(channel); };
  }, [load]);

  return (
    <>
      <WishForm onSent={load} />
      {wishes.length > 0 && (
        <div className="wishes" aria-label="Guest wishes">
          {wishes.map((wish, index) => <motion.blockquote key={wish.id} initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reducedMotion ? 0 : 0.55, delay: reducedMotion ? 0 : Math.min(index * 0.06, 0.3) }}><p>“{wish.message}”</p><cite>— {wish.name}</cite></motion.blockquote>)}
        </div>
      )}
    </>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient, Wish } from "@/lib/supabase";
import { WishForm } from "./forms";

export default function Guestbook() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const load = useCallback(async () => {
    const client = createClient();
    if (!client) return;
    const { data } = await client.from("wishes").select("id,name,message,created_at").eq("approved", true).order("created_at", { ascending: false }).limit(12);
    if (data) setWishes(data);
  }, []);

  useEffect(() => {
    const client = createClient();
    if (!client) return;
    load();
    const channel = client.channel("guestbook").on("postgres_changes", { event: "INSERT", schema: "public", table: "wishes" }, load).subscribe();
    return () => { client.removeChannel(channel); };
  }, [load]);

  return (
    <>
      <WishForm onSent={load} />
      {wishes.length > 0 && (
        <div className="wishes" aria-label="Guest wishes">
          {wishes.map((wish) => <blockquote key={wish.id}><p>“{wish.message}”</p><cite>— {wish.name}</cite></blockquote>)}
        </div>
      )}
    </>
  );
}

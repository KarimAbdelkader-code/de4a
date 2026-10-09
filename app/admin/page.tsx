import { ArrowLeft, BookHeart, Check, Clock3, Users, X } from "lucide-react";
import Link from "next/link";
import { describeDatabaseError, getDatabase } from "@/lib/database";

export const dynamic = "force-dynamic";

type Rsvp = { id: string; name: string; guests: number; attending: "yes" | "no"; message: string | null; created_at: Date };
type Wish = { id: string; name: string; message: string; approved: boolean; created_at: Date };

function date(value: Date) {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short", timeZone: "Africa/Cairo" }).format(value);
}

async function loadData() {
  try {
    const database = await getDatabase();
    const [rsvps, wishes] = await Promise.all([
      database.collection<Rsvp>("rsvps").find({}, { projection: { _id: 0 } }).sort({ created_at: -1 }).toArray(),
      database.collection<Wish>("wishes").find({}, { projection: { _id: 0 } }).sort({ created_at: -1 }).toArray(),
    ]);
    return { rsvps, wishes, available: true } as const;
  } catch (error) {
    console.error("Admin database load failed", {
      error: describeDatabaseError(error),
      mongodbUriConfigured: Boolean(process.env.MONGODB_URI),
      mongodbDatabase: process.env.MONGODB_DB || "invitation",
    });
    return { rsvps: [], wishes: [], available: false } as const;
  }
}

export default async function AdminPage() {
  const { rsvps, wishes, available } = await loadData();

  if (!available) return (
    <main className="admin-page admin-error">
      <p className="eyebrow">Private guest list</p>
      <h1>Database unavailable</h1>
      <p>Set <code>MONGODB_URI</code> to a MongoDB Atlas connection string, then apply the indexes.</p>
      <Link href="/"><ArrowLeft size={16} /> Return to invitation</Link>
    </main>
  );

  const attending = rsvps.filter((rsvp) => rsvp.attending === "yes");
  return (
    <main className="admin-page">
      <header className="admin-heading">
        <div><p className="eyebrow">Private guest list</p><h1>Mostafa <i>&amp;</i> Roaa</h1></div>
        <Link href="/"><ArrowLeft size={16} /> Invitation</Link>
      </header>

      <section className="admin-stats" aria-label="RSVP summary">
        <article><Users /><strong>{attending.reduce((total, rsvp) => total + rsvp.guests, 0)}</strong><span>Attending guests</span></article>
        <article><Check /><strong>{attending.length}</strong><span>Accepted</span></article>
        <article><X /><strong>{rsvps.length - attending.length}</strong><span>Declined</span></article>
        <article><BookHeart /><strong>{wishes.length}</strong><span>Wishes</span></article>
      </section>

      <section className="admin-section">
        <div className="admin-title"><h2>RSVP responses</h2><span>{rsvps.length} total</span></div>
        {rsvps.length ? <div className="admin-grid">{rsvps.map((rsvp) => (
          <article className="admin-card" key={rsvp.id}>
            <div className="admin-card-head"><h3>{rsvp.name}</h3><span className={`status ${rsvp.attending}`}>{rsvp.attending === "yes" ? "Attending" : "Declined"}</span></div>
            <p>{rsvp.attending === "yes" ? `${rsvp.guests} ${rsvp.guests === 1 ? "guest" : "guests"}` : "Not attending"}</p>
            {rsvp.message && <blockquote>“{rsvp.message}”</blockquote>}
            <small><Clock3 size={13} /> {date(rsvp.created_at)}</small>
          </article>
        ))}</div> : <p className="admin-empty">No RSVP responses yet.</p>}
      </section>

      <section className="admin-section">
        <div className="admin-title"><h2>Guestbook wishes</h2><span>{wishes.length} total</span></div>
        {wishes.length ? <div className="admin-grid">{wishes.map((wish) => (
          <article className="admin-card" key={wish.id}>
            <div className="admin-card-head"><h3>{wish.name}</h3><span className={`status ${wish.approved ? "yes" : "pending"}`}>{wish.approved ? "Approved" : "Pending"}</span></div>
            <blockquote>“{wish.message}”</blockquote>
            <small><Clock3 size={13} /> {date(wish.created_at)}</small>
          </article>
        ))}</div> : <p className="admin-empty">No guestbook wishes yet.</p>}
      </section>
    </main>
  );
}

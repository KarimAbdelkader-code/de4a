import Invitation from "@/components/invitation";
import { EVENT } from "@/lib/event";

export default function Page() {
  const eventData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: EVENT.name,
    startDate: EVENT.startsAt,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@type": "Place", name: EVENT.venue, url: EVENT.mapsUrl },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventData) }} />
      <Invitation />
    </>
  );
}

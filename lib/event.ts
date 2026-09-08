export const EVENT = {
  name: "Karim & Salma Engagement",
  venue: "Viola Hall",
  date: "25 September 2026",
  time: "7:00 PM",
  timeZone: "Africa/Cairo",
  startsAt: "2026-09-25T18:30:00+03:00",
  mapsUrl: "https://maps.app.goo.gl/aQyPQjRZzaEw9pu99?g_st=ic",
} as const;

const calendar = new URL("https://calendar.google.com/calendar/render");
calendar.search = new URLSearchParams({
  action: "TEMPLATE",
  text: EVENT.name,
  dates: "20260925T183000/20260925T193000",
  ctz: EVENT.timeZone,
  details: "Join us to celebrate the engagement of Karim and Salma.",
  location: EVENT.venue,
}).toString();

export const CALENDAR_URL = calendar.toString();

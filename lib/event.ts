export const EVENT = {
  name: "Mostafa & Roaa Engagement",
  venue: "Ociel Hall",
  date: "5 November 2026",
  time: "7:00 PM",
  timeZone: "Africa/Cairo",
  startsAt: "2026-11-05T19:00:00+02:00",
  mapsUrl: "https://maps.app.goo.gl/BERVP7rQUiVsUPV5A?g_st=ic",
} as const;

const calendar = new URL("https://calendar.google.com/calendar/render");
calendar.search = new URLSearchParams({
  action: "TEMPLATE",
  text: EVENT.name,
  dates: "20261105T190000/20261105T200000",
  ctz: EVENT.timeZone,
  details: "Celebrate the engagement of Mostafa and Roaa with us.",
  location: EVENT.venue,
}).toString();

export const CALENDAR_URL = calendar.toString();

"use client";

import { CalendarDays, ChevronDown, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Countdown from "./countdown";
import { RsvpForm } from "./forms";
import Guestbook from "./guestbook";
import { Reveal } from "./reveal";

const mapsUrl = "https://maps.app.goo.gl/aQyPQjRZzaEw9pu99?g_st=ic";
const calendarUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Karim%20%26%20Salma%20Engagement&dates=20260925%2F20260926&details=Join%20us%20to%20celebrate%20Karim%20and%20Salma.&location=Viola%20Hall";

const Eyebrow = ({ children }: { children: React.ReactNode }) => <p className="eyebrow">{children}</p>;
const Monogram = () => <div className="monogram" aria-label="Karim and Salma">K <i>&amp;</i> S</div>;

export default function Invitation() {
  const [open, setOpen] = useState(false);

  return (
    <main>
      <section className="hero section">
        <div className="corner corner-tl" /><div className="corner corner-br" />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4 }} className="hero-inner">
          <Monogram />
          <Eyebrow>We’re getting engaged</Eyebrow>
          <h1>Karim <em>&amp;</em> Salma</h1>
          <p className="lede">Together with our families, we joyfully invite you to celebrate the beginning of our forever.</p>
          <div className="date-lockup"><span>25</span><i>·</i><span>09</span><i>·</i><span>2026</span></div>
          <a className="scroll-cue" href="#invitation">Scroll to open our invitation<ChevronDown size={15} /></a>
        </motion.div>
      </section>

      <section id="invitation" className="verse section dark-section">
        <Reveal>
          <Eyebrow>In the name of Allah, the Most Gracious, the Most Merciful</Eyebrow>
          <p lang="ar" dir="rtl" className="arabic">وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ</p>
          <p className="citation">Surah Ar-Rum — 21</p>
        </Reveal>
      </section>

      <section className="section save-date">
        <Reveal>
          <Eyebrow>Save the date</Eyebrow>
          <div className="editorial-date"><span>Friday</span><strong>25</strong><span>September<br />2026</span></div>
          <h2>Karim <i>&amp;</i> Salma</h2>
          <p>Counting down to our special day</p>
          <Countdown />
          <a className="button outline" href={calendarUrl} target="_blank" rel="noreferrer"><CalendarDays size={16} /> Add to calendar</a>
        </Reveal>
      </section>

      <section className="section celebration">
        <Reveal className="celebration-card">
          <Eyebrow>Our celebration</Eyebrow>
          <h2>Where our next<br /><i>chapter begins.</i></h2>
          <p>We would be delighted to have you with us as we celebrate this beautiful new chapter together.</p>
          <div className="venue"><MapPin size={20} /><div><strong>Viola Hall</strong><span>25 September 2026</span></div></div>
          <a className="button light" href={mapsUrl} target="_blank" rel="noreferrer">Get directions <MapPin size={15} /></a>
        </Reveal>
      </section>

      <section className="section chapter">
        <Reveal>
          <Eyebrow>A new chapter</Eyebrow>
          <h2>Two hearts.<br />Two families.<br /><i>One beautiful beginning.</i></h2>
          <div className="fine-rule"><Monogram /></div>
          <p>On September 25th, we begin the next chapter of our story.</p>
          <p>And we would love for you to be part of it.</p>
        </Reveal>
      </section>

      <section className="section evening dark-section">
        <Reveal>
          <Eyebrow>The evening</Eyebrow>
          <div className="timeline">
            {[["Welcome", "Our celebration begins."], ["Engagement", "The moment we say yes to forever."], ["Celebration", "Dinner, music, laughter and memories."], ["Together", "A night surrounded by the people we love."]].map(([title, text], index) => (
              <div className="timeline-item" key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section note">
        <Reveal>
          <Eyebrow>A little note from us</Eyebrow>
          <p>Tap the envelope to open.</p>
          <button className={`envelope ${open ? "open" : ""}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Open our note">
            <span className="letter"><b>Dear family and friends,</b><br /><br />Some moments become unforgettable because of the people we share them with.<br /><br />As we begin this new chapter together, having you beside us would make our celebration even more special.<br /><br />We can’t wait to celebrate, laugh, and create beautiful memories with you.<br /><br /><i>With love,<br />Karim &amp; Salma</i></span>
            <span className="flap" /><span className="seal">K&amp;S</span>
          </button>
        </Reveal>
      </section>

      <section className="section forms-section">
        <Reveal>
          <Eyebrow>Will you join us?</Eyebrow>
          <h2>Your presence would<br /><i>mean so much.</i></h2>
          <RsvpForm />
        </Reveal>
      </section>

      <section className="section guestbook">
        <Reveal>
          <Eyebrow>Leave us a wish</Eyebrow>
          <h2>Share a little love<br /><i>for our new beginning.</i></h2>
          <Guestbook />
        </Reveal>
      </section>

      <footer className="section footer dark-section">
        <Reveal>
          <Eyebrow>See you there</Eyebrow>
          <h2>Karim <i>&amp;</i> Salma</h2>
          <p className="footer-date">25 · 09 · 2026</p>
          <p>Viola Hall</p>
          <div className="footer-rule" />
          <p>Your presence is the greatest gift we could ask for.</p>
          <Monogram />
        </Reveal>
      </footer>
    </main>
  );
}

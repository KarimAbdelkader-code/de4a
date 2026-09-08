"use client";

import { CalendarDays, ChevronDown, MapPin } from "lucide-react";
import { useState } from "react";
import Countdown from "./countdown";
import { Botanical, MovingRule } from "./botanical";
import { RsvpForm } from "./forms";
import Guestbook from "./guestbook";
import { Reveal, Stagger, StaggerItem } from "./reveal";
import { CALENDAR_URL, EVENT } from "@/lib/event";

const Eyebrow = ({ children }: { children: React.ReactNode }) => <p className="eyebrow">{children}</p>;
const Monogram = () => <div className="monogram" aria-label="Karim and Salma">K <i>&amp;</i> S</div>;

export default function Invitation() {
  const [open, setOpen] = useState(false);

  return (
    <main>
      <section className="hero section">
        <Botanical side="left" className="hero-botanical" />
        <Botanical side="right" className="hero-botanical" />
        <div className="corner corner-tl" /><div className="corner corner-br" />
        <Stagger className="hero-inner">
          <StaggerItem><Monogram /></StaggerItem>
          <StaggerItem><Eyebrow>We’re getting engaged</Eyebrow></StaggerItem>
          <StaggerItem><h1>Karim <em>&amp;</em> Salma</h1></StaggerItem>
          <StaggerItem><p className="lede">Together with our families, we joyfully invite you to celebrate the beginning of our forever.</p></StaggerItem>
          <StaggerItem><div className="date-lockup"><span>25</span><i>·</i><span>09</span><i>·</i><span>2026</span></div></StaggerItem>
          <StaggerItem><p className="hero-time">Friday · {EVENT.time}</p></StaggerItem>
          <a className="scroll-cue" href="#invitation">Scroll to open our invitation<ChevronDown size={15} /></a>
        </Stagger>
      </section>

      <section id="invitation" className="verse section dark-section">
        <Reveal>
          <Eyebrow>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</Eyebrow>
          <MovingRule />
          <p lang="ar" dir="rtl" className="arabic">وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ</p>
          <p className="citation">سورة الروم — الآية ٢١</p>
        </Reveal>
      </section>

      <section className="section save-date">
        <Reveal>
          <Eyebrow>Save the date</Eyebrow>
          <div className="editorial-date"><span>Friday</span><strong>25</strong><span>September<br />2026</span></div>
          <h2>Karim <i>&amp;</i> Salma</h2>
          <p className="event-time"><time dateTime={EVENT.startsAt}>{EVENT.time}</time> · {EVENT.venue}</p>
          <p>Counting down to our special day</p>
          <Reveal delay={0.12} distance={16}><Countdown /></Reveal>
          <a className="button outline" href={CALENDAR_URL} target="_blank" rel="noreferrer"><CalendarDays size={17} /> Add to calendar</a>
        </Reveal>
      </section>

      <section className="section celebration">
        <Botanical side="right" />
        <Reveal className="celebration-card">
          <Eyebrow>Our celebration</Eyebrow>
          <h2>Where our next<br /><i>chapter begins.</i></h2>
          <p>We would be delighted to have you with us as we celebrate this beautiful new chapter together.</p>
          <div className="venue"><MapPin size={20} aria-hidden="true" /><div><strong>{EVENT.venue}</strong><span>{EVENT.date} · {EVENT.time}</span></div></div>
          <a className="button light" href={EVENT.mapsUrl} target="_blank" rel="noreferrer">Get directions <MapPin size={16} /></a>
        </Reveal>
      </section>

      <section className="section chapter">
        <Botanical side="left" />
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
            {[["Welcome", `${EVENT.time} · Our celebration begins.`], ["Engagement", "The moment we say yes to forever."], ["Celebration", "Dinner, music, laughter and memories."], ["Together", "A night surrounded by the people we love."]].map(([title, text], index) => (
              <Reveal className="timeline-item" key={title} delay={index * 0.07} distance={18}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></Reveal>
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
          <div className="event-reminder"><span>{EVENT.date}</span><b>{EVENT.time}</b><span>{EVENT.venue}</span></div>
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
        <Botanical side="right" />
        <Reveal>
          <Eyebrow>See you there</Eyebrow>
          <h2>Karim <i>&amp;</i> Salma</h2>
          <p className="footer-date">25 · 09 · 2026</p>
          <p><time dateTime={EVENT.startsAt}>{EVENT.time}</time> · {EVENT.venue}</p>
          <div className="footer-rule" />
          <p>Your presence is the greatest gift we could ask for.</p>
          <Monogram />
        </Reveal>
      </footer>
    </main>
  );
}

import { CalendarDays, ChevronDown, MapPin } from "lucide-react";
import Countdown from "./countdown";
import { Botanical, MovingRule } from "./botanical";
import Guestbook from "./guestbook";
import { Reveal, Stagger, StaggerItem } from "./reveal";
import { CALENDAR_URL, EVENT } from "@/lib/event";
import Navigation from "./navigation";
import Envelope from "./envelope";
import MusicPlayer from "./music-player";

const Eyebrow = ({ children }: { children: React.ReactNode }) => <p className="eyebrow">{children}</p>;
const Monogram = () => <div className="monogram" aria-label="Mostafa and Roaa">M <i>&amp;</i> R</div>;

export default function Invitation() {
  return (
    <>
      <Navigation />
      <MusicPlayer />
      <main>
      <section id="top" className="hero section">
        <Botanical side="left" className="hero-botanical" />
        <Botanical side="right" className="hero-botanical" />
        <div className="corner corner-tl" /><div className="corner corner-br" />
        <Stagger className="hero-inner">
          <StaggerItem><Monogram /></StaggerItem>
          <StaggerItem><Eyebrow>A celebration of love</Eyebrow></StaggerItem>
          <StaggerItem><h1>Mostafa <em>&amp;</em> Roaa</h1></StaggerItem>
          <StaggerItem><p className="lede">With the love of our families, we invite you to join us as we celebrate our engagement.</p></StaggerItem>
          <StaggerItem><div className="date-lockup"><span>05</span><i>·</i><span>11</span><i>·</i><span>2026</span></div></StaggerItem>
          <StaggerItem><p className="hero-time">Thursday · {EVENT.time}</p></StaggerItem>
          <a className="scroll-cue" href="#invitation">Open our invitation<ChevronDown size={15} /></a>
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

      <section id="details" className="section save-date">
        <Reveal>
          <Eyebrow>Mark your calendar</Eyebrow>
          <div className="editorial-date"><span>Thursday</span><strong>05</strong><span>November<br />2026</span></div>
          <h2>Mostafa <i>&amp;</i> Roaa</h2>
          <p className="event-time"><time dateTime={EVENT.startsAt}>{EVENT.time}</time> · {EVENT.venue}</p>
          <p>Counting down to our celebration</p>
          <Reveal delay={0.12} distance={16}><Countdown /></Reveal>
          <a className="button outline" href={CALENDAR_URL} target="_blank" rel="noreferrer"><CalendarDays size={17} /> Save the date</a>
        </Reveal>
      </section>

      <section id="venue" className="section celebration">
        <Botanical side="right" />
        <Reveal className="celebration-card">
          <Eyebrow>Join us in celebration</Eyebrow>
          <h2>Our story continues<br /><i>with you.</i></h2>
          <p>We would be honored to have you with us as we celebrate this joyful beginning.</p>
          <div className="venue"><MapPin size={20} aria-hidden="true" /><div><strong>{EVENT.venue}</strong><span>{EVENT.date} · {EVENT.time}</span></div></div>
          <a className="button light" href={EVENT.mapsUrl} target="_blank" rel="noreferrer">Find the venue <MapPin size={16} /></a>
        </Reveal>
      </section>

      <section id="story" className="section chapter">
        <Botanical side="left" />
        <Reveal>
          <Eyebrow>Our story continues</Eyebrow>
          <h2>One promise.<br />Two families.<br /><i>A lifetime ahead.</i></h2>
          <div className="fine-rule"><Monogram /></div>
          <p>On November 5th, we celebrate the start of our next chapter.</p>
          <p>Your presence will make this moment even more special.</p>
        </Reveal>
      </section>

      <section className="section evening dark-section">
        <Reveal>
          <Eyebrow>The celebration</Eyebrow>
          <div className="timeline">
            {[["Welcome", `${EVENT.time} · We welcome you to the celebration.`], ["Engagement", "A promise made with love."], ["Celebration", "An evening filled with dinner, music, and joy."], ["Together", "Together with the people who mean the most."]].map(([title, text], index) => (
              <Reveal className="timeline-item" key={title} delay={index * 0.07} distance={18}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section note">
        <Reveal>
          <Eyebrow>A message from us</Eyebrow>
          <p>Open the envelope for a note.</p>
          <Envelope />
        </Reveal>
      </section>

      <section id="guestbook" className="section guestbook">
        <Reveal>
          <Eyebrow>Your wishes mean so much</Eyebrow>
          <h2>Leave us a message<br /><i>to remember this day.</i></h2>
          <Guestbook />
        </Reveal>
      </section>

      <footer id="closing" className="section footer dark-section">
        <Botanical side="right" />
        <Reveal>
          <Eyebrow>Until we celebrate together</Eyebrow>
          <h2>Mostafa <i>&amp;</i> Roaa</h2>
          <p className="footer-date">05 · 11 · 2026</p>
          <p><time dateTime={EVENT.startsAt}>{EVENT.time}</time> · {EVENT.venue}</p>
          <div className="footer-rule" />
          <p>Having you with us is the greatest gift.</p>
          <Monogram />
        </Reveal>
      </footer>
      </main>
    </>
  );
}

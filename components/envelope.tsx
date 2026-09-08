"use client";

import { useState } from "react";

export default function Envelope() {
  const [open, setOpen] = useState(false);

  return (
    <button className={`envelope ${open ? "open" : ""}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-label={`${open ? "Close" : "Open"} our note`}>
      <span className="letter"><b>Dear family and friends,</b><br /><br />Some moments become unforgettable because of the people we share them with.<br /><br />As we begin this new chapter together, having you beside us would make our celebration even more special.<br /><br />We can’t wait to celebrate, laugh, and create beautiful memories with you.<br /><br /><i>With love,<br />Karim &amp; Salma</i></span>
      <span className="flap" /><span className="seal">K&amp;S</span>
    </button>
  );
}

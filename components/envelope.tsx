"use client";

import { useState } from "react";

export default function Envelope() {
  const [open, setOpen] = useState(false);

  return (
    <button className={`envelope ${open ? "open" : ""}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-label={`${open ? "Close" : "Open"} our note`}>
      <span className="letter"><b>Dear friends and family,</b><br /><br />Every celebration becomes more meaningful when shared with the people we love.<br /><br />As we begin this beautiful chapter, your presence would make our joy complete.<br /><br />We look forward to an evening of love, laughter, and unforgettable memories.<br /><br /><i>With love,<br />Mostafa &amp; Roaa</i></span>
      <span className="flap" /><span className="seal">M&amp;R</span>
    </button>
  );
}

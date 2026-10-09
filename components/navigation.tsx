"use client";

import { useEffect, useState } from "react";

const links = [
  ["Invitation", "#invitation"],
  ["Details", "#details"],
  ["Wishes", "#guestbook"],
] as const;

export default function Navigation() {
  const [active, setActive] = useState("#top");

  useEffect(() => {
    const sections = links.map(([, href]) => document.querySelector(href)).filter(Boolean) as Element[];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(`#${entry.target.id}`)),
      { rootMargin: "-35% 0px -55%", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <a className="site-brand" href="#top" aria-label="Mostafa and Roaa invitation home">M <i>&amp;</i> R</a>
      <nav aria-label="Invitation sections">
        {links.map(([label, href]) => (
          <a key={href} href={href} aria-current={active === href ? "location" : undefined}>{label}</a>
        ))}
      </nav>
    </header>
  );
}

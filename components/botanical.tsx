"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function Botanical({ side = "left", className = "" }: { side?: "left" | "right"; className?: string }) {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();
  const y = useTransform(scrollYProgress, [0, 1], [0, side === "left" ? -80 : 70]);

  return (
    <motion.svg
      className={`botanical botanical-${side} ${className}`}
      style={{ y: reducedMotion ? 0 : y }}
      viewBox="0 0 180 420"
      fill="none"
      aria-hidden="true"
    >
      <path d="M153 414C95 329 80 231 116 119C128 81 145 43 165 7" />
      <path d="M113 129C72 114 47 82 39 41C81 51 106 80 113 129Z" />
      <path d="M92 226C49 211 20 179 7 137C55 145 84 175 92 226Z" />
      <path d="M99 307C57 300 27 275 8 236C54 237 86 261 99 307Z" />
      <path d="M128 176C160 158 176 128 177 88C142 103 125 133 128 176Z" />
      <path d="M111 270C150 251 170 219 172 176C131 193 111 224 111 270Z" />
      <path d="M130 354C165 337 183 308 182 269C146 284 127 312 130 354Z" />
    </motion.svg>
  );
}

export function MovingRule() {
  const reducedMotion = useReducedMotion();
  return <motion.span className="moving-rule" initial={{ scaleX: reducedMotion ? 1 : 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: reducedMotion ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] }} aria-hidden="true" />;
}

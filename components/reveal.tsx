"use client";

import { motion, useReducedMotion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
};

export function Reveal({ children, className = "", delay = 0, distance = 28 }: RevealProps) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reducedMotion ? 0 : distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -8%" }}
      transition={{ duration: reducedMotion ? 0 : 0.85, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="shown"
      variants={{ shown: { transition: { staggerChildren: reducedMotion ? 0 : 0.13, delayChildren: reducedMotion ? 0 : 0.18 } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion();
  return <motion.div className={className} variants={{ hidden: { opacity: 0, y: reducedMotion ? 0 : 18 }, shown: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] } } }}>{children}</motion.div>;
}

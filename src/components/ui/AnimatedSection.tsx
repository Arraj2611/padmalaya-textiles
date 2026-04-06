"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  /** "up" (default), "left", "right", or "scale" */
  direction?: "up" | "left" | "right" | "scale";
}

const variants = {
  up:    { hidden: { opacity: 0, y: 36 },   visible: { opacity: 1, y: 0   } },
  left:  { hidden: { opacity: 0, x: -36 },  visible: { opacity: 1, x: 0   } },
  right: { hidden: { opacity: 0, x: 36  },  visible: { opacity: 1, x: 0   } },
  scale: { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } },
};

export default function AnimatedSection({
  children,
  className,
  style,
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      variants={variants[direction]}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
      }}
    >
      {children}
    </motion.div>
  );
}

/** Staggered list wrapper — wraps children in individual AnimatedSections */
export function StaggerList({
  children,
  stagger = 0.1,
  baseDelay = 0,
  direction = "up",
  className,
  style,
}: {
  children: React.ReactNode[];
  stagger?: number;
  baseDelay?: number;
  direction?: "up" | "left" | "right" | "scale";
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={className} style={style}>
      {children.map((child, i) => (
        <AnimatedSection key={i} delay={baseDelay + i * stagger} direction={direction}>
          {child}
        </AnimatedSection>
      ))}
    </div>
  );
}

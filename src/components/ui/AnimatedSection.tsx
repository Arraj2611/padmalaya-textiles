"use client";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
}

export default function AnimatedSection({ children, className, style }: AnimatedSectionProps) {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}

export function StaggerList({
  children,
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
      {children}
    </div>
  );
}

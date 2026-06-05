"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  ...props
}) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic(0.25);

  const variants = {
    primary:
      "bg-gradient-to-r from-accent to-accent-secondary text-white shadow-glow-sm hover:shadow-glow",
    secondary:
      "glass text-[var(--text-primary)] hover:border-accent/40",
    outline:
      "border border-accent/50 text-accent hover:bg-accent/10",
  };

  const classes = cn(
    "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300",
    variants[variant],
    className
  );

  const inner = (
    <motion.span
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="inline-flex items-center justify-center gap-2 transition-transform duration-200"
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}

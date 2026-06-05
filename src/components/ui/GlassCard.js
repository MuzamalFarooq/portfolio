"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function GlassCard({ children, className, ...props }) {
  return (
    <motion.div
      className={cn(
        "glass rounded-2xl p-6 shadow-glass transition-all duration-300",
        "hover:border-accent/30 hover:shadow-glow-sm",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

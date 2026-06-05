"use client";

import { motion } from "framer-motion";
import { floatingTech } from "@/data/skills";

export function FloatingTechIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {floatingTech.map((tech, i) => (
        <motion.span
          key={tech}
          className="absolute text-xs font-mono font-medium text-accent/30 glass px-3 py-1 rounded-full"
          style={{
            left: `${10 + (i * 11) % 80}%`,
            top: `${15 + (i * 13) % 70}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          {tech}
        </motion.span>
      ))}
    </div>
  );
}

"use client";

import { motion } from "framer-motion";

export function SectionHeading({ label, title, subtitle }) {
  return (
    <div className="text-center mb-14 md:mb-20">
      {label && (
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-sm font-medium tracking-widest uppercase text-accent mb-3"
        >
          {label}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="font-display text-3xl sm:text-4xl md:text-5xl font-bold gradient-text"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-[var(--text-secondary)]"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

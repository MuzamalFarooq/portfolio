"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Education() {
  return (
    <section id="education" className="section-padding">
      <div className="container-custom">
        <SectionHeading
          label="Education"
          title="Academic Journey"
          subtitle="Degrees, certifications, and continuous learning"
        />

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent-secondary to-transparent md:-translate-x-px" />

          {siteConfig.education.map((edu, i) => (
            <motion.div
              key={edu.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative flex items-center gap-8 mb-12 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="hidden md:block flex-1" />
              <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-accent shadow-glow md:-translate-x-1/2 z-10" />
              <div className="ml-12 md:ml-0 md:w-[calc(50%-2rem)] glass rounded-2xl p-6 hover:border-accent/30 transition-colors">
                <span className="text-sm font-mono text-accent">{edu.year}</span>
                <h3 className="font-display text-lg font-bold mt-1">{edu.title}</h3>
                <p className="text-accent/80 text-sm">{edu.institution}</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  {edu.description}
                </p>
              </div>
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

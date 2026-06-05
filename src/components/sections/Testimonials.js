"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[index];

  return (
    <section id="testimonials" className="section-padding bg-[var(--surface-elevated)]/30">
      <div className="container-custom">
        <SectionHeading
          label="Testimonials"
          title="Client Feedback"
          subtitle="What collaborators say about working with me"
        />

        <div className="max-w-3xl mx-auto relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
            >
              <Quote className="w-10 h-10 text-accent/30 mx-auto mb-6" />
              <p className="text-lg md:text-xl leading-relaxed mb-8 text-[var(--text-secondary)]">
                &ldquo;{current.content}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center font-bold text-white">
                  {current.avatar}
                </div>
                <div className="text-left">
                  <p className="font-medium">{current.name}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{current.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-accent" : "w-2 bg-white/20"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  Layers,
  Server,
  Zap,
  Database,
  Shield,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

const iconMap = {
  layers: Layers,
  server: Server,
  zap: Zap,
  database: Database,
  shield: Shield,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export function Services() {
  return (
    <section id="services" className="section-padding bg-[var(--surface-elevated)]/50">
      <div className="container-custom">
        <SectionHeading
          label="Services"
          title="What I Offer"
          subtitle="End-to-end solutions for modern web applications"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {siteConfig.services.map((service) => {
            const Icon = iconMap[service.icon] || Layers;
            return (
              <motion.div key={service.title} variants={item}>
                <GlassCard className="h-full group hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display text-lg font-bold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {service.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

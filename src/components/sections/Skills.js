"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { FloatingTechIcons } from "@/components/effects/FloatingTechIcons";

function SkillBar({ name, level }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm text-accent">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-secondary shadow-glow-sm"
        />
      </div>
    </div>
  );
}

function TiltCard({ children, className }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / 20;
    const y = -(e.clientX - rect.left - rect.width / 2) / 20;
    setRotate({ x, y });
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
      }}
      className={className}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <FloatingTechIcons />
      <div className="container-custom relative z-10">
        <SectionHeading
          label="Skills"
          title="Technical Expertise"
          subtitle="Technologies I use to build world-class applications"
        />

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {skillCategories.map((cat, i) => (
            <TiltCard key={cat.title}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="h-full hover:shadow-glow transition-shadow duration-500">
                  <h3 className="font-display text-xl font-bold gradient-text mb-6">
                    {cat.title}
                  </h3>
                  {cat.skills.map((skill) => (
                    <SkillBar key={skill.name} {...skill} />
                  ))}
                </GlassCard>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

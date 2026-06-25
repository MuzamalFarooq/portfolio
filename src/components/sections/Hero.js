"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Github, Linkedin, Twitter, Download, Mail, Instagram } from "lucide-react";
import { siteConfig } from "@/data/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ThreeScene } from "@/components/effects/ThreeScene";
import dynamic from "next/dynamic";

const ParticleBackground = dynamic(
  () =>
    import("@/components/effects/ParticleBackground").then(
      (m) => m.ParticleBackground
    ),
  { ssr: false }
);

const socialIcons = { github: Github, linkedin: Linkedin, twitter: Twitter, dev: Github, instagram: Instagram };

export function Hero() {
  const [skillIndex, setSkillIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSkillIndex((i) => (i + 1) % siteConfig.rotatingSkills.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.from(".hero-line", {
      y: 80,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power4.out",
      delay: 0.8,
    });
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-mesh-gradient opacity-80" />
      <ParticleBackground />
      <ThreeScene />

      <div className="relative z-10 container-custom section-padding pt-32 pb-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="hero-line text-sm md:text-base tracking-[0.2em] uppercase text-accent mb-4"
        >
          Welcome to my portfolio
        </motion.p>

        <motion.h1
          className="hero-line font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.045, delayChildren: 1.0 } },
          }}
          aria-label={siteConfig.name}
        >
          {siteConfig.name.split("").map((char, i) => (
            <motion.span
              key={i}
              className={`inline-block${char === " " ? " w-[0.35em]" : ""}`}
              variants={{
                hidden: { opacity: 0, y: 60, rotate: -8, filter: "blur(8px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  rotate: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              whileHover={{ y: -6, color: "var(--accent)", transition: { duration: 0.15 } }}
              style={{ cursor: "default" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        <p className="hero-line text-lg md:text-2xl text-[var(--text-secondary)] mb-6">
          {siteConfig.role}
        </p>

        <div className="hero-line h-10 md:h-12 flex items-center justify-center mb-10">
          <span className="text-[var(--text-secondary)] mr-2">Specializing in</span>
          <motion.span
            key={skillIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="font-display text-xl md:text-2xl font-semibold gradient-text min-w-[140px]"
          >
            {siteConfig.rotatingSkills[skillIndex]}
          </motion.span>
        </div>

        <div className="hero-line flex flex-wrap items-center justify-center gap-4 mb-12">
          <MagneticButton href="#projects" data-magnetic>
            View Projects
          </MagneticButton>
          <MagneticButton href={siteConfig.resumeUrl} variant="secondary" data-magnetic>
            <Download className="w-4 h-4" />
            Download Resume
          </MagneticButton>
          <MagneticButton href="#contact" variant="outline" data-magnetic>
            <Mail className="w-4 h-4" />
            Contact Me
          </MagneticButton>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="hero-line flex justify-center gap-4"
        >
          {siteConfig.socials.map((s) => {
            const Icon = socialIcons[s.icon] || Github;
            return (
              <motion.a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, rotate: 5 }}
                className="p-3 rounded-full glass hover:border-accent/50 hover:shadow-glow-sm transition-all"
                aria-label={s.name}
                data-magnetic
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            );
          })}
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-accent/50 flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-accent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

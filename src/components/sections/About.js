"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Heart, Code2 } from "lucide-react";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  useEffect(() => {
    gsap.utils.toArray(".about-reveal").forEach((el) => {
      gsap.fromTo(
        el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );
    });
  }, []);

  return (
    <section id="about" className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          label="About Me"
          title="Crafting Digital Excellence"
          subtitle="Passionate about building products that make a difference"
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            className="about-reveal relative flex justify-center"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative w-72 h-72 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-2xl glow-border animate-pulse-glow" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden glass p-1">
                <Image
                  src="/muz image.jpeg"
                  alt="Profile"
                  fill
                  className="object-cover rounded-xl"
                  sizes="(max-width: 768px) 288px, 320px"
                />
              </div>
            </div>
          </motion.div>

          <div className="about-reveal space-y-6">
            <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
              {siteConfig.about.bio}
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <GlassCard className="flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{siteConfig.about.degree}</p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {siteConfig.about.university}
                  </p>
                </div>
              </GlassCard>
              <GlassCard className="flex items-start gap-3">
                <Code2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Core Skills</p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {siteConfig.about.skillsHighlight.join(" · ")}
                  </p>
                </div>
              </GlassCard>
              <GlassCard className="flex items-start gap-3 sm:col-span-2">
                <Heart className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Interests</p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {siteConfig.about.interests.join(" · ")}
                  </p>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 about-reveal">
          {siteConfig.stats.map((stat) => (
            <GlassCard key={stat.label} className="text-center py-8">
              <p className="font-display text-4xl md:text-5xl font-bold gradient-text">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-[var(--text-secondary)]">{stat.label}</p>
            </GlassCard>
          ))}
        </div>

        <div className="mt-16 about-reveal">
          <h3 className="font-display text-2xl font-bold mb-8 text-center">
            Career Journey
          </h3>
          <div className="space-y-6 max-w-2xl mx-auto">
            {siteConfig.careerTimeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-6"
              >
                <span className="font-mono text-accent font-bold shrink-0 w-14">
                  {item.year}
                </span>
                <GlassCard className="flex-1">
                  <p className="font-medium">{item.role}</p>
                  <p className="text-sm text-accent">{item.company}</p>
                  <p className="text-sm text-[var(--text-secondary)] mt-2">
                    {item.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { siteConfig } from "@/data/site";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  dev: Github,
  instagram: Instagram,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--surface-elevated)]">
      <div className="section-padding container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-display text-2xl font-bold gradient-text mb-3">
              {siteConfig.name}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] max-w-xs">
              {siteConfig.tagline}
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {siteConfig.nav.slice(0, 6).map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href || `#${item.id}`}
                    className="text-sm text-[var(--text-secondary)] hover:text-accent transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Connect</h4>
            <div className="flex gap-3">
              {siteConfig.socials.map((s) => {
                const Icon = iconMap[s.icon] || Github;
                return (
                  <motion.a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="p-2.5 rounded-full glass hover:border-accent/40 hover:shadow-glow-sm transition-all"
                    aria-label={s.name}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[var(--text-secondary)]">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          {/* <p className="text-xs">
            Crafted with Next.js, Framer Motion, GSAP & Three.js
          </p> */}
        </div>
      </div>
    </footer>
  );
}

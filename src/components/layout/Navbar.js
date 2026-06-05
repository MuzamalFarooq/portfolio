"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { siteConfig } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useTheme } from "@/components/providers/ThemeProvider";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { SoundToggle } from "@/components/ui/SoundToggle";
import { ThemeCustomizer } from "@/components/ui/ThemeCustomizer";
import { cn } from "@/lib/utils";

const sectionIds = siteConfig.nav.filter((n) => !n.href).map((n) => n.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "py-3 glass shadow-glass" : "py-5 bg-transparent"
      )}
    >
      <nav className="container-custom flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("home");
          }}
          className="font-display text-xl font-bold gradient-text"
          data-magnetic
        >
          {siteConfig.name.split(" ")[0]}.
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {siteConfig.nav.map((item) => (
            <li key={item.id}>
              {item.href ? (
                <Link
                  href={item.href}
                  className="px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-lg"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  onClick={() => scrollTo(item.id)}
                  className={cn(
                    "relative px-3 py-2 text-sm transition-colors rounded-lg",
                    active === item.id
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  )}
                >
                  {item.label}
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                    />
                  )}
                </button>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-2">
          <CommandPalette />
          <SoundToggle />
          <ThemeCustomizer />
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full glass hover:border-accent/30"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </div>

        <button
          className="lg:hidden p-2 glass rounded-lg"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-[var(--border)] mt-2 mx-4 rounded-2xl overflow-hidden"
          >
            <ul className="py-4">
              {siteConfig.nav.map((item) => (
                <li key={item.id}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="block px-6 py-3 text-[var(--text-secondary)]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => scrollTo(item.id)}
                      className="block w-full text-left px-6 py-3 text-[var(--text-secondary)]"
                    >
                      {item.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

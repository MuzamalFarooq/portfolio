"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const commands = [
    ...siteConfig.nav.map((n) => ({
      id: n.id,
      label: `Go to ${n.label}`,
      action: () => {
        if (n.href) {
          window.location.href = n.href;
        } else {
          if (typeof window !== "undefined") {
            if (window.location.pathname !== "/") {
              window.location.href = `/#${n.id}`;
            } else {
              const element = document.getElementById(n.id);
              if (element) {
                if (window.lenis) {
                  window.lenis.scrollTo(element);
                } else {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }
            }
          }
        }
        setOpen(false);
      },
    })),
    {
      id: "theme",
      label: "Toggle theme",
      action: () => {
        document.documentElement.classList.toggle("light");
        document.documentElement.classList.toggle("dark");
        setOpen(false);
      },
    },
    {
      id: "resume",
      label: "Download resume",
      action: () => {
        window.open(siteConfig.resumeUrl, "_blank");
        setOpen(false);
      },
    },
  ];

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleKey = useCallback((e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setOpen((o) => !o);
    }
    if (e.key === "Escape") setOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg glass text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        aria-label="Open command palette"
      >
        <Search className="w-3.5 h-3.5" />
        <span>Search</span>
        <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-[10px]">⌘K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9990] bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[9991] w-full max-w-lg mx-4"
            >
              <div className="glass rounded-2xl overflow-hidden shadow-2xl">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]">
                  <Search className="w-5 h-5 text-accent" />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type a command..."
                    className="flex-1 bg-transparent outline-none text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
                  />
                </div>
                <ul className="max-h-64 overflow-y-auto py-2">
                  {filtered.map((cmd) => (
                    <li key={cmd.id}>
                      <button
                        onClick={cmd.action}
                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors text-left"
                      >
                        <span>{cmd.label}</span>
                        <ArrowRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

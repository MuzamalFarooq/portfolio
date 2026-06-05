"use client";

import { useState } from "react";
import { Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";

const ACCENTS = ["indigo", "cyan", "emerald", "rose"];

export function ThemeCustomizer() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme, accent, setAccent } = useTheme();

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => setOpen(!open)}
        className="p-2.5 rounded-full glass hover:border-accent/30"
        aria-label="Theme settings"
      >
        <Palette className="w-4 h-4 text-accent" />
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className="absolute right-0 top-full mt-2 p-4 glass rounded-xl min-w-[180px] z-50"
          >
            <p className="text-xs text-[var(--text-secondary)] mb-2">Mode</p>
            <button
              onClick={toggleTheme}
              className="w-full py-2 rounded-lg bg-white/5 text-sm mb-3 hover:bg-white/10"
            >
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </button>
            <p className="text-xs text-[var(--text-secondary)] mb-2">Accent</p>
            <div className="flex gap-2">
              {ACCENTS.map((a) => (
                <button
                  key={a}
                  onClick={() => setAccent(a)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                    accent === a ? "border-white scale-110" : "border-transparent"
                  }`}
                  style={{
                    background:
                      a === "indigo"
                        ? "#6366f1"
                        : a === "cyan"
                          ? "#06b6d4"
                          : a === "emerald"
                            ? "#10b981"
                            : "#f43f5e",
                  }}
                  aria-label={`${a} accent`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

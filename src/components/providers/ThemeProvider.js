"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

const ACCENT_PRESETS = {
  indigo: { accent: "#6366f1", secondary: "#a855f7" },
  cyan: { accent: "#06b6d4", secondary: "#3b82f6" },
  emerald: { accent: "#10b981", secondary: "#06b6d4" },
  rose: { accent: "#f43f5e", secondary: "#a855f7" },
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const [accent, setAccent] = useState("indigo");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("portfolio-theme");
    const savedAccent = localStorage.getItem("portfolio-accent");
    if (saved) setTheme(saved);
    if (savedAccent) setAccent(savedAccent);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("portfolio-theme", theme);

    const preset = ACCENT_PRESETS[accent] || ACCENT_PRESETS.indigo;
    root.style.setProperty("--accent", preset.accent);
    root.style.setProperty("--accent-secondary", preset.secondary);
    root.style.setProperty("--glow", `${preset.accent}73`);
    localStorage.setItem("portfolio-accent", accent);
  }, [theme, accent, mounted]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, toggleTheme, accent, setAccent, accentPresets: ACCENT_PRESETS }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

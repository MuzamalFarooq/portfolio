"use client";

import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export function SoundToggle() {
  const [enabled, setEnabled] = useState(false);

  const toggle = () => {
    setEnabled((e) => {
      if (!e) {
        try {
          const ctx = new (window.AudioContext || window.webkitAudioContext)();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = 440;
          gain.gain.setValueAtTime(0.05, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.15);
        } catch {
          /* audio optional */
        }
      }
      return !e;
    });
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggle}
      className="p-2.5 rounded-full glass hover:border-accent/30 transition-colors"
      aria-label={enabled ? "Mute sounds" : "Enable sounds"}
      title={enabled ? "Sound on" : "Sound off"}
    >
      {enabled ? (
        <Volume2 className="w-4 h-4 text-accent" />
      ) : (
        <VolumeX className="w-4 h-4 text-[var(--text-secondary)]" />
      )}
    </motion.button>
  );
}

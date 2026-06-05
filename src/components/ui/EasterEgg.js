"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function EasterEgg() {
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === KONAMI[index]) {
        const next = index + 1;
        if (next === KONAMI.length) {
          setActive(true);
          setIndex(0);
          setTimeout(() => setActive(false), 4000);
        } else setIndex(next);
      } else setIndex(0);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [index]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            className="text-center"
          >
            <p className="text-6xl mb-4">🚀</p>
            <p className="font-display text-2xl gradient-text font-bold">
              You found the secret!
            </p>
            <p className="text-[var(--text-secondary)] mt-2">
              Built with passion & MERN magic
            </p>
          </motion.div>
          {[...Array(30)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-2 h-2 rounded-full bg-accent"
              initial={{
                x: "50vw",
                y: "50vh",
                opacity: 1,
              }}
              animate={{
                x: `${Math.random() * 100}vw`,
                y: `${Math.random() * 100}vh`,
                opacity: 0,
              }}
              transition={{ duration: 2, delay: i * 0.05 }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

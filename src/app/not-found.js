"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-[var(--surface)]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-8xl md:text-9xl font-display font-bold gradient-text">
          404
        </p>
        <h1 className="text-2xl md:text-3xl font-bold mt-4 mb-2">
          Page not found
        </h1>
        <p className="text-[var(--text-secondary)] max-w-md mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex px-6 py-3 rounded-full bg-gradient-to-r from-accent to-accent-secondary text-white font-medium hover:shadow-glow transition-shadow"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}

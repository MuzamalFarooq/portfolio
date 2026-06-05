"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen } from "lucide-react";

const placeholders = [
  { title: "Building Scalable MERN Applications", date: "Coming Soon" },
  { title: "Mastering GSAP ScrollTrigger in Next.js", date: "Coming Soon" },
  { title: "WebSocket Architecture for Real-time Apps", date: "Coming Soon" },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 section-padding">
      <div className="container-custom max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-accent mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to portfolio
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <BookOpen className="w-12 h-12 text-accent mx-auto mb-4" />
          <h1 className="font-display text-4xl md:text-5xl font-bold gradient-text">
            Blog
          </h1>
          <p className="mt-4 text-[var(--text-secondary)]">
            Articles on full-stack development, animations, and system design —
            launching soon.
          </p>
        </motion.div>

        <div className="space-y-4">
          {placeholders.map((post, i) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 opacity-60 cursor-not-allowed"
            >
              <span className="text-xs text-accent uppercase tracking-wider">
                {post.date}
              </span>
              <h2 className="font-display text-xl font-bold mt-2">{post.title}</h2>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

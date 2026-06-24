"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { projects, projectFilters } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const VISIBLE_LG = 4; // cards visible on large screens
const VISIBLE_SM = 2; // cards visible on small screens

export function Projects() {
  const [filter, setFilter] = useState("all");
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(VISIBLE_LG);
  const trackRef = useRef(null);

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  const total = filtered.length;
  const maxIndex = Math.max(0, total - visibleCount);

  // Detect screen size
  useEffect(() => {
    function update() {
      setVisibleCount(window.innerWidth < 768 ? VISIBLE_SM : VISIBLE_LG);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  function handleFilterChange(id) {
    setFilter(id);
    setIndex(0);
  }

  function prev() {
    setIndex((i) => Math.max(0, i - 1));
  }

  function next() {
    setIndex((i) => Math.min(maxIndex, i + 1));
  }

  const cardWidthPercent = 100 / visibleCount;
  const translateX = -(index * cardWidthPercent);

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <SectionHeading
          label="Portfolio"
          title="Featured Projects"
          subtitle="A selection of my recent work across full-stack and real-time applications"
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {projectFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => handleFilterChange(f.id)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                filter === f.id
                  ? "bg-gradient-to-r from-accent to-accent-secondary text-white shadow-glow-sm"
                  : "glass text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Slider Wrapper */}
        <div className="relative">
          {/* Prev Arrow */}
          <button
            onClick={prev}
            disabled={index === 0}
            aria-label="Previous projects"
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-20 p-3 rounded-full glass border transition-all duration-300",
              index === 0
                ? "border-white/5 opacity-30 cursor-not-allowed"
                : "border-white/10 hover:border-accent/50 hover:shadow-glow-sm"
            )}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Track Viewport */}
          <div className="overflow-hidden rounded-xl">
            <div
              ref={trackRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${translateX}%)` }}
            >
              {filtered.map((project) => (
                <div
                  key={project.id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${cardWidthPercent}%` }}
                >
                  <article className="group glass rounded-2xl overflow-hidden hover:shadow-glow transition-all duration-500 h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden flex-shrink-0">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:blur-[2px]"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent opacity-80" />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-full glass hover:scale-110 transition-transform"
                          aria-label="GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-full bg-accent hover:scale-110 transition-transform"
                          aria-label="Live demo"
                        >
                          <ExternalLink className="w-4 h-4 text-white" />
                        </a>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-display text-base font-bold mb-1.5 group-hover:gradient-text transition-all line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] mb-3 line-clamp-2 leading-relaxed flex-1">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-accent border border-accent/20"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-[var(--text-secondary)] border border-white/10">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Next Arrow */}
          <button
            onClick={next}
            disabled={index >= maxIndex}
            aria-label="Next projects"
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-20 p-3 rounded-full glass border transition-all duration-300",
              index >= maxIndex
                ? "border-white/5 opacity-30 cursor-not-allowed"
                : "border-white/10 hover:border-accent/50 hover:shadow-glow-sm"
            )}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dot Indicators */}
        {maxIndex > 0 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={cn(
                  "rounded-full transition-all duration-300",
                  i === index
                    ? "w-8 h-2 bg-accent shadow-glow-sm"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

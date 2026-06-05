"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveal(selector, options = {}) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray(selector).forEach((el) => {
        gsap.fromTo(
          el,
          {
            y: options.y ?? 60,
            opacity: 0,
            scale: options.scale ?? 0.98,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: options.duration ?? 1,
            ease: options.ease ?? "power3.out",
            scrollTrigger: {
              trigger: el,
              start: options.start ?? "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [selector, reduced, options]);
}

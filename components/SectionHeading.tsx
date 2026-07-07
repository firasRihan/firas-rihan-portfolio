"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
}: {
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".sh-title", {
        yPercent: 110,
        duration: 0.9,
        ease: "power4.out",
        scrollTrigger: { trigger: ref.current, start: "top 82%" },
      });
      gsap.from(".sh-line", {
        scaleX: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 82%" },
      });
      gsap.from(".sh-meta", {
        opacity: 0,
        y: 14,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 82%" },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="mb-14 sm:mb-20">
      <p className="sh-meta font-mono text-[11px] tracking-[0.35em] text-accent sm:text-xs">
        [{index}] {eyebrow}
      </p>
      <div className="mt-4 overflow-hidden">
        <h2 className="sh-title font-display text-3xl font-extrabold uppercase leading-none text-hi sm:text-6xl lg:text-7xl">
          {title}
        </h2>
      </div>
      {subtitle ? (
        <p className="sh-meta mt-4 max-w-xl text-sm text-mute sm:text-base">
          {subtitle}
        </p>
      ) : null}
      <div className="sh-line mt-8 h-px w-full origin-left bg-gradient-to-r from-accent/70 via-line/20 to-transparent" />
    </div>
  );
}

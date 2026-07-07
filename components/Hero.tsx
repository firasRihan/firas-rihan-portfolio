"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HiOutlineDownload } from "react-icons/hi";
import { site } from "@/data/content";
import HeroScene from "./HeroScene";
import Marquee from "./Marquee";
import SocialLinks from "./SocialLinks";

const marqueeItems = [
  "SENIOR FULL-STACK ENGINEER",
  "TEAM LEAD",
  ".NET CORE",
  "REACT",
  "ANGULAR",
  "NEXT.JS",
  "AZURE",
  "AWS",
  "6,000+ STORES SERVED DAILY",
  "CLEAN ARCHITECTURE",
];

function SplitLine({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={`block overflow-hidden pb-[0.08em] ${className}`}>
      {text.split("").map((c, i) => (
        <span
          key={`${c}-${i}`}
          className="hero-char inline-block will-change-transform"
        >
          {c === " " ? " " : c}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".hero-char", {
        yPercent: 115,
        skewY: 5,
        duration: 1.1,
        stagger: 0.04,
        delay: 0.15,
      })
        .from(
          ".hero-fade",
          { opacity: 0, y: 22, duration: 0.8, stagger: 0.12 },
          "-=0.55",
        )
        .from(".hero-strip", { opacity: 0, duration: 0.8 }, "-=0.3");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative flex min-h-screen flex-col overflow-hidden"
    >
      <HeroScene />

      {/* readability gradients over the scene */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg via-bg/60 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pt-24 sm:px-8">
        <p className="hero-fade font-mono text-[11px] tracking-[0.3em] text-mute sm:text-xs">
          <span className="text-accent">//</span> SIGNAL ACQUIRED · 33°53'48"N
          35°30'16"E · BEIRUT → WORLDWIDE
        </p>

        <h1 className="mt-6 font-display text-[17vw] font-extrabold uppercase leading-[0.88] tracking-tight text-hi sm:text-[13vw] lg:text-[9.5rem]">
          <SplitLine text="Firas" />
          <SplitLine text="Rihan" className="text-stroke-accent" />
        </h1>

        <p className="hero-fade mt-7 font-mono text-xs uppercase tracking-[0.25em] text-accent sm:text-sm">
          {site.role}
        </p>

        <p className="hero-fade mt-4 max-w-xl text-sm leading-relaxed text-body sm:text-base md:text-lg">
          {site.tagline}
        </p>

        <div className="hero-fade mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <a
            href="#projects"
            className="rounded-full bg-accent px-7 py-3 text-sm font-semibold text-bg transition-shadow duration-300 hover:shadow-glow"
          >
            View my work
          </a>
          <a
            href={site.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-accent/50 px-7 py-3 text-sm font-semibold text-accent transition-all duration-300 hover:bg-accent/10 hover:shadow-glow-sm"
          >
            <HiOutlineDownload />
            Download resume
          </a>
        </div>

        <div className="hero-fade mt-9">
          <SocialLinks />
        </div>
      </div>

      <div className="hero-strip relative z-10 border-t border-line/10 bg-bg/60 backdrop-blur">
        <Marquee
          items={marqueeItems}
          className="py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-mute sm:text-xs"
        />
      </div>
    </section>
  );
}

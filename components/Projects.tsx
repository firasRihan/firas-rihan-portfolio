"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiOutlineLockClosed } from "react-icons/hi";
import {
  projectCategories,
  projects,
  type ProjectCategory,
} from "@/data/content";
import SectionHeading from "./SectionHeading";

type Filter = "All" | ProjectCategory;

/**
 * Desktop: GSAP pinned horizontal gallery — the section locks and vertical
 * scroll drives the cards sideways, with a live position readout.
 * Mobile / reduced motion: native swipe carousel with snap points.
 */
export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [isDesktop, setIsDesktop] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const visible =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const getAmount = () => Math.max(track.scrollWidth - window.innerWidth, 0);
    if (getAmount() < 60) return; // few cards — nothing to scroll

    const total = visible.length;

    const ctx = gsap.context(() => {
      // cards drift in as the section approaches
      gsap.from(".proj-card", {
        opacity: 0,
        x: 80,
        stagger: 0.06,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 70%" },
      });

      gsap.to(track, {
        x: () => -getAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getAmount()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              total,
              Math.max(1, Math.round(self.progress * (total - 1)) + 1)
            );
            if (counterRef.current) {
              counterRef.current.textContent = `${String(idx).padStart(
                3,
                "0"
              )} / ${String(total).padStart(3, "0")}`;
            }
            if (barRef.current) {
              barRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });
    }, section);

    // let layout settle (fonts, images) before measuring
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, [isDesktop, filter, visible.length]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden py-24 sm:py-32 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:py-0"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          eyebrow="DEPLOYED.SYSTEMS"
          title="Projects"
          subtitle="Enterprise platforms, freelance builds, and research."
        />

        <div className="mb-10 flex flex-wrap items-center gap-3">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`rounded-full border px-5 py-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-all duration-300 ${
                filter === cat
                  ? "border-accent bg-accent/10 text-accent shadow-glow-sm"
                  : "border-line/15 text-mute hover:border-line/30 hover:text-hi"
              }`}
            >
              {cat}
            </button>
          ))}

          {/* live readout (desktop pinned mode) */}
          <span
            ref={counterRef}
            className="ml-auto hidden font-mono text-xs tracking-[0.25em] text-accent lg:block"
          >
            001 / {String(visible.length).padStart(3, "0")}
          </span>
        </div>
      </div>

      {/* the track: swipe carousel on mobile, GSAP-driven on desktop */}
      <div className="overflow-x-auto pb-4 lg:overflow-visible lg:pb-0 [scrollbar-width:thin]">
        <div
          ref={trackRef}
          className="flex w-max snap-x snap-mandatory gap-5 px-5 sm:px-8 lg:snap-none lg:will-change-transform"
        >
          {visible.map((project, i) => (
            <article
              key={project.title}
              className="proj-card panel group relative flex h-[400px] w-[82vw] max-w-[400px] shrink-0 snap-start flex-col overflow-hidden rounded-xl p-7 sm:h-[420px] sm:w-[420px] sm:max-w-none"
            >
              {/* ghost index */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-3 -top-7 select-none font-display text-[7rem] font-extrabold leading-none text-stroke opacity-[0.14] transition-opacity duration-500 group-hover:opacity-40"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* corner glow on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent/0 blur-3xl transition-colors duration-500 group-hover:bg-accent/15"
              />

              <div className="mb-5 flex items-center gap-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-mute/70">
                  {project.category}
                </span>
                {project.proprietary ? (
                  <span className="flex items-center gap-1 rounded-full border border-line/15 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-mute">
                    <HiOutlineLockClosed />
                    Private
                  </span>
                ) : null}
              </div>

              <h3 className="relative font-display text-2xl font-bold leading-tight text-hi transition-colors duration-300 group-hover:text-accent">
                {project.title}
              </h3>
              <p className="relative mt-3 flex-1 text-sm leading-relaxed text-mute">
                {project.description}
              </p>

              <p className="relative mt-5 border-t border-line/10 pt-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.15em] text-accent/80">
                {project.tech.join(" / ")}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 w-full max-w-6xl px-5 sm:px-8">
        {/* progress rail (desktop) / swipe hint (mobile) */}
        <div className="hidden h-px w-full bg-line/10 lg:block">
          <div
            ref={barRef}
            className="h-px origin-left bg-accent shadow-glow-sm"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-mute/60 lg:mt-3 lg:text-right">
          <span className="lg:hidden">Swipe →</span>
          <span className="hidden lg:inline">Scroll to explore →</span>
        </p>
      </div>
    </section>
  );
}

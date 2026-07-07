"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/content";
import SectionHeading from "./SectionHeading";
import { fadeUp, viewportOnce } from "./motion";

export default function Experience() {
  const total = experience.length;

  return (
    <section
      id="experience"
      className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32"
    >
      <SectionHeading
        index="02"
        eyebrow="TRANSMISSION.LOG"
        title="Experience"
        subtitle="From intern to technical lead — most recent transmission first."
      />

      <div className="relative">
        {/* glowing timeline rail */}
        <motion.div
          aria-hidden
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="absolute left-0 top-0 hidden h-full w-px origin-top bg-gradient-to-b from-accent via-accent/40 to-transparent shadow-glow-sm md:block"
        />

        <div>
          {experience.map((entry, idx) => (
            <motion.article
              key={`${entry.company}-${entry.role}`}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className={`group relative grid border-t border-line/10 md:grid-cols-[200px_1fr] md:gap-10 md:pl-10 ${
                entry.compact ? "py-6" : "py-10 sm:py-12"
              }`}
            >
              {/* rail node */}
              <span
                aria-hidden
                className="absolute -left-[5px] top-12 hidden h-[11px] w-[11px] items-center justify-center md:flex"
              >
                <span className="absolute h-full w-full rounded-full bg-accent/30 animate-pulseGlow" />
                <span className="h-[7px] w-[7px] rounded-full bg-accent shadow-glow-sm" />
              </span>

              <div className="mb-3 md:mb-0">
                <p className="font-mono text-xs tracking-[0.15em] text-accent">
                  {entry.period}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-mute">
                  {entry.location}
                </p>
                <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-mute/60">
                  LOG {String(total - idx).padStart(2, "0")}/{String(total).padStart(2, "0")}
                </p>
              </div>

              <div>
                <h3
                  className={`font-display font-bold text-hi transition-colors duration-300 group-hover:text-accent ${
                    entry.compact ? "text-base" : "text-xl sm:text-2xl"
                  }`}
                >
                  {entry.role}
                </h3>
                <p
                  className={`mt-1 text-accent/80 ${
                    entry.compact ? "text-xs" : "text-sm"
                  }`}
                >
                  {entry.company}
                </p>

                {entry.bullets.length > 0 ? (
                  <ul className="mt-5 space-y-2.5">
                    {entry.bullets.map((bullet) => (
                      <li
                        key={bullet.slice(0, 40)}
                        className="flex gap-3 text-sm leading-relaxed text-body"
                      >
                        <span aria-hidden className="mt-[3px] shrink-0 font-mono text-accent/70">
                          ▹
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  HiOutlineAcademicCap,
  HiOutlineBeaker,
  HiOutlineGlobeAlt,
} from "react-icons/hi";
import { education, research, spokenLanguages } from "@/data/content";
import SectionHeading from "./SectionHeading";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "./motion";

export default function Education() {
  return (
    <section
      id="education"
      className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32"
    >
      <SectionHeading
        index="05"
        eyebrow="ACADEMIC.RECORD"
        title="Education & Research"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-5 sm:grid-cols-2"
      >
        {education.map((entry) => (
          <motion.div
            key={entry.degree}
            variants={staggerItem}
            className="panel rounded-xl p-7"
          >
            <HiOutlineAcademicCap className="mb-4 text-2xl text-accent" />
            <h3 className="font-display text-base font-bold text-hi sm:text-lg">
              {entry.degree}
            </h3>
            <p className="mt-1 text-sm text-body">{entry.school}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
              {entry.date}
            </p>
            <p className="mt-4 inline-block rounded-md border border-accent/30 bg-accent/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
              {entry.honors}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative mt-5 overflow-hidden rounded-xl border border-accent/40 bg-accent/5 p-7 shadow-glow-sm cursor-pointer transition-all hover:border-accent/60 hover:bg-accent/10 hover:shadow-glow"
        onClick={() => window.open(research.link, "_blank")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            window.open(research.link, "_blank");
          }
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/15 blur-3xl"
        />
        <div className="relative flex items-start gap-4">
          <HiOutlineBeaker className="mt-1 shrink-0 text-2xl text-accent" />
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              Published Research · ACTEA 2023
            </p>
            <h3 className="mt-2 font-display text-base font-bold text-hi sm:text-xl">
              &ldquo;{research.title}&rdquo;
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-body">
              {research.description}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-8 flex flex-wrap items-center gap-3"
      >
        <HiOutlineGlobeAlt className="text-lg text-accent" aria-hidden />
        {spokenLanguages.map((lang) => (
          <span
            key={lang}
            className="rounded-full border border-line/15 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-body"
          >
            {lang}
          </span>
        ))}
      </motion.div>
    </section>
  );
}

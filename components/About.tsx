"use client";

import { motion } from "framer-motion";
import { about, stats } from "@/data/content";
import CountUp from "./CountUp";
import SectionHeading from "./SectionHeading";
import { staggerContainer, staggerItem, viewportOnce } from "./motion";

export default function About() {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32"
    >
      <SectionHeading index="01" eyebrow="SYSTEM.OVERVIEW" title="About" />

      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <motion.p
          variants={staggerItem}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="font-display text-2xl font-bold leading-snug text-hi sm:text-3xl"
        >
          Engineer of systems that{" "}
          <span className="text-accent">cannot afford to fail</span>.
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="space-y-5"
        >
          {about.paragraphs.map((p) => (
            <motion.p
              key={p.slice(0, 32)}
              variants={staggerItem}
              className="text-sm leading-relaxed text-body sm:text-base"
            >
              {p}
            </motion.p>
          ))}
        </motion.div>
      </div>

      <motion.dl
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-20 grid grid-cols-2 border-t border-line/10 lg:grid-cols-3"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={staggerItem}
            className={`border-b border-line/10 px-5 py-8 sm:px-7 ${
              i % 2 === 0 ? "border-r" : ""
            } lg:border-b-0 lg:border-r lg:last:border-r-0`}
          >
            <dt className="order-2 mt-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-mute sm:text-xs">
              {stat.label}
            </dt>
            <dd className="order-1 font-display text-4xl font-extrabold text-accent sm:text-4xl">
              <CountUp target={stat.value} suffix={stat.suffix} />
            </dd>
          </motion.div>
        ))}
      </motion.dl>
    </section>
  );
}

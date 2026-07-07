"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { HiArrowUpRight } from "react-icons/hi2";
import { contact, site } from "@/data/content";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "./motion";

const buttons = [
  { href: site.links.whatsapp, label: site.phone, Icon: FaWhatsapp },
  { href: site.links.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
  { href: site.links.github, label: "GitHub", Icon: FaGithub },
];

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="font-mono text-[11px] tracking-[0.35em] text-accent sm:text-xs"
        >
          [06] OPEN.CHANNEL
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-6 font-display font-extrabold uppercase leading-[0.92] text-hi sm:text-7xl lg:text-8xl"
        >
          <span className="text-[9vw] sm:text-7xl lg:text-8xl">
            Let&rsquo;s build
          </span>
          <br />
          <span className="text-[8.8vw] sm:text-7xl lg:text-8xl text-stroke-accent">
            something
          </span>
          <br />
          <span className="text-[8.8vw] sm:text-7xl lg:text-8xl">together</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-6 max-w-md text-sm text-mute sm:text-base"
        >
          {contact.line}
        </motion.p>

        {/* giant email link */}
        <motion.a
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          href={site.links.email}
          className="group mt-12 inline-flex max-w-full items-center gap-3 border-b border-line/20 pb-3 transition-colors duration-300 hover:border-accent"
        >
          <HiOutlineMail className="shrink-0 text-2xl text-accent sm:text-3xl" />
          <span className="truncate font-display text-xl font-bold text-body transition-colors duration-300 group-hover:text-accent sm:text-3xl lg:text-4xl">
            {site.email}
          </span>
          <HiArrowUpRight className="shrink-0 text-xl text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 sm:text-2xl" />
        </motion.a>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 flex flex-wrap gap-4"
        >
          {buttons.map(({ href, label, Icon }) => (
            <motion.a
              key={label}
              variants={staggerItem}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-full border border-accent/40 bg-line/5 px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-body backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:text-accent hover:shadow-glow"
            >
              <Icon className="text-base text-accent" />
              {label}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { navLinks } from "@/data/content";

export default function Navbar() {
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line/10 bg-bg/70 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      {/* scroll progress hairline */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left bg-accent shadow-glow-sm"
        style={{ transform: `scaleX(${progress})` }}
      />

      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="font-display text-lg font-extrabold tracking-widest text-hi transition-colors hover:text-accent"
        >
          FR<span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                  active === link.href
                    ? "text-accent"
                    : "text-mute hover:text-hi"
                }`}
              >
                <span className="mr-1 text-accent/60">0{i + 1}</span>
                {link.label}
                {active === link.href ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 h-px w-full bg-accent shadow-glow-sm"
                  />
                ) : null}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="text-2xl text-hi md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      {menuOpen ? (
        <motion.ul
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-line/10 bg-bg/90 px-6 pb-4 backdrop-blur-xl md:hidden"
        >
          {navLinks.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block py-3 font-mono text-xs uppercase tracking-[0.2em] ${
                  active === link.href ? "text-accent" : "text-body"
                }`}
              >
                <span className="mr-2 text-accent/60">0{i + 1}</span>
                {link.label}
              </a>
            </li>
          ))}
        </motion.ul>
      ) : null}
    </motion.header>
  );
}

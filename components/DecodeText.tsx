"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01!<>-_\\/[]{}—=+*^?#";

export default function DecodeText({
  text,
  className = "",
  delayMs = 0,
}: {
  text: string;
  className?: string;
  delayMs?: number;
}) {
  const prefersReduced = useReducedMotion();
  const [display, setDisplay] = useState(prefersReduced ? text : "");
  const frame = useRef(0);

  useEffect(() => {
    if (prefersReduced) {
      setDisplay(text);
      return;
    }

    let raf = 0;
    let started = false;
    const totalFrames = text.length * 4 + 12;

    const tick = () => {
      frame.current += 1;
      const progress = frame.current / totalFrames;
      const settled = Math.floor(progress * text.length);

      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === " ") {
          out += " ";
        } else if (i < settled) {
          out += ch;
        } else if (i < settled + 3) {
          out += CHARS[Math.floor(Math.random() * CHARS.length)];
        } else {
          out += "";
        }
      }
      setDisplay(out);

      if (settled < text.length) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    const timer = window.setTimeout(() => {
      started = true;
      raf = requestAnimationFrame(tick);
    }, delayMs);

    return () => {
      window.clearTimeout(timer);
      if (started) cancelAnimationFrame(raf);
    };
  }, [text, delayMs, prefersReduced]);

  return (
    <span className={className} aria-label={text}>
      {display || " "}
    </span>
  );
}

"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import ParticleField from "./ParticleField";
import { skillIcons } from "./skillIcons";

/**
 * A 3D constellation of tech icons distributed on a fibonacci sphere.
 * Auto-rotates; drag (mouse or touch) to spin it. Icons scale and fade
 * with depth. Pure DOM transforms — no per-frame React renders.
 */
export default function SkillsOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const items = itemRefs.current.filter(
      (el): el is HTMLDivElement => el !== null
    );
    const N = items.length;
    if (N === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // fibonacci sphere unit positions
    const base = items.map((_, i) => {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = Math.PI * (3 - Math.sqrt(5)) * i;
      return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
    });

    let radius = 100;
    const setRadius = () => {
      radius = Math.min(container.clientWidth, container.clientHeight) / 2 - 44;
    };
    setRadius();

    const AUTO = 0.0032;
    let rotX = -0.3;
    let rotY = 0;
    let velX = 0;
    let velY = AUTO;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      velY = (e.clientX - lastX) * 0.004;
      velX = (e.clientY - lastY) * 0.004;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onUp = () => {
      dragging = false;
    };

    const renderFrame = () => {
      const sinY = Math.sin(rotY);
      const cosY = Math.cos(rotY);
      const sinX = Math.sin(rotX);
      const cosX = Math.cos(rotX);
      const cx = container.clientWidth / 2;
      const cy = container.clientHeight / 2;

      for (let i = 0; i < N; i++) {
        const p = base[i];
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;
        const y1 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        const depth = (z2 + 2) / 3; // ~0.33 (back) … 1 (front)
        const el = items[i];
        el.style.transform = `translate3d(${cx + x1 * radius}px, ${
          cy + y1 * radius
        }px, 0) translate(-50%, -50%) scale(${0.5 + depth * 0.7})`;
        el.style.opacity = String(0.2 + depth * 0.8);
        el.style.zIndex = String(Math.round(depth * 100));
      }
    };

    let raf = 0;
    const loop = () => {
      rotY += velY;
      rotX += velX;
      rotX = Math.max(-1.3, Math.min(1.3, rotX));
      if (!dragging) {
        velY += (AUTO - velY) * 0.02;
        velX *= 0.94;
      }
      renderFrame();
      raf = requestAnimationFrame(loop);
    };

    const onResize = () => {
      setRadius();
      if (reduced) renderFrame();
    };
    window.addEventListener("resize", onResize);

    if (reduced) {
      renderFrame();
    } else {
      container.addEventListener("pointerdown", onDown);
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerup", onUp);
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="relative mx-auto h-[380px] w-full max-w-3xl cursor-grab select-none active:cursor-grabbing sm:h-[500px]"
      style={{ touchAction: "pan-y" }}
    >
      {/* soft glow + particle field behind the constellation */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[100px]" />
      <ParticleField density={20000} maxCount={60} />

      {skillIcons.map(({ name, Icon, color }, i) => (
        <div
          key={name}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          className="absolute left-0 top-0 will-change-transform"
        >
          <div
            className="group flex flex-col items-center gap-1.5"
            title={name}
            style={{ "--brand": color } as CSSProperties}
          >
            <Icon
              className="text-3xl sm:text-4xl"
              style={{ color: "var(--brand)" }}
            />
            <span className="font-mono text-[9px] uppercase tracking-widest text-[color:var(--brand)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

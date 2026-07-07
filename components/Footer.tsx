export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-line/10 py-8">
      <p className="flex items-center justify-center gap-2 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-mute sm:text-xs">
        © {currentYear} Firas Rihan · All rights reserved
        <span className="relative flex h-2 w-2" aria-hidden>
          <span className="absolute inline-flex h-full w-full rounded-full bg-accent animate-pulseGlow" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
      </p>
    </footer>
  );
}

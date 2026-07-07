"use client";

export default function Marquee({
  items,
  reverse = false,
  className = "",
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={`flex w-max items-center whitespace-nowrap ${
          reverse ? "animate-marqueeRev" : "animate-marquee"
        }`}
        style={{ animationDuration: `${Math.max(items.length * 4, 24)}s` }}
      >
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center">
            <span className="px-6">{item}</span>
            <span aria-hidden className="text-accent">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

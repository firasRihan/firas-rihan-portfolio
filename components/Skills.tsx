"use client";

import { skillGroups } from "@/data/content";
import Marquee from "./Marquee";
import SectionHeading from "./SectionHeading";
import SkillsOrbit from "./SkillsOrbit";
import { skillIcons } from "./skillIcons";

/** Concept skills (no brand icons) feed the marquees, split into two rows. */
function conceptRows(): [string[], string[]] {
  const iconNames = new Set(
    skillIcons.map((s) => s.name.toLowerCase().replace(/[^a-z#]/g, ""))
  );
  const concepts = skillGroups
    .flatMap((g) => g.skills)
    .filter((s) => {
      const key = s.toLowerCase().replace(/[^a-z#]/g, "");
      return ![...iconNames].some((n) => key.includes(n) || n.includes(key));
    });
  const mid = Math.ceil(concepts.length / 2);
  return [concepts.slice(0, mid), concepts.slice(mid)];
}

export default function Skills() {
  const [rowA, rowB] = conceptRows();

  return (
    <section id="skills" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          eyebrow="TECH.CONSTELLATION"
          title="Skills"
          subtitle="Drag the constellation — every icon is a technology I ship with."
        />
      </div>

      <SkillsOrbit />

      {/* screen-reader friendly list (the orbit is decorative) */}
      <ul className="sr-only">
        {skillIcons.map((s) => (
          <li key={s.name}>{s.name}</li>
        ))}
        {[...rowA, ...rowB].map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>

      <div className="mt-14 space-y-4 border-y border-line/10 py-6">
        <Marquee
          items={rowA}
          className="font-mono text-xs uppercase tracking-[0.2em] text-mute"
        />
        <Marquee
          items={rowB}
          reverse
          className="font-mono text-xs uppercase tracking-[0.2em] text-body"
        />
      </div>
    </section>
  );
}

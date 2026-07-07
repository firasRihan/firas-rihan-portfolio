"use client";

import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { site } from "@/data/content";

const links = [
  { href: site.links.github, label: "GitHub", Icon: FaGithub },
  { href: site.links.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
  { href: site.links.email, label: "Email", Icon: HiOutlineMail },
  { href: site.links.whatsapp, label: "WhatsApp", Icon: FaWhatsapp },
];

export default function SocialLinks({ size = "md" }: { size?: "md" | "lg" }) {
  const box = size === "lg" ? "h-12 w-12 text-xl" : "h-10 w-10 text-lg";
  return (
    <div className="flex items-center gap-3">
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`${box} flex items-center justify-center rounded-full border border-line/15 text-body transition-all duration-300 hover:-translate-y-1 hover:border-accent/70 hover:text-accent hover:shadow-glow-sm`}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}

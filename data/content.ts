export type ProjectCategory =
  | "Enterprise"
  | "Freelance"
  | "Personal & Research";

export interface Project {
  title: string;
  description: string;
  tech: string[];
  category: ProjectCategory;
  proprietary: boolean;
}

export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  compact?: boolean;
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const site = {
  name: "FIRAS RIHAN",
  role: "Senior Full-Stack Engineer · Technical Lead · Product & Platform",
  tagline:
    "I build and lead development of business-critical retail platforms used daily across 6,000+ U.S. retail stores.",
  location: "Beirut, Lebanon · Working remotely worldwide",
  email: "firas.s.rihan@gmail.com",
  phone: "+961 71 379 253",
  links: {
    github: "https://github.com/firasRihan",
    linkedin: "https://linkedin.com/in/firas-rihan",
    email: "mailto:firas.s.rihan@gmail.com",
    whatsapp: "https://wa.me/96171379253",
    resume: "/firas-rihan-resume.pdf",
  },
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const about = {
  paragraphs: [
    "Senior full-stack engineer with 5+ years of experience delivering production systems. Currently technical lead for a business-critical retail-operations platform used daily by staff across 6,000+ U.S. retail locations (Metro by T-Mobile), supporting inventory, ERP, point-of-sale, and back-office operations.",
    "Entrusted with Realtime's flagship platforms, an engagement reserved for the company's most experienced engineers. Known for shipping exceptionally clean, thoroughly tested code with near-zero QA rejections, and for solving time-critical production issues others couldn't.",
    "Self-built engineer from the pre-AI era who now leverages AI tooling (Claude Code, Copilot) to multiply productivity.",
  ],
};

export const stats: Stat[] = [
  { value: 6, suffix: "+", label: "Years Experience" },
  { value: 15, suffix: "+", label: "Projects Shipped" },
  {
    value: 6000,
    suffix: "+",
    label: "U.S. Retail Stores Powered by Our Platforms",
  },
];

export const experience: ExperienceEntry[] = [
  {
    role: "L3 Senior Software Engineer · Technical Lead · Product & Platform",
    company:
      "Realtime — Metro by T-Mobile Retail Technology Partner (via Acksession LLC)",
    location: "Remote",
    period: "2024 – Present",
    bullets: [
      "Acting technical lead for the Client Support system (Angular + .NET), the most feature-rich platform in Realtime's product suite, used daily to support T-Mobile retail store staff nationwide across inventory, back-office, and POS systems",
      "Primary technical point of contact with business stakeholders; owns architecture and delivery decisions end-to-end, guiding code quality and technical direction for the team",
      "Introduced Clean Architecture into the Client Support system; migrated legacy systems (call review & scoring, reporting) into it",
      "Automated manual daily operations and reports into Azure Functions",
      "Stabilized Backoffice (Razor + .NET inventory system used by 6,000+ stores): resolved hundreds of bugs including time-critical production incidents",
      "Contributed to RTGO, Realtime's next-generation POS/inventory platform (.NET + Vue.js, DDD, modular monolith, CQRS)",
      "Recognized multiple times as Employee of the Month for delivering high-impact features critical to daily store operations",
    ],
  },
  {
    role: "L3 Senior Full-Stack Engineer",
    company: "Acksession LLC",
    location: "Remote (Florida, U.S.)",
    period: "2022 – Present",
    bullets: [
      "Designs and builds full-stack applications end-to-end (React/Next.js/Angular; ASP.NET Core & Node.js) across inventory, ERP, POS, e-commerce, and municipal billing domains",
      "Delivered: Solvit (multi-tenant medical platform, MENA region, web + app), Green Horizon (municipal resident-mapping & billing platform — bills 2,000 residents monthly, sole PM & dev), full POS suite (storefront, admin portal, e-commerce, image service), Queueing System, BluWater client site, BlueSeed ERP",
      "Built identity & access management for an ERP platform (ERP-IAM); designed RESTful APIs; worked across AWS (ECS, Amplify, RDS, Cognito, Secrets Manager)",
    ],
  },
  {
    role: "Software Engineering Department Manager & Full-Stack Developer",
    company: "CST-LB",
    location: "Beirut, Lebanon (On-site)",
    period: "2021 – Dec 2022",
    bullets: [
      "Managed the software engineering department while remaining hands-on",
      "Sole PM & developer on 3 full products in one year: company public website (Next.js/Node.js/MySQL), a fully interactive Industrial Map of Lebanon (React, Node.js, Leaflet.js, MySQL — every industry mapped with editable data via admin panel), and a dental-care e-commerce store (Next.js/Node.js)",
    ],
  },
  {
    role: "Full-Stack Development Intern",
    company: "White Stork",
    location: "Beirut, Lebanon",
    period: "Jun – Sep 2021",
    bullets: [],
    compact: true,
  },
  {
    role: "Front-End Web Development Intern",
    company: "WE",
    location: "Beirut, Lebanon",
    period: "Jun – Sep 2019",
    bullets: [],
    compact: true,
  },
];

export const projectCategories: Array<"All" | ProjectCategory> = [
  "All",
  "Enterprise",
  "Freelance",
  "Personal & Research",
];

export const projects: Project[] = [
  {
    title: "RT Client Support",
    description:
      "Technical lead & development owner of Realtime's most feature-rich platform — supporting T-Mobile retail store staff nationwide.",
    tech: ["Angular", ".NET", "Azure", "Clean Architecture"],
    category: "Enterprise",
    proprietary: true,
  },
  {
    title: "RTGO",
    description:
      "Realtime's next-generation POS & inventory platform, built to retire the legacy product suite.",
    tech: ["Vue.js", ".NET", "DDD", "CQRS", "Modular Monolith"],
    category: "Enterprise",
    proprietary: true,
  },
  {
    title: "Backoffice",
    description:
      "Mid-legacy full inventory system used daily by 6,000+ U.S. stores — stabilized through hundreds of fixes, including time-critical production incidents.",
    tech: ["Razor", ".NET", "SQL"],
    category: "Enterprise",
    proprietary: true,
  },
  {
    title: "Green Horizon",
    description:
      "Municipal resident-mapping & billing platform — bills 2,000 residents monthly. Sole PM & developer.",
    tech: ["React.ts", "Node.ts", "MySQL"],
    category: "Enterprise",
    proprietary: true,
  },
  {
    title: "Solvit",
    description:
      "Multi-tenant medical platform serving the MENA region, running as both web and mobile app.",
    tech: ["React", ".NET Core", "MySQL"],
    category: "Enterprise",
    proprietary: true,
  },
  {
    title: "BlueSeed ERP",
    description:
      "Full-scale ERP platform covering core business operations end-to-end.",
    tech: ["React.ts", "ASP.NET Core", "MySQL"],
    category: "Enterprise",
    proprietary: true,
  },
  {
    title: "ERP-IAM",
    description:
      "Identity & access management layer for an ERP platform, built on AWS infrastructure.",
    tech: ["React.ts", "ASP.NET Core", "AWS", "MySQL"],
    category: "Enterprise",
    proprietary: true,
  },
  {
    title: "POS Suite",
    description:
      "Complete point-of-sale ecosystem: storefront, admin portal, e-commerce, and image service.",
    tech: ["React.ts", "Node.ts", "MySQL", "Firebase"],
    category: "Enterprise",
    proprietary: true,
  },
  {
    title: "Queueing System",
    description:
      "Customer queueing and flow-management system built end-to-end.",
    tech: ["React.ts", "Node.ts", "MySQL"],
    category: "Enterprise",
    proprietary: true,
  },
  {
    title: "Industrial Map of Lebanon",
    description:
      "Fully interactive map of every industry in Lebanon — type, owner, contacts — all editable via admin panel, placed directly on the map.",
    tech: ["React.js", "Node.js", "Leaflet.js", "MySQL"],
    category: "Enterprise",
    proprietary: true,
  },
  {
    title: "Dental Care E-commerce",
    description: "E-commerce store for dental-care products, built end-to-end.",
    tech: ["Next.ts", "Node.ts"],
    category: "Enterprise",
    proprietary: true,
  },
  {
    title: "BluWater",
    description:
      "Client company website — designed, built, and delivered solo.",
    tech: ["React.ts"],
    category: "Enterprise",
    proprietary: true,
  },
  {
    title: "Alam Printing Press Online Shop",
    description:
      "Freelance online shop — frontend, backend, hosting, and design all delivered solo.",
    tech: ["Next.ts", "Node.ts"],
    category: "Freelance",
    proprietary: false,
  },
  {
    title: "TMA Core",
    description:
      "Multi-tenant business intelligence & restaurant management platform, built end-to-end.",
    tech: ["React.js", "Node.js"],
    category: "Freelance",
    proprietary: false,
  },
  {
    title: "Moon Battle — Logic Puzzle Engine",
    description:
      "From-scratch puzzle generator & solver: region-growing generation, seeded PRNG (mulberry32), dual-solver architecture pairing a brute-force uniqueness verifier with a human-logic solver, automatic difficulty classification, and a stateless hint system.",
    tech: ["TypeScript", "Algorithms"],
    category: "Personal & Research",
    proprietary: false,
  },
  {
    title: "Smart Irrigation System",
    description:
      "IoT irrigation system controlled through a Telegram bot, built during university.",
    tech: ["Telegram Bot", "Node.js", "Arduino C++", "IoT"],
    category: "Personal & Research",
    proprietary: false,
  },
];

export const skillGroups: SkillGroup[] = [
  { title: "Languages", skills: ["JavaScript", "TypeScript", "C#"] },
  {
    title: "Frontend",
    skills: [
      "React.js",
      "Next.js",
      "Angular",
      "Vue.js",
      "React Native",
      "Razor",
      "Material UI",
      "Ant Design",
      "Bootstrap",
      "Tailwind",
    ],
  },
  {
    title: "Backend",
    skills: [
      "ASP.NET Core",
      "Node.js (Express)",
      "RESTful APIs",
      "GraphQL",
      "MVC",
    ],
  },
  {
    title: "Architecture",
    skills: [
      "Clean Architecture",
      "DDD",
      "CQRS",
      "Modular Monolith",
      "Microservices",
      "Multitenancy",
      "RabbitMQ",
      "AWS SQS",
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      "Azure Functions",
      "Azure App Services",
      "Azure Insights",
      "Azure Key Vault",
      "AWS ECS",
      "AWS S3",
      "AWS Amplify",
      "AWS RDS",
      "AWS Cognito",
      "AWS Secrets Manager",
      "Docker",
      "CI/CD",
      "Datadog",
      "Firebase",
    ],
  },
  { title: "Data", skills: ["SQL (MySQL)", "NoSQL"] },
  { title: "Testing", skills: ["Cypress.js", "Jest", "xUnit"] },
  {
    title: "AI-Augmented Workflow",
    skills: ["Claude Code", "GitHub Copilot", "ChatGPT", "Gemini"],
  },
];

export const education = [
  {
    degree: "M.Sc., Computer and Communication Engineering",
    school: "Lebanese International University",
    date: "June 2023",
    honors: "Honors Graduate — GPA 3.23/4",
  },
  {
    degree: "B.Sc., Computer and Communication Engineering",
    school: "Lebanese International University",
    date: "June 2021",
    honors: "President's Honors with Distinction — GPA 3.78/4",
  },
];

export const research = {
  title:
    "Achieving Higher Accuracy in Biometric Authentication with Multimodal Techniques",
  description:
    "Master's thesis — published as a journal paper and presented at the ACTEA 2023 conference to an audience of PhDs and professors.",
  link: "https://www.researchgate.net/publication/372866568_Achieving_Higher_Accuracy_in_Biometric_Authentication_with_Multimodal_Techniques",
};

export const spokenLanguages = [
  "English (Bilingual)",
  "Arabic (Native)",
  "French (Conversational)",
];

export const contact = {
  heading: "Let's Build Something Together",
  line: "Open to senior engineering and technical-lead opportunities — fully remote.",
};

import type { IconType } from "react-icons";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiVuedotjs,
  SiNodedotjs,
  SiExpress,
  SiDotnet,
  SiTailwindcss,
  SiBootstrap,
  SiMui,
  SiAntdesign,
  SiGraphql,
  SiMysql,
  SiDocker,
  SiFirebase,
  SiRabbitmq,
  SiDatadog,
  SiJest,
  SiCypress,
  SiLeaflet,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import { TbBrandCSharp } from "react-icons/tb";

export interface SkillIcon {
  name: string;
  Icon: IconType;
  /**
   * Official brand color, shown on hover. Brands whose official color is
   * black (Next.js, Express) use white so they stay visible on the dark bg.
   */
  color: string;
}

/** The technologies orbiting in the skills constellation. */
export const skillIcons: SkillIcon[] = [
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "C#", Icon: TbBrandCSharp, color: "#A179DC" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "Angular", Icon: SiAngular, color: "#DD0031" },
  { name: "Vue.js", Icon: SiVuedotjs, color: "#42B883" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Express", Icon: SiExpress, color: "#FFFFFF" },
  { name: ".NET", Icon: SiDotnet, color: "#512BD4" },
  { name: "Azure", Icon: VscAzure, color: "#0078D4" },
  { name: "AWS", Icon: FaAws, color: "#FF9900" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
  { name: "GraphQL", Icon: SiGraphql, color: "#E10098" },
  { name: "Firebase", Icon: SiFirebase, color: "#FFCA28" },
  { name: "RabbitMQ", Icon: SiRabbitmq, color: "#FF6600" },
  { name: "Datadog", Icon: SiDatadog, color: "#8C5EDC" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Bootstrap", Icon: SiBootstrap, color: "#7952B3" },
  { name: "Material UI", Icon: SiMui, color: "#007FFF" },
  { name: "Ant Design", Icon: SiAntdesign, color: "#0170FE" },
  { name: "Jest", Icon: SiJest, color: "#C21325" },
  { name: "Cypress", Icon: SiCypress, color: "#69D3A7" },
  { name: "Leaflet", Icon: SiLeaflet, color: "#8ED14B" },
];

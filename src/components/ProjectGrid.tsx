import { Building2, CheckCircle2, CircleDot, HardHat, MapPin } from "lucide-react";
import MotionCard from "@/components/motion/MotionCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

type Project = {
  no: number;
  name: string;
  client: string;
  contractor: string;
  description: string;
  location: string;
};

type ProjectGridProps = {
  projects: Project[];
  status: "ongoing" | "completed";
};

export default function ProjectGrid({ projects, status }: ProjectGridProps) {
  const isOngoing = status === "ongoing";

  const isCenteredOrphan =
    projects.length % 3 === 1 && projects.length > 3;

  return (
    <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => (
        <RevealItem
          key={project.no}
          className={
            isCenteredOrphan && i === projects.length - 1
              ? "sm:col-start-1 lg:col-start-2"
              : undefined
          }
        >
          <MotionCard className="surface-card flex h-full flex-col p-7">
            <div className="mb-5 flex items-center justify-between">
              <span className="font-display text-3xl font-bold text-border-soft">
                {String(project.no).padStart(2, "0")}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold tracking-wide uppercase ${
                  isOngoing ? "bg-accent/10 text-accent-dark" : "bg-ink/5 text-ink"
                }`}
              >
                {isOngoing ? (
                  <CircleDot className="h-3 w-3" />
                ) : (
                  <CheckCircle2 className="h-3 w-3" />
                )}
                {isOngoing ? "In Progress" : "Completed"}
              </span>
            </div>

            <h3 className="mb-4 font-display text-[16px] leading-snug font-bold text-ink uppercase">
              {project.name}
            </h3>

            <p className="mb-5 flex-1 text-[13px] leading-relaxed text-slate">
              {project.description}
            </p>

            <div className="space-y-2 border-t border-border-soft pt-4 text-[13px] text-slate">
              <div className="flex items-center gap-2.5">
                <Building2 className="h-4 w-4 shrink-0 text-accent" />
                <span>{project.client}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <HardHat className="h-4 w-4 shrink-0 text-accent" />
                <span>{project.contractor}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-accent" />
                <span>{project.location}</span>
              </div>
            </div>
          </MotionCard>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

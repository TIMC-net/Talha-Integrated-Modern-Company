"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Calendar,
  CircleDot,
  Layers,
  MapPin,
  Banknote,
  ArrowUpRight,
  ChevronUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import type { ListedProject } from "@/lib/company";
import { listedProjectImage } from "@/lib/project-media";
import { cn } from "@/lib/cn";
import { useStableInsetHover } from "@/hooks/useStableInsetHover";

type ProjectGridProps = {
  projects: ListedProject[];
  status: "ongoing" | "completed";
};

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

function formatSar(amount: number) {
  return new Intl.NumberFormat("en-SA", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function ProjectMeta({
  project,
  status,
}: {
  project: ListedProject;
  status: "ongoing" | "completed";
}) {
  const sponsorOrClient = project.sponsor || project.client;

  return (
    <div className="space-y-2 text-[12px] text-[#ffffff]/90 drop-shadow-sm sm:text-[13px]">
      {sponsorOrClient ? (
        <div className="flex items-start gap-2.5">
          <Building2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
          <span>
            <span className="text-[#ffffff]/60">
              {project.sponsor ? "Sponsor: " : "Client: "}
            </span>
            {sponsorOrClient}
          </span>
        </div>
      ) : null}
      {status === "completed" && project.description ? (
        <div className="flex items-start gap-2.5">
          <Layers className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
          <span>
            <span className="text-[#ffffff]/60">Category: </span>
            {project.description}
          </span>
        </div>
      ) : null}
      <div className="flex items-center gap-2.5">
        <MapPin className="h-3.5 w-3.5 shrink-0 text-accent" />
        <span>{project.location}</span>
      </div>
      {typeof project.contractAmount === "number" && (
        <div className="flex items-center gap-2.5">
          <Banknote className="h-3.5 w-3.5 shrink-0 text-accent" />
          <span>
            <span className="text-[#ffffff]/60">Contract: </span>
            {formatSar(project.contractAmount)}
          </span>
        </div>
      )}
      {project.endDate && (
        <div className="flex items-center gap-2.5">
          <Calendar className="h-3.5 w-3.5 shrink-0 text-accent" />
          <span>
            <span className="text-[#ffffff]/60">End of contract: </span>
            {project.endDate}
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * TIMC package — image-first project card (ongoing + completed):
 * default: photo + index + one-line title
 * hover (desktop) or tap (touch): frosted panel + staggered details
 * optional details link opens full project page
 */
function ProjectHoverCard({
  project,
  image,
  status,
  isDimmed,
  onHoverChange,
  onOpenChange,
}: {
  project: ListedProject;
  image: string;
  status: "ongoing" | "completed";
  isDimmed: boolean;
  onHoverChange: (active: boolean) => void;
  onOpenChange: (open: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const isOngoing = status === "ongoing";
  const detailsHref = project.details
    ? `/projects/${status}/${project.no}`
    : null;

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => {
      setCanHover(mq.matches);
      if (mq.matches) setOpen(false);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (canHover) return;
    onOpenChange(open);
    return () => onOpenChange(false);
  }, [canHover, open, onOpenChange]);

  const {
    ref: hoverRef,
    active: hot,
    handlers: hoverHandlers,
  } = useStableInsetHover<HTMLElement>({
    enabled: canHover,
    inset: 12,
    bottomInset: 18,
    enterDelay: 90,
    leaveDelay: 160,
    onChange: onHoverChange,
  });

  // Desktop hot OR mobile tap panel
  const panelOpen = canHover ? hot : open;

  return (
    <article
      ref={hoverRef}
      tabIndex={canHover ? -1 : 0}
      role={canHover ? undefined : "button"}
      aria-expanded={canHover ? undefined : open}
      aria-label={
        canHover
          ? undefined
          : `${project.name}. ${open ? "Tap to close details" : "Tap for details"}`
      }
      onClick={() => {
        if (!canHover) setOpen((v) => !v);
      }}
      onKeyDown={(e) => {
        if (canHover) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen((v) => !v);
        }
      }}
      {...(canHover ? hoverHandlers : {})}
      className={cn(
        "group relative aspect-[4/5] w-full cursor-pointer overflow-hidden border border-white/12 bg-[#111]",
        "outline-none transition-[transform,border-color,box-shadow,opacity] duration-500",
        EASE,
        "focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/40",
        panelOpen &&
          "-translate-y-1.5 border-accent/55 shadow-[0_32px_60px_-28px_rgba(255,107,53,0.5)]",
        !panelOpen && canHover === false && "data-[open=true]:-translate-y-1",
        isDimmed && "opacity-45",
      )}
      data-hot={panelOpen ? "true" : undefined}
      data-open={!canHover && open ? "true" : undefined}
    >
      <div
        className={cn(
          "absolute inset-0 transition-transform duration-[900ms]",
          EASE,
          panelOpen && "scale-105",
        )}
      >
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover object-center"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent",
          "transition-opacity duration-500",
          panelOpen && "opacity-90",
        )}
      />

      <span
        aria-hidden
        className={cn(
          "absolute top-0 bottom-0 left-0 z-20 w-[2px] origin-bottom scale-y-0 bg-accent",
          "transition-transform duration-500",
          EASE,
          panelOpen && "scale-y-100",
        )}
      />

      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 z-10 px-5 pb-5 pt-20",
          "bg-gradient-to-t from-black/65 via-black/25 to-transparent",
          "transition-all duration-500",
          EASE,
          panelOpen && "translate-y-4 opacity-0",
        )}
      >
        <p className="line-clamp-2 font-display text-[15px] leading-snug font-bold tracking-wide text-[#ffffff] uppercase drop-shadow-md sm:text-[16px]">
          {project.name}
        </p>
        {!canHover && !open ? (
          <p className="mt-2 flex items-center gap-1 font-display text-[10px] font-semibold tracking-[0.14em] text-accent uppercase">
            Tap for details
            <ChevronUp className="h-3 w-3" />
          </p>
        ) : null}
      </div>

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 z-20 flex max-h-[72%] flex-col sm:max-h-[68%]",
          "border-t border-[rgba(255,255,255,0.22)]",
          "bg-[rgba(12,12,12,0.92)]",
          "shadow-[0_-16px_40px_rgba(0,0,0,0.18)]",
          "transition-transform duration-500",
          EASE,
          canHover && "translate-y-[105%]",
          canHover && panelOpen && "translate-y-0 bg-[rgba(12,12,12,0.78)] backdrop-blur-md",
          !canHover && !open && "translate-y-[105%]",
          !canHover && open && "translate-y-0 backdrop-blur-md bg-[rgba(12,12,12,0.78)]",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "absolute top-0 left-0 z-10 h-[2px] w-full origin-left scale-x-0 bg-accent",
            "transition-transform duration-500 delay-75",
            EASE,
            panelOpen && "scale-x-100",
          )}
        />

        <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-5 pb-2 sm:px-6 sm:pt-6">
          {isOngoing ? (
            <div
              className={cn(
                "stagger-item flex flex-wrap items-center gap-2",
                "transition-all duration-500",
                EASE,
                canHover && !panelOpen && "translate-y-3 opacity-0",
                panelOpen && "translate-y-0 opacity-100 delay-100",
              )}
            >
              <span className="inline-flex items-center gap-1 border border-accent/70 bg-accent/15 px-2 py-0.5 font-display text-[10px] font-bold tracking-[0.12em] text-accent uppercase backdrop-blur-sm">
                <CircleDot className="h-3 w-3" strokeWidth={2.25} />
                In Progress
              </span>
              <span className="font-display text-[10px] font-semibold tracking-[0.16em] text-[#ffffff]/70 uppercase">
                {project.description}
              </span>
            </div>
          ) : null}

          <h3
            className={cn(
              "font-display text-[15px] leading-snug font-bold text-[#ffffff] uppercase drop-shadow-md sm:text-[16px]",
              isOngoing ? "mt-2.5" : "mt-0",
              "transition-all duration-500",
              EASE,
              canHover && !panelOpen && "translate-y-3 opacity-0",
              panelOpen && "translate-y-0 opacity-100 delay-150",
            )}
          >
            {project.name}
          </h3>

          {project.scope ? (
            <p
              className={cn(
                "mt-2 line-clamp-2 text-[13px] leading-relaxed text-[#ffffff]/82 drop-shadow-sm",
                "transition-all duration-500",
                EASE,
                canHover && !panelOpen && "translate-y-3 opacity-0",
                panelOpen && "translate-y-0 opacity-100 delay-200",
              )}
            >
              {project.scope}
            </p>
          ) : null}

          <div
            className={cn(
              "mt-3 border-t border-white/18 pt-3",
              "transition-all duration-500",
              EASE,
              canHover && !panelOpen && "translate-y-3 opacity-0",
              panelOpen && "translate-y-0 opacity-100 delay-250",
            )}
          >
            <ProjectMeta project={project} status={status} />
          </div>
        </div>

        {detailsHref ? (
          <div className="relative z-10 shrink-0 px-5 pb-4 pt-1 sm:px-6 sm:pb-5">
            <Button
              asChild
              size="sm"
              className="w-full text-[11px] tracking-[0.12em]"
            >
              <Link href={detailsHref} onClick={(e) => e.stopPropagation()}>
                View full details
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function ProjectGrid({ projects, status }: ProjectGridProps) {
  const centerLastOnDesktop =
    projects.length % 3 === 1 && projects.length > 3;
  const [hoveredNo, setHoveredNo] = useState<number | null>(null);
  const [openNo, setOpenNo] = useState<number | null>(null);

  const chromeBlocked = hoveredNo !== null || openNo !== null;

  useEffect(() => {
    if (!chromeBlocked) return;
    document.documentElement.setAttribute("data-project-panel-open", "");
    return () => {
      document.documentElement.removeAttribute("data-project-panel-open");
    };
  }, [chromeBlocked]);

  return (
    <RevealGroup
      immediate
      className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
    >
      {projects.map((project, i) => {
        const image = listedProjectImage(project, i);
        const isLastOrphan =
          centerLastOnDesktop && i === projects.length - 1;

        return (
          <RevealItem
            key={`${status}-${project.no}`}
            className={isLastOrphan ? "lg:col-start-2" : undefined}
          >
            <ProjectHoverCard
              project={project}
              image={image}
              status={status}
              isDimmed={hoveredNo !== null && hoveredNo !== project.no}
              onHoverChange={(active) =>
                setHoveredNo(active ? project.no : null)
              }
              onOpenChange={(open) =>
                setOpenNo(open ? project.no : null)
              }
            />
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}

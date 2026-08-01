import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getService } from "@/data/services";
import type { Project } from "@/data/projects";

export default function PortfolioCard({ project }: { project: Project }) {
  const service = getService(project.service);

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      data-media
      className="group relative block aspect-video overflow-hidden"
    >
      <Image
        src={project.imageUrl}
        alt={project.title}
        fill
        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
        className="object-cover object-center transition duration-700 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/35 to-navy-950/10" />

      <span className="absolute top-4 right-4 bg-navy-950/80 px-2 py-1 text-[9px] font-semibold tracking-wide text-accent uppercase">
        Photo pending
      </span>

      {service && (
        <span className="absolute top-4 left-4 bg-accent px-3 py-1.5 font-display text-[11px] font-bold tracking-wide text-navy-950 uppercase">
          {service.name}
        </span>
      )}

      <div className="absolute right-4 bottom-4 left-4 text-white transition duration-500 [@media(hover:hover)_and_(pointer:fine)]:translate-y-2 [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-y-0">
        <h3 className="font-display text-lg font-bold uppercase">{project.title}</h3>
        <p className="mt-1 text-[13px] text-white/70">{project.location}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 font-display text-[12px] font-bold tracking-wide text-accent-light uppercase transition [@media(hover:hover)_and_(pointer:fine)]:group-hover:gap-2.5">
          View Project <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

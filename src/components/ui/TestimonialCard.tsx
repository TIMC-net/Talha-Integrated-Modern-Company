import { Star } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";

export default function TestimonialCard({
  testimonial,
  onDark = false,
}: {
  testimonial: Testimonial;
  onDark?: boolean;
}) {
  return (
    <div
      className={`flex h-full flex-col border p-6 ${
        onDark
          ? "border-white/10 bg-navy-900"
          : "border-border-soft bg-white"
      }`}
    >
      <div
        className="mb-4 flex items-center gap-1 text-accent"
        role="img"
        aria-label={`${testimonial.rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4"
            fill={i < testimonial.rating ? "currentColor" : "none"}
          />
        ))}
      </div>

      <p
        className={`flex-1 text-[15px] leading-relaxed ${
          onDark ? "text-white/65" : "text-slate"
        }`}
      >
        &ldquo;{testimonial.testimonialText}&rdquo;
      </p>

      <div
        className={`mt-6 border-t pt-4 ${
          onDark ? "border-white/10" : "border-border-soft"
        }`}
      >
        <p
          className={`font-display text-[14px] font-bold uppercase ${
            onDark ? "text-white" : "text-ink"
          }`}
        >
          {testimonial.clientName}
        </p>
        <p className={`text-[13px] ${onDark ? "text-white/50" : "text-slate"}`}>
          {testimonial.company}
        </p>
        <span
          className={`mt-2 inline-block px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase ${
            onDark
              ? "bg-accent/15 text-accent"
              : "bg-paper text-accent-dark"
          }`}
        >
          {testimonial.service}
        </span>
      </div>
    </div>
  );
}

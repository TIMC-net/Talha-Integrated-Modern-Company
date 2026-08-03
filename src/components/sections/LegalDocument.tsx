import Link from "next/link";

export type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

type LegalDocumentProps = {
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
  contactNote?: string;
};

export default function LegalDocument({
  lastUpdated,
  intro,
  sections,
  contactNote,
}: LegalDocumentProps) {
  return (
    <section data-dark-surface className="bg-navy-950 py-14 md:py-20">
      <div className="container-site max-w-3xl">
        <p className="font-display text-[12px] font-semibold tracking-[2px] text-accent uppercase">
          Last updated: {lastUpdated}
        </p>
        <p className="mt-5 text-[15px] leading-relaxed text-white/65 md:text-[16px]">
          {intro}
        </p>

        <div className="mt-10 space-y-10">
          {sections.map((section, index) => (
            <article key={section.title}>
              <h2 className="font-display text-lg font-bold tracking-wide text-white uppercase md:text-xl">
                <span className="mr-2 text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {section.title}
              </h2>
              <div className="mt-4 space-y-3 text-[14px] leading-relaxed text-white/60 md:text-[15px]">
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-accent">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>

        {contactNote && (
          <p className="mt-12 border-t border-white/10 pt-8 text-[14px] leading-relaxed text-white/55">
            {contactNote}{" "}
            <Link href="/contact" className="text-accent transition hover:text-accent-light">
              Contact Us
            </Link>
            .
          </p>
        )}
      </div>
    </section>
  );
}

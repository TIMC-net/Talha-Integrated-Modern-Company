import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ClientsSection from "@/components/sections/ClientsSection";
import CTASection from "@/components/sections/CTASection";

export default function NotFound() {
  return (
    <>
      <section
        data-dark-surface
        data-media
        className="relative overflow-x-clip bg-navy-950 sm:flex sm:h-[74svh] sm:min-h-[560px] sm:items-center sm:overflow-hidden"
      >
        <div className="relative w-full sm:absolute sm:inset-0">
          <div className="relative aspect-[21/10] w-full overflow-hidden sm:absolute sm:inset-0 sm:aspect-auto sm:h-full">
            <Image
              src="/images/broken-crane-v6.webp"
              alt=""
              fill
              priority
              quality={90}
              className="object-cover object-center"
              sizes="100vw"
            />
            <div
              aria-hidden
              className="absolute inset-0 hidden bg-[linear-gradient(180deg,rgba(10,12,16,0.28)_0%,rgba(10,12,16,0.10)_45%,rgba(10,12,16,0.36)_100%)] sm:block"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 hidden ring-1 ring-inset ring-white/10 sm:block"
            />
          </div>
        </div>

        <div className="container-site relative z-10 flex w-full justify-center px-4 pt-8 pb-14 sm:pt-[128px] sm:pb-20">
          <div className="relative w-full max-w-2xl border border-white/15 bg-navy-950 px-6 py-10 text-center sm:bg-[rgba(16,18,22,0.72)] sm:px-12 sm:py-14 sm:backdrop-blur-[2px]">
            <span
              aria-hidden
              className="absolute top-0 left-1/2 h-[3px] w-16 -translate-x-1/2 bg-accent"
            />
            <p className="font-display text-[11px] font-semibold tracking-[0.28em] text-accent uppercase">
              Page not found
            </p>
            <h1 className="mt-4 font-display text-[28px] font-bold leading-[1.15] text-white uppercase sm:text-4xl 2xl:text-[44px]">
              The requested page is unavailable
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-[15px] leading-[1.75] text-white/78 md:text-[16px]">
              We could not locate this address on the current TIMC website. The
              page may have been moved, renamed, or withdrawn during our recent
              site update. Please continue from the links below, or contact our
              Jeddah headquarters if you require assistance.
            </p>
            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Button asChild>
                <Link href="/">Return home</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/services">Our services</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">Contact office</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ClientsSection lite />
      <CTASection />
    </>
  );
}

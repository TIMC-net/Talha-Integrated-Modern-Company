import Image from "next/image";
import { Briefcase, HardHat, TrendingUp, Users } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import WhoWeAreTabs from "@/components/WhoWeAreTabs";
import Counter from "@/components/motion/Counter";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import {
  clients,
  company,
  completedProjects,
  navLinks,
  ongoingProjects,
} from "@/lib/company";

const serviceCount =
  navLinks.find((item) => item.label === "SERVICES")?.children?.length ?? 0;
const yearsActive = new Date().getFullYear() - Number(company.established);
const projectCount = completedProjects.length + ongoingProjects.length;

const stats = [
  { icon: TrendingUp, value: yearsActive, suffix: "+", label: "Years in Business" },
  { icon: HardHat, value: serviceCount, suffix: "", label: "Service Divisions" },
  { icon: Briefcase, value: projectCount, suffix: "+", label: "Projects Delivered" },
  { icon: Users, value: clients.length, suffix: "+", label: "Valued Clients" },
];

export default function AboutPage() {
  return (
    <>
      <PageBanner
        title="About Us"
        backgroundImage="/images/about-us-bg.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="container-site">
          <Reveal>
            <span className="section-eyebrow mb-4">Introduction</span>
            <h2 className="section-heading mb-10 text-2xl md:text-[30px]">
              Building Saudi Arabia&rsquo;s Industrial Future
            </h2>
          </Reveal>

          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-7">
              <div className="space-y-5 text-[14px] leading-[1.85] text-slate">
                <p>
                  {company.shortName} was established in {company.established} as a
                  contracting establishment, a Saudi owned company. We are a team of
                  technically qualified engineers, from different parts of the world.
                </p>
                <p>
                  Our main business is directed towards electrical, civil construction,
                  mechanical erection and also in the areas of the oil refineries,
                  petrochemical plants, dewatering services, steel plants, and fertilizer
                  plants.
                </p>
                <p>
                  Our aim is to provide high quality services to our clients with high
                  quality inspection procedures. We have a good expertise in heavy
                  industrial projects who are well qualified professionals. We are now
                  expanding our services by improving the quality in the industrial area
                  day by day.
                </p>
                <p>
                  {company.shortName} has a health and safety program taken to avoid any
                  kind of accidents on the job site. It is due to the safety and health
                  measures of the employees and the protection of the environment.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-5 -mt-4 lg:-mt-8">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src="/images/about-us-img.jpg"
                  alt="Construction site with crane and concrete works"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  priority
                />
              </div>
            </Reveal>
          </div>

          <RevealGroup className="mt-16 grid grid-cols-2 gap-6 border-t border-border-soft pt-12 md:grid-cols-4">
            {stats.map(({ icon: Icon, value, suffix, label }) => (
              <RevealItem key={label} className="text-center">
                <Icon className="mx-auto mb-3 h-6 w-6 text-accent" />
                <div className="font-display text-3xl font-bold text-ink md:text-4xl">
                  <Counter value={value} suffix={suffix} />
                </div>
                <p className="mt-2 text-[12px] font-semibold tracking-wide text-slate uppercase">
                  {label}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <WhoWeAreTabs />
    </>
  );
}

import ServiceLayout from "@/components/ServiceLayout";
import { servicesContent } from "@/lib/company";

export default function CivilPage() {
  const s = servicesContent.civil;

  return (
    <ServiceLayout
      title={s.title}
      breadcrumb={s.breadcrumb}
      bannerImage={s.bannerImage}
      image={s.image}
      imageAlt="Civil construction site with crane and scaffolding"
    >
      <p>{s.body.join(" ")}</p>
    </ServiceLayout>
  );
}

import ServiceLayout from "@/components/ServiceLayout";
import { servicesContent } from "@/lib/company";

export default function ScaffoldingPage() {
  const s = servicesContent.scaffolding;

  return (
    <ServiceLayout
      title={s.title}
      breadcrumb={s.breadcrumb}
      bannerImage={s.bannerImage}
      image={s.image}
      imageAlt="Scaffolding works at construction site"
    >
      <p>{s.body.join(" ")}</p>
    </ServiceLayout>
  );
}

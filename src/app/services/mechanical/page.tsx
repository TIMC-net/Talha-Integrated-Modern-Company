import ServiceLayout from "@/components/ServiceLayout";
import { servicesContent } from "@/lib/company";

export default function MechanicalPage() {
  const s = servicesContent.mechanical;

  return (
    <ServiceLayout
      title={s.title}
      breadcrumb={s.breadcrumb}
      bannerImage={s.bannerImage}
      image={s.image}
      imageAlt="Mechanical division professionals at work"
    >
      <p>{s.body.join(" ")}</p>
    </ServiceLayout>
  );
}

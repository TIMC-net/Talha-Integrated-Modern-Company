import ServiceLayout from "@/components/ServiceLayout";
import { servicesContent } from "@/lib/company";

export default function ManpowerPage() {
  const s = servicesContent.manpower;

  return (
    <ServiceLayout
      title={s.title}
      breadcrumb={s.breadcrumb}
      bannerImage={s.bannerImage}
      image={s.image}
      imageAlt="Manpower supply professional with safety equipment"
      listItems={s.listItems}
    >
      {s.body.map((p) => (
        <p key={p.slice(0, 48)}>{p}</p>
      ))}
    </ServiceLayout>
  );
}

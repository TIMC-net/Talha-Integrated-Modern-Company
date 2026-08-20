import { organizationJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export default function OrganizationJsonLd() {
  return <JsonLd data={organizationJsonLd()} />;
}

import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import LegalDocument from "@/components/sections/LegalDocument";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: `Terms of Use | ${company.shortName}`,
  description:
    "Terms governing use of the Talha Integrated Modern Company website and general conditions applicable to online enquiries.",
};

export default function TermsOfUsePage() {
  return (
    <>
      <PageBanner
        title="Terms of Use"
        crumbs={[{ label: "Home", href: "/" }, { label: "Terms of Use" }]}
        backgroundImage="/images/header-contracting.jpg"
      />
      <LegalDocument
        lastUpdated="3 August 2026"
        intro={`These Terms of Use (“Terms”) govern your access to and use of the website operated by ${company.name} (“${company.shortName}”, “we”, “us”, or “our”) at ${company.website}. By using this website you agree to these Terms. This page contains standard stock terms for a Saudi contracting company website and should be reviewed by TIMC’s legal advisor before public launch.`}
        contactNote="Questions about these Terms can be sent through our"
        sections={[
          {
            title: "About the Website",
            paragraphs: [
              `This website provides general information about ${company.shortName}’s capabilities in civil infrastructure, foundation engineering, energy infrastructure, and equipment rental. Content is for informational purposes only and does not constitute a binding offer, quotation, or engineering advice unless confirmed in a signed agreement.`,
            ],
          },
          {
            title: "Eligibility & Acceptable Use",
            paragraphs: [
              "You agree to use this website only for lawful purposes related to learning about our services or contacting us for legitimate business enquiries.",
            ],
            bullets: [
              "Do not attempt to disrupt, probe, or gain unauthorised access to the site or related systems",
              "Do not submit false, misleading, or unlawful content through forms or email",
              "Do not scrape, copy, or republish site content for commercial reuse without written permission",
              "Do not use the site to transmit malware, spam, or harmful code",
            ],
          },
          {
            title: "Enquiries & Proposals",
            paragraphs: [
              "Submitting an enquiry through the website or by phone/email does not create a contract. Any engagement for works, rental, or services is subject to TIMC’s written proposal, purchase order, or contract documents, including commercial terms, HSE requirements, and payment conditions agreed by both parties.",
            ],
          },
          {
            title: "Intellectual Property",
            paragraphs: [
              `All text, branding, logos, photographs, videos, and layout on this website are owned by ${company.shortName} or used under licence. You may view and download pages for personal or internal business evaluation only. Any other use requires prior written consent.`,
              "Client and partner names or logos appearing on this site remain the property of their respective owners and are shown for identification of past or present commercial relationships where permitted.",
            ],
          },
          {
            title: "Project Information",
            paragraphs: [
              "Project descriptions, statistics, and case summaries are provided in good faith based on TIMC records. Scope details may be summarised or anonymised. Photographs and media may depict representative site conditions and should not be relied on as as-built documentation.",
            ],
          },
          {
            title: "Disclaimer of Warranties",
            paragraphs: [
              "The website and its content are provided on an “as is” and “as available” basis. To the fullest extent permitted by applicable law, we disclaim warranties of accuracy, completeness, merchantability, fitness for a particular purpose, and non-infringement regarding website content.",
            ],
          },
          {
            title: "Limitation of Liability",
            paragraphs: [
              `To the fullest extent permitted by law, ${company.shortName} shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, this website. Liability related to contracted works is governed exclusively by the applicable project contract, not these website Terms.`,
            ],
          },
          {
            title: "Third-Party Links",
            paragraphs: [
              "Links to maps, social media, or external resources are provided for convenience. We do not control and are not responsible for third-party sites or their content, availability, or policies.",
            ],
          },
          {
            title: "Governing Law",
            paragraphs: [
              "These Terms are governed by the laws of the Kingdom of Saudi Arabia. Any dispute arising from website use shall be subject to the exclusive jurisdiction of the competent courts in Jeddah, Kingdom of Saudi Arabia, unless mandatory law provides otherwise.",
            ],
          },
          {
            title: "Changes to These Terms",
            paragraphs: [
              "We may revise these Terms at any time by posting an updated version on this page. The “Last updated” date indicates the latest revision. Continued use of the website after changes constitutes acceptance of the updated Terms where permitted by law.",
            ],
          },
          {
            title: "Contact",
            paragraphs: [
              `${company.name} (${company.shortName})`,
              `Email: ${company.email}`,
              `Phone: ${company.phone} · Mobile: ${company.mobile}`,
              `Address: ${company.address}`,
              `CR: ${company.commercialRegistration} · VAT: ${company.vatNumber}`,
            ],
          },
        ]}
      />
    </>
  );
}

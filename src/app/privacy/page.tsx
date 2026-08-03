import type { Metadata } from "next";
import InternalPageHero from "@/components/InternalPageHero";
import LegalDocument from "@/components/sections/LegalDocument";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: `Privacy Policy | ${company.shortName}`,
  description:
    "How Talha Integrated Modern Company collects, uses, and protects personal information submitted through our website and enquiry channels.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <InternalPageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
        titleLead="Our"
        titleAccent="Privacy"
        title="Policy"
        description={`How ${company.shortName} collects, uses, and protects personal information when you visit our website or submit an enquiry.`}
        backgroundImage="/images/header-manpower.jpg"
      />
      <LegalDocument
        lastUpdated="3 August 2026"
        intro={`This Privacy Policy explains how ${company.name} (“${company.shortName}”, “we”, “us”, or “our”) handles personal information when you visit ${company.website.replace("https://", "")}, contact us by phone or email, or submit an enquiry about our contracting and equipment rental services. This page uses standard website privacy language and should be reviewed by TIMC before public launch.`}
        contactNote="If you have questions about this Privacy Policy or wish to exercise a privacy request, please reach us via"
        sections={[
          {
            title: "Who We Are",
            paragraphs: [
              `${company.name} is a Saudi Arabian engineering and contracting company headquartered in ${company.location}. Our commercial registration number is ${company.commercialRegistration} and our VAT number is ${company.vatNumber}.`,
              `Registered address: ${company.address}.`,
            ],
          },
          {
            title: "Information We Collect",
            paragraphs: [
              "We may collect information you voluntarily provide when you request a quotation, send a message through our contact form, call or email our team, or apply for partnership / vendor opportunities.",
            ],
            bullets: [
              "Identity and contact details (name, company, email address, phone number)",
              "Project or enquiry details you choose to share",
              "Technical data such as browser type, device type, and approximate location derived from IP address",
              "Usage data such as pages visited and referring URLs (via standard analytics, if enabled)",
            ],
          },
          {
            title: "How We Use Your Information",
            paragraphs: [
              "We use personal information only for legitimate business purposes related to our services.",
            ],
            bullets: [
              "Responding to enquiries and preparing commercial / technical proposals",
              "Communicating about projects, site visits, and service delivery",
              "Improving our website, content, and user experience",
              "Complying with applicable Saudi Arabian laws and regulatory obligations",
              "Protecting our rights, property, personnel, and sites",
            ],
          },
          {
            title: "Legal Bases & Sharing",
            paragraphs: [
              "We process information where necessary to take steps at your request prior to entering a contract, to perform a contract, to comply with legal obligations, or where we have a legitimate interest in operating and securing our business.",
              "We do not sell personal information. We may share limited data with trusted service providers (for example hosting, email, or analytics vendors) who process it on our instructions, or with authorities when required by law.",
            ],
          },
          {
            title: "Cookies & Similar Technologies",
            paragraphs: [
              "Our website may use essential cookies required for basic functionality and, where enabled, analytics cookies to understand aggregate traffic patterns. You can control cookies through your browser settings. Disabling certain cookies may affect site features.",
            ],
          },
          {
            title: "Data Retention & Security",
            paragraphs: [
              "We retain personal information only for as long as needed for the purposes described above, including statutory record-keeping related to commercial correspondence and projects.",
              "We apply reasonable administrative and technical measures to protect information against unauthorised access, loss, or misuse. No method of transmission over the internet is completely secure.",
            ],
          },
          {
            title: "Your Choices",
            paragraphs: [
              "Subject to applicable law, you may request access to, correction of, or deletion of personal information we hold about you, or ask us to restrict certain processing. To make a request, email us or use the contact page.",
            ],
          },
          {
            title: "Third-Party Links",
            paragraphs: [
              "Our site may link to external websites (for example maps, social profiles, or partner pages). We are not responsible for the privacy practices of those sites.",
            ],
          },
          {
            title: "Updates to This Policy",
            paragraphs: [
              "We may update this Privacy Policy from time to time. The “Last updated” date at the top of this page will change when revisions are published. Continued use of the website after updates constitutes acceptance of the revised policy where permitted by law.",
            ],
          },
          {
            title: "Contact",
            paragraphs: [
              `Email: ${company.email}`,
              `Phone: ${company.phone} · Mobile: ${company.mobile}`,
              `Address: ${company.address}`,
            ],
          },
        ]}
      />
    </>
  );
}

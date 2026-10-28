import { LegalPage } from "@/components/legal/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description: `The terms that apply when you use the ${site.name} website, including content ownership, acceptable use, liability and how project engagements are agreed.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      path="/terms"
      updated="2026-10-28"
      intro={
        <p>
          These terms apply to your use of this website. By using the site you agree to them. Client projects are governed by the
          separate proposal or agreement signed for each engagement.
        </p>
      }
      sections={[
        {
          heading: "Use of the website",
          body: <p>You may browse and share this website for lawful purposes. Please don&apos;t attempt to disrupt it, access it in unauthorised ways, or submit spam through its forms.</p>,
        },
        {
          heading: "Content and intellectual property",
          body: (
            <p>
              The website design, text, graphics and code are owned by {site.name} unless stated otherwise. Client names, logos and
              store screenshots remain the property of their respective owners.
            </p>
          ),
        },
        {
          heading: "Information on this site",
          body: <p>Articles and service descriptions are general information, not professional advice for your specific situation. Results described for one project are not a guarantee of results for another.</p>,
        },
        {
          heading: "Project engagements",
          body: <p>Scope, timelines, fees, intellectual-property transfer and support for any project are defined in the written proposal or agreement for that project. Where those documents conflict with these terms, the project documents apply.</p>,
        },
        {
          heading: "Third-party links",
          body: <p>Links to other websites (for example client stores) are provided for convenience. We are not responsible for their content or privacy practices.</p>,
        },
        {
          heading: "Liability",
          body: <p>The website is provided &ldquo;as is&rdquo;. To the extent permitted by law, we are not liable for any loss arising from your use of the website or reliance on its content.</p>,
        },
        {
          heading: "Changes and contact",
          body: (
            <p>
              We may update these terms from time to time; the date above shows the latest version. Questions? Email{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}

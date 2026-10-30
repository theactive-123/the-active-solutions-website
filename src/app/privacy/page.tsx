import { LegalPage } from "@/components/legal/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { Email } from "@/components/ui/Email";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects the personal information you share through this website, contact forms and meeting requests.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy"
      updated="2026-10-28"
      intro={
        <p>
          This policy explains what personal information {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects when you use this
          website, why we collect it and the choices you have. We keep it short because we collect very little.
        </p>
      }
      sections={[
        {
          heading: "Information we collect",
          body: (
            <>
              <p>We only collect information you choose to send us:</p>
              <ul>
                <li>Contact and project enquiries: your name, email address, company or store URL, budget range, the services you are interested in and your message.</li>
                <li>Meeting requests: the date and time you pick, your name, email address and any notes.</li>
                <li>Newsletter sign-ups: your email address.</li>
              </ul>
              <p>Our hosting provider may also process standard technical data (such as IP address and browser type) in server logs to keep the site secure and available.</p>
            </>
          ),
        },
        {
          heading: "How we use it",
          body: (
            <ul>
              <li>To reply to your enquiry, schedule meetings and prepare proposals.</li>
              <li>To send articles you subscribed to (you can unsubscribe at any time).</li>
              <li>To protect the website against spam and abuse.</li>
            </ul>
          ),
        },
        {
          heading: "Cookies and analytics",
          body: <p>This website does not use advertising or tracking cookies. If we add analytics in the future, we will update this policy and, where required, ask for your consent first.</p>,
        },
        {
          heading: "Sharing",
          body: (
            <p>
              We never sell your information. We share it only with service providers that help us run the website and deliver email (for
              example our hosting and transactional-email providers), under agreements that require them to protect it, or when the law
              requires us to.
            </p>
          ),
        },
        {
          heading: "Retention",
          body: <p>We keep enquiry and meeting details for as long as needed to respond and, if we work together, for the duration of the engagement and our legal record-keeping obligations. Newsletter addresses are kept until you unsubscribe.</p>,
        },
        {
          heading: "Your rights",
          body: (
            <p>
              Depending on where you live you may have the right to access, correct, delete or export your personal information, or to
              object to how we use it. Contact us using the details below and we will respond within 30 days.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              {site.name}, {site.address.street}, {site.address.city} {site.address.postalCode}, {site.address.countryName}.{" "}
              Phone: <a href={`tel:${site.phone.tel}`}>{site.phone.display}</a>
              <br />
              Email: <Email />
            </p>
          ),
        },
      ]}
    />
  );
}

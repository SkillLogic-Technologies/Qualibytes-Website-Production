import ScrollToTop from "@/components/ScrollToTop";
import OldFooter from "@/components/oldFooter";
import SEO from "@/seo/SEO";
import { PAGES } from "@/seo/seo-config";

interface PrivacyPolicyProps {
  onRequestCall?: () => void;
}

export default function PrivacyPolicy({ onRequestCall = () => {} }: PrivacyPolicyProps) {
  return (
    <>
      <SEO page={PAGES.privacy} />
      <ScrollToTop />

      <section className="bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">
            Last updated: September 21, 2026
          </p>

          <div className="prose prose-indigo dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-gray-300">
            <p>
              Qualibytes IT Academy Pvt. Ltd. ("Qualibytes", "we", "us") respects
              your privacy. This policy explains how we collect, use and protect
              your personal information when you visit qualibytes.com, fill out an
              enquiry form (on our website or on Facebook, Instagram or Google),
              contact us on WhatsApp or by phone, or enroll in any of our programs.
              By using our website or sharing your details with us, you agree to
              this policy.
            </p>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                1. Information We Collect
              </h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Contact details: name, mobile/WhatsApp number, email, city.</li>
                <li>Education and career details: qualification, experience, resume, current or expected salary.</li>
                <li>Program details: course enrolled, attendance, assignments, test scores, certificates.</li>
                <li>
                  Payment details: fee transactions and invoice details. For EMI,
                  the documents your lender requires, such as PAN and ID proof. We
                  do not store card numbers, CVV or banking passwords; these are
                  handled only by our secure payment gateway.
                </li>
                <li>Technical details: IP address, browser, device and pages visited, collected through cookies and similar tools.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                2. How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>To respond to your enquiry and counsel you about our courses.</li>
                <li>To invite you to webinars, demos and counselling sessions.</li>
                <li>To enroll you, process fees and EMI, and deliver training.</li>
                <li>To provide placement assistance and staffing services, including sharing your profile with hiring companies.</li>
                <li>To send you course updates, offers and important notifications.</li>
                <li>To improve our website, services and advertising.</li>
                <li>To comply with legal, tax and regulatory requirements.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                3. Calls, WhatsApp, SMS and Email
              </h2>
              <p>
                When you submit your details, you authorise Qualibytes to contact
                you by call, WhatsApp, SMS and email about our programs. This
                applies even if your number is registered under DND. You can opt
                out at any time by replying STOP, telling your counsellor, or
                emailing{" "}
                <a href="mailto:privacy@qualibytes.com" className="text-indigo-600 dark:text-indigo-400 underline">
                  privacy@qualibytes.com
                </a>
                . You will still receive essential messages about classes and fees
                while you are enrolled.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                4. Sharing of Information
              </h2>
              <p>We do not sell your personal information. We share it only with:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Service providers who help us operate, such as payment gateways, CRM/WhatsApp platforms, email services, hosting and learning platforms.</li>
                <li>EMI or financing partners, only if you choose EMI.</li>
                <li>Our group companies, such as Delta 360 Services Pvt. Ltd., for live projects and internships.</li>
                <li>Hiring companies and staffing clients, in India or abroad, for placement and staffing programs.</li>
                <li>Advertising platforms such as Meta and Google, to measure ad performance.</li>
                <li>Government authorities, when required by law.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                5. Cookies
              </h2>
              <p>
                We use cookies to keep our website working, understand how
                visitors use it, and measure our advertising, for example through
                Google Analytics, the Meta Pixel and Google Ads. You can disable
                cookies in your browser settings, but some features may not work
                properly.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                6. Data Security
              </h2>
              <p>
                We use reasonable security measures to protect your information,
                including SSL encryption, restricted staff access and secure
                payment gateways. However, no method of transmission over the
                internet is 100% secure.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                7. Data Retention
              </h2>
              <p>
                We keep your information only as long as needed for the purposes
                above, or as required by law, for example for tax records. After
                that, it is deleted or anonymised.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                8. Your Rights
              </h2>
              <p>
                You may request to access, correct or delete your personal
                information, withdraw your consent, or nominate someone to
                exercise these rights on your behalf, as provided under the
                Digital Personal Data Protection Act, 2023. Email{" "}
                <a href="mailto:privacy@qualibytes.com" className="text-indigo-600 dark:text-indigo-400 underline">
                  privacy@qualibytes.com
                </a>{" "}
                and we will respond within 30 days.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                9. Children's Privacy
              </h2>
              <p>
                Our programs are meant for individuals aged 18 and above. We do
                not knowingly collect information from minors without the consent
                of a parent or guardian.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                10. Third-Party Links
              </h2>
              <p>
                Our website may contain links to other websites. We are not
                responsible for their privacy practices.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                11. Changes to This Policy
              </h2>
              <p>
                We may update this policy from time to time. Changes will be
                posted on this page with the updated date.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                12. Grievance Officer
              </h2>
              <p>
                For any questions or complaints about your personal information,
                please contact:
              </p>
              <p className="mt-2">
                Name: Bhagyashree
                <br />
                Qualibytes IT Academy Pvt. Ltd.
                <br />
                Address: B Block, Sector 2, Noida, Uttar Pradesh 201301
                <br />
                Email:{" "}
                <a href="mailto:privacy@qualibytes.com" className="text-indigo-600 dark:text-indigo-400 underline">
                  privacy@qualibytes.com
                </a>
                <br />
                Phone:{" "}
                <a href="tel:+917827518204" className="text-indigo-600 dark:text-indigo-400 underline">
                  +91 78275 18204
                </a>
              </p>
              <p className="mt-2">
                We will acknowledge your complaint within 48 hours and resolve it
                within 30 days.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                13. Governing Law
              </h2>
              <p>
                This policy is governed by the laws of India. Any disputes are
                subject to the jurisdiction of the courts in Gautam Buddh Nagar
                (Noida), Uttar Pradesh.
              </p>
            </div>
          </div>
        </div>
      </section>

      <OldFooter />
    </>
  );
}

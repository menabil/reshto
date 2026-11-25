import { ContactExperience } from "@/components/contact/ContactExperience";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  "Contact Us",
  "Get in touch with Reshto restaurant for table inquiries, private catering, feedback, or directions.",
  "/contact",
);

export default function ContactPage() {
  return <ContactExperience />;
}

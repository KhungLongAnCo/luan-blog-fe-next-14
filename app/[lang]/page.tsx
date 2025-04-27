import { ScrollToTop } from "@/components/ui/ScollToTop";
import { BlogsSection, IntroSection } from "./_sections";
import ContactSection from "./_sections/ContactSection";

export default async function Page() {
  return (
    <div>
      <ScrollToTop />
      <IntroSection />
      <BlogsSection />
      <ContactSection />
    </div>
  );
}

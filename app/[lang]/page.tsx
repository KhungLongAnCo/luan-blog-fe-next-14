// import { ScrollToTop } from "@/components/ui/ScollToTop";
import { IntroSection } from "./_sections";
import ContactSection from "./_sections/ContactSection";
// import { ChatBoxSection } from "./_sections/ChatBox";

export default async function Page() {
  return (
    <div>
      {/* <ScrollToTop /> */}
      <IntroSection />
      {/* <ChatBoxSection /> */}
      {/* <BlogsSection /> */}
      <ContactSection />
    </div>
  );
}

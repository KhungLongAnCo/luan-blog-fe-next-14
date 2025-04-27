"use client";
import { TypingAnimation } from "@/components/ui/hyper-text";
import { moveLeft } from "@/styles";
import { motion } from "framer-motion";
import { Slogans } from "./Slogans";
import { Button } from "@/components/ui/button";

export const IntroSection = () => {
  return (
    <motion.section
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delayChildren: 0.2, staggerDirection: 0.1 }}
      className="home-intro-section relative min-h-[100vh] bg-gray600 overflow-hidden px-4 py-8 md:py-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-[20vh] md:mt-[20vh]">
        <div className="backdrop:blur-lg z-50">
          <div className="md:pl-[64px]">
            <TypingAnimation
              as="h1"
              className="liner-text mb-3 text-2xl md:text-4xl font-bold"
            >
              Giải pháp IT cho ý tưởng của bạn
            </TypingAnimation>
            <h4 className="text-gray-300 text-white mb-6 text-sm md:text-base">
              Bạn có ý tưởng muốn phát triển? <br />
              Liên hệ với tôi để biến nó thành hiện thực!
            </h4>
            <Button
              variant="default"
              className="text-sm md:text-base"
              onClick={() => {
                const contactSection =
                  document.querySelector("#contact-section");
                if (contactSection) {
                  const offset = -80;
                  const top =
                    contactSection.getBoundingClientRect().top +
                    window.scrollY +
                    offset;
                  window.scrollTo({ top, behavior: "smooth" });
                }
              }}
            >
              Liên Hệ Ngay
            </Button>
          </div>
          <div className="flex flex-col home-intro-text mt-6 md:mt-8">
            <motion.div {...moveLeft} className="text-left">
              <div className="text-sm md:text-lg italic">Software Engineer</div>
              <TypingAnimation
                as="div"
                className="liner-text text-xl md:text-3xl font-bold"
              >
                {`Hi. I'm Lee (KhungLongAnCo)`}
              </TypingAnimation>
            </motion.div>
          </div>
        </div>
        <div className="hidden sm:flex justify-end">
          <Slogans />
        </div>
      </div>
    </motion.section>
  );
};

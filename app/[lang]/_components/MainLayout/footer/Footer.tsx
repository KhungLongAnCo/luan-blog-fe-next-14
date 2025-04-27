import { logoPng } from "@/assets/pngs";

import Image from "next/image";
import Link from "next/link";

import {
  emailPng,
  facePng,
  githubPng,
  igPng,
  linkinPng,
  youtubePng,
} from "@/assets/pngs";
import { CONTACT } from "@/defines";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const FooterMenu = [
//   {
//     title: "Company",
//     children: [
//       { name: "About Us", link: "/about" },
//       {
//         name: "Careers",
//         link: "/", // update later
//       },
//       {
//         name: "Community",
//         link: "/", // update later
//       },
//       {
//         name: "Media Kit",
//         link: "/", // update later
//       },
//       {
//         name: "Terms of Service",
//         link: "/", // update later
//       },
//       {
//         name: "Privacy Policy",
//         link: "/", // update later
//       },
//       { name: "Contact Us", link: "/contact-us" },
//     ],
//   },
//   {
//     title: "Product",
//     children: [
//       {
//         name: "Features",
//         link: "/", // update later
//       },
//       {
//         name: "IDEs Integration",
//         link: "/", // update later
//       },
//       {
//         name: "Languages",
//         link: "/", // update later
//       },
//       {
//         name: "Roadmap",
//         link: "/", // update later
//       },
//       {
//         name: "Comparison",
//         link: "/", // update later
//       },
//       { name: "Pricing", link: "/pricing" },
//     ],
//   },
//   {
//     title: "Solutions",
//     children: [
//       { name: "Use Case 1", link: "/" },
//       { name: "Use Case 2", link: "/" },
//       { name: "Use Case 3", link: "/" },
//     ],
//   },
//   {
//     title: "Resources",

//     children: [
//       { name: "Blog", link: "/" },
//       { name: "Research", link: "/" },
//       { name: "Case Studies", link: "/" },
//       { name: "FAQs", link: "/" },
//       { name: "Docs", link: "/" },
//     ],
//   },
// ];

const LIST_SOCIALS = [
  {
    name: "youtubePng",
    link: "https://www.youtube.com/@KhungLongAnCo2000",
    icon: youtubePng,
  },
  {
    name: "githubPng",
    link: "https://github.com/KhungLongAnCo",
    icon: githubPng,
  },
  {
    name: "linkinPng",
    link: "https://www.linkedin.com/in/lu%C3%A2n-nguy%E1%BB%85n-7266b1224",
    icon: linkinPng,
  },
  { name: "emailPng", link: "mailto:luan1982000@gmail.com", icon: emailPng },
  {
    name: "facePng",
    link: "https://www.facebook.com/profile.php?id=61565542084009",
    icon: facePng,
  },
  { name: "igPng", link: "https://www.instagram.com/yuull_1908/", icon: igPng },
];

export const Footer: React.FC = () => {
  return (
    <footer className="main-footer__wrap z-10 px-4 md:px-[80px] py-4 border-gray-100">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="flex flex-col">
          <Link href="/" className="flex items-center mb-3">
            <Image
              src={logoPng}
              width={logoPng.width}
              height={logoPng.height}
              alt="logo"
              className="w-[50px]"
            />
            <h5 className="font-bold text-lg">Khung Long An Co</h5>
          </Link>
          <div className="text-sm leading-relaxed">
            Mình chuyên thiết kế web chuẩn SEO, chuẩn di động. Áp dụng những
            công nghệ tiên tiến nhất hiện nay để thiết kế website như HTML5,
            CSS3, React, Next JS... theo yêu cầu giao diện, chức năng...
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            <h4 className="font-bold mb-3 text-lg">Liên Hệ</h4>
            <ul className="pl-0 space-y-2">
              <li>
                <a
                  href={`tel:${CONTACT.PHONE}`}
                  className="px-0 py-1 italic text-sm"
                >
                  {CONTACT.PHONE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.EMAIL}`}
                  className="px-0 py-1 italic text-sm"
                >
                  {CONTACT.EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.EMAIL}`}
                  className="px-0 py-1 italic text-sm"
                >
                  {CONTACT.ADDRESS}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-lg">Mạng Xã Hội</h4>
          <div className="flex items-center gap-4 flex-wrap">
            {LIST_SOCIALS?.map((i) => (
              <a
                key={i.link}
                href={i.link}
                target="_blank"
                rel="noopener noreferrer"
                className="social"
              >
                <Image
                  className="h-[32px] w-auto"
                  src={i.icon}
                  alt={i.link}
                  width={i.icon.width}
                  height={i.icon.height}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center font-thin italic text-sm pt-3 mt-3 border-t border-gray-200">
        Copyright © {new Date().getFullYear()}. Toàn bộ bản quyền thuộc
        Luân(KhungLongAnCo)
      </div>
    </footer>
  );
};

import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import localFont from "next/font/local";
import { Metadata } from "next";

import { Navbar, Content, Footer } from "./_components";

export const metadata: Metadata = {
  title: "BLOG CỦA LUAN (LEVI) | LẬP TRÌNH VIÊN",
  description:
    "Chào bạn, tôi là Luan (Levi) – một Lập Trình Viên Full-Stack với hơn 5 năm kinh nghiệm, chuyên về Front-End Development từ năm 2019. Đây là nơi tôi chia sẻ kiến thức lập trình và nhận các dự án freelancer.",
  // metadataBase: new URL(`${process.env.NEXT_PUBLIC_DOMAIN}`),
};

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!routing?.locales?.includes?.(lang)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={lang} className="mdl-js">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <Content>{children}</Content>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

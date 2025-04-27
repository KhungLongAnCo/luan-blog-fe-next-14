import createMiddleware from "next-intl/middleware";

const locales = ["en", "jp"];

export default createMiddleware({
  locales,
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/pathnames": {
      en: "/pathnames",
      jp: "/pfadnamen",
    },
  },
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", `/(en|jp})/:path*`, "/((?!_next|_vercel|api|.*\\..*).*)"],
};

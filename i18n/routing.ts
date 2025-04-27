import { defineRouting } from "next-intl/routing";

type Locale = string | "en" | "jp";

export type LocaleConfig = {
  locales: string[];
  defaultLocale: Locale;
  // pathnames: Pathnames<Locale[]>;
};

const locales: Locale[] = ["en", "jp"];

const locale: LocaleConfig = {
  locales,
  defaultLocale: "en",
};

export const routing = defineRouting({
  ...locale,
  localePrefix: {
    mode: "always",
    prefixes: {
      en: "/en",
      jp: "/jp",
    },
  },
  pathnames: {
    theme: {
      en: "/en/theme",
      jp: "/jp/theme",
    },
  },
});

import { defineRouting } from "next-intl/routing";

const routing = defineRouting({
  locales: ["en", "vi"],
  defaultLocale: "en",
  localePrefix: "as-needed"
});
export { routing };

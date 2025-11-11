import localFont from "next/font/local";
const genralSans = localFont({
  src: [
    {
      path: "./../fonts/GeneralSans/GeneralSans-Regular.ttf",
      weight: "400",
      style: "normal"
    },
    {
      path: "./../fonts/GeneralSans/GeneralSans-Bold.ttf",
      weight: "700",
      style: "normal"
    }
  ],
  variable: "--font-genralSans"
});
const kontrap = localFont({
  src: [
    {
      path: "./../fonts/KontrapunktMiki/KontrapunktMiki-Regular.ttf",
      weight: "400"
    },
    {
      path: "./../fonts/KontrapunktMiki/KontrapunktMiki-Regular.woff",
      weight: "400"
    },
    {
      path: "./../fonts/KontrapunktMiki/KontrapunktMiki-Regular.woff2",
      weight: "400"
    },
    {
      path: "./../fonts/KontrapunktMiki/KontrapunktMiki-Bold.ttf",
      weight: "700"
    },
    {
      path: "./../fonts/KontrapunktMiki/KontrapunktMiki-Bold.woff",
      weight: "700"
    },
    {
      path: "./../fonts/KontrapunktMiki/KontrapunktMiki-Bold.woff2",
      weight: "700"
    }
  ],
  variable: "--font-kontrap"
});
export { genralSans, kontrap };

import "./globals.css";
import { Anton, Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const SITE_NAME = "Yasser Farouk";
const SITE_TITLE = "Yasser Farouk";
const SITE_DESCRIPTION =
  "Yasser Farouk is a director of photography and visual storyteller crafting cinematic film, photography, and brand identity work. Based in Cairo & Port Said, Egypt.";

const SITE_URL = "https://yasser-farouk.vercel.app";

// ── Add this ──────────────────────────────────────────────────────────────────
const OG_IMAGE = {
  url: "/assets/yasserwebimg.webp",
  width: 1200,
  height: 630,
  alt: "Yasser Farouk — Director of Photography",
};
// ─────────────────────────────────────────────────────────────────────────────

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  keywords: [
    "Yasser Farouk",
    "director of photography",
    "cinematographer",
    "filmmaker",
    "photographer",
    "Cairo",
    "Port Said",
    "Egypt",
    "commercial film",
    "brand films",
    "showreel",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "en_US",
    images: [OG_IMAGE], // ← add this
  },
  twitter: {                                      // ← add this whole block
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: SITE_NAME,
        jobTitle: "Videographer & Photographer",
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Cairo",
          addressCountry: "EG",
        },
        sameAs: [
          "https://www.instagram.com/yasserfarouk_ph",
          "https://www.facebook.com/share/18wRVwqHsv/",
          "https://www.linkedin.com/in/yasser-farouk",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        publisher: { "@id": `${SITE_URL}/#person` },
        inLanguage: "en",
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} ${jetbrains.variable} ${playfair.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Boot } from "@/components/board/boot";
import { Probe } from "@/components/board/probe";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Louay Hammoudi — AI, Cybersecurity & Cloud",
    template: "%s | Louay Hammoudi",
  },
  description: "Louay Hammoudi is a final-year ENIT Telecommunications and Networks Engineering student completing a concurrent IST Master's programme while building AI-driven security, data, cloud and reliable C++ networked systems.",
  keywords: [
    "Louay Hammoudi", "Telecommunications Engineering", "Network Security", "AI Engineer",
    "Cybersecurity", "Cloud Security", "RAG", "Agentic AI", "AWS", "Kubernetes",
    "ModSecurity", "SOC", "WAF", "C++20", "Python", "Medical AI", "ONNX", "OpenCV", "SRE", "ENIT",
  ],
  authors: [{ name: "Louay Hammoudi", url: "https://github.com/LouayHM3" }],
  creator: "Louay Hammoudi",
  publisher: "Louay Hammoudi",
  formatDetection: { email: true, address: false, telephone: true },
  metadataBase: new URL("https://github.com/LouayHM3"),
  alternates: { canonical: "https://github.com/LouayHM3" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/LouayHM3",
    title: "Louay Hammoudi — AI, Cybersecurity & Cloud",
    description: "AI-driven security, data, cloud and reliable networked software by Louay Hammoudi, a final-year dual-program engineering and IST Master's student.",
    siteName: "Louay Hammoudi",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Louay Hammoudi — AI, Cybersecurity and Cloud" }],
  },
  twitter: { card: "summary_large_image", title: "Louay Hammoudi — AI, Cybersecurity & Cloud", description: "AI security, cloud and networked systems projects from Louay Hammoudi.", images: ["/og-image.png"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  icons: { icon: [{ url: "/logo.ico", sizes: "16x16", type: "image/png" }, { url: "/logo.ico", sizes: "32x32", type: "image/png" }, { url: "/logo.ico" }], apple: [{ url: "/logo.ico", sizes: "180x180", type: "image/png" }] },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [{ color: "#050d0a" }], width: "device-width", initialScale: 1, maximumScale: 5, userScalable: true, colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Louay Hammoudi",
    jobTitle: "Telecommunications and Networks Engineering Student",
    description: "Telecommunications and Networks Engineering student building AI-driven security, cloud-native systems and reliable networked software.",
    url: "https://github.com/LouayHM3",
    alumniOf: { "@type": "EducationalOrganization", name: "École Nationale d'Ingénieurs de Tunis", alternateName: "National Engineering School of Tunis" },
    sameAs: ["https://github.com/LouayHM3", "https://www.linkedin.com/in/louay-hammoudi-959845332/", "https://www.credly.com/earner/dashboard/home"],
    knowsAbout: ["C++20", "Medical AI", "ONNX", "OpenCV", "Cybersecurity", "AI Security", "RAG", "Agentic AI", "Cloud Security", "Kubernetes", "AWS", "ModSecurity", "WAF", "SOC", "Python", "SRE", "Network Systems"],
    seeks: ["Engineering Intern", "AI Security Intern", "Data Engineering Intern", "C++ Engineering Intern", "Cybersecurity Intern", "Research Intern"],
    serviceArea: { "@type": "Place", name: "Tunisia", additionalProperty: "Open to relocation and remote engineering roles" },
    hasOccupation: { "@type": "Occupation", name: "Telecommunications and Networks Engineering Student", occupationLocation: { "@type": "Country", name: "Tunisia" }, skills: "AI security, cloud, cybersecurity, networked systems, RAG" },
  };

  return (
    <html lang="en" data-theme="ink" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem("oa-theme");if(t)document.documentElement.dataset.theme=t}catch(e){}` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <meta name="theme-color" content="#050d0a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="application-name" content="Louay Hammoudi Portfolio" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <Boot />
        <Probe />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

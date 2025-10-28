import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learn2Prompt - Master AI Prompt Engineering",
  description: "Learn2Prompt.xyz - An interactive course to master AI prompt engineering. Learn clarity, specificity, and iteration through hands-on lessons.",
  keywords: [
    "AI prompt engineering",
    "prompt engineering course",
    "AI prompts",
    "ChatGPT prompts",
    "Claude prompts",
    "learn prompt engineering",
    "AI training",
    "prompt optimization",
    "AI education",
    "prompt engineering tutorial",
    "AI communication",
    "effective AI prompts",
  ],
  authors: [{ name: "Novagen Labs", url: "https://novagenlabs.ai" }],
  creator: "Novagen Labs",
  publisher: "Novagen Labs",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://learn2prompt.xyz",
    siteName: "Learn2Prompt",
    title: "Learn2Prompt - Master AI Prompt Engineering",
    description: "Interactive course to master AI prompt engineering. Learn clarity, specificity, and iteration through hands-on lessons with real AI.",
    images: [
      {
        url: "https://learn2prompt.xyz/og-image.png",
        width: 1200,
        height: 630,
        alt: "Learn2Prompt - Master AI Prompt Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@novagenlabs",
    creator: "@novagenlabs",
    title: "Learn2Prompt - Master AI Prompt Engineering",
    description: "Interactive course to master AI prompt engineering. Learn clarity, specificity, and iteration.",
    images: ["https://learn2prompt.xyz/og-image.png"],
  },
  alternates: {
    canonical: "https://learn2prompt.xyz",
  },
  category: "Education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Learn2Prompt - Master AI Prompt Engineering",
    "description": "An interactive course to master AI prompt engineering. Learn clarity, specificity, and iteration through hands-on lessons with real AI.",
    "provider": {
      "@type": "Organization",
      "name": "Novagen Labs",
      "url": "https://novagenlabs.ai"
    },
    "url": "https://learn2prompt.xyz",
    "courseMode": "online",
    "educationalLevel": "Beginner to Intermediate",
    "inLanguage": "en",
    "isAccessibleForFree": true,
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseWorkload": "PT1H"
    },
    "teaches": [
      "AI prompt engineering fundamentals",
      "Clarity in AI communication",
      "Specificity in prompts",
      "Iterative prompt refinement",
      "Effective AI interaction"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        {/* Klaviyo Scripts - loaded before body close */}
        <Script
          src="https://static.klaviyo.com/onsite/js/SrwK8v/klaviyo.js?company_id=SrwK8v"
          strategy="afterInteractive"
        />
        <Script id="klaviyo-init" strategy="afterInteractive">
          {`
            !function(){if(!window.klaviyo){window._klOnsite=window._klOnsite||[];try{window.klaviyo=new Proxy({},{get:function(n,i){return"push"===i?function(){var n;(n=window._klOnsite).push.apply(n,arguments)}:function(){for(var n=arguments.length,o=new Array(n),w=0;w<n;w++)o[w]=arguments[w];var t="function"==typeof o[o.length-1]?o.pop():void 0,e=new Promise((function(n){window._klOnsite.push([i].concat(o,[function(i){t&&t(i),n(i)}]))}));return e}}})}catch(n){window.klaviyo=window.klaviyo||[],window.klaviyo.push=function(){var n;(n=window._klOnsite).push.apply(n,arguments)}}}}();
          `}
        </Script>
      </body>
    </html>
  );
}

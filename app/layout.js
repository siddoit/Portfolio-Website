import { Outfit, Ovo } from "next/font/google";
import "./globals.css"; 

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap", 
  variable: "--font-outfit",
});

const ovo = Ovo({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-ovo",
});

// --- SITE CONFIGURATION & SEO METADATA ---
const siteConfig = {
  name: "Sidharth Sajith",
  title: "Sidharth Sajith | Robotics & AI Portfolio",
  description: "Explore the portfolio of Sidharth Sajith, a Mechatronics, Robotics, and Automation Engineering student specializing in AI/ML, embedded systems, and innovative web solutions.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sidharthsajith.dev", // Replace with your actual domain
  ogImage: "/og-image.png", // Place in /public (1200x630px recommended)
  author: "Sidharth Sajith",
  keywords: ["Sidharth Sajith", "Portfolio", "Robotics Engineer", "AI Developer", "Machine Learning", "Mechatronics", "Embedded Systems", "IoT", "Web Development", "Next.js", "React", "Python", "PyTorch"],
  twitterHandle: "@siddoNotReal", // Replace with your actual Twitter handle or remove
};

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  
  openGraph: { 
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: `${siteConfig.name} Portfolio Overview` }],
    locale: "en_US",
    type: "website",
  },
  twitter: { 
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    ...(siteConfig.twitterHandle && { creator: siteConfig.twitterHandle }),
    images: [siteConfig.ogImage], 
  },
  icons: { 
    icon: "/favicon.ico", // Must be in /public
    shortcut: [ // Array for multiple shortcut icons
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [ // Array for multiple apple touch icons
        { url: "/apple-touch-icon.png", sizes: "180x180" }, // Default
        // { url: "/apple-touch-icon-152x152.png", sizes: "152x152" }, // Example other sizes
    ],
    other: [ // For Android Chrome, PWA, etc.
        { rel: "icon", url: "/android-chrome-192x192.png", sizes: "192x192" },
        { rel: "icon", url: "/android-chrome-512x512.png", sizes: "512x512" },
        // { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#5bbad5' }, // If you have one
    ],
  },
  manifest: "/site.webmanifest", // Create this file in /public for PWA capabilities
  robots: { // Instructs search engines
    index: true, // Allow indexing of the page
    follow: true, // Allow following links on the page
    nocache: false, // Allow caching (good for performance)
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false, // Allow Google to index images
      'max-video-preview': -1, // No limit on video preview
      'max-image-preview': 'large', // Show large image previews
      'max-snippet': -1, // No limit on snippet length
    },
  },
  verification: { // For verifying ownership with search engines/services
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE', // Get from Google Search Console
    // yandex: 'YOUR_YANDEX_VERIFICATION_CODE',
    // other: { me: ['your-email@example.com', 'your-link-to-another-profile'], },
  },
  // themeColor: [ // Defines theme colors for browser UI elements (PWA)
  //   { media: '(prefers-color-scheme: light)', color: '#FFFFFF' }, // Your light theme primary background
  //   { media: '(prefers-color-scheme: dark)', color: '#11001F' },  // Your dark theme primary background
  // ],
  // colorScheme: 'light dark', // Indicates support for light and dark color schemes
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="custom-scrollbar"><body // `body` starts on the same line or immediately after
        className={`
          ${outfit.variable} ${ovo.variable} font-sans 
          antialiased 
          leading-relaxed                  
          overflow-x-hidden                
          transition-colors duration-300 ease-custom-ease                         
          min-h-screen flex flex-col
        `}
      >{children}</body></html> // Close tags compactly if preferred, or keep on new lines but ensure no stray text/space nodes
  );
}
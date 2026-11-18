import { Manrope, Bricolage_Grotesque } from "next/font/google";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { BackToTop } from "@/components/ui/BackToTop";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import { siteConfig } from "@/constants/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

/** @type {import('next').Metadata} */
export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f4ed" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1612" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${bricolage.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('reshto-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (stored === 'dark' || (!stored && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-[#f7f4ed] text-ink transition-colors duration-300 dark:bg-[#0c1612] dark:text-[#e5ede8]">
        <ThemeProvider>
          <AuthProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <BackToTop />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

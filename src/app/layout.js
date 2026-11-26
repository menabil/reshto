import { Inter, Playfair_Display } from "next/font/google";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { BackToTop } from "@/components/ui/BackToTop";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import { StoreProvider } from "@/context/StoreContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { siteConfig } from "@/constants/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

/** @type {import('next').Metadata} */
export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export const viewport = {
  themeColor: "#faf8f5",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var storedTheme = null;
                try {
                  storedTheme = localStorage.getItem('reshto-theme');
                } catch (e) {}
                var prefersDark = window.matchMedia &&
                  window.matchMedia('(prefers-color-scheme: dark)').matches;
                var isDark = storedTheme === 'dark' ||
                  (storedTheme !== 'light' && prefersDark);
                document.documentElement.classList.toggle('dark', isDark);
                var themeColor = document.querySelector('meta[name="theme-color"]');
                if (themeColor) themeColor.setAttribute('content', isDark ? '#0f0e0d' : '#faf8f5');
              })();
            `,
          }}
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-[#faf8f5] text-ink transition-colors duration-300 dark:bg-[#0f0e0d] dark:text-[#f5f5f4]">
        <ThemeProvider>
          <AuthProvider>
            <StoreProvider>
              <LanguageProvider>
                <Header />
                <CartDrawer />
                <main className="flex-1">{children}</main>
                <Footer />
                <BackToTop />
              </LanguageProvider>
            </StoreProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

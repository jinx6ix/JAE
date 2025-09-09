import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Script from 'next/script'

const inter = Inter({ subsets: ["latin"] })

// Enhanced metadata with SEO improvements
export const metadata = {
  title: "SecureHost - Web Hosting & Cybersecurity Services",
  description: "Professional web hosting and cybersecurity services for businesses of all sizes. Secure hosting solutions with 99.9% uptime, SSL certificates, and expert support.",
  generator: 'v0.dev',
  keywords: "web hosting, cybersecurity, SSL certificates, VPS hosting, dedicated servers, WordPress hosting, website security, malware protection",
  authors: [{ name: "SecureHost Team" }],
  creator: "SecureHost",
  publisher: "SecureHost",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.securehost-example.com'), // Replace with your actual domain
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: {
    title: "SecureHost - Web Hosting & Cybersecurity Services",
    description: "Professional web hosting and cybersecurity services for businesses of all sizes",
    url: 'https://www.securehost-example.com', // Replace with your actual domain
    siteName: 'SecureHost',
    images: [
      {
        url: '/og-image.jpg', // Replace with your actual Open Graph image
        width: 1200,
        height: 630,
        alt: 'SecureHost - Professional Web Hosting',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "SecureHost - Web Hosting & Cybersecurity Services",
    description: "Professional web hosting and cybersecurity services for businesses of all sizes",
    images: ['/twitter-image.jpg'], // Replace with your actual Twitter image
    creator: '@securehost', // Replace with your actual Twitter handle
  },
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
  verification: {
    google: 'your-google-verification-code', // Replace with your actual code
    yandex: 'your-yandex-verification-code', // Optional: Replace if needed
  },
}

// JSON-LD structured data for better SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SecureHost',
  url: 'https://www.securehost-example.com', // Replace with your actual domain
  logo: 'https://www.securehost-example.com/logo.png', // Replace with your actual logo URL
  description: 'Professional web hosting and cybersecurity services for businesses of all sizes',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Main St', // Replace with your actual address
    addressLocality: 'City', // Replace with your actual city
    addressRegion: 'State', // Replace with your actual state
    postalCode: '12345', // Replace with your actual postal code
    addressCountry: 'US', // Replace with your actual country code
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-123-456-7890', // Replace with your actual phone number
    contactType: 'customer service',
  },
  sameAs: [
    'https://twitter.com/securehost', // Replace with your actual social media profiles
    'https://www.facebook.com/securehost',
    'https://www.linkedin.com/company/securehost',
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="google-site-verification" content="hFLRkNLTiWW_pvLuqqXe-gZjop_3rJtLqKtpuxkByMc" />
        
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-XXXXXX');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXX"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />
        
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        
        {/* Analytics and tracking scripts */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-QQGCW3MDG6"
        />
        <Script
          id="google-gtag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QQGCW3MDG6');
            `,
          }}
        />
      </body>
    </html>
  )
}
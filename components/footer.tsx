import Link from "next/link"
import { Shield } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-6 w-6" />
              <span className="font-bold text-xl">SecureHost</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Professional web hosting and cybersecurity services for businesses of all sizes.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-4">Web Hosting</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/web-hosting/shared"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Shared Hosting
                </Link>
              </li>
              <li>
                <Link
                  href="/web-hosting/vps"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  VPS Hosting
                </Link>
              </li>
              <li>
                <Link
                  href="/web-hosting/dedicated"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dedicated Servers
                </Link>
              </li>
              <li>
                <Link
                  href="/web-hosting/cloud"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cloud Hosting
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-4">Cybersecurity</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/cybersecurity/services/threat-protection"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Threat Protection
                </Link>
              </li>
              <li>
                <Link
                  href="/cybersecurity/services/data-protection"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Data Security
                </Link>
              </li>
              <li>
                <Link
                  href="/cybersecurity/services/compliance"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Compliance
                </Link>
              </li>
              <li>
                <Link
                  href="/cybersecurity/services/incident-response"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Incident Response
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SecureHost. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

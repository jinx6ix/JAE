"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Server, Cpu, Globe, Cloud, Mailbox, Users, Check } from "lucide-react"
import Link from "next/link"
import { Suspense, useState, useEffect } from "react"

// Loading animation component
function WebHostingLoading() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <div className="h-12 w-64 mx-auto bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
        <div className="h-6 w-3/4 mx-auto bg-gray-200 rounded-lg animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border rounded-lg p-6">
            <div className="mb-6">
              <div className="p-2 w-12 h-12 rounded-lg bg-gray-200 mb-4 animate-pulse"></div>
              <div className="h-6 w-3/4 bg-gray-200 rounded-lg mb-2 animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
            <div>
              <div className="h-8 w-1/2 bg-gray-200 rounded-lg mb-6 animate-pulse"></div>
              <ul className="space-y-2">
                {[...Array(5)].map((_, j) => (
                  <li key={j} className="flex items-center">
                    <div className="h-5 w-5 bg-gray-200 rounded-full mr-2 animate-pulse"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded-lg animate-pulse"></div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function WebHostingPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [hostingPlans, setHostingPlans] = useState<any[]>([])

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setHostingPlans([
        {
          name: "Shared Hosting",
          description: "Perfect for small websites and blogs",
          price: "$5.99/month",
          icon: Server,
          features: [
            "10GB SSD Storage",
            "Unmetered Bandwidth",
            "Free SSL Certificate",
            "1-Click WordPress Install",
            "24/7 Support"
          ],
          link: "/web-hosting/shared-hosting"
        },
        {
          name: "VPS Hosting",
          description: "For growing businesses and e-commerce",
          price: "$19.99/month",
          icon: Cpu,
          features: [
            "50GB SSD Storage",
            "Unmetered Bandwidth",
            "Free SSL Certificate",
            "Dedicated Resources",
            "Root Access",
            "Priority Support"
          ],
          link: "/web-hosting/vps",
          popular: true
        },
        {
          name: "Dedicated Server",
          description: "For high-traffic websites and applications",
          price: "$99.99/month",
          icon: Globe,
          features: [
            "500GB SSD Storage",
            "Unmetered Bandwidth",
            "Free SSL Certificate",
            "Full Server Control",
            "Dedicated IP Address",
            "Premium Support"
          ],
          link: "/web-hosting/dedicated"
        },
        {
          name: "Cloud Hosting",
          description: "Scalable cloud infrastructure",
          price: "$29.99/month",
          icon: Cloud,
          features: [
            "Auto-scaling Resources",
            "99.99% Uptime SLA",
            "Global CDN",
            "Instant Provisioning",
            "API Access",
            "24/7 Monitoring"
          ],
          link: "/web-hosting/cloud"
        },
        {
          name: "Email Hosting",
          description: "Professional business email",
          price: "$3.99/month",
          icon: Mailbox,
          features: [
            "50GB Mailbox Storage",
            "Custom Domain Email",
            "Spam Protection",
            "Calendar & Contacts",
            "Webmail Access",
            "IMAP/POP3 Support"
          ],
          link: "/web-hosting/email"
        },
        {
          name: "Reseller Hosting",
          description: "White-label hosting for agencies",
          price: "$24.99/month",
          icon: Users,
          features: [
            "100GB SSD Storage",
            "Unmetered Bandwidth",
            "Free WHMCS License",
            "Custom Branding",
            "Client Management",
            "Priority Support"
          ],
          link: "/web-hosting/reseller"
        }
      ])
      setIsLoading(false)
    }, 1500) // 1.5 second delay to simulate loading

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <WebHostingLoading />
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Web Hosting Solutions</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Reliable, high-performance hosting solutions for businesses of all sizes. Our infrastructure is built for
          speed, security, and scalability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {hostingPlans.map((plan) => (
          <Card 
            key={plan.name}
            className={`flex flex-col ${plan.popular ? "border-2 border-primary" : ""}`}
          >
            <CardHeader>
              <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
                <plan.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-3xl font-bold mb-6">
                {plan.price}
              </p>
              <ul className="space-y-2">
                {plan.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>{feature}</span>
                    </li>
              ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href={plan.link}>
                  {plan.popular ? "Most Popular" : "Get Started"}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="bg-muted rounded-xl p-8 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">All Hosting Plans Include</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We provide enterprise-grade infrastructure and support for all our hosting plans.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-background p-6 rounded-lg">
            <h3 className="font-medium mb-2">99.9% Uptime Guarantee</h3>
            <p className="text-sm text-muted-foreground">We guarantee your website will be online 99.9% of the time.</p>
          </div>
          <div className="bg-background p-6 rounded-lg">
            <h3 className="font-medium mb-2">Free Website Migration</h3>
            <p className="text-sm text-muted-foreground">Our experts will move your website to our servers for free.</p>
          </div>
          <div className="bg-background p-6 rounded-lg">
            <h3 className="font-medium mb-2">Daily Backups</h3>
            <p className="text-sm text-muted-foreground">
              Your data is automatically backed up daily for peace of mind.
            </p>
          </div>
          <div className="bg-background p-6 rounded-lg">
            <h3 className="font-medium mb-2">24/7 Support</h3>
            <p className="text-sm text-muted-foreground">Our technical support team is available around the clock.</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Our hosting experts can recommend the perfect solution for your specific needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/contact">Contact Sales</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/pricing">Compare All Plans</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
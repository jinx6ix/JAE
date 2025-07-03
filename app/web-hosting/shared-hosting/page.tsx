import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Server, Check, HardDrive, Zap, Globe, Shield } from "lucide-react"
import Link from "next/link"

export default function SharedHostingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$5.99",
      period: "/month",
      description: "Perfect for personal websites",
      features: [
        "10GB SSD Storage",
        "Unmetered Bandwidth",
        "1 Website",
        "Free SSL Certificate",
        "100 Email Accounts"
      ],
      cta: "Get Started"
    },
    {
      name: "Business",
      price: "$9.99",
      period: "/month",
      description: "Ideal for small businesses",
      features: [
        "50GB SSD Storage",
        "Unmetered Bandwidth",
        "10 Websites",
        "Free SSL & CDN",
        "Unlimited Email Accounts",
        "Free Domain (1st year)"
      ],
      cta: "Most Popular",
      popular: true
    },
    {
      name: "Premium",
      price: "$14.99",
      period: "/month",
      description: "For high-traffic sites",
      features: [
        "100GB SSD Storage",
        "Unmetered Bandwidth",
        "Unlimited Websites",
        "Free SSL, CDN & Backup",
        "Unlimited Email Accounts",
        "Free Domain (1st year)",
        "Priority Support"
      ],
      cta: "Get Premium"
    }
  ]

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Shared Hosting</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Affordable, reliable hosting perfect for personal websites, blogs, and small businesses. 
          Share server resources with other websites while enjoying enterprise-grade infrastructure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {plans.map((plan, index) => (
          <Card key={index} className={`flex flex-col ${plan.popular ? "border-2 border-primary" : ""}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </div>
            )}
            <CardHeader>
              <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
                <Server className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-3xl font-bold mb-6">
                {plan.price}<span className="text-sm font-normal text-muted-foreground">{plan.period}</span>
              </p>
              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/signup">{plan.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Why Choose Our Shared Hosting?</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <Zap className="h-6 w-6 text-primary mr-4 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Lightning Fast Performance</h3>
                <p className="text-muted-foreground">
                  Our NVMe SSD storage and LiteSpeed servers ensure your website loads in milliseconds.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Shield className="h-6 w-6 text-primary mr-4 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Built-in Security</h3>
                <p className="text-muted-foreground">
                  Free SSL, DDoS protection, and malware scanning keep your site secure.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Globe className="h-6 w-6 text-primary mr-4 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Global Data Centers</h3>
                <p className="text-muted-foreground">
                  Choose from 8 locations worldwide for optimal performance.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-muted rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-6">Free Website Migration</h3>
          <p className="text-muted-foreground mb-6">
            Our experts will move your existing website to our servers for free, with zero downtime.
          </p>
          <form className="space-y-4">
            <div>
              <label htmlFor="domain" className="block mb-2">Current Website URL</label>
              <input 
                type="text" 
                id="domain" 
                placeholder="yourwebsite.com" 
                className="w-full px-4 py-2 rounded-lg border"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2">Email Address</label>
              <input 
                type="email" 
                id="email" 
                placeholder="you@example.com" 
                className="w-full px-4 py-2 rounded-lg border"
              />
            </div>
            <Button type="submit" className="w-full">
              Request Free Migration
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
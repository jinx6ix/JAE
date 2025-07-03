import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Zap, Shield, RefreshCw, Server, Rocket, Check } from "lucide-react"
import Link from "next/link"
import LiveChat from "@/components/live-chat"
import AvailabilityChecker from "@/components/availability-checker"

export default function CloudHostingPage() {
  const plans = [
    {
      name: "Starter Cloud",
      price: "$29.99",
      period: "/month",
      specs: "2 vCPU, 4GB RAM, 80GB SSD",
      features: [
        "2TB Bandwidth",
        "Auto-scaling",
        "Global CDN",
        "99.9% SLA",
        "24/7 Monitoring"
      ],
      cta: "Deploy Now"
    },
    {
      name: "Business Cloud",
      price: "$59.99",
      period: "/month",
      specs: "4 vCPU, 8GB RAM, 160GB SSD",
      features: [
        "4TB Bandwidth",
        "Auto-scaling+",
        "Premium CDN",
        "99.95% SLA",
        "DDoS Protection",
        "Daily Backups"
      ],
      cta: "Most Popular",
      popular: true
    },
    {
      name: "Enterprise Cloud",
      price: "$129.99",
      period: "/month",
      specs: "8 vCPU, 16GB RAM, 320GB SSD",
      features: [
        "8TB Bandwidth",
        "Advanced Scaling",
        "Enterprise CDN",
        "99.99% SLA",
        "DDoS Protection",
        "Hourly Backups",
        "Dedicated Support"
      ],
      cta: "Contact Sales"
    }
  ]

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Cloud Hosting</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Scalable cloud infrastructure with automatic resource allocation and global content delivery.
        </p>
      </div>

      {/* Live Chat Bubble */}
      <LiveChat />

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
                <Cloud className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription className="font-medium">{plan.specs}</CardDescription>
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
                <Link href={plan.cta === "Contact Sales" ? "/contact" : "/deploy"}>{plan.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Resource Calculator */}
      <div className="bg-muted rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Cloud Resource Calculator</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">vCPU Cores</label>
                <input title="Range" type="range" min="1" max="16" defaultValue="4" className="w-full" />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>1 Core</span>
                  <span>16 Cores</span>
                </div>
              </div>
              <div>
                <label className="block mb-2 font-medium">Memory</label>
                <input title="Range" type="range" min="1" max="64" defaultValue="8" className="w-full" />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>1GB</span>
                  <span>64GB</span>
                </div>
              </div>
              <div>
                <label className="block mb-2 font-medium">Storage</label>
                <input title="Range" type="range" min="20" max="1000" defaultValue="100" className="w-full" />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>20GB</span>
                  <span>1TB</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-background p-6 rounded-lg border border-primary">
            <h3 className="text-xl font-bold mb-4">Estimated Cost</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>vCPU Cores</span>
                <span className="font-medium">4 × $7.50</span>
              </div>
              <div className="flex justify-between">
                <span>Memory</span>
                <span className="font-medium">8GB × $2.00</span>
              </div>
              <div className="flex justify-between">
                <span>SSD Storage</span>
                <span className="font-medium">100GB × $0.10</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                <span>Monthly Total</span>
                <span className="text-primary">$59.00/mo</span>
              </div>
            </div>
            <Button className="w-full">Deploy This Configuration</Button>
          </div>
        </div>
      </div>

      {/* Data Center Availability */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Global Data Center Availability</h2>
        <AvailabilityChecker />
      </div>

      {/* Case Study */}
      <div className="bg-muted rounded-xl p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Case Study: E-Commerce Scaling</h2>
            <p className="text-muted-foreground mb-4">
              How ShopFast scaled their infrastructure 10x during Black Friday with our auto-scaling cloud.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span>Handled 500,000 concurrent users</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span>Zero downtime during traffic spikes</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span>Saved 60% vs. traditional hosting</span>
              </li>
            </ul>
            <Button variant="outline" asChild>
              <Link href="/case-studies/shopfast">Read Full Case Study</Link>
            </Button>
          </div>
          <div className="bg-background p-4 rounded-lg border">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground">Video Case Study</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
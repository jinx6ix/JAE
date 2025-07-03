import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Cpu, HardDrive, Zap, Shield, Server, Rocket, Check } from "lucide-react"
import Link from "next/link"

export default function VPSHostingPage() {
  const plans = [
    {
      name: "Basic VPS",
      price: "$19.99",
      period: "/month",
      specs: "2 vCPU, 4GB RAM, 80GB SSD",
      features: [
        "2TB Bandwidth",
        "1 IPv4 Address",
        "Root Access",
        "24/7 Monitoring",
        "Basic Support"
      ],
      cta: "Get Started"
    },
    {
      name: "Business VPS",
      price: "$39.99",
      period: "/month",
      specs: "4 vCPU, 8GB RAM, 160GB SSD",
      features: [
        "4TB Bandwidth",
        "2 IPv4 Addresses",
        "Root Access",
        "DDoS Protection",
        "Priority Support",
        "Free Backups"
      ],
      cta: "Most Popular",
      popular: true
    },
    {
      name: "Enterprise VPS",
      price: "$79.99",
      period: "/month",
      specs: "8 vCPU, 16GB RAM, 320GB SSD",
      features: [
        "8TB Bandwidth",
        "4 IPv4 Addresses",
        "Root Access",
        "DDoS Protection",
        "24/7 VIP Support",
        "Free Backups & Snapshots"
      ],
      cta: "Get Enterprise"
    }
  ]

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">VPS Hosting</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Get the perfect balance of affordability and power with our virtual private servers. 
          Dedicated resources with full root access for complete control.
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
                <Cpu className="h-6 w-6 text-primary" />
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
                <Link href="/signup">{plan.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Managed VPS Hosting Features</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <Rocket className="h-6 w-6 text-primary mr-4 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Instant Provisioning</h3>
                <p className="text-muted-foreground">
                  Your VPS is ready in minutes with our automated deployment system.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Shield className="h-6 w-6 text-primary mr-4 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Enhanced Security</h3>
                <p className="text-muted-foreground">
                  Weekly patches, firewall configuration, and DDoS protection included.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Server className="h-6 w-6 text-primary mr-4 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Choice of OS</h3>
                <p className="text-muted-foreground">
                  Ubuntu, CentOS, Debian, Windows Server, and more available.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-muted rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-6">Need a Custom VPS Solution?</h3>
          <p className="text-muted-foreground mb-6">
            Our engineers can design a tailored VPS configuration for your specific requirements.
          </p>
          <form className="space-y-4">
            <div>
              <label htmlFor="resources" className="block mb-2">Required Resources</label>
              <select id="resources" className="w-full px-4 py-2 rounded-lg border">
                <option>Select configuration</option>
                <option>High CPU (Compute Optimized)</option>
                <option>High RAM (Memory Optimized)</option>
                <option>High Storage (Storage Optimized)</option>
                <option>Custom Configuration</option>
              </select>
            </div>
            <div>
              <label htmlFor="notes" className="block mb-2">Special Requirements</label>
              <textarea 
                id="notes" 
                rows={3} 
                placeholder="Describe your needs..." 
                className="w-full px-4 py-2 rounded-lg border"
              />
            </div>
            <Button type="submit" className="w-full">
              Request Custom Quote
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
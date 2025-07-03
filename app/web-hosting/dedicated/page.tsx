import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Server, Cpu, HardDrive, Shield, Zap, Wrench, Check } from "lucide-react"
import Link from "next/link"

export default function DedicatedHostingPage() {
  const servers = [
    {
      name: "Essential Server",
      price: "$99.99",
      period: "/month",
      specs: "Intel Xeon E-2236, 16GB RAM, 2×480GB SSD",
      features: [
        "10TB Bandwidth",
        "5 IPv4 Addresses",
        "100Mbps Uplink",
        "Basic Management",
        "24/7 Monitoring"
      ],
      cta: "Configure"
    },
    {
      name: "Business Server",
      price: "$199.99",
      period: "/month",
      specs: "AMD EPYC 7302P, 32GB RAM, 2×960GB SSD",
      features: [
        "20TB Bandwidth",
        "10 IPv4 Addresses",
        "1Gbps Uplink",
        "Semi-Managed",
        "DDoS Protection",
        "Free Backups"
      ],
      cta: "Most Popular",
      popular: true
    },
    {
      name: "Enterprise Server",
      price: "$399.99",
      period: "/month",
      specs: "Dual Intel Xeon Silver, 64GB RAM, 4×960GB SSD",
      features: [
        "Unmetered Bandwidth",
        "20 IPv4 Addresses",
        "1Gbps Uplink",
        "Fully Managed",
        "DDoS Protection",
        "24/7 VIP Support",
        "Free Backups & Snapshots"
      ],
      cta: "Contact Sales"
    }
  ]

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Dedicated Servers</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Enterprise-grade bare metal servers with maximum performance, security, and control 
          for mission-critical applications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {servers.map((server, index) => (
          <Card key={index} className={`flex flex-col ${server.popular ? "border-2 border-primary" : ""}`}>
            {server.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </div>
            )}
            <CardHeader>
              <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
                <Server className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{server.name}</CardTitle>
              <CardDescription className="font-medium">{server.specs}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-3xl font-bold mb-6">
                {server.price}<span className="text-sm font-normal text-muted-foreground">{server.period}</span>
              </p>
              <ul className="space-y-2">
                {server.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href={server.cta === "Contact Sales" ? "/contact" : "/configure"}>{server.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Why Choose Dedicated Servers?</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <Zap className="h-6 w-6 text-primary mr-4 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Exclusive Resources</h3>
                <p className="text-muted-foreground">
                  No sharing CPU, RAM, or bandwidth with other customers - all resources are yours alone.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Shield className="h-6 w-6 text-primary mr-4 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Enhanced Security</h3>
                <p className="text-muted-foreground">
                  Isolated hardware provides superior protection against vulnerabilities.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Wrench className="h-6 w-6 text-primary mr-4 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Custom Configuration</h3>
                <p className="text-muted-foreground">
                  Choose your OS, control panel, and software stack with complete freedom.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-muted rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-6">Server Customization Options</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Operating System</h4>
              <div className="flex flex-wrap gap-2">
                {["Ubuntu", "CentOS", "Debian", "Windows Server", "FreeBSD"].map((os) => (
                  <span key={os} className="px-3 py-1 bg-background rounded-full text-sm">
                    {os}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Control Panels</h4>
              <div className="flex flex-wrap gap-2">
                {["cPanel", "Plesk", "Webmin", "DirectAdmin", "None"].map((panel) => (
                  <span key={panel} className="px-3 py-1 bg-background rounded-full text-sm">
                    {panel}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Add-ons</h4>
              <div className="flex flex-wrap gap-2">
                {["Managed Support", "DDoS Protection", "Backup Storage", "Load Balancer"].map((addon) => (
                  <span key={addon} className="px-3 py-1 bg-background rounded-full text-sm">
                    {addon}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
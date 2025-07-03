import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Server, Shield, Globe, Cpu, Cloud, Lock } from "lucide-react"
import Link from "next/link"

export default function ServicesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Services</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Comprehensive solutions for your web hosting and cybersecurity needs
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <Server className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Web Hosting</CardTitle>
              <CardDescription>Fast, reliable hosting solutions for websites of all sizes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-primary" />
                  <span className="font-medium">Shared Hosting</span>
                </div>
                <p className="text-sm text-muted-foreground pl-6">Affordable hosting for small websites and blogs</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Cpu className="h-4 w-4 mr-2 text-primary" />
                  <span className="font-medium">VPS Hosting</span>
                </div>
                <p className="text-sm text-muted-foreground pl-6">Dedicated resources for growing businesses</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Server className="h-4 w-4 mr-2 text-primary" />
                  <span className="font-medium">Dedicated Servers</span>
                </div>
                <p className="text-sm text-muted-foreground pl-6">Maximum performance for high-traffic websites</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Cloud className="h-4 w-4 mr-2 text-primary" />
                  <span className="font-medium">Cloud Hosting</span>
                </div>
                <p className="text-sm text-muted-foreground pl-6">Scalable solutions with pay-as-you-go pricing</p>
              </div>
              <Button className="w-full mt-4" asChild>
                <Link href="/web-hosting">Learn More</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Cybersecurity</CardTitle>
              <CardDescription>Comprehensive protection for your digital assets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-primary" />
                  <span className="font-medium">Threat Protection</span>
                </div>
                <p className="text-sm text-muted-foreground pl-6">
                  Defense against malware, ransomware, and cyber attacks
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Lock className="h-4 w-4 mr-2 text-primary" />
                  <span className="font-medium">Data Security</span>
                </div>
                <p className="text-sm text-muted-foreground pl-6">
                  Encryption and protection for sensitive information
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Server className="h-4 w-4 mr-2 text-primary" />
                  <span className="font-medium">Compliance</span>
                </div>
                <p className="text-sm text-muted-foreground pl-6">
                  Meet regulatory requirements and industry standards
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-primary" />
                  <span className="font-medium">Incident Response</span>
                </div>
                <p className="text-sm text-muted-foreground pl-6">
                  24/7 monitoring and rapid response to security incidents
                </p>
              </div>
              <Button className="w-full mt-4" asChild>
                <Link href="/cybersecurity">Learn More</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

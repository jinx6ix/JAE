"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Shield, Lock, AlertTriangle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function CybersecurityPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-pulse">
            <Shield className="h-16 w-16 text-primary mx-auto mb-4 animate-spin" style={{ animationDuration: '2s' }} />
          </div>
          <h2 className="text-xl font-semibold">Securing Your Connection...</h2>
          <p className="text-muted-foreground mt-2">Initializing security protocols</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Cybersecurity Solutions</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Protect your business with enterprise-grade security solutions. Our comprehensive cybersecurity services
          defend against modern threats.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">Comprehensive Protection for Your Digital Assets</h2>
          <p className="text-muted-foreground mb-6">
            In today's digital landscape, cybersecurity isn't optional—it's essential. Our solutions provide
            multi-layered protection against evolving threats, keeping your data, applications, and infrastructure
            secure.
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-primary mr-2 mt-1" />
              <span>Advanced threat detection and prevention</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-primary mr-2 mt-1" />
              <span>24/7 security monitoring and incident response</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-primary mr-2 mt-1" />
              <span>Vulnerability assessment and penetration testing</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-primary mr-2 mt-1" />
              <span>Compliance management for regulatory requirements</span>
            </li>
          </ul>
          <Button size="lg" asChild>
            <Link href="/contact">Schedule a Security Assessment</Link>
          </Button>
        </div>
        <div className="relative h-[400px] rounded-xl overflow-hidden">
          <Image
            src="/placeholder.svg?height=800&width=800"
            alt="Cybersecurity visualization"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card>
          <CardHeader>
            <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Threat Protection</CardTitle>
            <CardDescription>Defend against malware, ransomware, and zero-day attacks</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Advanced firewall protection</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Intrusion detection and prevention</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Endpoint security solutions</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Email security and anti-phishing</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">
              Learn More
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Data Security</CardTitle>
            <CardDescription>Protect sensitive information and ensure compliance</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Data encryption (at rest and in transit)</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Access control and authentication</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Data loss prevention (DLP)</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Compliance management</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">
              Learn More
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Incident Response</CardTitle>
            <CardDescription>Rapid response and recovery from security incidents</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>24/7 security monitoring</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Incident detection and analysis</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Threat containment and eradication</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Post-incident recovery and reporting</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">
              Learn More
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="bg-muted rounded-xl p-8 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Our Security Process</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We follow a comprehensive approach to ensure your digital assets are protected at every level.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-background p-6 rounded-lg text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="font-bold">1</span>
            </div>
            <h3 className="font-medium mb-2">Assessment</h3>
            <p className="text-sm text-muted-foreground">Identify vulnerabilities and security gaps</p>
          </div>
          <div className="bg-background p-6 rounded-lg text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="font-bold">2</span>
            </div>
            <h3 className="font-medium mb-2">Planning</h3>
            <p className="text-sm text-muted-foreground">Develop a tailored security strategy</p>
          </div>
          <div className="bg-background p-6 rounded-lg text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="font-bold">3</span>
            </div>
            <h3 className="font-medium mb-2">Implementation</h3>
            <p className="text-sm text-muted-foreground">Deploy security solutions and controls</p>
          </div>
          <div className="bg-background p-6 rounded-lg text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="font-bold">4</span>
            </div>
            <h3 className="font-medium mb-2">Monitoring</h3>
            <p className="text-sm text-muted-foreground">Continuous security monitoring and improvement</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Business?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Our cybersecurity experts are ready to help you protect your digital assets.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/contact">Get a Security Assessment</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/cybersecurity/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
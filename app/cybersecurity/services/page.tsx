"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Code, Cloud, Network, Server } from "lucide-react"
import Link from "next/link"

const serviceCards = [
  {
    icon: Shield,
    title: "Threat Protection",
    description: "Advanced defense against evolving cyber threats",
    features: ["Malware protection", "Firewall management", "Intrusion prevention"],
    link: "/services/threat-protection"
  },
  {
    icon: Lock,
    title: "Data Security",
    description: "Protect sensitive business information",
    features: ["Encryption", "Access controls", "DLP solutions"],
    link: "/services/data-security"
  },
  {
    icon: Code,
    title: "App Security",
    description: "Secure your applications end-to-end",
    features: ["Penetration testing", "Code review", "API security"],
    link: "/services/app-security"
  },
  {
    icon: Cloud,
    title: "Cloud Security",
    description: "Enterprise-grade cloud protection",
    features: ["CSPM", "CASB", "Cloud-native security"],
    link: "/services/cloud-security"
  },
  {
    icon: Network,
    title: "Network Security",
    description: "Secure your infrastructure",
    features: ["VPN solutions", "Zero Trust", "Network segmentation"],
    link: "/services/network-security"
  },
  {
    icon: Server,
    title: "Compliance",
    description: "Meet regulatory requirements",
    features: ["SOC 2", "HIPAA", "GDPR", "PCI DSS"],
    link: "/services/compliance"
  }
]

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">Our Cybersecurity Services</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Comprehensive protection tailored to your business needs.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
      >
        {serviceCards.map((service, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline" asChild>
                  <Link href={service.link}>Learn More</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
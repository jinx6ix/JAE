"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Banknote, HeartPulse, ShoppingCart, Factory } from "lucide-react"
import Link from "next/link"

const industries = [
  {
    icon: Banknote,
    title: "Financial Services",
    description: "Protecting transactions, customer data, and financial systems",
    cta: "Secure your financial institution"
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    description: "HIPAA-compliant protection for patient data and medical systems",
    cta: "Healthcare security solutions"
  },
  {
    icon: ShoppingCart,
    title: "Retail & E-Commerce",
    description: "Secure payment processing and customer data protection",
    cta: "Retail security services"
  },
  {
    icon: Factory,
    title: "Manufacturing",
    description: "Protecting industrial systems and supply chain data",
    cta: "Industrial cybersecurity"
  }
]

export default function IndustriesPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">Industry-Specific Cybersecurity</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Tailored solutions for your sector's unique challenges.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } }
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
      >
        {industries.map((industry, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
                  <industry.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{industry.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{industry.description}</p>
                <Button asChild>
                  <Link href={`/industries/${industry.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    {industry.cta}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
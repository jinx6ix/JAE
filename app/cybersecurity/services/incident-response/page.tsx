"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Clock, AlertCircle, Users } from "lucide-react"
import Link from "next/link"

export default function IncidentResponsePage() {
  const steps = [
    {
      title: "Detection",
      description: "Immediate identification of security incidents",
      icon: AlertCircle
    },
    {
      title: "Containment",
      description: "Isolate affected systems to prevent spread",
      icon: Shield
    },
    {
      title: "Remediation",
      description: "Eliminate threat and restore systems",
      icon: Users
    },
    {
      title: "Recovery",
      description: "Full system restoration and monitoring",
      icon: Clock
    }
  ]

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">Incident Response</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Rapid response and recovery from security breaches with our 24/7 SOC team.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full text-center">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{step.title}</CardTitle>
                <p className="text-muted-foreground">{step.description}</p>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="bg-muted rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Emergency Response</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          For active security incidents, contact our SOC team immediately.
        </p>
        <Button size="lg" variant="destructive" asChild>
          <Link href="tel:+15551234567">Call SOC: +1 (555) 123-4567</Link>
        </Button>
      </div>
    </div>
  )
}
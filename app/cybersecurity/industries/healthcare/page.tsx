"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HeartPulse, Shield, ClipboardList, Check } from "lucide-react"
import Link from "next/link"

export default function HealthcarePage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center mb-4">
          <HeartPulse className="h-8 w-8 text-red-500 mr-3" />
          <h1 className="text-4xl font-bold tracking-tight">Healthcare Security</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          HIPAA-compliant solutions to protect patient data and medical systems.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6">Secure Healthcare Infrastructure</h2>
          <p className="text-muted-foreground mb-6">
            Our specialized solutions address the unique security challenges of healthcare 
            organizations, from hospitals to health tech startups.
          </p>
          <ul className="space-y-4 mb-8">
            {[
              "HIPAA-compliant hosting",
              "PHI data encryption",
              "Medical device security",
              "Audit logging and reporting"
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-muted rounded-xl p-8"
        >
          <div className="flex items-center mb-6">
            <ClipboardList className="h-6 w-6 text-primary mr-3" />
            <h3 className="text-xl font-bold">HIPAA Requirements</h3>
          </div>
          <ul className="space-y-4">
            {[
              "Data encryption at rest and in transit",
              "Access controls and audit logs",
              "Business Associate Agreement (BAA)",
              "Risk assessment and management"
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-3"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="text-center">
        <Button size="lg" asChild>
          <Link href="/contact">Request HIPAA Consultation</Link>
        </Button>
      </div>
    </div>
  )
}
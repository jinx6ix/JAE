"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Lock, ShieldCheck } from "lucide-react"
import Link from "next/link"

const frameworks = [
  {
    name: "HIPAA",
    description: "Healthcare data protection",
    icon: ShieldCheck
  },
  {
    name: "GDPR",
    description: "EU data privacy regulation",
    icon: Lock
  },
  {
    name: "SOC 2",
    description: "Security operations compliance",
    icon: FileText
  }
]

export default function CompliancePage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">Compliance Solutions</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Meet regulatory requirements with our comprehensive compliance framework.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {frameworks.map((framework, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full text-center">
              <CardHeader>
                <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center mx-auto">
                  <framework.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{framework.name}</CardTitle>
                <p className="text-muted-foreground">{framework.description}</p>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/compliance/${framework.name.toLowerCase()}`}>
                    Learn More
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="bg-muted rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Compliance Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            "Gap analysis and scoping",
            "Policy and control implementation",
            "Audit preparation and support"
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex items-start"
            >
              <div className="flex-shrink-0 bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center mr-4">
                {index + 1}
              </div>
              <p className="font-medium">{step}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
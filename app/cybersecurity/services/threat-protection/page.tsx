"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, Activity, AlertTriangle, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ThreatDetectionPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">Advanced Threat Detection</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Real-time monitoring and proactive defense against evolving cyber threats.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6">Stop Attacks Before They Happen</h2>
          <p className="text-muted-foreground mb-6">
            Our AI-powered threat detection system analyzes patterns across your entire 
            infrastructure to identify and neutralize threats in real-time.
          </p>
          <ul className="space-y-4 mb-8">
            {[
              "Behavioral anomaly detection",
              "Zero-day exploit prevention",
              "Network traffic analysis",
              "Automated threat intelligence"
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Button size="lg" asChild>
            <Link href="/contact">Request Demo</Link>
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative h-[400px] rounded-xl overflow-hidden"
        >
          <Image
            src="/threat-dashboard.svg"
            alt="Threat detection dashboard"
            fill
            className="object-cover"
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: Eye,
            title: "Continuous Monitoring",
            description: "24/7 surveillance of your digital assets"
          },
          {
            icon: Activity,
            title: "Behavioral Analysis",
            description: "AI detects abnormal patterns"
          },
          {
            icon: AlertTriangle,
            title: "Instant Alerts",
            description: "Real-time notifications"
          }
        ].map((feature, index) => (
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
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
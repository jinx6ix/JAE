"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Lock, ShieldCheck, ArrowLeft, CheckCircle, Clock, Users, Database, FileBarChart } from "lucide-react"
import Link from "next/link"

export default function GDPRCompliancePage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/cybersecurity/services/compliance" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Compliance
          </Link>
        </Button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-4"
        >
          <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
            <Lock className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">GDPR Compliance</h1>
            <p className="text-xl text-muted-foreground">
              EU data privacy and protection regulation
            </p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            <h2>About GDPR</h2>
            <p>
              The General Data Protection Regulation (GDPR) is a comprehensive data protection law that came into effect 
              in the European Union in May 2018. It applies to all organizations that process personal data of EU citizens, 
              regardless of where the organization is located.
            </p>
            
            <h3>Key Principles</h3>
            <ul>
              <li>Lawfulness, fairness and transparency</li>
              <li>Purpose limitation</li>
              <li>Data minimization</li>
              <li>Accuracy</li>
              <li>Storage limitation</li>
              <li>Integrity and confidentiality</li>
              <li>Accountability</li>
            </ul>

            <h3>Our GDPR Compliance Solutions</h3>
            <p>
              We help organizations implement the technical and organizational measures required to comply with GDPR, 
              including data mapping, consent management, and breach response planning.
            </p>
          </motion.div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                "Data protection impact assessments",
                "Records of processing activities",
                "Data subject rights management",
                "Consent management platform",
                "Data breach response planning",
                "Data protection by design and by default"
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start"
                >
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Implementation Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-purple-500 mr-2" />
                <span>Typically 2-4 months</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-muted rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">GDPR Compliance Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          {[
            { title: "Data Mapping", desc: "Identify what personal data you process" },
            { title: "Gap Analysis", desc: "Compare current practices to GDPR requirements" },
            { title: "Remediation", desc: "Implement necessary changes" },
            { title: "Documentation", desc: "Create required policies and records" }
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                {index + 1}
              </div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Button size="lg" asChild>
          <Link href="/contact">Get Started with GDPR Compliance</Link>
        </Button>
      </div>
    </div>
  )
}
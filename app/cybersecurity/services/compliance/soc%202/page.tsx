"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Lock, ShieldCheck, ArrowLeft, CheckCircle, Clock, Users, Database, FileBarChart } from "lucide-react"
import Link from "next/link"

export default function SOC2CompliancePage() {
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
          <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
            <FileText className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">SOC 2 Compliance</h1>
            <p className="text-xl text-muted-foreground">
              Security operations center compliance and reporting
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
            <h2>About SOC 2</h2>
            <p>
              SOC 2 (System and Organization Controls 2) is an auditing procedure that ensures service providers 
              securely manage data to protect the interests of their clients and the privacy of their customers. 
              Developed by the American Institute of CPAs (AICPA), SOC 2 defines criteria for managing customer data 
              based on five "trust service principles".
            </p>
            
            <h3>Trust Service Principles</h3>
            <ul>
              <li>Security: Protection against unauthorized access</li>
              <li>Availability: System is available for operation and use</li>
              <li>Processing Integrity: System processing is complete, valid, accurate, timely, and authorized</li>
              <li>Confidentiality: Information designated as confidential is protected</li>
              <li>Privacy: Personal information is collected, used, retained, disclosed, and disposed of properly</li>
            </ul>

            <h3>Our SOC 2 Compliance Solutions</h3>
            <p>
              We help organizations prepare for SOC 2 audits by implementing the necessary controls, policies, 
              and procedures to meet the trust service criteria relevant to their business.
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
                "Security control implementation",
                "Policy and procedure development",
                "Risk assessment and management",
                "Incident response planning",
                "Vendor management programs",
                "Continuous monitoring solutions"
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
                <Clock className="h-5 w-5 text-green-500 mr-2" />
                <span>Typically 6-12 months</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-muted rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">SOC 2 Compliance Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          {[
            { title: "Scoping", desc: "Determine scope and trust principles" },
            { title: "Readiness", desc: "Gap analysis and control implementation" },
            { title: "Audit", desc: "Formal audit by CPA firm" },
            { title: "Report", desc: "Receive SOC 2 report" }
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
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
          <Link href="/contact">Get Started with SOC 2 Compliance</Link>
        </Button>
      </div>
    </div>
  )
}
"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Lock, ShieldCheck, ArrowLeft, CheckCircle, Clock, Users, Database, FileBarChart } from "lucide-react"
import Link from "next/link"

export default function HIPAACompliancePage() {
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
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
            <ShieldCheck className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">HIPAA Compliance</h1>
            <p className="text-xl text-muted-foreground">
              Healthcare data protection and security standards
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
            <h2>About HIPAA</h2>
            <p>
              The Health Insurance Portability and Accountability Act (HIPAA) sets the standard for protecting sensitive patient data. 
              Any company that deals with protected health information (PHI) must ensure that all the required physical, network, and 
              process security measures are in place and followed.
            </p>
            
            <h3>Key Requirements</h3>
            <ul>
              <li>Privacy Rule protecting patients' health information</li>
              <li>Security Rule for electronic protected health information (e-PHI)</li>
              <li>Breach Notification Rule requiring notification after a breach</li>
              <li>Enforcement Rule containing provisions relating to compliance and investigations</li>
            </ul>

            <h3>Our HIPAA Compliance Solutions</h3>
            <p>
              We provide comprehensive solutions to help healthcare organizations and their business associates achieve 
              and maintain HIPAA compliance through secure infrastructure, policies, and procedures.
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
                "Secure data encryption at rest and in transit",
                "Access controls and authentication",
                "Audit trails and activity monitoring",
                "Business Associate Agreement (BAA)",
                "Regular risk assessments",
                "Breach notification procedures"
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
                <Clock className="h-5 w-5 text-blue-500 mr-2" />
                <span>Typically 3-6 months</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-muted rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">HIPAA Compliance Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          {[
            { title: "Assessment", desc: "Gap analysis and risk assessment" },
            { title: "Planning", desc: "Develop policies and procedures" },
            { title: "Implementation", desc: "Deploy security controls" },
            { title: "Maintenance", desc: "Ongoing monitoring and training" }
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-primary/10 text-primary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
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
          <Link href="/contact">Get Started with HIPAA Compliance</Link>
        </Button>
      </div>
    </div>
  )
}
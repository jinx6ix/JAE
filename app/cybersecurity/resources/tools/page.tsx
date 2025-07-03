"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Shield, Search, Key } from "lucide-react"
import Link from "next/link"

const tools = [
  {
    title: "Password Strength Checker",
    description: "Test how secure your passwords are",
    icon: Lock,
    link: "/tools/password-checker"
  },
  {
    title: "Data Breach Scanner",
    description: "Check if your email appears in known breaches",
    icon: Shield,
    link: "/tools/breach-scanner"
  },
  {
    title: "Website Security Test",
    description: "Scan your website for common vulnerabilities",
    icon: Search,
    link: "/tools/security-test"
  },
  {
    title: "Encryption Generator",
    description: "Create secure encryption keys",
    icon: Key,
    link: "/tools/encryption-generator"
  }
]

export default function ToolsPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">Security Tools</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Free tools to help you assess and improve your security posture.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {tools.map((tool, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
                  <tool.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{tool.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{tool.description}</p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={tool.link}>Use Tool</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
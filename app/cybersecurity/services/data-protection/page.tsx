"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Database, Shield, Key } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function DataProtectionPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">Data Protection</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Secure your sensitive data with enterprise-grade encryption and access controls.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6">End-to-End Data Security</h2>
          <p className="text-muted-foreground mb-6">
            Protect data at rest, in transit, and in use with our comprehensive security framework.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { icon: Lock, text: "Encryption" },
              { icon: Database, text: "Data Masking" },
              { icon: Shield, text: "Access Controls" },
              { icon: Key, text: "Key Management" }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="flex items-center p-4 border rounded-lg"
              >
                <item.icon className="h-5 w-5 text-primary mr-3" />
                <span>{item.text}</span>
              </motion.div>
            ))}
          </div>
          <Button size="lg" asChild>
            <Link href="/contact">Get Data Assessment</Link>
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative h-[400px] rounded-xl overflow-hidden"
        >
          <Image
            src="/data-protection.svg"
            alt="Data protection illustration"
            fill
            className="object-cover"
          />
        </motion.div>
      </div>
    </div>
  )
}
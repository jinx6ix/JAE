"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Banknote, Shield, CreditCard } from "lucide-react"
import Link from "next/link"

export default function FinancePage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center mb-4">
          <Banknote className="h-8 w-8 text-green-500 mr-3" />
          <h1 className="text-4xl font-bold tracking-tight">Financial Services Security</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          PCI DSS compliant solutions for banks, fintech, and financial institutions.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6">Secure Financial Infrastructure</h2>
          <p className="text-muted-foreground mb-6">
            Protect sensitive financial data and transactions with our specialized security 
            solutions designed for the finance industry.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { icon: Shield, text: "Fraud Prevention" },
              { icon: CreditCard, text: "PCI Compliance" },
              { icon: Banknote, text: "Transaction Security" },
              { icon: Shield, text: "SOC 2 Audits" }
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
            <Link href="/contact">Get Financial Security Audit</Link>
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-muted rounded-xl p-8"
        >
          <h3 className="text-xl font-bold mb-6">PCI DSS Requirements</h3>
          <ul className="space-y-4">
            {[
              "Build and maintain a secure network",
              "Protect cardholder data",
              "Maintain vulnerability management",
              "Implement strong access controls",
              "Regularly monitor and test networks",
              "Maintain information security policy"
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-3"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  )
}
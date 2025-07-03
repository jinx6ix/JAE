"use client"

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Server, Shield, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          How Can We Help?
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Whether you need hosting support or security consultation, our team is ready.
        </p>
      </motion.div>

      {/* Contact Cards */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
      >
        {[
          {
            icon: Server,
            title: "Hosting Support",
            content: "24/7 technical assistance for hosting services",
            action: "Open Ticket",
            link: "#hosting-support",
            color: "text-blue-500",
          },
          {
            icon: Shield,
            title: "Security Team",
            content: "Emergency security incidents only",
            action: "Contact SOC",
            link: "#security-contact",
            color: "text-red-500",
          },
          {
            icon: Mail,
            title: "General Inquiries",
            content: "hello@company.com",
            action: "Email Us",
            link: "mailto:hello@company.com",
            color: "text-primary",
          },
          {
            icon: Phone,
            title: "Sales",
            content: "+1 (555) 123-4567",
            action: "Call Now",
            link: "tel:+15551234567",
            color: "text-green-500",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Card className="h-full border-t-4" style={{ borderTopColor: item.color }}>
              <CardHeader>
                <div className={`p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center ${item.color}`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{item.content}</p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={item.link}>{item.action}</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Dual-Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
      >
        {/* Hosting Form */}
        <div className="bg-muted rounded-xl p-8">
          <div className="flex items-center mb-6">
            <Server className="h-6 w-6 text-blue-500 mr-3" />
            <h2 className="text-2xl font-bold">Hosting Inquiry</h2>
          </div>
          <form className="space-y-4">
            <div>
              <label htmlFor="hosting-plan" className="block mb-2">Interested Plan</label>
              <select
                id="hosting-plan"
                className="w-full px-4 py-2 rounded-lg border"
              >
                <option>Shared Hosting</option>
                <option>VPS</option>
                <option>Dedicated Server</option>
                <option>Managed WordPress</option>
              </select>
            </div>
            <div>
              <label htmlFor="hosting-email" className="block mb-2">Email</label>
              <input
                type="email"
                id="hosting-email"
                className="w-full px-4 py-2 rounded-lg border"
              />
            </div>
            <div>
              <label htmlFor="hosting-message" className="block mb-2">Requirements</label>
              <textarea
                id="hosting-message"
                rows={3}
                className="w-full px-4 py-2 rounded-lg border"
              ></textarea>
            </div>
            <Button type="submit" className="w-full">
              Request Hosting Quote
            </Button>
          </form>
        </div>

        {/* Security Form */}
        <div className="bg-muted rounded-xl p-8">
          <div className="flex items-center mb-6">
            <Shield className="h-6 w-6 text-red-500 mr-3" />
            <h2 className="text-2xl font-bold">Security Consultation</h2>
          </div>
          <form className="space-y-4">
            <div>
              <label htmlFor="security-service" className="block mb-2">Service Needed</label>
              <select
                id="security-service"
                className="w-full px-4 py-2 rounded-lg border"
              >
                <option>Vulnerability Assessment</option>
                <option>Penetration Testing</option>
                <option>Compliance Audit</option>
                <option>Incident Response</option>
              </select>
            </div>
            <div>
              <label htmlFor="security-email" className="block mb-2">Email</label>
              <input
                type="email"
                id="security-email"
                className="w-full px-4 py-2 rounded-lg border"
              />
            </div>
            <div>
              <label htmlFor="urgency" className="block mb-2">Urgency</label>
              <select
                id="urgency"
                className="w-full px-4 py-2 rounded-lg border"
              >
                <option>Standard (48h response)</option>
                <option>High Priority (24h response)</option>
                <option>Emergency (4h response)</option>
              </select>
            </div>
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
              Request Security Audit
            </Button>
          </form>
        </div>
      </motion.div>

      {/* Live Chat CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-primary/10 rounded-xl p-8 text-center"
      >
        <div className="flex justify-center mb-4">
          <MessageSquare className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Need Immediate Help?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Our live chat team can assist with both hosting and security issues in real-time.
        </p>
        <Button size="lg" className="bg-primary hover:bg-primary/90">
          Start Live Chat
        </Button>
      </motion.div>
    </div>
  );
}
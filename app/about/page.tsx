"use client"

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Server, Globe, Cpu, Users, Award, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Secure Hosting, Unmatched Protection
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We combine high-performance web hosting with enterprise-grade cybersecurity 
          to keep your online presence fast, reliable, and safe.
        </p>
      </motion.div>

      {/* Dual Offerings Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center mb-6">
            <Server className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl font-bold">Web Hosting</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            From shared hosting to dedicated servers, we deliver 99.9% uptime, 
            SSD storage, and global CDN integration. Perfect for businesses 
            that demand speed and reliability.
          </p>
          <ul className="space-y-3 mb-8">
            {[
              "WordPress-optimized hosting",
              "24/7 server monitoring",
              "Auto-scaling cloud solutions",
              "Free SSL certificates",
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
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl font-bold">Cybersecurity</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Protect your hosted applications with our integrated security suite, 
            including DDoS protection, malware scanning, and compliance auditing.
          </p>
          <ul className="space-y-3 mb-8">
            {[
              "Web Application Firewall (WAF)",
              "DDoS mitigation",
              "Automated backups & recovery",
              "SOC 2 & HIPAA compliance",
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
      >
        {[
          { icon: Globe, title: "10,000+", description: "Websites Hosted" },
          { icon: Cpu, title: "99.9%", description: "Uptime Guarantee" },
          { icon: Shield, title: "Zero", description: "Successful Breaches" },
        ].map((item, index) => (
          <motion.div key={index} variants={fadeIn}>
            <Card className="h-full text-center">
              <CardHeader>
                <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center mx-auto">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{item.title}</CardTitle>
                <p className="text-muted-foreground">{item.description}</p>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-muted rounded-xl p-8 text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          We’re the only provider that combines enterprise hosting infrastructure 
          with military-grade security—all at competitive prices.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/contact">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/services">Compare Plans</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
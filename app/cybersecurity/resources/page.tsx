"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, FileText, Video, ShieldAlert } from "lucide-react"
import Link from "next/link"

const resources = [
  {
    icon: BookOpen,
    title: "Cybersecurity Guides",
    description: "Comprehensive guides on security best practices",
    count: "12+ Guides"
  },
  {
    icon: FileText,
    title: "Whitepapers",
    description: "In-depth research on emerging threats",
    count: "8 Whitepapers"
  },
  {
    icon: Video,
    title: "Webinars",
    description: "Live and recorded security sessions",
    count: "Monthly Events"
  },
  {
    icon: ShieldAlert,
    title: "Threat Reports",
    description: "Quarterly threat intelligence updates",
    count: "Latest Trends"
  }
]

export default function ResourcesPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">Security Resources</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Knowledge to strengthen your defenses.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
      >
        {resources.map((resource, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 }
            }}
            whileHover={{ y: -5 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
                  <resource.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{resource.title}</CardTitle>
                <p className="text-muted-foreground">{resource.description}</p>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-primary">{resource.count}</span>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="#">Explore</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="bg-muted rounded-xl p-8 text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Subscribe to Security Updates</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Get the latest threat intelligence and security tips delivered to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email"
            className="px-4 py-2 rounded-lg border flex-grow"
          />
          <Button>Subscribe</Button>
        </div>
      </motion.div>
    </div>
  )
}
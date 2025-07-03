"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Clock, User } from "lucide-react"
import Link from "next/link"

const blogPosts = [
  {
    title: "Ransomware Trends in 2024",
    description: "How attackers are evolving their tactics and how to protect your business",
    date: "May 15, 2024",
    readTime: "8 min read",
    author: "Sarah Johnson",
    category: "Threat Intelligence"
  },
  // Add more blog posts...
]

export default function BlogPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">Security Insights</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Expert analysis and practical advice for staying secure.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {blogPosts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full flex flex-col">
              <CardHeader>
                <span className="text-sm text-primary mb-2">{post.category}</span>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="h-4 w-4 mr-1" />
                  <span>By {post.author}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="pl-0" asChild>
                  <Link href={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    Read Article →
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline" size="lg">
          View All Articles
        </Button>
      </div>
    </div>
  )
}
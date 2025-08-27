"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Search, 
  Calendar, 
  User, 
  Clock,
  ArrowRight,
  BookOpen,
  Shield,
  Server,
  Code,
  Globe,
  Tag,
  Send,
  CheckCircle
} from "lucide-react"

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log("Subscribed:", email)
    setIsSubscribed(true)
    setEmail("")
    
    // Reset after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Security Measures for Web Hosting Environments",
      excerpt: "Learn the critical security practices every hosting provider should implement to protect client data and maintain service integrity.",
      category: "security",
      author: "Sarah Johnson",
      date: "2023-10-15",
      readTime: "8 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 2,
      title: "Understanding SSD vs HDD: Which Storage Solution is Best for Your Website?",
      excerpt: "A comprehensive comparison of storage technologies and how they impact website performance, reliability, and cost.",
      category: "hosting",
      author: "Michael Chen",
      date: "2023-10-08",
      readTime: "6 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "How to Implement Zero Trust Architecture in Your Organization",
      excerpt: "A practical guide to adopting Zero Trust security principles to protect against modern cyber threats.",
      category: "security",
      author: "David Rodriguez",
      date: "2023-10-01",
      readTime: "12 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 4,
      title: "The Future of Cloud Hosting: Trends to Watch in 2024",
      excerpt: "Explore the emerging technologies and trends that will shape the cloud hosting landscape in the coming year.",
      category: "hosting",
      author: "Emily Watson",
      date: "2023-09-24",
      readTime: "7 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 5,
      title: "Preventing DDoS Attacks: A Comprehensive Guide for Web Hosts",
      excerpt: "Learn effective strategies to detect, mitigate, and prevent distributed denial-of-service attacks against your hosting infrastructure.",
      category: "security",
      author: "James Wilson",
      date: "2023-09-17",
      readTime: "10 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 6,
      title: "WordPress Performance Optimization: Advanced Caching Techniques",
      excerpt: "Discover advanced caching strategies to dramatically improve your WordPress site speed and user experience.",
      category: "development",
      author: "Lisa Thompson",
      date: "2023-09-10",
      readTime: "9 min read",
      image: "/api/placeholder/400/250"
    }
  ]

  const categories = [
    { id: "all", name: "All Topics", icon: BookOpen },
    { id: "security", name: "Cybersecurity", icon: Shield },
    { id: "hosting", name: "Web Hosting", icon: Server },
    { id: "development", name: "Development", icon: Code },
    { id: "industry", name: "Industry News", icon: Globe }
  ]

  const popularTags = [
    "WordPress", "SSL", "DDoS Protection", "Cloud Migration", "PHP 8", "CDN", 
    "Backup Strategies", "Server Hardening", "GDPR Compliance", "Performance Optimization"
  ]

  const filteredPosts = activeCategory === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory)

  const searchedPosts = searchQuery 
    ? filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredPosts

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto py-16 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-green-400">
            Insights & Expertise
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Stay updated with the latest trends, best practices, and technical guides in web hosting and cybersecurity
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            />
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Categories */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map(category => {
                    const Icon = category.icon
                    return (
                      <Button
                        key={category.id}
                        variant={activeCategory === category.id ? "default" : "ghost"}
                        className={`w-full justify-start ${activeCategory === category.id 
                          ? "bg-cyan-600 hover:bg-cyan-700" 
                          : "text-gray-300 hover:text-white hover:bg-gray-700"}`}
                        onClick={() => setActiveCategory(category.id)}
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        {category.name}
                      </Button>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg">Popular Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map(tag => (
                      <Button
                        key={tag}
                        variant="outline"
                        size="sm"
                        className="text-xs text-cyan-400 border-cyan-400 hover:bg-cyan-400/10"
                      >
                        <Tag className="mr-1 h-3 w-3" /> {tag}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Subscription */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg">Stay Updated</CardTitle>
                  <CardDescription className="text-gray-400">
                    Get the latest articles delivered to your inbox
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubscribed ? (
                    <div className="text-center py-4">
                      <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-300">You're subscribed!</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="blog-email" className="sr-only">Email address</Label>
                        <Input
                          id="blog-email"
                          type="email"
                          placeholder="Your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="bg-gray-700 border-gray-600"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-cyan-600 to-green-600 hover:from-cyan-700 hover:to-green-700"
                      >
                        <Send className="mr-2 h-4 w-4" /> Subscribe
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Blog Posts */}
          <div className="lg:col-span-3">
            {/* Category Filter Buttons for Mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="lg:hidden flex overflow-x-auto gap-2 pb-4 mb-6 -mx-4 px-4"
            >
              {categories.map(category => {
                const Icon = category.icon
                return (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "outline"}
                    size="sm"
                    className={`whitespace-nowrap ${activeCategory === category.id 
                      ? "bg-cyan-600 hover:bg-cyan-700" 
                      : "text-cyan-400 border-cyan-400 hover:bg-cyan-400/10"}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <Icon className="mr-1 h-3 w-3" />
                    {category.name}
                  </Button>
                )
              })}
            </motion.div>

            {/* Featured Post */}
            {searchedPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0 md:w-1/2">
                      <div className="h-64 md:h-full bg-gradient-to-r from-cyan-500/10 to-green-500/10"></div>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <div className="flex items-center gap-4 text-sm text-gray-300 mb-3">
                        <span className="bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded text-xs">
                          {searchedPosts[0].category.charAt(0).toUpperCase() + searchedPosts[0].category.slice(1)}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" /> 
                          {new Date(searchedPosts[0].date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" /> 
                          {searchedPosts[0].readTime}
                        </span>
                      </div>
                      <CardTitle className="text-2xl mb-3">{searchedPosts[0].title}</CardTitle>
                      <p className="text-gray-300 mb-4">{searchedPosts[0].excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center mr-2">
                            <User className="h-4 w-4 text-cyan-400" />
                          </div>
                          <span className="text-sm text-gray-300">{searchedPosts[0].author}</span>
                        </div>
                        <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300">
                          Read Article <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Posts Grid */}
            {searchedPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {searchedPosts.slice(1).map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-gray-800 border-gray-700 h-full hover:border-cyan-500/30 transition-colors">
                      <div className="h-48 bg-gradient-to-r from-cyan-500/10 to-green-500/10"></div>
                      <CardHeader>
                        <div className="flex items-center gap-3 text-sm text-gray-300 mb-2">
                          <span className="bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded text-xs">
                            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" /> 
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                        </div>
                        <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                        <CardDescription className="text-gray-300">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center mr-2">
                              <User className="h-3 w-3 text-cyan-400" />
                            </div>
                            <span className="text-sm text-gray-300">{post.author}</span>
                          </div>
                          <span className="text-sm text-gray-400 flex items-center">
                            <Clock className="mr-1 h-3 w-3" /> {post.readTime}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center py-12"
              >
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-gray-300">
                  {searchQuery 
                    ? `No results for "${searchQuery}". Try a different search term.`
                    : "No articles available in this category."}
                </p>
                {(searchQuery || activeCategory !== "all") && (
                  <Button 
                    variant="link" 
                    className="text-cyan-400 mt-4"
                    onClick={() => {
                      setSearchQuery("")
                      setActiveCategory("all")
                    }}
                  >
                    View all articles
                  </Button>
                )}
              </motion.div>
            )}

            {/* Load More Button */}
            {searchedPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-12"
              >
                <Button 
                  variant="outline" 
                  className="text-cyan-400 border-cyan-400 hover:bg-cyan-400/10"
                  size="lg"
                >
                  Load More Articles
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Users,
  Shield,
  Server,
  Code,
  Globe,
  Heart,
  Zap,
  BookOpen,
  DollarSign,
  Home,
  Calendar,
  ArrowRight,
  CheckCircle,
  Send,
  MapPin
} from "lucide-react"

export default function CareersPage() {
  const [activeDepartment, setActiveDepartment] = useState("all")
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

  // Sample job positions data
  const jobPositions = [
    {
      id: 1,
      title: "Senior Cybersecurity Analyst",
      department: "security",
      type: "Full-time",
      location: "Remote",
      description: "Join our SOC team to monitor, detect, and respond to security incidents."
    },
    {
      id: 2,
      title: "DevOps Engineer",
      department: "engineering",
      type: "Full-time",
      location: "San Francisco, CA",
      description: "Build and maintain our cloud infrastructure and deployment pipelines."
    },
    {
      id: 3,
      title: "Frontend Developer",
      department: "engineering",
      type: "Full-time",
      location: "Remote",
      description: "Create beautiful and responsive user interfaces for our hosting control panel."
    },
    {
      id: 4,
      title: "Technical Support Specialist",
      department: "support",
      type: "Full-time",
      location: "Remote",
      description: "Help customers resolve technical issues with their hosting environments."
    },
    {
      id: 5,
      title: "SOC Manager",
      department: "security",
      type: "Full-time",
      location: "New York, NY",
      description: "Lead our Security Operations Center and incident response team."
    },
    {
      id: 6,
      title: "Sales Engineer",
      department: "sales",
      type: "Full-time",
      location: "Remote",
      description: "Bridge the gap between technical capabilities and customer needs."
    }
  ]

  const departments = [
    { id: "all", name: "All Departments", icon: Users },
    { id: "security", name: "Security", icon: Shield },
    { id: "engineering", name: "Engineering", icon: Code },
    { id: "support", name: "Support", icon: Server },
    { id: "sales", name: "Sales", icon: Globe }
  ]

  const benefits = [
    {
      icon: DollarSign,
      title: "Competitive Salary",
      description: "We offer industry-leading compensation packages"
    },
    {
      icon: Calendar,
      title: "Flexible PTO",
      description: "Take the time you need to rest and recharge"
    },
    {
      icon: Home,
      title: "Remote Work",
      description: "Work from anywhere in the world"
    },
    {
      icon: BookOpen,
      title: "Learning Budget",
      description: "Annual stipend for professional development"
    },
    {
      icon: Heart,
      title: "Health Benefits",
      description: "Comprehensive medical, dental, and vision insurance"
    },
    {
      icon: Zap,
      title: "Cutting-edge Tech",
      description: "Work with the latest tools and technologies"
    }
  ]

  const filteredJobs = activeDepartment === "all" 
    ? jobPositions 
    : jobPositions.filter(job => job.department === activeDepartment)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto py-16 px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-green-400">
            Build the Future of Secure Web Hosting
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Join our team of experts working at the intersection of performance hosting and enterprise cybersecurity
          </p>
          <Button size="lg" className="bg-gradient-to-r from-cyan-600 to-green-600 hover:from-cyan-700 hover:to-green-700">
            View Open Positions <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>

      {/* Culture Section */}
      <div className="container mx-auto py-16 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Our Culture</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            We believe in innovation, collaboration, and making the internet a safer place for everyone. 
            Our team values technical excellence, continuous learning, and work-life balance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: "Mission Driven",
              description: "We're committed to building a more secure internet for businesses and individuals alike."
            },
            {
              title: "Technical Excellence",
              description: "We hire experts and give them the tools and autonomy to do their best work."
            },
            {
              title: "Collaborative Spirit",
              description: "We believe that the best solutions emerge from diverse perspectives working together."
            }
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center mx-auto mb-4">
                <div className="w-4 h-4 bg-cyan-400 rounded-full"></div>
              </div>
              <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
              <p className="text-gray-300">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto py-16 px-4 md:px-6 bg-gray-800/20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Employee Benefits</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            We invest in our team's well-being and professional growth with comprehensive benefits
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start p-4 bg-gray-800/30 rounded-lg border border-gray-700"
            >
              <div className="p-2 rounded-lg bg-green-500/10 mr-4 flex-shrink-0">
                <benefit.icon className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{benefit.title}</h3>
                <p className="text-gray-300 text-sm">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Open Positions Section */}
      <div className="container mx-auto py-16 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-6">
            Explore opportunities to join our growing team
          </p>
        </motion.div>

        {/* Department Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {departments.map(dept => {
            const Icon = dept.icon
            return (
              <Button
                key={dept.id}
                variant={activeDepartment === dept.id ? "default" : "outline"}
                className={`flex items-center ${activeDepartment === dept.id 
                  ? "bg-cyan-600 hover:bg-cyan-700" 
                  : "text-cyan-400 border-cyan-400 hover:bg-cyan-400/10"}`}
                onClick={() => setActiveDepartment(dept.id)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {dept.name}
              </Button>
            )
          })}
        </motion.div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-cyan-500/30 transition-colors"
            >
              <h3 className="font-semibold text-lg mb-2">{job.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-300 mb-3">
                <span className="flex items-center">
                  <Users className="mr-1 h-4 w-4" /> 
                  {job.department.charAt(0).toUpperCase() + job.department.slice(1)}
                </span>
                <span className="flex items-center">
                  <MapPin className="mr-1 h-4 w-4" /> 
                  {job.location}
                </span>
              </div>
              <p className="text-gray-300 mb-4">{job.description}</p>
              <Button variant="outline" className="text-cyan-400 border-cyan-400 hover:bg-cyan-400/10">
                Apply Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <p className="text-gray-300">No positions currently available in this department.</p>
            <Button 
              variant="link" 
              className="text-cyan-400 mt-4"
              onClick={() => setActiveDepartment("all")}
            >
              View all positions
            </Button>
          </motion.div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="container mx-auto py-16 px-4 md:px-6 bg-gray-800/20 rounded-xl max-w-4xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            Join our talent community to receive updates on new positions and company news
          </p>
          
          {isSubscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center py-3 px-6 rounded-lg bg-green-500/10 border border-green-500/20"
            >
              <CheckCircle className="mr-2 h-5 w-5 text-green-400" />
              <span>You're subscribed!</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <Label htmlFor="careers-email" className="sr-only">Email address</Label>
                <Input
                  id="careers-email"
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <Button type="submit" className="bg-gradient-to-r from-cyan-600 to-green-600 hover:from-cyan-700 hover:to-green-700">
                <Send className="mr-2 h-4 w-4" /> Subscribe
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}
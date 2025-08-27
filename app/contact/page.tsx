"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Server, 
  Shield, 
  Send,
  Clock,
  CheckCircle
} from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "web-hosting",
    message: ""
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        company: "",
        service: "web-hosting",
        message: ""
      })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header Section */}
      <div className="container mx-auto py-12 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-green-400">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get in touch with our experts to discuss your web hosting and cybersecurity needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <MessageSquare className="mr-2 h-6 w-6 text-cyan-400" />
                  Send us a message
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                    <p className="text-gray-300">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="bg-gray-700 border-gray-600"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                        className="bg-gray-700 border-gray-600"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company">Company (Optional)</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company name"
                        className="bg-gray-700 border-gray-600"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="service">I need help with</Label>
                      <select
                        title="Service"
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white"
                      >
                        <option value="web-hosting">Web Hosting</option>
                        <option value="cybersecurity">Cybersecurity</option>
                        <option value="both">Both Services</option>
                        <option value="other">Other Inquiry</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        rows={5}
                        required
                        className="bg-gray-700 border-gray-600"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-cyan-600 to-green-600 hover:from-cyan-700 hover:to-green-700"
                    >
                      <Send className="mr-2 h-4 w-4" /> Send Message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                  <div className="p-2 w-12 h-12 rounded-lg bg-cyan-500/10 mb-2 flex items-center justify-center">
                    <Server className="h-6 w-6 text-cyan-400" />
                  </div>
                  <CardTitle>Web Hosting Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm">
                    Get assistance with hosting plans, migrations, performance issues, and technical support.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                  <div className="p-2 w-12 h-12 rounded-lg bg-green-500/10 mb-2 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-green-400" />
                  </div>
                  <CardTitle>Cybersecurity Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm">
                    Consult with our security experts about vulnerability assessments, penetration testing, and compliance.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Details */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Get in touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-blue-500/10 mr-4 flex-shrink-0">
                    <Mail className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-300">support@yourcompany.com</p>
                    <p className="text-gray-300">sales@yourcompany.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-purple-500/10 mr-4 flex-shrink-0">
                    <Phone className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-gray-300">+1 (800) 123-4567 (Toll-free)</p>
                    <p className="text-gray-300">+1 (555) 123-4567 (International)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-amber-500/10 mr-4 flex-shrink-0">
                    <MapPin className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Office</h3>
                    <p className="text-gray-300">123 Tech Boulevard</p>
                    <p className="text-gray-300">San Francisco, CA 94107</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-green-500/10 mr-4 flex-shrink-0">
                    <Clock className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Support Hours</h3>
                    <p className="text-gray-300">24/7 Technical Support</p>
                    <p className="text-gray-300">Sales: Mon-Fri 9AM-6PM EST</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Support */}
            <Card className="bg-red-900/20 border-red-700/30">
              <CardHeader>
                <CardTitle className="text-red-400">Emergency Security Incident?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  If you're experiencing a security breach or urgent issue, contact our SOC immediately.
                </p>
                <Button variant="outline" className="w-full border-red-500 text-red-400 hover:bg-red-500/10">
                  <Shield className="mr-2 h-4 w-4" /> Emergency SOC Hotline: +1 (888) 911-SOC1
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto py-12 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Quick answers to common questions about our services and support
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              question: "How quickly can you respond to support requests?",
              answer: "We guarantee response within 15 minutes for critical issues, 1 hour for high priority, and 4 hours for standard requests."
            },
            {
              question: "Do you offer customized hosting solutions?",
              answer: "Yes, we provide fully customized hosting environments tailored to your specific performance and security requirements."
            },
            {
              question: "What compliance frameworks do you support?",
              answer: "We're experienced with HIPAA, GDPR, SOC 2, PCI DSS, and can help you achieve compliance for your specific industry."
            },
            {
              question: "Can you help migrate my existing website?",
              answer: "Absolutely! We offer free migration services for new customers to ensure a smooth transition with minimal downtime."
            }
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 p-6 rounded-lg border border-gray-700"
            >
              <h3 className="font-semibold mb-2 text-cyan-300">{faq.question}</h3>
              <p className="text-gray-300">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
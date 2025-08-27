"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Scale, Shield, AlertTriangle, User, Server, Globe, Lock, BookOpen, Mail } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header Section */}
      <div className="container mx-auto py-12 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 bg-cyan-500/10 rounded-full mb-6">
            <Scale className="h-8 w-8 text-cyan-400" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-green-400">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-gray-800/30 rounded-xl p-8 border border-gray-700">
            <p className="text-lg text-gray-300 mb-4">
              Welcome to <span className="text-cyan-400">YourCompany</span>. These Terms of Service govern your use of our 
              web hosting, cybersecurity services, and related products.
            </p>
            <p className="text-gray-300">
              Please read these terms carefully before using our services. By accessing or using our services, 
              you agree to be bound by these terms and our Privacy Policy. If you do not agree to these terms, 
              you may not access or use our services.
            </p>
          </div>
        </motion.div>

        {/* Main Terms Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Account Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-800 border-gray-700 h-full">
              <CardHeader className="flex flex-row items-center space-y-0 pb-3">
                <div className="p-2 rounded-lg bg-blue-500/10 mr-4">
                  <User className="h-5 w-5 text-blue-400" />
                </div>
                <CardTitle>Account Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>You must be at least 18 years old to use our services</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>You must provide accurate and complete registration information</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>You are responsible for maintaining the security of your account</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>You are responsible for all activities that occur under your account</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>You must notify us immediately of any unauthorized use of your account</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Service Usage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-800 border-gray-700 h-full">
              <CardHeader className="flex flex-row items-center space-y-0 pb-3">
                <div className="p-2 rounded-lg bg-green-500/10 mr-4">
                  <Server className="h-5 w-5 text-green-400" />
                </div>
                <CardTitle>Acceptable Use</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>You agree not to use our services for any illegal purpose</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>You agree not to engage in activities that disrupt our services</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>You agree not to attempt to gain unauthorized access to any systems</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>You agree not to distribute malware, viruses, or other harmful code</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>You agree not to engage in spamming or phishing activities</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Prohibited Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-800 border-gray-700 h-full">
              <CardHeader className="flex flex-row items-center space-y-0 pb-3">
                <div className="p-2 rounded-lg bg-amber-500/10 mr-4">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                </div>
                <CardTitle>Prohibited Content</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>Illegal or fraudulent activities</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>Copyright-infringing material</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>Malware, viruses, or malicious code</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>Adult content without proper age verification</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>Content that promotes violence, hate speech, or discrimination</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Payments & Billing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-800 border-gray-700 h-full">
              <CardHeader className="flex flex-row items-center space-y-0 pb-3">
                <div className="p-2 rounded-lg bg-purple-500/10 mr-4">
                  <BookOpen className="h-5 w-5 text-purple-400" />
                </div>
                <CardTitle>Payments & Billing</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>All fees are quoted in USD and are exclusive of taxes</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>Payment is due upon receipt of invoice</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>Services may be suspended for overdue payments</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>Refunds are subject to our refund policy</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>Price changes will be communicated 30 days in advance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional Terms Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-16"
        >
          <div className="bg-gray-800/30 rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6 text-cyan-300">Additional Terms</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <Shield className="h-5 w-5 text-cyan-400 mr-2" />
                  Service Level Agreement (SLA)
                </h3>
                <p className="text-gray-300 mb-3">
                  We guarantee 99.9% uptime for our hosting services. If we fall below this guarantee, 
                  you may be eligible for service credits as outlined in our SLA.
                </p>
                <p className="text-gray-300">
                  Scheduled maintenance windows are excluded from uptime calculations. We will provide 
                  at least 48 hours notice for scheduled maintenance.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <Globe className="h-5 w-5 text-cyan-400 mr-2" />
                  Intellectual Property
                </h3>
                <p className="text-gray-300">
                  We retain all intellectual property rights to our services, software, and documentation. 
                  You retain all rights to your content. By using our services, you grant us a limited license 
                  to store, display, and transmit your content solely for providing the services.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <Lock className="h-5 w-5 text-cyan-400 mr-2" />
                  Data Protection & Security
                </h3>
                <p className="text-gray-300 mb-3">
                  We implement industry-standard security measures to protect your data. However, you understand 
                  that no system is completely secure and we cannot guarantee absolute security.
                </p>
                <p className="text-gray-300">
                  You are responsible for maintaining appropriate security measures for your account, including 
                  using strong passwords and keeping them confidential.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-cyan-400 mr-2" />
                  Limitation of Liability
                </h3>
                <p className="text-gray-300">
                  To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, 
                  special, consequential, or punitive damages, including loss of profits, data, or business opportunities.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <FileText className="h-5 w-5 text-cyan-400 mr-2" />
                  Termination
                </h3>
                <p className="text-gray-300 mb-3">
                  Either party may terminate services for any reason with 30 days written notice. We may suspend 
                  or terminate services immediately for violations of these terms.
                </p>
                <p className="text-gray-300">
                  Upon termination, we may delete your content and data after a 30-day grace period. It is your 
                  responsibility to backup your data before termination.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <Mail className="h-5 w-5 text-cyan-400 mr-2" />
                  Governing Law & Dispute Resolution
                </h3>
                <p className="text-gray-300 mb-3">
                  These terms are governed by the laws of the State of California. Any disputes shall be resolved 
                  through binding arbitration in San Francisco, California, rather than in court.
                </p>
                <p className="text-gray-300">
                  You agree to waive your right to a jury trial and to participate in a class-action lawsuit.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Changes to Terms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-12"
        >
          <div className="bg-cyan-900/20 rounded-xl p-6 border border-cyan-700/30">
            <h3 className="text-lg font-semibold mb-2 text-cyan-300">Changes to Terms</h3>
            <p className="text-gray-300">
              We may modify these terms at any time. We will provide notice of material changes through 
              our website or by email. Your continued use of our services after changes become effective 
              constitutes acceptance of the revised terms.
            </p>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-12 text-center"
        >
          <h3 className="text-xl font-semibold mb-4 text-cyan-300">Questions About Our Terms?</h3>
          <p className="text-gray-300 mb-6">
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="outline" className="text-cyan-400 border-cyan-400 hover:bg-cyan-400/10">
              <Mail className="mr-2 h-4 w-4" /> legal@yourcompany.com
            </Button>
            <Button asChild variant="outline" className="text-cyan-400 border-cyan-400 hover:bg-cyan-400/10">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </motion.div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-12 text-center"
        >
          <p className="text-gray-300 mb-6">
            For more information, please review our:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" className="text-cyan-400 border-cyan-400 hover:bg-cyan-400/10">
              <Link href="/privacy">Privacy Policy</Link>
            </Button>
            <Button variant="outline" className="text-cyan-400 border-cyan-400 hover:bg-cyan-400/10">
              Acceptable Use Policy
            </Button>
            <Button variant="outline" className="text-cyan-400 border-cyan-400 hover:bg-cyan-400/10">
              Service Level Agreement
            </Button>
            <Button variant="outline" className="text-cyan-400 border-cyan-400 hover:bg-cyan-400/10">
              GDPR Compliance
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
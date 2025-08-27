"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, Server, UserCheck, Mail, Database, FileText } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
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
            <Shield className="h-8 w-8 text-cyan-400" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-green-400">
            Privacy Policy
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
              At <span className="text-cyan-400">YourCompany</span>, we take privacy and data protection seriously. 
              As a provider of web hosting and cybersecurity services, we understand the importance of safeguarding 
              your personal information.
            </p>
            <p className="text-gray-300">
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use 
              our services, visit our website, or interact with us. Please read this policy carefully to understand 
              our practices regarding your personal data.
            </p>
          </div>
        </motion.div>

        {/* Policy Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Information We Collect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-800 border-gray-700 h-full">
              <CardHeader className="flex flex-row items-center space-y-0 pb-3">
                <div className="p-2 rounded-lg bg-blue-500/10 mr-4">
                  <Database className="h-5 w-5 text-blue-400" />
                </div>
                <CardTitle>Information We Collect</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>Personal identification information (Name, email address, phone number)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>Billing information (payment details, billing address)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>Technical data (IP address, browser type, device information)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>Usage data (pages visited, services used, timestamps)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>Customer support communications</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* How We Use Your Information */}
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
                <CardTitle>How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>To provide and maintain our services</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>To process transactions and send invoices</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>To communicate with you about services, updates, and security alerts</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>To improve our services and develop new features</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>To detect, prevent, and address technical issues and security vulnerabilities</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Data Protection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-800 border-gray-700 h-full">
              <CardHeader className="flex flex-row items-center space-y-0 pb-3">
                <div className="p-2 rounded-lg bg-amber-500/10 mr-4">
                  <Lock className="h-5 w-5 text-amber-400" />
                </div>
                <CardTitle>Data Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>Encryption of data in transit and at rest</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>Regular security audits and vulnerability assessments</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>Access controls and authentication mechanisms</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>Employee training on data protection and privacy</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>Incident response and breach notification procedures</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Your Rights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-800 border-gray-700 h-full">
              <CardHeader className="flex flex-row items-center space-y-0 pb-3">
                <div className="p-2 rounded-lg bg-purple-500/10 mr-4">
                  <UserCheck className="h-5 w-5 text-purple-400" />
                </div>
                <CardTitle>Your Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>Right to access your personal information</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>Right to correct inaccurate or incomplete data</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>Right to erasure of your personal data</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>Right to restrict or object to processing</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>Right to data portability</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span>Right to withdraw consent at any time</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional Policy Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-16"
        >
          <div className="bg-gray-800/30 rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6 text-cyan-300">Additional Information</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <Eye className="h-5 w-5 text-cyan-400 mr-2" />
                  Data Retention
                </h3>
                <p className="text-gray-300">
                  We retain your personal information only for as long as necessary to fulfill the purposes 
                  for which we collected it, including to satisfy any legal, accounting, or reporting requirements. 
                  Typically, we retain customer data for 7 years after the termination of services unless a longer 
                  retention period is required by law.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <FileText className="h-5 w-5 text-cyan-400 mr-2" />
                  Third-Party Disclosures
                </h3>
                <p className="text-gray-300">
                  We may share your information with trusted third-party service providers who assist us in 
                  operating our website, conducting our business, or servicing you. These parties are contractually 
                  obligated to keep your information confidential and use it only for the purposes for which we 
                  disclose it to them. We never sell your personal information to third parties.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <Shield className="h-5 w-5 text-cyan-400 mr-2" />
                  International Data Transfers
                </h3>
                <p className="text-gray-300">
                  Your information may be transferred to and processed in countries other than the country in 
                  which you reside. These countries may have data protection laws that are different from the 
                  laws of your country. We ensure appropriate safeguards are in place to protect your personal 
                  information, including standard contractual clauses and other mechanisms.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <Mail className="h-5 w-5 text-cyan-400 mr-2" />
                  Contact Us
                </h3>
                <p className="text-gray-300 mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact our 
                  Data Protection Officer at:
                </p>
                <p className="text-cyan-400">privacy@yourcompany.com</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Policy Updates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-12"
        >
          <div className="bg-cyan-900/20 rounded-xl p-6 border border-cyan-700/30">
            <h3 className="text-lg font-semibold mb-2 text-cyan-300">Policy Updates</h3>
            <p className="text-gray-300">
              We may update this Privacy Policy from time to time to reflect changes in our practices or 
              for other operational, legal, or regulatory reasons. We will notify you of any material changes 
              by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </div>
        </motion.div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-12 text-center"
        >
          <p className="text-gray-300 mb-6">
            For more information about our data practices, please also review our:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="text-cyan-400 border-cyan-400 hover:bg-cyan-400/10">
              Terms of Service
            </Button>
            <Button variant="outline" className="text-cyan-400 border-cyan-400 hover:bg-cyan-400/10">
              Cookie Policy
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
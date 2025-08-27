"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Cookie, Shield, Server, BarChart3, Settings, Eye, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

export default function CookiesPage() {
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Always enabled
    analytics: true,
    marketing: false,
    functional: true
  })

  const [preferencesSaved, setPreferencesSaved] = useState(false)

  const handlePreferenceChange = (cookieType: string) => {
    if (cookieType === "necessary") return // Cannot disable necessary cookies
    
    setCookiePreferences(prev => ({
      ...prev,
      [cookieType]: !prev[cookieType as keyof typeof prev]
    }))
  }

  const savePreferences = () => {
    // Here you would typically save preferences to localStorage or a cookie
    console.log("Cookie preferences saved:", cookiePreferences)
    setPreferencesSaved(true)
    
    // Reset success message after 3 seconds
    setTimeout(() => setPreferencesSaved(false), 3000)
  }

  const acceptAll = () => {
    setCookiePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    })
    setPreferencesSaved(true)
    setTimeout(() => setPreferencesSaved(false), 3000)
  }

  const rejectAll = () => {
    setCookiePreferences({
      necessary: true, // Cannot reject necessary cookies
      analytics: false,
      marketing: false,
      functional: false
    })
    setPreferencesSaved(true)
    setTimeout(() => setPreferencesSaved(false), 3000)
  }

  const cookieTypes = [
    {
      id: "necessary",
      name: "Necessary Cookies",
      description: "Essential for the website to function properly. These cookies ensure basic functionalities and security features of the website.",
      icon: Shield,
      alwaysEnabled: true
    },
    {
      id: "analytics",
      name: "Analytics Cookies",
      description: "Help us understand how visitors interact with our website. The data collected is used to improve the user experience.",
      icon: BarChart3,
      alwaysEnabled: false
    },
    {
      id: "marketing",
      name: "Marketing Cookies",
      description: "Used to track visitors across websites to display relevant advertisements and measure campaign effectiveness.",
      icon: Server,
      alwaysEnabled: false
    },
    {
      id: "functional",
      name: "Functional Cookies",
      description: "Enable enhanced functionality and personalization, such as remembering your preferences and settings.",
      icon: Settings,
      alwaysEnabled: false
    }
  ]

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
            <Cookie className="h-8 w-8 text-cyan-400" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-green-400">
            Cookies Policy
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
              At <span className="text-cyan-400">YourCompany</span>, we use cookies and similar technologies to 
              enhance your experience, analyze our traffic, and improve our services.
            </p>
            <p className="text-gray-300">
              This Cookies Policy explains what cookies are, how we use them, the types of cookies we use, 
              and how you can manage your cookie preferences.
            </p>
          </div>
        </motion.div>

        {/* What Are Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center space-y-0 pb-3">
              <div className="p-2 rounded-lg bg-blue-500/10 mr-4">
                <Eye className="h-5 w-5 text-blue-400" />
              </div>
              <CardTitle>What Are Cookies?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Cookies are small text files that are stored on your device (computer, tablet, or mobile) 
                when you visit websites. They are widely used to make websites work more efficiently and 
                provide information to the website owners.
              </p>
              <p className="text-gray-300">
                Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device 
                when you go offline, while session cookies are deleted as soon as you close your web browser.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Cookie Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 text-cyan-400 mr-2" />
                Cookie Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {cookieTypes.map((cookieType) => {
                  const Icon = cookieType.icon
                  return (
                    <div key={cookieType.id} className="flex items-start justify-between p-4 bg-gray-700/30 rounded-lg">
                      <div className="flex items-start">
                        <div className="p-2 rounded-lg bg-cyan-500/10 mr-4 flex-shrink-0">
                          <Icon className="h-5 w-5 text-cyan-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{cookieType.name}</h3>
                          <p className="text-gray-300 text-sm">{cookieType.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center ml-4">
                        <Switch
                          id={cookieType.id}
                          checked={cookiePreferences[cookieType.id as keyof typeof cookiePreferences]}
                          onCheckedChange={() => handlePreferenceChange(cookieType.id)}
                          disabled={cookieType.alwaysEnabled}
                          className="data-[state=checked]:bg-cyan-600 data-[state=unchecked]:bg-gray-600"
                        />
                        <Label htmlFor={cookieType.id} className="sr-only">
                          {cookieType.name}
                        </Label>
                      </div>
                    </div>
                  )
                })}

                {preferencesSaved ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center py-3 px-4 rounded-lg bg-green-500/10 border border-green-500/20"
                  >
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                    <span>Preferences saved successfully!</span>
                  </motion.div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button 
                      onClick={savePreferences}
                      className="bg-gradient-to-r from-cyan-600 to-green-600 hover:from-cyan-700 hover:to-green-700"
                    >
                      Save Preferences
                    </Button>
                    <Button 
                      onClick={acceptAll}
                      variant="outline" 
                      className="text-cyan-400 border-cyan-400 hover:bg-cyan-400/10"
                    >
                      Accept All
                    </Button>
                    <Button 
                      onClick={rejectAll}
                      variant="outline" 
                      className="text-gray-400 border-gray-400 hover:bg-gray-400/10"
                    >
                      Reject All
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gray-800/30 rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6 text-cyan-300">Additional Information</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">How We Use Cookies</h3>
                <p className="text-gray-300 mb-3">
                  We use cookies for various purposes, including:
                </p>
                <ul className="text-gray-300 space-y-2 ml-6 list-disc">
                  <li>Authentication and security</li>
                  <li>Remembering your preferences and settings</li>
                  <li>Analyzing how you use our website</li>
                  <li>Measuring the effectiveness of our marketing campaigns</li>
                  <li>Providing personalized content and recommendations</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Third-Party Cookies</h3>
                <p className="text-gray-300">
                  In addition to our own cookies, we may also use various third-party cookies to report 
                  usage statistics of the service, deliver advertisements on and through the service, 
                  and so on. These cookies are subject to the respective privacy policies of these third parties.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Managing Cookies</h3>
                <p className="text-gray-300 mb-3">
                  Most web browsers allow you to control cookies through their settings preferences. 
                  However, limiting cookies may affect your experience on our website.
                </p>
                <p className="text-gray-300">
                  You can usually find these settings in the "options" or "preferences" menu of your browser. 
                  The following links provide information on how to manage cookies in different browsers:
                </p>
                <div className="flex flex-wrap gap-3 mt-3">
                  <Button variant="outline" size="sm" className="text-cyan-400 border-cyan-400 hover:bg-cyan-400/10">
                    Chrome
                  </Button>
                  <Button variant="outline" size="sm" className="text-cyan-400 border-cyan-400 hover:bg-cyan-400/10">
                    Firefox
                  </Button>
                  <Button variant="outline" size="sm" className="text-cyan-400 border-cyan-400 hover:bg-cyan-400/10">
                    Safari
                  </Button>
                  <Button variant="outline" size="sm" className="text-cyan-400 border-cyan-400 hover:bg-cyan-400/10">
                    Edge
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Do Not Track</h3>
                <p className="text-gray-300">
                  Some browsers have a "Do Not Track" feature that lets you tell websites that you do not 
                  want to have your online activities tracked. Our website does not currently respond to 
                  "Do Not Track" signals as there is no standard for how websites should respond to these signals.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Changes to This Policy</h3>
                <p className="text-gray-300">
                  We may update this Cookies Policy from time to time. We will notify you of any changes 
                  by posting the new Cookies Policy on this page and updating the "Last updated" date.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Contact Us</h3>
                <p className="text-gray-300">
                  If you have any questions about our use of cookies, please contact us at:
                </p>
                <p className="text-cyan-400 mt-2">privacy@yourcompany.com</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Documents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-12 text-center"
        >
          <p className="text-gray-300 mb-6">
            For more information about how we handle your data, please review our:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" className="text-cyan-400 border-cyan-400 hover:bg-cyan-400/10">
              <Link href="/privacy">Privacy Policy</Link>
            </Button>
            <Button asChild variant="outline" className="text-cyan-400 border-cyan-400 hover:bg-cyan-400/10">
              <Link href="/terms">Terms of Service</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
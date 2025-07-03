"use client"

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, Shield, Zap, Check, BadgeAlert, ChevronDown, Info } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Image from "next/image";

// Define types for plans
interface PlanFeature {
  text: string;
  tooltip?: string;
}

interface PricingPlan {
  name: string;
  price: number | string;
  period: string;
  description: string;
  features: PlanFeature[];
  cta: string;
  popular: boolean;
}

const hostingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: 9.99,
    period: "/month",
    description: "Ideal for small websites",
    features: [
      { text: "1 Website", tooltip: "Host one domain or subdomain" },
      { text: "10GB SSD Storage", tooltip: "High-speed solid state storage" },
      { text: "Unmetered Bandwidth", tooltip: "No traffic overage charges" },
      { text: "Free SSL Certificate", tooltip: "HTTPS encryption included" },
      { text: "24/7 Basic Support", tooltip: "Email and ticket support" }
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Business",
    price: 24.99,
    period: "/month",
    description: "Perfect for growing businesses",
    features: [
      { text: "10 Websites", tooltip: "Host up to 10 domains" },
      { text: "50GB SSD Storage", tooltip: "Ample space for media" },
      { text: "Unmetered Bandwidth", tooltip: "No traffic limits" },
      { text: "Free SSL & CDN", tooltip: "HTTPS + content delivery" },
      { text: "Daily Backups", tooltip: "Automatic daily snapshots" },
      { text: "Priority Support", tooltip: "Faster response times" }
    ],
    cta: "Most Popular",
    popular: true
  },
  {
    name: "Enterprise",
    price: 99.99,
    period: "/month",
    description: "For high-traffic applications",
    features: [
      { text: "Unlimited Websites", tooltip: "Host unlimited domains" },
      { text: "200GB NVMe Storage", tooltip: "Blazing fast storage" },
      { text: "Unmetered Bandwidth", tooltip: "Handle any traffic volume" },
      { text: "Free SSL, CDN & WAF", tooltip: "Full security stack" },
      { text: "Hourly Backups", tooltip: "Point-in-time recovery" },
      { text: "Dedicated Resources", tooltip: "Guaranteed performance" },
      { text: "24/7 VIP Support", tooltip: "Dedicated account manager" }
    ],
    cta: "Contact Sales",
    popular: false
  }
];

const securityPlans: PricingPlan[] = [
  {
    name: "Essential",
    price: 49,
    period: "/month",
    description: "Basic protection for small sites",
    features: [
      { text: "Malware Scanning", tooltip: "Weekly automated scans" },
      { text: "Basic WAF Rules", tooltip: "Protection against common web attacks" },
      { text: "DDoS Protection", tooltip: "5Gbps mitigation" },
      { text: "Monthly Reports", tooltip: "PDF security summaries" },
      { text: "Email Support", tooltip: "48h response time" }
    ],
    cta: "Add to Hosting",
    popular: false
  },
  {
    name: "Advanced",
    price: 199,
    period: "/month",
    description: "Comprehensive business security",
    features: [
      { text: "Advanced WAF", tooltip: "Custom rule configuration" },
      { text: "DDoS Mitigation", tooltip: "10Gbps protection" },
      { text: "Daily Scanning", tooltip: "Continuous monitoring" },
      { text: "VPN Access", tooltip: "Secure remote administration" },
      { text: "24/7 Monitoring", tooltip: "Real-time threat detection" },
      { text: "Phone Support", tooltip: "Direct access to security team" }
    ],
    cta: "Recommended",
    popular: true
  },
  {
    name: "Enterprise Security",
    price: "Custom",
    period: "",
    description: "Tailored protection suite",
    features: [
      { text: "Custom WAF Rules", tooltip: "Tailored to your applications" },
      { text: "Zero Trust Network", tooltip: "Micro-segmentation" },
      { text: "Penetration Testing", tooltip: "Regular ethical hacking" },
      { text: "SIEM Integration", tooltip: "Centralized logging" },
      { text: "Dedicated SOC Team", tooltip: "Your own security analysts" },
      { text: "Compliance Audits", tooltip: "HIPAA, SOC 2, etc." }
    ],
    cta: "Get Consultation",
    popular: false
  }
];

const customers = [
  { name: "Acme Inc", logo: "/logos/acme.svg" },
  { name: "Globex", logo: "/logos/globex.svg" },
  { name: "Stark Ind", logo: "/logos/stark.svg" },
  { name: "Wayne Ent", logo: "/logos/wayne.svg" },
];

export default function PricingPage() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [selectedHosting, setSelectedHosting] = useState<PricingPlan>(hostingPlans[1]);
  const [selectedSecurity, setSelectedSecurity] = useState<PricingPlan>(securityPlans[1]);
  const [total, setTotal] = useState<number>(
    typeof hostingPlans[1].price === 'number' && typeof securityPlans[1].price === 'number' 
      ? (hostingPlans[1].price + securityPlans[1].price) * 0.8 
      : 0
  );

  const calculateTotal = (hosting: PricingPlan, security: PricingPlan): number => {
    if (typeof hosting.price === 'number' && typeof security.price === 'number') {
      return (hosting.price + security.price) * 0.8; // 20% discount
    }
    return 0;
  };

  return (
    <TooltipProvider>
    <div className="container mx-auto py-12 px-4 md:px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Choose the perfect combination of hosting and security for your needs.
        </p>
        
        {/* Customer Logos */}
        <motion.div 
          className="flex flex-wrap justify-center gap-6 mt-8"
          initial="hidden"
          whileInView="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {customers.map((customer, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="bg-background p-3 rounded-lg"
            >
              <Image
                src={customer.logo}
                alt={customer.name}
                width={120}
                height={40}
                className="h-8 object-contain opacity-70 hover:opacity-100 transition-opacity"
                unoptimized // Remove if you have proper image optimization setup
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bundle Calculator */}
      <motion.div 
        className="bg-muted rounded-xl p-6 mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <button 
          onClick={() => setShowCalculator(!showCalculator)}
          className="flex items-center justify-between w-full"
        >
          <div className="flex items-center">
            <Zap className="h-5 w-5 text-yellow-500 mr-2" />
            <h2 className="text-xl font-bold">Bundle Savings Calculator</h2>
          </div>
          <ChevronDown className={`h-5 w-5 transition-transform ${showCalculator ? "rotate-180" : ""}`} />
        </button>

        {showCalculator && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div>
              <h3 className="font-medium mb-3">Hosting Plan</h3>
              <div className="space-y-3">
                {hostingPlans.map(plan => (
                  <div 
                    key={plan.name}
                    onClick={() => {
                      setSelectedHosting(plan);
                      setTotal(calculateTotal(plan, selectedSecurity));
                    }}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedHosting.name === plan.name 
                        ? "border-primary bg-primary/10" 
                        : "hover:border-muted-foreground/30"
                    }`}
                  >
                    <div className="flex justify-between">
                      <span>{plan.name}</span>
                      <span>${typeof plan.price === 'number' ? plan.price.toFixed(2) : plan.price}{plan.period}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Security Add-on</h3>
              <div className="space-y-3">
                {securityPlans.map(plan => (
                  <div 
                    key={plan.name}
                    onClick={() => {
                      setSelectedSecurity(plan);
                      setTotal(calculateTotal(selectedHosting, plan));
                    }}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedSecurity.name === plan.name 
                        ? "border-red-500 bg-red-500/10" 
                        : "hover:border-muted-foreground/30"
                    }`}
                  >
                    <div className="flex justify-between">
                      <span>{plan.name}</span>
                      <span>
                        {typeof plan.price === 'number' 
                          ? `$${plan.price.toFixed(2)}${plan.period}` 
                          : plan.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-background rounded-lg border border-primary">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Your Bundle</p>
                    <p className="font-bold">
                      {selectedHosting.name} + {selectedSecurity.name}
                    </p>
                  </div>
                  <div className="text-right">
                    {typeof selectedHosting.price === 'number' && typeof selectedSecurity.price === 'number' && (
                      <>
                        <p className="text-sm text-muted-foreground line-through">
                          ${(selectedHosting.price + selectedSecurity.price).toFixed(2)}
                        </p>
                        <p className="text-2xl font-bold text-primary">
                          ${total.toFixed(2)}/mo
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <Button className="w-full mt-4" size="lg">
                  Get This Bundle
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Hosting Plans Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
        className="mb-24"
      >
        <div className="flex items-center justify-center mb-8">
          <Server className="h-8 w-8 text-blue-500 mr-3" />
          <h2 className="text-3xl font-bold">Web Hosting Plans</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hostingPlans.map((plan, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: plan.popular ? 1.03 : 1.01 }}
            >
              <Card className={`h-full relative ${plan.popular ? "border-2 border-primary" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    POPULAR
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="flex items-end">
                    <span className="text-4xl font-bold">${typeof plan.price === 'number' ? plan.price.toFixed(2) : plan.price}</span>
                    <span className="text-muted-foreground ml-1">{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <div className="flex items-center">
                          <span>{feature.text}</span>
                          {feature.tooltip && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 ml-2 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{feature.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg" asChild>
                    <Link href={plan.name === "Enterprise" ? "/contact" : "/signup"}>
                      {plan.cta}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Security Plans Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
        className="mb-16"
      >
        <div className="flex items-center justify-center mb-8">
          <Shield className="h-8 w-8 text-red-500 mr-3" />
          <h2 className="text-3xl font-bold">Security Add-ons</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {securityPlans.map((plan, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: plan.popular ? 1.03 : 1.01 }}
            >
              <Card className={`h-full relative ${plan.popular ? "border-2 border-red-500" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    RECOMMENDED
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="flex items-end">
                    <span className="text-4xl font-bold">
                      {typeof plan.price === 'number' ? `$${plan.price.toFixed(2)}` : plan.price}
                    </span>
                    <span className="text-muted-foreground ml-1">{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        <div className="flex items-center">
                          <span>{feature.text}</span>
                          {feature.tooltip && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 ml-2 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{feature.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    size="lg" 
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link href={plan.name === "Enterprise Security" ? "/contact" : "/signup"}>
                      {plan.cta}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Comparison Table */}
      <motion.div 
        className="mt-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-8">Plan Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left pb-4">Features</th>
                {hostingPlans.map(plan => (
                  <th key={plan.name} className="text-center pb-4">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                "Websites",
                "Storage",
                "Bandwidth",
                "Email Accounts",
                "Database",
                "Free SSL",
                "Support"
              ].map((feature, i) => (
                <tr key={i} className="border-b hover:bg-muted/50">
                  <td className="py-3 font-medium">{feature}</td>
                  {hostingPlans.map(plan => (
                    <td key={`${plan.name}-${feature}`} className="text-center py-3">
                      {(() => {
                        switch(feature) {
                          case "Websites": 
                            return plan.name === "Enterprise" ? "Unlimited" : 
                                   plan.name === "Business" ? "10" : "1";
                          case "Storage":
                            return plan.name === "Enterprise" ? "200GB NVMe" :
                                   plan.name === "Business" ? "50GB SSD" : "10GB SSD";
                          case "Support":
                            return plan.name === "Enterprise" ? "24/7 VIP" :
                                   plan.name === "Business" ? "Priority" : "Basic";
                          default:
                            return "✓";
                        }
                      })()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Testimonial */}
      <motion.div 
        className="mt-24 bg-muted rounded-xl p-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-2xl mx-auto">
          <blockquote className="text-lg italic mb-4">
            "Combining their hosting and security services saved us 30% compared to 
            using separate providers, and we've had zero downtime since switching."
          </blockquote>
          <div className="flex items-center justify-center">
            <Image
              src="/avatars/john-doe.jpg"
              alt="John Doe"
              width={48}
              height={48}
              className="rounded-full mr-3"
              unoptimized // Remove if you have proper image optimization setup
            />
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-muted-foreground text-sm">CTO at Acme Inc</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
    </TooltipProvider>
  );
}
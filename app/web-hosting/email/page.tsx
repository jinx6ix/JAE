import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mailbox, Shield, Inbox, Send, Users, Clock, Check } from "lucide-react"
import Link from "next/link"
import SLAComparison from "@/components/sla-comparison"
import MigrationAssistant from "@/components/migration-assistant"

export default function EmailHostingPage() {
  const plans = [
    {
      name: "Professional Mail",
      price: "$3.99",
      period: "/mailbox/month",
      features: [
        "50GB Storage",
        "Custom Domain",
        "Spam & Virus Protection",
        "Webmail Access",
        "IMAP/POP3 Support"
      ],
      cta: "Get Started"
    },
    {
      name: "Business Suite",
      price: "$6.99",
      period: "/mailbox/month",
      features: [
        "100GB Storage",
        "Custom Domain",
        "Advanced Spam Filtering",
        "Shared Calendars",
        "ActiveSync Support",
        "Email Archiving"
      ],
      cta: "Most Popular",
      popular: true
    },
    {
      name: "Enterprise Email",
      price: "$12.99",
      period: "/mailbox/month",
      features: [
        "Unlimited Storage",
        "Multiple Domains",
        "Enterprise Spam Filtering",
        "Email Encryption",
        "24/7 Priority Support",
        "Compliance Archiving"
      ],
      cta: "Contact Sales"
    }
  ]

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Business Email Hosting</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Professional email with your domain name, enterprise security, and 99.99% uptime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {plans.map((plan, index) => (
          <Card key={index} className={`flex flex-col ${plan.popular ? "border-2 border-primary" : ""}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </div>
            )}
            <CardHeader>
              <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
                <Mailbox className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>
                <span className="text-2xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href={plan.cta === "Contact Sales" ? "/contact" : "/signup"}>{plan.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Email Migration Assistant */}
      <div className="bg-muted rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Email Migration Assistant</h2>
        <MigrationAssistant />
      </div>

      {/* SLA Comparison Table */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Service Level Comparison</h2>
        <SLAComparison />
      </div>

      {/* Security Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-6">Advanced Email Security</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <Shield className="h-6 w-6 text-primary mr-4 mt-1" />
              <div>
                <h3 className="font-bold mb-2">AI-Powered Spam Filtering</h3>
                <p className="text-muted-foreground">
                  Our machine learning system blocks 99.9% of spam with near-zero false positives.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Inbox className="h-6 w-6 text-primary mr-4 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Encrypted Email</h3>
                <p className="text-muted-foreground">
                  TLS encryption for all messages in transit and at rest.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="h-6 w-6 text-primary mr-4 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Continuous Backup</h3>
                <p className="text-muted-foreground">
                  30-day rolling backup of all emails with point-in-time recovery.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-background border rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">Email Security Checklist</h3>
          <ul className="space-y-3">
            {[
              "SPF, DKIM, and DMARC configured",
              "Phishing attempt detection",
              "Malware scanning for attachments",
              "Two-factor authentication",
              "Suspicious login alerts"
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Server, CreditCard, Settings, Globe, BarChart2, Check } from "lucide-react"
import Link from "next/link"
import ProfitCalculator from "@/components/profit-calculator"
import WhiteLabelDemo from "@/components/white-label-demo"

export default function ResellerHostingPage() {
  const plans = [
    {
      name: "Starter Reseller",
      price: "$24.99",
      period: "/month",
      specs: "100GB SSD, 10 Accounts",
      features: [
        "cPanel/WHM Included",
        "Free WHMCS License",
        "Basic Branding",
        "Client Management",
        "24/7 Support"
      ],
      cta: "Get Started"
    },
    {
      name: "Business Reseller",
      price: "$49.99",
      period: "/month",
      specs: "250GB SSD, 25 Accounts",
      features: [
        "cPanel/WHM Included",
        "Free WHMCS License",
        "Full Branding",
        "Client Management",
        "Priority Support",
        "Free Migration"
      ],
      cta: "Most Popular",
      popular: true
    },
    {
      name: "Enterprise Reseller",
      price: "$99.99",
      period: "/month",
      specs: "500GB SSD, Unlimited Accounts",
      features: [
        "cPanel/WHM Included",
        "Free WHMCS License",
        "White Label Solution",
        "API Access",
        "VIP Support",
        "Free Migration",
        "Dedicated Resources"
      ],
      cta: "Contact Sales"
    }
  ]

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Reseller Hosting</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Start your own hosting business with our white-label reseller solutions. We handle the infrastructure while you focus on growing your clients.
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
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription className="font-medium">{plan.specs}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-3xl font-bold mb-6">
                {plan.price}<span className="text-sm font-normal text-muted-foreground">{plan.period}</span>
              </p>
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

      {/* Profit Calculator */}
      <div className="bg-muted rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Reseller Profit Calculator</h2>
        <ProfitCalculator />
      </div>

      {/* White Label Demo */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">White Label Demo</h2>
        <WhiteLabelDemo />
      </div>

      {/* Reseller Resources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Reseller Toolkit</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                "Custom Branding Guides",
                "Client Onboarding Templates",
                "Marketing Materials",
                "API Documentation"
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/resources/reseller-toolkit">Download Toolkit</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Billing Solutions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                "WHMCS Integration",
                "Automated Invoicing",
                "Multi-Currency Support",
                "Tax Configuration",
                "Affiliate System"
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/resources/billing">Learn More</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
              <BarChart2 className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Success Stories</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                "How AgencyX Grew to $50k/Month",
                "Case Study: WordPress Reseller",
                "Scaling Your Hosting Business",
                "Marketing Strategies That Work"
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/case-studies/resellers">View Case Studies</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
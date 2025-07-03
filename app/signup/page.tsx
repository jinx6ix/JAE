"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Server, Cpu, Globe, Cloud, Mailbox, Users } from "lucide-react"
import Link from "next/link"

const hostingPlans = [
  {
    id: "shared",
    name: "Shared Hosting",
    icon: Server,
    tiers: [
      { name: "Starter", price: 5.99, specs: "10GB SSD, 1 Website" },
      { name: "Business", price: 9.99, specs: "50GB SSD, 10 Websites" },
      { name: "Premium", price: 14.99, specs: "100GB SSD, Unlimited Websites" }
    ]
  },
  {
    id: "vps",
    name: "VPS Hosting",
    icon: Cpu,
    tiers: [
      { name: "Basic", price: 19.99, specs: "2 vCPU, 4GB RAM" },
      { name: "Business", price: 39.99, specs: "4 vCPU, 8GB RAM" },
      { name: "Enterprise", price: 79.99, specs: "8 vCPU, 16GB RAM" }
    ]
  },
  {
    id: "dedicated",
    name: "Dedicated Server",
    icon: Globe,
    tiers: [
      { name: "Essential", price: 99.99, specs: "Intel Xeon, 16GB RAM" },
      { name: "Business", price: 199.99, specs: "AMD EPYC, 32GB RAM" },
      { name: "Enterprise", price: 399.99, specs: "Dual Xeon, 64GB RAM" }
    ]
  },
  {
    id: "cloud",
    name: "Cloud Hosting",
    icon: Cloud,
    tiers: [
      { name: "Starter", price: 29.99, specs: "2 vCPU, 4GB RAM" },
      { name: "Business", price: 59.99, specs: "4 vCPU, 8GB RAM" },
      { name: "Enterprise", price: 129.99, specs: "8 vCPU, 16GB RAM" }
    ]
  },
  {
    id: "email",
    name: "Email Hosting",
    icon: Mailbox,
    tiers: [
      { name: "Professional", price: 3.99, specs: "50GB Storage" },
      { name: "Business", price: 6.99, specs: "100GB Storage" },
      { name: "Enterprise", price: 12.99, specs: "Unlimited Storage" }
    ]
  },
  {
    id: "reseller",
    name: "Reseller Hosting",
    icon: Users,
    tiers: [
      { name: "Starter", price: 24.99, specs: "100GB SSD, 10 Accounts" },
      { name: "Business", price: 49.99, specs: "250GB SSD, 25 Accounts" },
      { name: "Enterprise", price: 99.99, specs: "500GB SSD, Unlimited" }
    ]
  }
]

export default function SignupPage() {
  const [step, setStep] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    domain: "",
    name: "",
    email: "",
    password: "",
    paymentMethod: "credit",
    cardNumber: "",
    expiry: "",
    cvv: ""
  })

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const selectedPlanData = hostingPlans.find(p => p.id === selectedPlan)
  const selectedTierData = selectedPlanData?.tiers.find(t => t.name === selectedTier)

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Get Started</h1>
          <p className="text-xl text-muted-foreground">
            Choose your hosting solution and register your account
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8 relative">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= stepNumber ? "bg-primary text-white" : "bg-muted"
              }`}>
                {stepNumber}
              </div>
              <div className={`text-sm mt-2 ${
                step === stepNumber ? "font-medium text-primary" : "text-muted-foreground"
              }`}>
                {stepNumber === 1 && "Plan"}
                {stepNumber === 2 && "Domain"}
                {stepNumber === 3 && "Account"}
                {stepNumber === 4 && "Payment"}
              </div>
            </div>
          ))}
          <div className="absolute top-5 left-10 right-10 h-1 bg-muted -z-1">
            <div 
              className="h-1 bg-primary transition-all duration-300" 
              style={{ 
                width: `${(step - 1) * 33.33}%` 
              }}
            ></div>
          </div>
        </div>

        {/* Step 1: Plan Selection */}
        {step === 1 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Select Your Hosting Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hostingPlans.map((plan) => (
                <Card 
                  key={plan.id}
                  className={`cursor-pointer transition-all ${
                    selectedPlan === plan.id ? "border-2 border-primary" : "hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <CardHeader>
                    <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
                      <plan.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{plan.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.tiers.map((tier, i) => (
                        <li 
                          key={i}
                          className={`p-2 rounded ${
                            selectedPlan === plan.id && selectedTier === tier.name 
                              ? "bg-primary/10" 
                              : "hover:bg-muted"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedTier(tier.name)
                          }}
                        >
                          <div className="flex justify-between items-center">
                            <span>{tier.name}</span>
                            <span className="font-bold">${tier.price}/mo</span>
                          </div>
                          <div className="text-sm text-muted-foreground">{tier.specs}</div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Domain Configuration */}
        {step === 2 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Configure Your Domain</h2>
            <Card>
              <CardHeader>
                <CardTitle>Domain Options</CardTitle>
                <CardDescription>
                  {selectedPlanData?.name} - {selectedTier}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 flex flex-col items-center">
                    <h3 className="font-medium mb-2">Register New</h3>
                    <Input 
                      placeholder="yourdomain.com" 
                      className="mb-3"
                      value={formData.domain}
                      onChange={handleChange}
                      name="domain"
                    />
                    <Button variant="outline" className="w-full">
                      Check Availability
                    </Button>
                  </div>
                  <div className="border rounded-lg p-4 flex flex-col items-center">
                    <h3 className="font-medium mb-2">Transfer Domain</h3>
                    <Input 
                      placeholder="currentdomain.com" 
                      className="mb-3"
                    />
                    <Button variant="outline" className="w-full">
                      Transfer
                    </Button>
                  </div>
                  <div className="border rounded-lg p-4 flex flex-col items-center">
                    <h3 className="font-medium mb-2">Use Existing</h3>
                    <Input 
                      placeholder="point DNS to us" 
                      className="mb-3"
                    />
                    <Button variant="outline" className="w-full">
                      Configure DNS
                    </Button>
                  </div>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Free Domain Included</h3>
                  <p className="text-sm text-muted-foreground">
                    Your {selectedTier} plan includes 1 free domain registration for the first year.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Account Information */}
        {step === 3 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Create Your Account</h2>
            <Card>
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
                <CardDescription>
                  {selectedPlanData?.name} - {selectedTier}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2">Full Name</label>
                    <Input 
                      placeholder="Your Name" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Email Address</label>
                    <Input 
                      placeholder="your@email.com" 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Password</label>
                    <Input 
                      placeholder="Create password" 
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Confirm Password</label>
                    <Input 
                      placeholder="Repeat password" 
                      type="password"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 4: Payment Information */}
        {step === 4 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Complete Your Purchase</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Select 
                      value={formData.paymentMethod}
                      onValueChange={(value) => setFormData({...formData, paymentMethod: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit">Credit/Debit Card</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="crypto">Cryptocurrency</SelectItem>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                      </SelectContent>
                    </Select>

                    {formData.paymentMethod === "credit" && (
                      <div className="space-y-4">
                        <Input 
                          placeholder="Card Number" 
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <Input 
                            placeholder="MM/YY" 
                            name="expiry"
                            value={formData.expiry}
                            onChange={handleChange}
                          />
                          <Input 
                            placeholder="CVV" 
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    )}

                    {formData.paymentMethod === "paypal" && (
                      <div className="bg-muted p-4 rounded-lg text-center">
                        <p>You'll be redirected to PayPal to complete your payment</p>
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">
                        Save payment method for faster checkout next time
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Plan:</span>
                        <span className="font-medium">
                          {selectedPlanData?.name} {selectedTier}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Domain:</span>
                        <span className="font-medium">
                          {formData.domain || "example.com"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Billing Cycle:</span>
                        <span className="font-medium">Monthly</span>
                      </div>
                      <div className="border-t pt-4 flex justify-between font-bold">
                        <span>Total:</span>
                        <span className="text-primary">
                          ${selectedTierData?.price}/mo
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 space-y-2">
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          30-day money-back guarantee
                        </span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          Free SSL certificate included
                        </span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          24/7 customer support
                        </span>
                      </div>
                    </div>

                    <Button className="w-full mt-6" size="lg">
                      Complete Signup
                    </Button>

                    <p className="text-xs text-muted-foreground mt-4 text-center">
                      By completing your purchase, you agree to our <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={handleBack}
            disabled={step === 1}
          >
            Back
          </Button>
          {step < 4 ? (
            <Button 
              onClick={handleNext}
              disabled={step === 1 && (!selectedPlan || !selectedTier)}
            >
              Continue
            </Button>
          ) : (
            <Button>Complete Order</Button>
          )}
        </div>
      </div>
    </div>
  )
}
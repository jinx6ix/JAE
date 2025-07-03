"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MigrationAssistant() {
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(25)
  const [formData, setFormData] = useState({
    currentProvider: "",
    emailCount: "",
    domain: "",
    migrationType: "basic"
  })

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
      setProgress(progress + 25)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      setProgress(progress - 25)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="bg-background p-6 rounded-lg border">
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Step {step} of 4</span>
          <span className="text-sm text-muted-foreground">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="font-medium">Current Email Provider</h3>
          <Select name="currentProvider" onValueChange={(value) => setFormData({...formData, currentProvider: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select your provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="google">Google Workspace</SelectItem>
              <SelectItem value="microsoft">Microsoft 365</SelectItem>
              <SelectItem value="other">Other Provider</SelectItem>
              <SelectItem value="none">No Existing Provider</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="font-medium">About Your Current Setup</h3>
          <Input 
            type="number" 
            placeholder="Number of email accounts" 
            name="emailCount"
            value={formData.emailCount}
            onChange={handleChange}
          />
          <Input 
            placeholder="Your domain name (e.g., yourbusiness.com)" 
            name="domain"
            value={formData.domain}
            onChange={handleChange}
          />
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h3 className="font-medium">Migration Type</h3>
          <Select name="migrationType" onValueChange={(value) => setFormData({...formData, migrationType: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select migration type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basic Migration (Self-service)</SelectItem>
              <SelectItem value="assisted">Assisted Migration (Guided)</SelectItem>
              <SelectItem value="full">Full-Service Migration (Managed)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <h3 className="font-medium">Migration Summary</h3>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-medium">Current Provider: <span className="font-normal">{formData.currentProvider || "Not specified"}</span></p>
            <p className="font-medium">Email Accounts: <span className="font-normal">{formData.emailCount || "Not specified"}</span></p>
            <p className="font-medium">Domain: <span className="font-normal">{formData.domain || "Not specified"}</span></p>
            <p className="font-medium">Migration Type: <span className="font-normal">{formData.migrationType === "basic" ? "Basic" : formData.migrationType === "assisted" ? "Assisted" : "Full-Service"}</span></p>
          </div>
          <p className="text-sm text-muted-foreground">
            Our team will contact you within 24 hours to schedule your migration.
          </p>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={handleBack} disabled={step === 1}>
          Back
        </Button>
        {step < 4 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button>Submit Migration Request</Button>
        )}
      </div>
    </div>
  )
}
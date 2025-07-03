"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function WhiteLabelDemo() {
  const [branding, setBranding] = useState({
    companyName: "YourHosting",
    primaryColor: "#3b82f6",
    logo: "",
    domain: "yourhosting.com"
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBranding(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-6 bg-muted">
          <h3 className="font-bold mb-4">Configure Your Brand</h3>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Company Name</label>
              <Input 
                name="companyName"
                value={branding.companyName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Primary Color</label>
              <div className="flex items-center gap-2">
                <Input 
                  name="primaryColor"
                  value={branding.primaryColor}
                  onChange={handleChange}
                  className="flex-1"
                />
                <input 
                  title="Primary Color"
                  type="color" 
                  value={branding.primaryColor}
                  onChange={(e) => setBranding({...branding, primaryColor: e.target.value})}
                  className="w-10 h-10 cursor-pointer"
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Domain</label>
              <Input 
                name="domain"
                value={branding.domain}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="p-6 bg-background">
          <h3 className="font-bold mb-4">Your Brand Preview</h3>
          <div className="border rounded-lg overflow-hidden" style={{ borderColor: branding.primaryColor }}>
            <div 
              className="p-4 flex items-center justify-between"
              style={{ backgroundColor: branding.primaryColor }}
            >
              <div className="font-bold text-white">{branding.companyName}</div>
              <div className="text-white text-sm">Client Portal</div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-center mb-6">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
                  style={{ backgroundColor: branding.primaryColor }}
                >
                  {branding.companyName.charAt(0)}
                </div>
              </div>
              <div className="space-y-4">
                <div className="border rounded p-4">
                  <h4 className="font-medium mb-2">Hosting Package</h4>
                  <p className="text-sm text-muted-foreground">Business Hosting - {branding.domain}</p>
                </div>
                <div className="border rounded p-4">
                  <h4 className="font-medium mb-2">Control Panel</h4>
                  <p className="text-sm text-muted-foreground">cPanel - {branding.companyName} Edition</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t text-center text-sm" style={{ borderColor: branding.primaryColor }}>
              © {new Date().getFullYear()} {branding.companyName}
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 bg-background border-t text-center">
        <Button>Save Brand Configuration</Button>
      </div>
    </div>
  )
}
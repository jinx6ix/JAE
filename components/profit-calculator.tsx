"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"

export default function ProfitCalculator() {
  const [values, setValues] = useState({
    clients: 20,
    monthlyPrice: 9.99,
    markup: 50,
    churn: 5
  })

  const handleSliderChange = (name: string, value: number[]) => {
    setValues(prev => ({ ...prev, [name]: value[0] }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: parseFloat(value) || 0 }))
  }

  const calculateProfit = () => {
    const baseCost = 4.99 // Our cost per client
    const grossPerClient = values.monthlyPrice * (1 + values.markup/100) - baseCost
    const netClients = values.clients * (1 - values.churn/100)
    return {
      monthly: netClients * grossPerClient,
      annual: netClients * grossPerClient * 12
    }
  }

  const profit = calculateProfit()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">
            Number of Clients: {values.clients}
          </label>
          <Slider 
            defaultValue={[values.clients]}
            max={1000}
            step={1}
            onValueChange={(val) => handleSliderChange("clients", val)}
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-1">
            <span>0</span>
            <span>1000</span>
          </div>
        </div>
        <div>
          <label className="block mb-2 font-medium">
            Monthly Price per Client: ${values.monthlyPrice.toFixed(2)}
          </label>
          <Slider 
            defaultValue={[values.monthlyPrice]}
            min={5}
            max={50}
            step={0.01}
            onValueChange={(val) => handleSliderChange("monthlyPrice", val)}
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-1">
            <span>$5</span>
            <span>$50</span>
          </div>
        </div>
        <div>
          <label className="block mb-2 font-medium">
            Your Markup: {values.markup}%
          </label>
          <Slider 
            defaultValue={[values.markup]}
            min={10}
            max={200}
            step={1}
            onValueChange={(val) => handleSliderChange("markup", val)}
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-1">
            <span>10%</span>
            <span>200%</span>
          </div>
        </div>
        <div>
          <label className="block mb-2 font-medium">
            Estimated Monthly Churn Rate: {values.churn}%
          </label>
          <Slider 
            defaultValue={[values.churn]}
            min={0}
            max={20}
            step={0.5}
            onValueChange={(val) => handleSliderChange("churn", val)}
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-1">
            <span>0%</span>
            <span>20%</span>
          </div>
        </div>
      </div>
      <div className="bg-background border border-primary rounded-lg p-6">
        <h3 className="text-xl font-bold mb-6">Projected Profit</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Monthly Profit:</span>
            <span className="font-bold text-primary">${profit.monthly.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Annual Profit:</span>
            <span className="font-bold text-primary">${profit.annual.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Profit Margin:</span>
            <span className="font-bold text-primary">
              {((values.monthlyPrice * (1 + values.markup/100) - 4.99) / (values.monthlyPrice * (1 + values.markup/100)) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
        <div className="mt-8">
          <h4 className="font-medium mb-2">Save Calculation</h4>
          <div className="flex gap-2">
            <Input placeholder="Your email" type="email" />
            <Button>Send</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
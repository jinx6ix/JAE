"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function SLAComparison() {
  const slaData = [
    {
      feature: "Uptime Guarantee",
      basic: "99.9%",
      business: "99.95%",
      enterprise: "99.99%"
    },
    {
      feature: "Response Time",
      basic: "4 hours",
      business: "2 hours",
      enterprise: "30 minutes"
    },
    {
      feature: "Support Availability",
      basic: "Business Hours",
      business: "24/5",
      enterprise: "24/7"
    },
    {
      feature: "Backup Retention",
      basic: "7 days",
      business: "14 days",
      enterprise: "30 days"
    },
    {
      feature: "Migration Support",
      basic: "Self-service",
      business: "Guided",
      enterprise: "Full-service"
    }
  ]

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Feature</TableHead>
            <TableHead>Basic</TableHead>
            <TableHead>Business</TableHead>
            <TableHead>Enterprise</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {slaData.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.feature}</TableCell>
              <TableCell>{item.basic}</TableCell>
              <TableCell>{item.business}</TableCell>
              <TableCell>{item.enterprise}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="p-4 bg-muted text-sm text-muted-foreground">
        <p>* All SLAs come with service credits for unmet guarantees</p>
      </div>
    </div>
  )
}
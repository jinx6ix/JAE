import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Shield, Clock, Server, Globe, BarChart } from "lucide-react"

export default function FeaturesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose SecureHost</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We combine top-tier hosting with enterprise-grade security to deliver an unmatched experience
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <Card>
            <CardHeader className="pb-2">
              <Zap className="h-10 w-10 text-primary mb-2" />
              <CardTitle>High Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our infrastructure is optimized for speed with SSD storage, advanced caching, and global CDN.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Shield className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Advanced Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Enterprise-grade protection with DDoS mitigation, WAF, and regular security audits.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Clock className="h-10 w-10 text-primary mb-2" />
              <CardTitle>99.9% Uptime</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We guarantee 99.9% uptime with redundant systems and proactive monitoring.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Server className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Scalable Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Easily scale your resources up or down as your business needs change.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Globe className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Global Network</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Data centers across the globe ensure low latency for visitors from anywhere.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <BarChart className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Detailed Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Comprehensive analytics and reporting to monitor performance and security.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

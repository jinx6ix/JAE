import { Server, Shield, Users, Clock } from "lucide-react"

export default function StatsSection() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 border-y">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-2">
              <Server className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-3xl font-bold">10,000+</h3>
            <p className="text-sm text-muted-foreground">Websites Hosted</p>
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-2">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-3xl font-bold">99.9%</h3>
            <p className="text-sm text-muted-foreground">Uptime Guarantee</p>
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-2">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-3xl font-bold">5,000+</h3>
            <p className="text-sm text-muted-foreground">Happy Clients</p>
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-2">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-3xl font-bold">24/7</h3>
            <p className="text-sm text-muted-foreground">Expert Support</p>
          </div>
        </div>
      </div>
    </section>
  )
}

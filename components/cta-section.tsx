import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CtaSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Get Started?</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Experience the perfect combination of high-performance hosting and enterprise-grade security.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">Get Started Today</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

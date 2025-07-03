import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

export default function TestimonialsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Clients Say</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Don't just take our word for it. Here's what our clients have to say about our services.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <Card className="bg-background">
            <CardContent className="pt-6">
              <div className="mb-4">
                <Quote className="h-8 w-8 text-primary/40" />
              </div>
              <p className="text-muted-foreground mb-6">
                "SecureHost has transformed our online presence. Their hosting is lightning-fast and their security
                measures have protected us from multiple attacks. Couldn't be happier with the service."
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Jane Doe</p>
                  <p className="text-xs text-muted-foreground">CEO, TechStart</p>
                </div>
              </div>
            </CardFooter>
          </Card>
          <Card className="bg-background">
            <CardContent className="pt-6">
              <div className="mb-4">
                <Quote className="h-8 w-8 text-primary/40" />
              </div>
              <p className="text-muted-foreground mb-6">
                "After experiencing a major security breach with our previous provider, we switched to SecureHost. Their
                cybersecurity team identified vulnerabilities we weren't even aware of and implemented robust
                protection."
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                  <AvatarFallback>MS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Michael Smith</p>
                  <p className="text-xs text-muted-foreground">CTO, Enterprise Solutions</p>
                </div>
              </div>
            </CardFooter>
          </Card>
          <Card className="bg-background">
            <CardContent className="pt-6">
              <div className="mb-4">
                <Quote className="h-8 w-8 text-primary/40" />
              </div>
              <p className="text-muted-foreground mb-6">
                "The customer support at SecureHost is exceptional. They're responsive, knowledgeable, and have helped
                us optimize our website performance beyond our expectations."
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Alex Johnson</p>
                  <p className="text-xs text-muted-foreground">Founder, Creative Agency</p>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

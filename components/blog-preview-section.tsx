import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BlogPreviewSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-2">Latest from Our Blog</h2>
            <p className="text-muted-foreground">Expert insights on web hosting, cybersecurity, and digital trends</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/blog" className="flex items-center gap-2">
              View all posts <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="flex flex-col h-full">
            <div className="relative h-48 w-full">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Blog post thumbnail"
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            <CardHeader className="flex-none">
              <div className="text-sm text-muted-foreground mb-2">May 15, 2023 • Cybersecurity</div>
              <CardTitle className="line-clamp-2">
                10 Essential Cybersecurity Practices Every Business Should Implement
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="line-clamp-3">
                In today's digital landscape, cybersecurity is no longer optional. Learn the essential practices that
                can protect your business from common threats and data breaches.
              </CardDescription>
            </CardContent>
            <CardFooter className="flex-none">
              <Button variant="ghost" className="p-0 h-auto" asChild>
                <Link href="/blog/essential-cybersecurity-practices" className="flex items-center gap-2">
                  Read more <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col h-full">
            <div className="relative h-48 w-full">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Blog post thumbnail"
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            <CardHeader className="flex-none">
              <div className="text-sm text-muted-foreground mb-2">April 28, 2023 • Web Hosting</div>
              <CardTitle className="line-clamp-2">How to Choose the Right Hosting Plan for Your Website</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="line-clamp-3">
                Selecting the right hosting plan is crucial for your website's performance. This guide walks you through
                the different options and helps you make an informed decision.
              </CardDescription>
            </CardContent>
            <CardFooter className="flex-none">
              <Button variant="ghost" className="p-0 h-auto" asChild>
                <Link href="/blog/choose-right-hosting-plan" className="flex items-center gap-2">
                  Read more <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col h-full">
            <div className="relative h-48 w-full">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Blog post thumbnail"
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            <CardHeader className="flex-none">
              <div className="text-sm text-muted-foreground mb-2">April 10, 2023 • Security</div>
              <CardTitle className="line-clamp-2">The Rising Threat of Ransomware: How to Protect Your Data</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="line-clamp-3">
                Ransomware attacks are becoming more sophisticated and frequent. Learn about the latest threats and the
                steps you can take to safeguard your valuable data.
              </CardDescription>
            </CardContent>
            <CardFooter className="flex-none">
              <Button variant="ghost" className="p-0 h-auto" asChild>
                <Link href="/blog/ransomware-protection" className="flex items-center gap-2">
                  Read more <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

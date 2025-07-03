import Image from "next/image"

export default function PartnersSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 mb-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Trusted by Industry Leaders</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We provide hosting and security solutions to businesses of all sizes across various industries
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-center opacity-70">
            {/* Partner logos - using placeholder SVGs */}
            <div className="flex items-center justify-center p-4">
              <Image src="/placeholder.svg?height=40&width=120" alt="Partner 1" width={120} height={40} />
            </div>
            <div className="flex items-center justify-center p-4">
              <Image src="/placeholder.svg?height=40&width=120" alt="Partner 2" width={120} height={40} />
            </div>
            <div className="flex items-center justify-center p-4">
              <Image src="/placeholder.svg?height=40&width=120" alt="Partner 3" width={120} height={40} />
            </div>
            <div className="flex items-center justify-center p-4">
              <Image src="/placeholder.svg?height=40&width=120" alt="Partner 4" width={120} height={40} />
            </div>
            <div className="flex items-center justify-center p-4">
              <Image src="/placeholder.svg?height=40&width=120" alt="Partner 5" width={120} height={40} />
            </div>
            <div className="flex items-center justify-center p-4">
              <Image src="/placeholder.svg?height=40&width=120" alt="Partner 6" width={120} height={40} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

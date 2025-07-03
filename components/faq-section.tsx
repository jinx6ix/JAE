import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FaqSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 max-w-4xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to common questions about our hosting and cybersecurity services
            </p>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What types of hosting do you offer?</AccordionTrigger>
            <AccordionContent>
              We offer a comprehensive range of hosting solutions including shared hosting, VPS hosting, dedicated
              servers, and cloud hosting. Each option is designed to meet different needs and budgets, from small
              personal websites to large enterprise applications.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>How secure are your hosting services?</AccordionTrigger>
            <AccordionContent>
              Security is our top priority. All our hosting plans include DDoS protection, regular malware scanning, and
              automated backups. Our infrastructure is protected by enterprise-grade firewalls, and we implement strict
              access controls. Additionally, we offer advanced security features like WAF (Web Application Firewall) and
              SSL certificates.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Do you offer a money-back guarantee?</AccordionTrigger>
            <AccordionContent>
              Yes, we offer a 30-day money-back guarantee for all our hosting plans. If you're not satisfied with our
              service within the first 30 days, you can request a full refund, no questions asked.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>What cybersecurity services do you provide?</AccordionTrigger>
            <AccordionContent>
              Our cybersecurity services include threat protection (malware detection and removal, ransomware
              protection), data security (encryption, access control), compliance management (GDPR, HIPAA, PCI DSS),
              vulnerability assessment, penetration testing, and 24/7 security monitoring with incident response.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>How does your uptime guarantee work?</AccordionTrigger>
            <AccordionContent>
              We guarantee 99.9% uptime for all our hosting services. If we fail to meet this guarantee, you'll receive
              credit on your account based on the amount of downtime experienced. Our infrastructure is built with
              redundancy at every level to ensure maximum reliability.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>Can you help migrate my existing website?</AccordionTrigger>
            <AccordionContent>
              We offer free website migration for all new customers. Our technical team will handle the entire process,
              ensuring a smooth transition with minimal downtime. We can migrate websites from any hosting provider,
              regardless of the platform or CMS you're using.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger>What kind of customer support do you offer?</AccordionTrigger>
            <AccordionContent>
              We provide 24/7 customer support through multiple channels including live chat, email, and phone. Our
              support team consists of experienced professionals who can assist with technical issues, security
              concerns, and general inquiries. For enterprise clients, we also offer dedicated account managers.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}

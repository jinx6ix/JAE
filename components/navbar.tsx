"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Menu, Shield, Server } from "lucide-react"
import { ModeToggle } from "./mode-toggle"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-6 w-6" />
            <span className="font-bold text-xl">SecureHost</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Web Hosting</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/web-hosting"
                      >
                        <Server className="h-6 w-6 mb-2" />
                        <div className="mb-2 mt-4 text-lg font-medium">Web Hosting Solutions</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Reliable, high-performance hosting for websites of all sizes
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/web-hosting/shared" title="Shared Hosting">
                    Affordable hosting for small websites and blogs
                  </ListItem>
                  <ListItem href="/web-hosting/vps" title="VPS Hosting">
                    Dedicated resources for growing businesses
                  </ListItem>
                  <ListItem href="/web-hosting/dedicated" title="Dedicated Servers">
                    Maximum performance for high-traffic websites
                  </ListItem>
                  <ListItem href="/web-hosting/cloud" title="Cloud Hosting">
                    Scalable solutions with pay-as-you-go pricing
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Cybersecurity</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/cybersecurity"
                      >
                        <Shield className="h-6 w-6 mb-2" />
                        <div className="mb-2 mt-4 text-lg font-medium">Cybersecurity Services</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Comprehensive protection for your digital assets
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/cybersecurity/services/threat-protection" title="Threat Protection">
                    Defense against malware, ransomware, and cyber attacks
                  </ListItem>
                  <ListItem href="/cybersecurity/services/data-protection" title="Data Security">
                    Encryption and protection for sensitive information
                  </ListItem>
                  <ListItem href="/cybersecurity/services/compliance" title="Compliance">
                    Meet regulatory requirements and industry standards
                  </ListItem>
                  <ListItem href="/cybersecurity/services/incident-response" title="Incident Response">
                    24/7 monitoring and rapid response to security incidents
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/pricing" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Pricing</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Contact</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button className="hidden md:flex" asChild>
            <Link href="/contact">Get Started</Link>
          </Button>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" onClick={() => setIsOpen(false)} className="text-lg font-medium">
                  Home
                </Link>
                <Link href="/web-hosting" onClick={() => setIsOpen(false)} className="text-lg font-medium">
                  Web Hosting
                </Link>
                <Link href="/cybersecurity" onClick={() => setIsOpen(false)} className="text-lg font-medium">
                  Cybersecurity
                </Link>
                <Link href="/pricing" onClick={() => setIsOpen(false)} className="text-lg font-medium">
                  Pricing
                </Link>
                <Link href="/contact" onClick={() => setIsOpen(false)} className="text-lg font-medium">
                  Contact
                </Link>
                <Button className="mt-4" asChild onClick={() => setIsOpen(false)}>
                  <Link href="/contact">Get Started</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"

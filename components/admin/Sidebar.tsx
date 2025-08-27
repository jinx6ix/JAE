// components/admin/Sidebar.tsx
"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"

const navItems = [
  { href: "/admin/dashboard", label: "Admin" },
  { href: "/admin/webhosting", label: "Web Hosting" },
  { href: "/admin/cybersecurity", label: "Cybersecurity" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r p-4">
      <h2 className="text-lg font-bold mb-6">SecureHost Admin</h2>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "block px-4 py-2 rounded hover:bg-gray-100",
              pathname === item.href && "bg-gray-200 font-medium"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

// components/admin/Header.tsx
"use client"
import { useAuth } from "@/hooks/admin/use-auth"

export function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <div className="text-gray-800 font-semibold">Welcome, {user?.name}</div>
      <button onClick={logout} className="text-sm text-red-600 hover:underline">
        Logout
      </button>
    </header>
  )
}

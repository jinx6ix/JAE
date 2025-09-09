import { Suspense } from "react"
import AdminLoginForm from "./admin-login-form"

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div>Loading login...</div>}>
      <AdminLoginForm />
    </Suspense>
  )
}

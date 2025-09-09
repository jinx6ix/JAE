// app/check-email/page.tsx
"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

export default function CheckEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <Mail className="h-12 w-12 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Check your email</h1>
        <p className="text-gray-600 mb-6">
          We sent you a confirmation link. Please check your inbox and click the link to verify your account.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/login"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Go to Login
          </Link>
          <Link
            href="/signup"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Back to Signup
          </Link>
        </div>
      </div>
    </div>
  );
}

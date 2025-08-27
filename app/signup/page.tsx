"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [apiValid, setApiValid] = useState<boolean | null>(null);
  const [showToast, setShowToast] = useState(false);

  // ✅ Check Supabase config
  useEffect(() => {
    const checkSupabase = async () => {
      if (
        !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ) {
        setApiValid(false);
        setMessage(
          "Supabase URL or ANON KEY missing! Please configure .env.local"
        );
        return;
      }

      try {
        const { error } = await supabase.auth.getSession();
        if (error) {
          setApiValid(false);
          setMessage(
            "Supabase ANON KEY invalid or misconfigured. Check your .env.local"
          );
        } else {
          setApiValid(true);
        }
      } catch (err) {
        setApiValid(false);
        setMessage("Supabase configuration test failed: " + (err as any).message);
      }
    };

    checkSupabase();
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!apiValid) {
      setMessage("Cannot signup: invalid Supabase configuration.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setMessage(error.message);
      } else {
        // ✅ Show toast confirmation
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          router.push("/login"); // Redirect after 2 seconds
        }, 2000);
      }
    } catch (err: any) {
      setMessage("Unexpected error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative">
      <form
        onSubmit={handleSignup}
        className="p-6 border rounded-md shadow-md bg-white w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4">Create Account</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-3"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-3"
          required
        />

        {message && (
          <p
            className={`text-sm text-center mb-2 ${
              apiValid ? "text-red-600" : "text-yellow-700"
            }`}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || apiValid === false}
          className="bg-blue-600 text-white px-4 py-2 rounded-md w-full"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      {/* Toast notification */}
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out">
          ✅ Signup successful! Redirecting to login...
        </div>
      )}

      <style jsx>{`
        .animate-fade-in-out {
          animation: fadeInOut 2s forwards;
        }
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(10px);
          }
        }
      `}</style>
    </div>
  );
}

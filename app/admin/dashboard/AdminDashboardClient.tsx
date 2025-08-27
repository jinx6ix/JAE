"use client";

import { useEffect, useState } from "react";
import type { Session } from "next-auth";
import { createClient, RealtimeChannel } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminDashboardClient({ session }: { session: Session }) {
  const [role, setRole] = useState<string | null>(session.user?.role ?? null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!session?.user?.id) return;

    // ✅ Step 1: Fetch latest role from Supabase on first load
    const fetchRole = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching role:", error.message);
      } else if (data?.role) {
        setRole(data.role);
      }
      setLoading(false);
    };

    fetchRole();

    // ✅ Step 2: Subscribe to realtime role changes
    const channel: RealtimeChannel = supabase
      .channel("profile-role-updates")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "profiles",
          filter: `id=eq.${session.user.id}`,
        },
        (payload) => {
          if (payload?.new?.role) {
            console.log("Role updated via realtime:", payload.new.role);
            setRole(payload.new.role);
          }
        }
      )
      .subscribe((status) => {
        console.log("Realtime subscription status:", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session?.user?.id]);

  return (
    <div className="p-4 rounded-xl border shadow-md bg-white">
      <h1 className="text-xl font-bold">Welcome, {session.user?.name ?? "User"}</h1>
      <p className="text-gray-700">
        Your current role:{" "}
        <span className="font-semibold">
          {loading ? "Loading..." : role ?? "Unknown"}
        </span>
      </p>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminDashboardClient({ session }: { session: Session }) {
  const [role, setRole] = useState(session.user?.role);

  useEffect(() => {
    if (!session?.user) return;

    const channel = supabase
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
          setRole(payload.new.role);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session]);

  return (
    <div>
      <h1>Welcome, {session.user?.name}</h1>
      <p>Your current role: {role}</p>
    </div>
  );
}

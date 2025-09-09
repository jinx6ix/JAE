import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <section className="p-6">{children}</section>;
}


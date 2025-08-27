import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options"; // adjust to your auth config
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>Access denied</p>; // or use redirect("/login")
  }

  return <AdminDashboardClient session={session} />;
}

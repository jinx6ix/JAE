import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/admin/supabase"
import { requireAuth, requirePermission } from "@/lib/admin/auth-middleware"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = requireAuth(request)

    if (!requirePermission(user, "clients_view")) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const { data: client, error } = await supabaseAdmin
      .from("clients")
      .select(`
        *,
        client_domains(domain),
        client_services(service_name)
      `)
      .eq("id", params.id)
      .single()

    if (error || !client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 })
    }

    return NextResponse.json({
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      company: client.company,
      plan: client.plan,
      status: client.status,
      monthlySpend: Number.parseFloat(client.monthly_spend),
      joined: client.joined_date,
      lastLogin: client.last_login,
      domains: client.client_domains?.map((d: any) => d.domain) || [],
      services: client.client_services?.map((s: any) => s.service_name) || [],
    })
  } catch (error) {
    console.error("Get client error:", error)
    return NextResponse.json(
      { error: error.message === "Authentication required" ? "Authentication required" : "Internal server error" },
      { status: error.message === "Authentication required" ? 401 : 500 },
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = requireAuth(request)

    if (!requirePermission(user, "clients_manage")) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const data = await request.json()

    // Update client
    const { data: client, error: clientError } = await supabaseAdmin
      .from("clients")
      .update({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        plan: data.plan,
        status: data.status,
        monthly_spend: data.monthlySpend || 0,
      })
      .eq("id", params.id)
      .select()
      .single()

    if (clientError) {
      throw clientError
    }

    // Delete existing domains and services
    await supabaseAdmin.from("client_domains").delete().eq("client_id", params.id)
    await supabaseAdmin.from("client_services").delete().eq("client_id", params.id)

    // Insert new domains
    if (data.domains && data.domains.length > 0) {
      const domainInserts = data.domains.map((domain: string) => ({
        client_id: params.id,
        domain: domain,
      }))

      await supabaseAdmin.from("client_domains").insert(domainInserts)
    }

    // Insert new services
    if (data.services && data.services.length > 0) {
      const serviceInserts = data.services.map((service: string) => ({
        client_id: params.id,
        service_name: service,
      }))

      await supabaseAdmin.from("client_services").insert(serviceInserts)
    }

    return NextResponse.json({
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      company: client.company,
      plan: client.plan,
      status: client.status,
      monthlySpend: Number.parseFloat(client.monthly_spend),
      joined: client.joined_date,
      lastLogin: client.last_login,
      domains: data.domains || [],
      services: data.services || [],
    })
  } catch (error) {
    console.error("Update client error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = requireAuth(request)

    if (!requirePermission(user, "clients_manage")) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const { error } = await supabaseAdmin.from("clients").delete().eq("id", params.id)

    if (error) {
      throw error
    }

    return NextResponse.json({ message: "Client deleted successfully" })
  } catch (error) {
    console.error("Delete client error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

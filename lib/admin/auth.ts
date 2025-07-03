export interface User {
  id: string
  name: string
  email: string
  phone?: string
  position?: string
  role: "admin" | "webhosting_manager" | "webhosting_user" | "cybersecurity_manager" | "cybersecurity_user"
  department: "admin" | "webhosting" | "cybersecurity"
  status: "active" | "inactive" | "suspended"
  supervisor?: string
  permissions: string[]
  createdAt: string
  lastLogin?: string
  avatar?: string
  requiresSecondaryAuth?: boolean
}

export const PERMISSIONS = {
  all: "Full system access",
  hosting_manage: "Manage hosting services",
  hosting_view: "View hosting services",
  clients_manage: "Manage clients",
  clients_view: "View clients",
  billing_manage: "Manage billing",
  billing_view: "View billing",
  security_manage: "Manage security",
  security_view: "View security",
  alerts_manage: "Manage alerts",
  alerts_view: "View alerts",
  incidents_respond: "Respond to incidents",
  reports_generate: "Generate reports",
  tasks_assign: "Assign tasks",
  tasks_manage: "Manage tasks",
  users_manage: "Manage users",
  users_view: "View users",
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Admin",
    email: "admin@securehost.com",
    phone: "+1-555-0101",
    position: "System Administrator",
    role: "admin",
    department: "admin",
    status: "active",
    permissions: ["all"],
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: new Date().toISOString(),
    requiresSecondaryAuth: false,
  },
  {
    id: "2",
    name: "Sarah Wilson",
    email: "sarah.wilson@securehost.com",
    phone: "+1-555-0102",
    position: "Web Hosting Manager",
    role: "webhosting_manager",
    department: "webhosting",
    status: "active",
    permissions: ["hosting_manage", "hosting_view", "clients_manage", "billing_view", "users_view", "tasks_assign"],
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: new Date(Date.now() - 86400000).toISOString(),
    requiresSecondaryAuth: true,
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@securehost.com",
    phone: "+1-555-0103",
    position: "Web Hosting Specialist",
    role: "webhosting_user",
    department: "webhosting",
    status: "active",
    permissions: ["hosting_view", "clients_view", "tasks_manage"],
    createdAt: "2024-01-15T00:00:00Z",
    lastLogin: new Date(Date.now() - 3600000).toISOString(),
    requiresSecondaryAuth: true,
  },
  {
    id: "4",
    name: "Emily Chen",
    email: "emily.chen@securehost.com",
    phone: "+1-555-0104",
    position: "Cybersecurity Manager",
    role: "cybersecurity_manager",
    department: "cybersecurity",
    status: "active",
    permissions: [
      "security_manage",
      "security_view",
      "alerts_manage",
      "users_view",
      "reports_generate",
      "tasks_assign",
    ],
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: new Date(Date.now() - 7200000).toISOString(),
    requiresSecondaryAuth: true,
  },
  {
    id: "5",
    name: "David Rodriguez",
    email: "david.rodriguez@securehost.com",
    phone: "+1-555-0105",
    position: "Security Analyst",
    role: "cybersecurity_user",
    department: "cybersecurity",
    status: "active",
    permissions: ["security_view", "alerts_view", "tasks_manage", "incidents_respond"],
    createdAt: "2024-02-01T00:00:00Z",
    lastLogin: new Date(Date.now() - 1800000).toISOString(),
    requiresSecondaryAuth: true,
  },
]

export function hasPermission(user: User | null, permission: string): boolean {
  if (!user) return false
  if (user.permissions.includes("all")) return true
  return user.permissions.includes(permission)
}

export function canAccessDepartment(user: User | null, department: string): boolean {
  if (!user) return false
  if (user.role === "admin") return true
  return user.department === department
}

export function requiresSecondaryAuth(user: User | null, targetDepartment: string): boolean {
  if (!user) return true
  if (user.role === "admin") return false
  return user.department !== targetDepartment
}

export async function validateSecondaryAuth(
  user: User,
  targetDepartment: string,
  password?: string,
  accessCode?: string,
): Promise<boolean> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Demo credentials for cross-department access
  const departmentCredentials = {
    webhosting: {
      password: "hosting123",
      accessCode: "WH2024",
    },
    cybersecurity: {
      password: "security123",
      accessCode: "CS2024",
    },
  }

  const credentials = departmentCredentials[targetDepartment as keyof typeof departmentCredentials]
  if (!credentials) return false

  return password === credentials.password || accessCode === credentials.accessCode
}

export function getDefaultDepartment(user: User | null): string {
  if (!user) return "webhosting"

  switch (user.role) {
    case "admin":
      return "admin"
    case "webhosting_manager":
    case "webhosting_user":
      return "webhosting"
    case "cybersecurity_manager":
    case "cybersecurity_user":
      return "cybersecurity"
    default:
      return "webhosting"
  }
}

export function canDirectlyAccessDepartment(user: User | null, targetDepartment: string): boolean {
  if (!user) return false
  if (user.role === "admin") return true
  return user.department === targetDepartment
}

export async function authenticateCrossDepartment(
  user: User,
  targetDepartment: string,
  credentials: { password?: string; accessCode?: string },
): Promise<boolean> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const departmentCredentials = {
    webhosting: {
      password: "hosting123",
      accessCode: "WH2024",
    },
    cybersecurity: {
      password: "security123",
      accessCode: "CS2024",
    },
  }

  const targetCreds = departmentCredentials[targetDepartment as keyof typeof departmentCredentials]
  if (!targetCreds) return false

  return credentials.password === targetCreds.password || credentials.accessCode === targetCreds.accessCode
}

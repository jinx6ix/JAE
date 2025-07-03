"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/admin/use-auth"
import { getDefaultDepartment } from "@/lib/admin/auth"
import { AdminLayout } from "./admin-layout"
import { UserLayout } from "./user-layout"
import { LoginForm } from "./login-form"
import { DepartmentSelector } from "./department-selector"
import { useApi } from "@/hooks/admin/use-api"

export function AdminDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const [currentDepartment, setCurrentDepartment] = useState<string>("")
  const {
    clients,
    servers,
    securityAlerts,
    invoices,
    tasks,
    users,
    isLoading: dataLoading,
    refreshAll,
    createClient,
    updateClient,
    deleteClient,
    createServer,
    updateServer,
    createUser,
    updateUser,
    deleteUser,
    createTask,
    updateTask,
    deleteTask,
    updateSecurityAlert,
  } = useApi()

  useEffect(() => {
    if (user && !currentDepartment) {
      const defaultDept = getDefaultDepartment(user)
      setCurrentDepartment(defaultDept)
    }
  }, [user, currentDepartment])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return <LoginForm />
  }

  // Admin users get department selector
  if (user.role === "admin") {
    return (
      <>
        <DepartmentSelector
          currentDepartment={currentDepartment}
          onDepartmentChange={setCurrentDepartment}
          user={user}
        />
        <AdminLayout
          clients={clients}
          servers={servers}
          securityAlerts={securityAlerts}
          invoices={invoices}
          tasks={tasks}
          users={users}
          isLoading={dataLoading}
          onRefresh={refreshAll}
          onCreateClient={createClient}
          onUpdateClient={updateClient}
          onDeleteClient={deleteClient}
          onCreateServer={createServer}
          onUpdateServer={updateServer}
          onCreateUser={createUser}
          onUpdateUser={updateUser}
          onDeleteUser={deleteUser}
          onCreateTask={createTask}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
          onUpdateSecurityAlert={updateSecurityAlert}
        />
      </>
    )
  }

  // Regular users get their department-specific layout
  return (
    <UserLayout
      clients={clients}
      servers={servers}
      securityAlerts={securityAlerts}
      invoices={invoices}
      tasks={tasks}
      users={users}
      isLoading={dataLoading}
      onRefresh={refreshAll}
    />
  )
}

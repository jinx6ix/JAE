import { mockUsers, type User } from "./auth"

export const usersApi = {
  getUsers: async (department?: string): Promise<User[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    let filteredUsers = [...mockUsers]

    // If department is specified and not admin, filter by department
    if (department && department !== "admin") {
      filteredUsers = filteredUsers.filter((user) => user.department === department)
    }
    // If no department specified, return all users (for admin)

    return filteredUsers
  },

  getUser: async (id: string): Promise<User | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockUsers.find((user) => user.id === id) || null
  },

  createUser: async (user: Omit<User, "id" | "createdAt" | "lastLogin">): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    const newUser: User = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    mockUsers.push(newUser)
    return newUser
  },

  updateUser: async (id: string, updates: Partial<User>): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    const index = mockUsers.findIndex((user) => user.id === id)
    if (index === -1) throw new Error("User not found")

    mockUsers[index] = { ...mockUsers[index], ...updates }
    return mockUsers[index]
  },

  deleteUser: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 400))
    const index = mockUsers.findIndex((user) => user.id === id)
    if (index === -1) throw new Error("User not found")
    mockUsers.splice(index, 1)
  },

  getUsersByDepartment: async (department: string): Promise<User[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    if (department === "admin") {
      // Return all users for admin department
      return mockUsers.filter((user) => user.status === "active")
    }
    return mockUsers.filter((user) => user.department === department && user.status === "active")
  },
}

export { User }

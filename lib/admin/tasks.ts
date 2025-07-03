export interface Task {
  id: string
  title: string
  description: string
  type: "webhosting" | "cybersecurity" | "general"
  priority: "low" | "medium" | "high" | "critical"
  status: "pending" | "in_progress" | "completed" | "cancelled"
  assignedTo: string // User ID
  assignedBy: string // User ID
  assignedToName: string
  assignedByName: string
  createdAt: string
  updatedAt: string
  dueDate?: string
  completedAt?: string
  tags: string[]
  relatedEntity?: {
    type: "client" | "server" | "alert"
    id: string
    name: string
  }
  comments: TaskComment[]
}

export interface TaskComment {
  id: string
  userId: string
  userName: string
  comment: string
  createdAt: string
}

// Mock tasks database
export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Server Maintenance - Web Server 1",
    description: "Perform routine maintenance on Web Server 1 including security updates and performance optimization",
    type: "webhosting",
    priority: "medium",
    status: "in_progress",
    assignedTo: "3",
    assignedBy: "2",
    assignedToName: "Mike Johnson",
    assignedByName: "Sarah Wilson",
    createdAt: "2024-01-20T08:00:00Z",
    updatedAt: "2024-01-20T09:30:00Z",
    dueDate: "2024-01-22T18:00:00Z",
    tags: ["maintenance", "server", "security"],
    relatedEntity: {
      type: "server",
      id: "srv-001",
      name: "Web Server 1",
    },
    comments: [
      {
        id: "1",
        userId: "3",
        userName: "Mike Johnson",
        comment: "Started the maintenance process. Security updates are being applied.",
        createdAt: "2024-01-20T09:30:00Z",
      },
    ],
  },
  {
    id: "2",
    title: "Investigate DDoS Attack",
    description: "Analyze the recent DDoS attack on techcorp.com and implement additional protection measures",
    type: "cybersecurity",
    priority: "high",
    status: "completed",
    assignedTo: "6",
    assignedBy: "5",
    assignedToName: "Lisa Chen",
    assignedByName: "Alex Rodriguez",
    createdAt: "2024-01-20T10:45:00Z",
    updatedAt: "2024-01-20T14:30:00Z",
    dueDate: "2024-01-20T18:00:00Z",
    completedAt: "2024-01-20T14:30:00Z",
    tags: ["ddos", "investigation", "protection"],
    relatedEntity: {
      type: "alert",
      id: "1",
      name: "DDoS Attack on techcorp.com",
    },
    comments: [
      {
        id: "2",
        userId: "6",
        userName: "Lisa Chen",
        comment: "Investigation completed. Attack originated from botnet. Additional DDoS protection implemented.",
        createdAt: "2024-01-20T14:30:00Z",
      },
    ],
  },
  {
    id: "3",
    title: "Client Onboarding - E-Commerce Plus",
    description: "Set up hosting environment and security configurations for new client E-Commerce Plus",
    type: "webhosting",
    priority: "medium",
    status: "pending",
    assignedTo: "4",
    assignedBy: "2",
    assignedToName: "Emily Davis",
    assignedByName: "Sarah Wilson",
    createdAt: "2024-01-20T11:00:00Z",
    updatedAt: "2024-01-20T11:00:00Z",
    dueDate: "2024-01-23T17:00:00Z",
    tags: ["onboarding", "client", "setup"],
    relatedEntity: {
      type: "client",
      id: "3",
      name: "E-Commerce Plus",
    },
    comments: [],
  },
  {
    id: "4",
    title: "Security Audit - StartupXYZ",
    description: "Conduct comprehensive security audit for StartupXYZ infrastructure",
    type: "cybersecurity",
    priority: "medium",
    status: "in_progress",
    assignedTo: "7",
    assignedBy: "5",
    assignedToName: "David Kim",
    assignedByName: "Alex Rodriguez",
    createdAt: "2024-01-19T14:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
    dueDate: "2024-01-25T17:00:00Z",
    tags: ["audit", "security", "assessment"],
    relatedEntity: {
      type: "client",
      id: "2",
      name: "StartupXYZ",
    },
    comments: [
      {
        id: "3",
        userId: "7",
        userName: "David Kim",
        comment: "Started the security audit. Initial scans show no critical vulnerabilities.",
        createdAt: "2024-01-20T10:00:00Z",
      },
    ],
  },
]

export const tasksApi = {
  getTasks: async (userId?: string, department?: string): Promise<Task[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    let filteredTasks = [...mockTasks]

    if (userId) {
      filteredTasks = filteredTasks.filter((task) => task.assignedTo === userId)
    }

    if (department && department !== "admin") {
      filteredTasks = filteredTasks.filter((task) => task.type === department)
    }

    return filteredTasks
  },

  getTask: async (id: string): Promise<Task | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockTasks.find((task) => task.id === id) || null
  },

  createTask: async (task: Omit<Task, "id" | "createdAt" | "updatedAt" | "comments">): Promise<Task> => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: [],
    }
    mockTasks.push(newTask)
    return newTask
  },

  updateTask: async (id: string, updates: Partial<Task>): Promise<Task> => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    const index = mockTasks.findIndex((task) => task.id === id)
    if (index === -1) throw new Error("Task not found")

    mockTasks[index] = {
      ...mockTasks[index],
      ...updates,
      updatedAt: new Date().toISOString(),
      ...(updates.status === "completed" && !mockTasks[index].completedAt
        ? { completedAt: new Date().toISOString() }
        : {}),
    }
    return mockTasks[index]
  },

  addComment: async (taskId: string, comment: Omit<TaskComment, "id" | "createdAt">): Promise<TaskComment> => {
    await new Promise((resolve) => setTimeout(resolve, 400))
    const task = mockTasks.find((t) => t.id === taskId)
    if (!task) throw new Error("Task not found")

    const newComment: TaskComment = {
      ...comment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }

    task.comments.push(newComment)
    task.updatedAt = new Date().toISOString()

    return newComment
  },

  deleteTask: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 400))
    const index = mockTasks.findIndex((task) => task.id === id)
    if (index === -1) throw new Error("Task not found")
    mockTasks.splice(index, 1)
  },
}

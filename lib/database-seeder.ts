import { localDB } from "./local-database"

interface SeedData {
  users: any[]
  tasks: any[]
  customers: any[]
  projects: any[]
  notifications: any[]
  settings: any[]
  auditLogs: any[]
}

class DatabaseSeeder {
  private seedData: SeedData

  constructor() {
    this.seedData = this.generateSeedData()
  }

  private generateSeedData(): SeedData {
    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    return {
      users: [
        {
          id: 1,
          name: "张经理",
          email: "zhang.manager@company.com",
          department: "销售部",
          role: "manager",
          avatar: "",
          status: "active",
          createdAt: oneMonthAgo,
          lastLogin: now,
        },
        {
          id: 2,
          name: "李总监",
          email: "li.director@company.com",
          department: "技术部",
          role: "director",
          avatar: "",
          status: "active",
          createdAt: oneMonthAgo,
          lastLogin: new Date(now.getTime() - 2 * 60 * 60 * 1000),
        },
        {
          id: 3,
          name: "王设计师",
          email: "wang.designer@company.com",
          department: "设计部",
          role: "designer",
          avatar: "",
          status: "active",
          createdAt: oneMonthAgo,
          lastLogin: new Date(now.getTime() - 30 * 60 * 1000),
        },
        {
          id: 4,
          name: "陈开发",
          email: "chen.developer@company.com",
          department: "技术部",
          role: "developer",
          avatar: "",
          status: "active",
          createdAt: oneMonthAgo,
          lastLogin: new Date(now.getTime() - 1 * 60 * 60 * 1000),
        },
        {
          id: 5,
          name: "赵产品",
          email: "zhao.product@company.com",
          department: "产品部",
          role: "product_manager",
          avatar: "",
          status: "active",
          createdAt: oneMonthAgo,
          lastLogin: new Date(now.getTime() - 15 * 60 * 1000),
        },
      ],
      tasks: [
        {
          id: 1,
          title: "完成用户界面设计",
          description: "设计新版本的用户界面，包括主页、列表页和详情页",
          assigneeId: 3,
          assigneeName: "王设计师",
          status: "in_progress",
          priority: "high",
          dueDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
          createdAt: oneWeekAgo,
          updatedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000),
          projectId: 1,
          tags: ["设计", "UI", "用户体验"],
        },
        {
          id: 2,
          title: "API接口开发",
          description: "开发用户管理相关的API接口",
          assigneeId: 4,
          assigneeName: "陈开发",
          status: "completed",
          priority: "medium",
          dueDate: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
          createdAt: oneWeekAgo,
          updatedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
          projectId: 1,
          tags: ["开发", "API", "后端"],
        },
        {
          id: 3,
          title: "客户需求调研",
          description: "收集和分析客户对新功能的需求",
          assigneeId: 5,
          assigneeName: "赵产品",
          status: "pending",
          priority: "high",
          dueDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
          createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
          updatedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
          projectId: 2,
          tags: ["调研", "需求", "客户"],
        },
        {
          id: 4,
          title: "系统性能优化",
          description: "优化系统响应速度和数据库查询性能",
          assigneeId: 2,
          assigneeName: "李总监",
          status: "in_progress",
          priority: "medium",
          dueDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
          createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
          updatedAt: new Date(now.getTime() - 1 * 60 * 60 * 1000),
          projectId: 1,
          tags: ["优化", "性能", "技术"],
        },
      ],
      customers: [
        {
          id: 1,
          name: "北京科技有限公司",
          email: "contact@beijing-tech.com",
          phone: "010-12345678",
          address: "北京市朝阳区科技园区",
          status: "active",
          type: "enterprise",
          industry: "科技",
          revenue: 5000000,
          createdAt: oneMonthAgo,
          lastContact: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
          assignedTo: 1,
          notes: "重要客户，年度合作伙伴",
        },
        {
          id: 2,
          name: "上海制造集团",
          email: "info@shanghai-mfg.com",
          phone: "021-87654321",
          address: "上海市浦东新区工业园",
          status: "potential",
          type: "enterprise",
          industry: "制造业",
          revenue: 8000000,
          createdAt: new Date(now.getTime() - 2 * 7 * 24 * 60 * 60 * 1000),
          lastContact: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
          assignedTo: 1,
          notes: "正在洽谈中，有很大合作潜力",
        },
        {
          id: 3,
          name: "深圳创新公司",
          email: "hello@shenzhen-innovation.com",
          phone: "0755-11223344",
          address: "深圳市南山区高新园",
          status: "active",
          type: "startup",
          industry: "互联网",
          revenue: 2000000,
          createdAt: new Date(now.getTime() - 3 * 7 * 24 * 60 * 60 * 1000),
          lastContact: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
          assignedTo: 1,
          notes: "年轻团队，发展迅速",
        },
      ],
      projects: [
        {
          id: 1,
          name: "企业管理系统升级",
          description: "升级现有的企业管理系统，增加新功能和优化用户体验",
          status: "active",
          priority: "high",
          managerId: 2,
          managerName: "李总监",
          startDate: oneMonthAgo,
          endDate: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000),
          budget: 500000,
          progress: 65,
          teamMembers: [2, 3, 4, 5],
          createdAt: oneMonthAgo,
          updatedAt: new Date(now.getTime() - 1 * 60 * 60 * 1000),
        },
        {
          id: 2,
          name: "客户关系管理系统",
          description: "开发新的客户关系管理系统，提升销售效率",
          status: "planning",
          priority: "medium",
          managerId: 1,
          managerName: "张经理",
          startDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
          endDate: new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000),
          budget: 300000,
          progress: 10,
          teamMembers: [1, 5],
          createdAt: new Date(now.getTime() - 1 * 7 * 24 * 60 * 60 * 1000),
          updatedAt: new Date(now.getTime() - 1 * 7 * 24 * 60 * 60 * 1000),
        },
      ],
      notifications: [
        {
          id: 1,
          userId: 3,
          title: "新任务分配",
          content: "您被分配了新任务：完成用户界面设计",
          type: "task",
          priority: "medium",
          isRead: false,
          timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000),
          actionUrl: "/tasks/1",
        },
        {
          id: 2,
          userId: 4,
          title: "任务即将到期",
          content: "任务 'API接口开发' 将在明天到期",
          type: "reminder",
          priority: "high",
          isRead: true,
          timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000),
          actionUrl: "/tasks/2",
        },
        {
          id: 3,
          userId: 1,
          title: "客户联系提醒",
          content: "需要联系客户：北京科技有限公司",
          type: "customer",
          priority: "medium",
          isRead: false,
          timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000),
          actionUrl: "/customers/1",
        },
      ],
      settings: [
        {
          key: "theme",
          value: "light",
          category: "appearance",
          description: "系统主题设置",
          updatedAt: oneWeekAgo,
        },
        {
          key: "language",
          value: "zh-CN",
          category: "localization",
          description: "系统语言设置",
          updatedAt: oneWeekAgo,
        },
        {
          key: "notifications_enabled",
          value: true,
          category: "notifications",
          description: "是否启用通知",
          updatedAt: oneWeekAgo,
        },
        {
          key: "auto_save_interval",
          value: 30,
          category: "system",
          description: "自动保存间隔（秒）",
          updatedAt: oneWeekAgo,
        },
        {
          key: "items_per_page",
          value: 20,
          category: "display",
          description: "每页显示项目数",
          updatedAt: oneWeekAgo,
        },
      ],
      auditLogs: [
        {
          id: 1,
          userId: 1,
          userName: "张经理",
          action: "create",
          resource: "customer",
          resourceId: "3",
          details: "创建新客户：深圳创新公司",
          timestamp: new Date(now.getTime() - 3 * 7 * 24 * 60 * 60 * 1000),
          ipAddress: "192.168.1.100",
          userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        {
          id: 2,
          userId: 3,
          userName: "王设计师",
          action: "update",
          resource: "task",
          resourceId: "1",
          details: "更新任务状态为进行中",
          timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000),
          ipAddress: "192.168.1.101",
          userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        },
        {
          id: 3,
          userId: 4,
          userName: "陈开发",
          action: "complete",
          resource: "task",
          resourceId: "2",
          details: "完成任务：API接口开发",
          timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
          ipAddress: "192.168.1.102",
          userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
        },
        {
          id: 4,
          userId: 2,
          userName: "李总监",
          action: "login",
          resource: "system",
          resourceId: null,
          details: "用户登录系统",
          timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000),
          ipAddress: "192.168.1.103",
          userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      ],
    }
  }

  async seedAll(): Promise<void> {
    try {
      console.log("开始数据库种子数据填充...")

      // 清空现有数据
      await this.clearAllData()

      // 填充种子数据
      await this.seedUsers()
      await this.seedTasks()
      await this.seedCustomers()
      await this.seedProjects()
      await this.seedNotifications()
      await this.seedSettings()
      await this.seedAuditLogs()

      console.log("数据库种子数据填充完成")
    } catch (error) {
      console.error("数据库种子数据填充失败:", error)
      throw error
    }
  }

  async clearAllData(): Promise<void> {
    const stores = ["users", "tasks", "customers", "projects", "notifications", "settings", "auditLogs"]

    for (const store of stores) {
      await localDB.clear(store)
      console.log(`清空 ${store} 数据`)
    }
  }

  async seedUsers(): Promise<void> {
    for (const user of this.seedData.users) {
      await localDB.add("users", user)
    }
    console.log(`填充 ${this.seedData.users.length} 个用户`)
  }

  async seedTasks(): Promise<void> {
    for (const task of this.seedData.tasks) {
      await localDB.add("tasks", task)
    }
    console.log(`填充 ${this.seedData.tasks.length} 个任务`)
  }

  async seedCustomers(): Promise<void> {
    for (const customer of this.seedData.customers) {
      await localDB.add("customers", customer)
    }
    console.log(`填充 ${this.seedData.customers.length} 个客户`)
  }

  async seedProjects(): Promise<void> {
    for (const project of this.seedData.projects) {
      await localDB.add("projects", project)
    }
    console.log(`填充 ${this.seedData.projects.length} 个项目`)
  }

  async seedNotifications(): Promise<void> {
    for (const notification of this.seedData.notifications) {
      await localDB.add("notifications", notification)
    }
    console.log(`填充 ${this.seedData.notifications.length} 个通知`)
  }

  async seedSettings(): Promise<void> {
    for (const setting of this.seedData.settings) {
      await localDB.add("settings", setting)
    }
    console.log(`填充 ${this.seedData.settings.length} 个设置`)
  }

  async seedAuditLogs(): Promise<void> {
    for (const log of this.seedData.auditLogs) {
      await localDB.add("auditLogs", log)
    }
    console.log(`填充 ${this.seedData.auditLogs.length} 个审计日志`)
  }

  async getStats(): Promise<{
    totalRecords: number
    storeStats: { [key: string]: number }
  }> {
    const stores = ["users", "tasks", "customers", "projects", "notifications", "settings", "auditLogs"]
    const storeStats: { [key: string]: number } = {}
    let totalRecords = 0

    for (const store of stores) {
      const count = await localDB.count(store)
      storeStats[store] = count
      totalRecords += count
    }

    return { totalRecords, storeStats }
  }

  async generateRandomData(count = 100): Promise<void> {
    console.log(`生成 ${count} 条随机数据...`)

    const now = new Date()

    // 生成随机任务
    for (let i = 0; i < count; i++) {
      const task = {
        title: `随机任务 ${i + 1}`,
        description: `这是第 ${i + 1} 个随机生成的任务`,
        assigneeId: Math.floor(Math.random() * 5) + 1,
        assigneeName: `用户${Math.floor(Math.random() * 5) + 1}`,
        status: ["pending", "in_progress", "completed", "cancelled"][Math.floor(Math.random() * 4)],
        priority: ["low", "medium", "high", "urgent"][Math.floor(Math.random() * 4)],
        dueDate: new Date(now.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000),
        createdAt: new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(now.getTime() - Math.random() * 24 * 60 * 60 * 1000),
        projectId: Math.floor(Math.random() * 2) + 1,
        tags: ["标签1", "标签2", "标签3"].slice(0, Math.floor(Math.random() * 3) + 1),
      }

      await localDB.add("tasks", task)
    }

    console.log(`生成了 ${count} 条随机任务数据`)
  }
}

// 创建种子数据填充器实例
export const dbSeeder = new DatabaseSeeder()

// 导出便捷方法
export const seedDatabase = async (): Promise<void> => {
  await dbSeeder.seedAll()
}

export const clearDatabase = async (): Promise<void> => {
  await dbSeeder.clearAllData()
}

export const getDatabaseStats = async () => {
  return await dbSeeder.getStats()
}

export const generateRandomData = async (count = 100) => {
  await dbSeeder.generateRandomData(count)
}

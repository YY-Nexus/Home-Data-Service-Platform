interface DatabaseConfig {
  name: string
  version: number
  stores: {
    [key: string]: {
      keyPath: string
      autoIncrement?: boolean
      indexes?: { [key: string]: string | string[] }
    }
  }
}

interface QueryOptions {
  limit?: number
  offset?: number
  orderBy?: string
  orderDirection?: "asc" | "desc"
  filter?: (item: any) => boolean
}

class LocalDatabase {
  private db: IDBDatabase | null = null
  private config: DatabaseConfig
  private isInitialized = false

  constructor(config: DatabaseConfig) {
    this.config = config
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.config.name, this.config.version)

      request.onerror = () => {
        reject(new Error(`数据库初始化失败: ${request.error?.message}`))
      }

      request.onsuccess = () => {
        this.db = request.result
        this.isInitialized = true
        console.log(`数据库 ${this.config.name} 初始化成功`)
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // 创建对象存储
        Object.entries(this.config.stores).forEach(([storeName, storeConfig]) => {
          if (!db.objectStoreNames.contains(storeName)) {
            const store = db.createObjectStore(storeName, {
              keyPath: storeConfig.keyPath,
              autoIncrement: storeConfig.autoIncrement || false,
            })

            // 创建索引
            if (storeConfig.indexes) {
              Object.entries(storeConfig.indexes).forEach(([indexName, indexKey]) => {
                store.createIndex(indexName, indexKey, { unique: false })
              })
            }

            console.log(`创建对象存储: ${storeName}`)
          }
        })
      }
    })
  }

  async add(storeName: string, data: any): Promise<any> {
    await this.ensureInitialized()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readwrite")
      const store = transaction.objectStore(storeName)
      const request = store.add(data)

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(new Error(`添加数据失败: ${request.error?.message}`))
    })
  }

  async put(storeName: string, data: any): Promise<any> {
    await this.ensureInitialized()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readwrite")
      const store = transaction.objectStore(storeName)
      const request = store.put(data)

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(new Error(`更新数据失败: ${request.error?.message}`))
    })
  }

  async get(storeName: string, key: any): Promise<any> {
    await this.ensureInitialized()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readonly")
      const store = transaction.objectStore(storeName)
      const request = store.get(key)

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(new Error(`获取数据失败: ${request.error?.message}`))
    })
  }

  async getAll(storeName: string, options: QueryOptions = {}): Promise<any[]> {
    await this.ensureInitialized()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readonly")
      const store = transaction.objectStore(storeName)
      const request = store.getAll()

      request.onsuccess = () => {
        let results = request.result

        // 应用过滤器
        if (options.filter) {
          results = results.filter(options.filter)
        }

        // 排序
        if (options.orderBy) {
          results.sort((a, b) => {
            const aVal = a[options.orderBy!]
            const bVal = b[options.orderBy!]
            const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
            return options.orderDirection === "desc" ? -comparison : comparison
          })
        }

        // 分页
        if (options.offset || options.limit) {
          const start = options.offset || 0
          const end = options.limit ? start + options.limit : undefined
          results = results.slice(start, end)
        }

        resolve(results)
      }
      request.onerror = () => reject(new Error(`查询数据失败: ${request.error?.message}`))
    })
  }

  async delete(storeName: string, key: any): Promise<void> {
    await this.ensureInitialized()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readwrite")
      const store = transaction.objectStore(storeName)
      const request = store.delete(key)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(new Error(`删除数据失败: ${request.error?.message}`))
    })
  }

  async clear(storeName: string): Promise<void> {
    await this.ensureInitialized()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readwrite")
      const store = transaction.objectStore(storeName)
      const request = store.clear()

      request.onsuccess = () => resolve()
      request.onerror = () => reject(new Error(`清空数据失败: ${request.error?.message}`))
    })
  }

  async count(storeName: string): Promise<number> {
    await this.ensureInitialized()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readonly")
      const store = transaction.objectStore(storeName)
      const request = store.count()

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(new Error(`统计数据失败: ${request.error?.message}`))
    })
  }

  async query(storeName: string, indexName: string, value: any): Promise<any[]> {
    await this.ensureInitialized()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readonly")
      const store = transaction.objectStore(storeName)
      const index = store.index(indexName)
      const request = index.getAll(value)

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(new Error(`索引查询失败: ${request.error?.message}`))
    })
  }

  async transaction(storeNames: string[], mode: IDBTransactionMode = "readonly"): Promise<IDBTransaction> {
    await this.ensureInitialized()
    return this.db!.transaction(storeNames, mode)
  }

  async backup(): Promise<string> {
    await this.ensureInitialized()

    const backup: { [key: string]: any[] } = {}

    for (const storeName of Object.keys(this.config.stores)) {
      backup[storeName] = await this.getAll(storeName)
    }

    return JSON.stringify({
      version: this.config.version,
      timestamp: new Date().toISOString(),
      data: backup,
    })
  }

  async restore(backupData: string): Promise<void> {
    await this.ensureInitialized()

    try {
      const backup = JSON.parse(backupData)

      if (!backup.data) {
        throw new Error("无效的备份数据格式")
      }

      // 清空现有数据
      for (const storeName of Object.keys(this.config.stores)) {
        await this.clear(storeName)
      }

      // 恢复数据
      for (const [storeName, data] of Object.entries(backup.data)) {
        if (Array.isArray(data)) {
          for (const item of data) {
            await this.add(storeName, item)
          }
        }
      }

      console.log("数据恢复完成")
    } catch (error) {
      throw new Error(`数据恢复失败: ${error instanceof Error ? error.message : "未知错误"}`)
    }
  }

  async getStats(): Promise<{
    totalSize: number
    storeStats: { [key: string]: { count: number; size: number } }
  }> {
    await this.ensureInitialized()

    const storeStats: { [key: string]: { count: number; size: number } } = {}
    let totalSize = 0

    for (const storeName of Object.keys(this.config.stores)) {
      const count = await this.count(storeName)
      const data = await this.getAll(storeName)
      const size = new Blob([JSON.stringify(data)]).size

      storeStats[storeName] = { count, size }
      totalSize += size
    }

    return { totalSize, storeStats }
  }

  private async ensureInitialized(): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize()
    }
  }

  close(): void {
    if (this.db) {
      this.db.close()
      this.db = null
      this.isInitialized = false
    }
  }
}

// 默认数据库配置
const defaultConfig: DatabaseConfig = {
  name: "EnterpriseManagementDB",
  version: 1,
  stores: {
    users: {
      keyPath: "id",
      autoIncrement: true,
      indexes: {
        email: "email",
        department: "department",
        role: "role",
      },
    },
    tasks: {
      keyPath: "id",
      autoIncrement: true,
      indexes: {
        assignee: "assigneeId",
        status: "status",
        priority: "priority",
        dueDate: "dueDate",
      },
    },
    customers: {
      keyPath: "id",
      autoIncrement: true,
      indexes: {
        name: "name",
        email: "email",
        status: "status",
        createdAt: "createdAt",
      },
    },
    projects: {
      keyPath: "id",
      autoIncrement: true,
      indexes: {
        name: "name",
        status: "status",
        manager: "managerId",
        startDate: "startDate",
      },
    },
    notifications: {
      keyPath: "id",
      autoIncrement: true,
      indexes: {
        userId: "userId",
        type: "type",
        isRead: "isRead",
        timestamp: "timestamp",
      },
    },
    settings: {
      keyPath: "key",
      indexes: {
        category: "category",
      },
    },
    auditLogs: {
      keyPath: "id",
      autoIncrement: true,
      indexes: {
        userId: "userId",
        action: "action",
        timestamp: "timestamp",
        resource: "resource",
      },
    },
  },
}

// 创建默认数据库实例
export const localDB = new LocalDatabase(defaultConfig)

// 初始化数据库
export const initializeDatabase = async (): Promise<void> => {
  try {
    await localDB.initialize()
    console.log("本地数据库初始化成功")
  } catch (error) {
    console.error("本地数据库初始化失败:", error)
    throw error
  }
}

// 导出类型和实例
export { LocalDatabase, type DatabaseConfig, type QueryOptions }

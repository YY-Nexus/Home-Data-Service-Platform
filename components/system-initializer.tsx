"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Database,
  Settings,
  Users,
  Shield,
  Zap,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  Server,
  Network,
  HardDrive,
  Cpu,
  MemoryStickIcon as Memory,
  Activity,
  Loader2,
  Info,
} from "lucide-react"
import { initializeDatabase } from "@/lib/local-database"
import { dbSeeder } from "@/lib/database-seeder"

interface InitializationStep {
  id: string
  name: string
  description: string
  status: "pending" | "running" | "completed" | "failed" | "skipped"
  progress: number
  duration?: number
  error?: string
  dependencies?: string[]
  critical?: boolean
}

interface SystemResource {
  name: string
  type: "cpu" | "memory" | "disk" | "network"
  usage: number
  total: number
  status: "normal" | "warning" | "critical"
  unit: string
}

export function SystemInitializer() {
  const [isInitializing, setIsInitializing] = useState(false)
  const [currentStep, setCurrentStep] = useState<string | null>(null)
  const [overallProgress, setOverallProgress] = useState(0)
  const [logs, setLogs] = useState<string[]>([])
  const [showAdvanced, setShowAdvanced] = useState(false)

  const [systemResources, setSystemResources] = useState<SystemResource[]>([
    { name: "CPU", type: "cpu", usage: 45, total: 100, status: "normal", unit: "%" },
    { name: "内存", type: "memory", usage: 2.8, total: 8, status: "normal", unit: "GB" },
    { name: "磁盘", type: "disk", usage: 156, total: 500, status: "normal", unit: "GB" },
    { name: "网络", type: "network", usage: 12.5, total: 100, status: "normal", unit: "Mbps" },
  ])

  const [initSteps, setInitSteps] = useState<InitializationStep[]>([
    {
      id: "database",
      name: "数据库初始化",
      description: "创建IndexedDB数据库和表结构",
      status: "pending",
      progress: 0,
      dependencies: [],
      critical: true,
    },
    {
      id: "seed",
      name: "种子数据加载",
      description: "加载示例数据和基础配置",
      status: "pending",
      progress: 0,
      dependencies: ["database"],
      critical: false,
    },
    {
      id: "cache",
      name: "缓存系统",
      description: "初始化本地缓存和会话存储",
      status: "pending",
      progress: 0,
      dependencies: ["database"],
      critical: false,
    },
    {
      id: "auth",
      name: "认证系统",
      description: "配置用户认证和权限管理",
      status: "pending",
      progress: 0,
      dependencies: ["database"],
      critical: true,
    },
    {
      id: "services",
      name: "核心服务",
      description: "启动业务逻辑服务和API接口",
      status: "pending",
      progress: 0,
      dependencies: ["database", "cache", "auth"],
      critical: true,
    },
    {
      id: "workers",
      name: "后台任务",
      description: "启动队列处理和定时任务",
      status: "pending",
      progress: 0,
      dependencies: ["services"],
      critical: false,
    },
    {
      id: "monitoring",
      name: "监控系统",
      description: "配置系统监控和日志收集",
      status: "pending",
      progress: 0,
      dependencies: ["services"],
      critical: false,
    },
    {
      id: "optimization",
      name: "性能优化",
      description: "应用缓存策略和性能调优",
      status: "pending",
      progress: 0,
      dependencies: ["services", "monitoring"],
      critical: false,
    },
  ])

  const getStepIcon = (status: InitializationStep["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "failed":
        return <XCircle className="w-5 h-5 text-red-600" />
      case "running":
        return <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
      case "skipped":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getResourceIcon = (type: SystemResource["type"]) => {
    switch (type) {
      case "cpu":
        return <Cpu className="w-4 h-4" />
      case "memory":
        return <Memory className="w-4 h-4" />
      case "disk":
        return <HardDrive className="w-4 h-4" />
      case "network":
        return <Network className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  const getResourceColor = (status: SystemResource["status"]) => {
    switch (status) {
      case "normal":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "critical":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const addLog = (message: string, type: "info" | "success" | "error" | "warning" = "info") => {
    const timestamp = new Date().toLocaleTimeString("zh-CN")
    const icon = type === "success" ? "✅" : type === "error" ? "❌" : type === "warning" ? "⚠️" : "ℹ️"
    setLogs((prev) => [`[${timestamp}] ${icon} ${message}`, ...prev.slice(0, 99)]) // 保留最近100条
  }

  const simulateStep = async (step: InitializationStep) => {
    setCurrentStep(step.id)
    setInitSteps((prev) => prev.map((s) => (s.id === step.id ? { ...s, status: "running", progress: 0 } : s)))

    addLog(`开始执行: ${step.name}`)

    const startTime = Date.now()

    try {
      // 根据步骤类型执行不同的初始化逻辑
      switch (step.id) {
        case "database":
          await initializeDatabase()
          break
        case "seed":
          await dbSeeder.seedAll()
          break
        case "cache":
          // 初始化缓存
          localStorage.setItem("cache_initialized", "true")
          sessionStorage.setItem("session_initialized", "true")
          break
        case "auth":
          // 初始化认证系统
          localStorage.setItem("auth_config", JSON.stringify({ initialized: true }))
          break
        case "services":
          // 启动核心服务
          await new Promise((resolve) => setTimeout(resolve, 1000))
          break
        case "workers":
          // 启动后台任务
          await new Promise((resolve) => setTimeout(resolve, 800))
          break
        case "monitoring":
          // 配置监控
          await new Promise((resolve) => setTimeout(resolve, 600))
          break
        case "optimization":
          // 性能优化
          await new Promise((resolve) => setTimeout(resolve, 500))
          break
      }

      // 模拟进度更新
      for (let i = 0; i <= 100; i += 20) {
        await new Promise((resolve) => setTimeout(resolve, 100))
        setInitSteps((prev) => prev.map((s) => (s.id === step.id ? { ...s, progress: i } : s)))
      }

      const duration = Date.now() - startTime

      setInitSteps((prev) =>
        prev.map((s) => (s.id === step.id ? { ...s, status: "completed", progress: 100, duration } : s)),
      )
      addLog(`${step.name} 完成 (耗时: ${duration}ms)`, "success")
    } catch (error) {
      const duration = Date.now() - startTime
      const errorMessage = error instanceof Error ? error.message : "未知错误"

      setInitSteps((prev) =>
        prev.map((s) =>
          s.id === step.id
            ? {
                ...s,
                status: "failed",
                progress: Math.floor(Math.random() * 80) + 10,
                error: errorMessage,
                duration,
              }
            : s,
        ),
      )
      addLog(`${step.name} 失败: ${errorMessage}`, "error")

      // 如果是关键步骤失败，询问是否继续
      if (step.critical) {
        const shouldContinue = confirm(`关键步骤 "${step.name}" 失败，是否继续其他步骤？`)
        if (!shouldContinue) {
          throw new Error("用户取消初始化")
        }
      }
    }
  }

  const startInitialization = async () => {
    setIsInitializing(true)
    setOverallProgress(0)
    addLog("🚀 开始系统初始化...", "info")

    // 重置所有步骤状态
    setInitSteps((prev) =>
      prev.map((step) => ({
        ...step,
        status: "pending",
        progress: 0,
        error: undefined,
        duration: undefined,
      })),
    )

    const totalSteps = initSteps.length
    let completedSteps = 0

    try {
      for (const step of initSteps) {
        // 检查依赖项
        if (step.dependencies && step.dependencies.length > 0) {
          const dependenciesCompleted = step.dependencies.every((depId) => {
            const depStep = initSteps.find((s) => s.id === depId)
            return depStep?.status === "completed"
          })

          if (!dependenciesCompleted) {
            setInitSteps((prev) => prev.map((s) => (s.id === step.id ? { ...s, status: "skipped" } : s)))
            addLog(`跳过 ${step.name}: 依赖项未完成`, "warning")
            continue
          }
        }

        await simulateStep(step)
        completedSteps++
        setOverallProgress((completedSteps / totalSteps) * 100)
      }

      addLog("🎉 系统初始化完成", "success")

      // 发送初始化完成事件
      window.dispatchEvent(
        new CustomEvent("systemInitialized", {
          detail: { success: true, timestamp: new Date() },
        }),
      )
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "未知错误"
      addLog(`❌ 系统初始化失败: ${errorMessage}`, "error")

      window.dispatchEvent(
        new CustomEvent("systemInitialized", {
          detail: { success: false, error: errorMessage, timestamp: new Date() },
        }),
      )
    } finally {
      setCurrentStep(null)
      setIsInitializing(false)
    }
  }

  const retryStep = async (stepId: string) => {
    const step = initSteps.find((s) => s.id === stepId)
    if (step) {
      await simulateStep(step)
    }
  }

  const resetInitialization = () => {
    setInitSteps((prev) =>
      prev.map((step) => ({
        ...step,
        status: "pending",
        progress: 0,
        error: undefined,
        duration: undefined,
      })),
    )
    setCurrentStep(null)
    setOverallProgress(0)
    setLogs([])
    addLog("🔄 系统初始化已重置", "info")
  }

  const exportLogs = () => {
    const logData = {
      timestamp: new Date().toISOString(),
      logs: logs,
      steps: initSteps,
      resources: systemResources,
    }

    const blob = new Blob([JSON.stringify(logData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `system-init-logs-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // 模拟系统资源更新
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemResources((prev) =>
        prev.map((resource) => {
          let newUsage = resource.usage

          switch (resource.type) {
            case "cpu":
              newUsage = Math.max(10, Math.min(90, resource.usage + (Math.random() - 0.5) * 10))
              break
            case "memory":
              newUsage = Math.max(1, Math.min(7, resource.usage + (Math.random() - 0.5) * 0.5))
              break
            case "disk":
              newUsage = Math.max(100, Math.min(400, resource.usage + (Math.random() - 0.5) * 5))
              break
            case "network":
              newUsage = Math.max(5, Math.min(50, resource.usage + (Math.random() - 0.5) * 5))
              break
          }

          const percentage =
            resource.type === "memory" || resource.type === "disk" ? (newUsage / resource.total) * 100 : newUsage

          return {
            ...resource,
            usage: newUsage,
            status: percentage > 80 ? "critical" : percentage > 60 ? "warning" : "normal",
          }
        }),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const completedSteps = initSteps.filter((step) => step.status === "completed").length
  const failedSteps = initSteps.filter((step) => step.status === "failed").length
  const totalDuration = initSteps.reduce((sum, step) => sum + (step.duration || 0), 0)

  return (
    <div className="space-y-6">
      {/* 控制面板 */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2 text-blue-600" />
                系统初始化控制台
              </CardTitle>
              <CardDescription>管理和监控系统初始化过程</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={startInitialization}
                disabled={isInitializing}
                className="bg-gradient-to-r from-blue-500 to-indigo-600"
              >
                {isInitializing ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isInitializing ? "初始化中..." : "开始初始化"}
              </Button>
              <Button variant="outline" onClick={resetInitialization} disabled={isInitializing}>
                <RotateCcw className="w-4 h-4 mr-2" />
                重置
              </Button>
              <Button variant="outline" onClick={() => setShowAdvanced(!showAdvanced)}>
                <Settings className="w-4 h-4 mr-2" />
                {showAdvanced ? "简化" : "高级"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">总体进度</span>
                <span className="text-sm text-gray-600">{Math.round(overallProgress)}%</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>

            {/* 统计信息 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center p-2 bg-blue-50 rounded">
                <div className="font-semibold text-blue-600">{completedSteps}</div>
                <div className="text-gray-600">已完成</div>
              </div>
              <div className="text-center p-2 bg-red-50 rounded">
                <div className="font-semibold text-red-600">{failedSteps}</div>
                <div className="text-gray-600">失败</div>
              </div>
              <div className="text-center p-2 bg-green-50 rounded">
                <div className="font-semibold text-green-600">{totalDuration}ms</div>
                <div className="text-gray-600">总耗时</div>
              </div>
              <div className="text-center p-2 bg-purple-50 rounded">
                <div className="font-semibold text-purple-600">{initSteps.length}</div>
                <div className="text-gray-600">总步骤</div>
              </div>
            </div>

            {currentStep && (
              <Alert>
                <Loader2 className="h-4 w-4 animate-spin" />
                <AlertDescription>正在执行: {initSteps.find((s) => s.id === currentStep)?.name}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 初始化步骤 */}
        <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="w-5 h-5 mr-2 text-green-600" />
              初始化步骤
            </CardTitle>
            <CardDescription>系统组件初始化进度</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {initSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`p-4 rounded-lg border transition-all ${
                    step.status === "running"
                      ? "border-blue-200 bg-blue-50"
                      : step.status === "completed"
                        ? "border-green-200 bg-green-50"
                        : step.status === "failed"
                          ? "border-red-200 bg-red-50"
                          : step.status === "skipped"
                            ? "border-yellow-200 bg-yellow-50"
                            : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium">{step.name}</h4>
                          {getStepIcon(step.status)}
                          {step.critical && (
                            <Badge variant="destructive" className="text-xs">
                              关键
                            </Badge>
                          )}
                          <Badge
                            variant={
                              step.status === "completed"
                                ? "default"
                                : step.status === "failed"
                                  ? "destructive"
                                  : step.status === "running"
                                    ? "secondary"
                                    : "outline"
                            }
                            className="text-xs"
                          >
                            {step.status === "pending"
                              ? "等待中"
                              : step.status === "running"
                                ? "执行中"
                                : step.status === "completed"
                                  ? "已完成"
                                  : step.status === "failed"
                                    ? "失败"
                                    : "已跳过"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{step.description}</p>

                        {showAdvanced && step.dependencies && step.dependencies.length > 0 && (
                          <div className="text-xs text-gray-500 mb-2">依赖: {step.dependencies.join(", ")}</div>
                        )}

                        {(step.status === "running" || step.progress > 0) && (
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-600">进度</span>
                              <span className="text-xs text-gray-600">{step.progress}%</span>
                            </div>
                            <Progress value={step.progress} className="h-1" />
                          </div>
                        )}

                        {step.error && (
                          <Alert className="mt-2">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription className="text-sm">{step.error}</AlertDescription>
                          </Alert>
                        )}

                        {showAdvanced && step.duration && (
                          <div className="mt-2 text-xs text-gray-500">耗时: {step.duration}ms</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {step.status === "failed" && (
                        <Button variant="outline" size="sm" onClick={() => retryStep(step.id)}>
                          <RotateCcw className="w-3 h-3 mr-1" />
                          重试
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 系统资源和日志 */}
        <div className="space-y-6">
          {/* 系统资源 */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="w-5 h-5 mr-2 text-purple-600" />
                系统资源
              </CardTitle>
              <CardDescription>实时系统资源使用情况</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemResources.map((resource) => (
                  <div key={resource.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={getResourceColor(resource.status)}>{getResourceIcon(resource.type)}</div>
                        <span className="text-sm font-medium">{resource.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {resource.type === "memory" || resource.type === "disk"
                          ? `${resource.usage.toFixed(1)}${resource.unit} / ${resource.total}${resource.unit}`
                          : `${Math.round(resource.usage)}${resource.unit}`}
                      </span>
                    </div>
                    <Progress
                      value={
                        resource.type === "memory" || resource.type === "disk"
                          ? (resource.usage / resource.total) * 100
                          : resource.usage
                      }
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 初始化日志 */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-yellow-600" />
                    初始化日志
                  </CardTitle>
                  <CardDescription>实时初始化过程日志</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={exportLogs}>
                  <Download className="w-3 h-3 mr-1" />
                  导出
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-1 font-mono text-xs">
                  {logs.map((log, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded ${
                        log.includes("❌")
                          ? "bg-red-50 text-red-700"
                          : log.includes("✅")
                            ? "bg-green-50 text-green-700"
                            : log.includes("⚠️")
                              ? "bg-yellow-50 text-yellow-700"
                              : "bg-gray-50 text-gray-700"
                      }`}
                    >
                      {log}
                    </div>
                  ))}
                  {logs.length === 0 && (
                    <div className="text-center text-gray-500 py-8 flex items-center justify-center">
                      <Info className="w-4 h-4 mr-2" />
                      暂无日志信息
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 快捷操作 */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-base">快捷操作</CardTitle>
          <CardDescription>常用系统管理操作</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-blue-50 bg-transparent"
              onClick={exportLogs}
            >
              <Download className="w-6 h-6 text-blue-600" />
              <span className="text-sm">导出日志</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-green-50 bg-transparent"
            >
              <Upload className="w-6 h-6 text-green-600" />
              <span className="text-sm">导入配置</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-purple-50 bg-transparent"
            >
              <Shield className="w-6 h-6 text-purple-600" />
              <span className="text-sm">安全检查</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-orange-50 bg-transparent"
            >
              <Users className="w-6 h-6 text-orange-600" />
              <span className="text-sm">用户管理</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

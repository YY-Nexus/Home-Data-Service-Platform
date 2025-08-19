"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MobileLayout } from "@/components/mobile/mobile-layout"
import { MobileDashboard } from "@/components/mobile/mobile-dashboard"
import { SystemInitializer } from "@/components/system-initializer"
import { AutomatedTestRunner } from "@/components/automated-test-runner"
import { MobileDetectionService } from "@/lib/mobile-detection"
import { mobileNotificationService } from "@/lib/mobile-notifications"
import { QuickActionHandler } from "@/components/quick-action-handler"
import { setupDefaultActions } from "@/lib/action-manager"

// 导入各个模块组件
import { DashboardModule } from "@/components/dashboard-module"
import { CustomerModule } from "@/components/customer-module"
import { TaskModule } from "@/components/task-module"
import { FinanceModule } from "@/components/finance-module"
import { OKRModule } from "@/components/okr-module"
import { ApprovalModule } from "@/components/approval-module"
import { CommunicationModule } from "@/components/communication-module"
import { KPIModule } from "@/components/kpi-module"
import { AnalyticsModule } from "@/components/analytics-module"
import { AIAnalysisModule } from "@/components/ai-analysis-module"
import { IntegrationModule } from "@/components/integration-module"

export default function HomePage() {
  const [activeModule, setActiveModule] = useState("dashboard")
  const [isInitialized, setIsInitialized] = useState(false)
  const [initError, setInitError] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // 初始化操作管理器
  useEffect(() => {
    console.log("初始化操作管理器...")
    setupDefaultActions()

    // 请求通知权限
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        console.log("通知权限状态:", permission)
      })
    }
  }, [])

  // 检测设备类型
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(MobileDetectionService.isMobile())
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)

    return () => window.removeEventListener("resize", checkDevice)
  }, [])

  // 初始化移动端通知服务
  useEffect(() => {
    if (isMobile) {
      mobileNotificationService.requestPermission().then((granted) => {
        if (granted) {
          console.log("移动端通知权限已获取")

          // 发送欢迎通知
          setTimeout(() => {
            mobileNotificationService.sendSystemNotification("欢迎使用", "言语云企业管理系统移动端已准备就绪！")
          }, 2000)
        }
      })
    }
  }, [isMobile])

  // 监听系统初始化状态
  useEffect(() => {
    const handleAppReady = () => {
      setIsInitialized(true)
      setInitError(null)
      console.log("应用初始化完成")
    }

    const handleAppError = (event: CustomEvent) => {
      setInitError(event.detail?.error || "系统初始化失败")
      setIsInitialized(false)
      console.error("应用初始化失败:", event.detail?.error)
    }

    window.addEventListener("appServicesReady", handleAppReady)
    window.addEventListener("appServicesError", handleAppError as EventListener)

    return () => {
      window.removeEventListener("appServicesReady", handleAppReady)
      window.removeEventListener("appServicesError", handleAppError as EventListener)
    }
  }, [])

  // 渲染对应的模块组件
  const renderActiveModule = () => {
    console.log(`渲染模块: ${activeModule}`)

    // 移动端使用专用的仪表盘
    if (isMobile && activeModule === "dashboard") {
      return <MobileDashboard />
    }

    switch (activeModule) {
      case "dashboard":
        return <DashboardModule />
      case "customers":
        return <CustomerModule />
      case "tasks":
        return <TaskModule />
      case "finance":
        return <FinanceModule />
      case "okr":
        return <OKRModule />
      case "approval":
        return <ApprovalModule />
      case "communication":
        return <CommunicationModule />
      case "kpi":
        return <KPIModule />
      case "analytics":
        return <AnalyticsModule />
      case "ai-analysis":
        return <AIAnalysisModule />
      case "integrations":
        return <IntegrationModule />
      default:
        return isMobile ? <MobileDashboard /> : <DashboardModule />
    }
  }

  // 如果系统未初始化，显示初始化界面
  if (!isInitialized && !initError) {
    return <SystemInitializer />
  }

  // 如果初始化失败，显示错误界面
  if (initError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">系统初始化失败</h2>
            <p className="text-gray-600 mb-6">{initError}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              重新加载
            </button>
          </div>
        </div>
      </div>
    )
  }

  // 移动端布局
  if (isMobile) {
    return (
      <MobileLayout activeModule={activeModule} setActiveModule={setActiveModule}>
        <QuickActionHandler
          onActionComplete={(action, data) => {
            console.log(`移动端快速操作完成: ${action}`, data)
          }}
        />
        {renderActiveModule()}
      </MobileLayout>
    )
  }

  // 桌面端布局
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
      {/* 自动化测试运行器 */}
      <AutomatedTestRunner />

      {/* 快速操作处理器 */}
      <QuickActionHandler
        onActionComplete={(action, data) => {
          console.log(`桌面端快速操作完成: ${action}`, data)

          // 根据操作类型提供用户反馈
          switch (action) {
            case "schedule":
              console.log("日程创建成功:", data)
              break
            case "profile":
              console.log("个人资料更新成功:", data)
              break
            case "settings":
              console.log("系统设置保存成功:", data)
              break
          }
        }}
      />

      <div className="flex h-screen">
        {/* 侧边栏 */}
        <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />

        {/* 主内容区域 */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* 顶部导航 */}
          <Header />

          {/* 主要内容 */}
          <main className="flex-1 overflow-y-auto bg-gradient-to-br from-sky-50 to-blue-50">
            <div className="container mx-auto px-4 py-6">{renderActiveModule()}</div>
          </main>
        </div>
      </div>
    </div>
  )
}

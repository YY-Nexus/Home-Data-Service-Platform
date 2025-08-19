"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Target,
  FileText,
  BarChart3,
  MessageSquare,
  Settings,
  Bell,
  Database,
  Brain,
  Zap,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  BookOpen,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface SidebarProps {
  className?: string
}

const navigation = [
  {
    name: "仪表盘",
    href: "/",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: "客户管理",
    href: "/customers",
    icon: Users,
    badge: null,
  },
  {
    name: "任务管理",
    href: "/tasks",
    icon: CheckSquare,
    badge: "3",
  },
  {
    name: "OKR管理",
    href: "/okr",
    icon: Target,
    badge: null,
  },
  {
    name: "审批流程",
    href: "/approval",
    icon: FileText,
    badge: "2",
  },
  {
    name: "沟通协作",
    href: "/communication",
    icon: MessageSquare,
    badge: null,
  },
  {
    name: "KPI跟踪",
    href: "/kpi",
    icon: BarChart3,
    badge: null,
  },
  {
    name: "数据分析",
    href: "/analytics",
    icon: BarChart3,
    badge: null,
  },
  {
    name: "AI分析",
    href: "/ai-analysis",
    icon: Brain,
    badge: "新",
  },
  {
    name: "第三方集成",
    href: "/integrations",
    icon: Zap,
    badge: null,
  },
]

const systemNavigation = [
  {
    name: "数据库管理",
    href: "/database",
    icon: Database,
    badge: null,
  },
  {
    name: "通知中心",
    href: "/notifications",
    icon: Bell,
    badge: "5",
  },
  {
    name: "系统设置",
    href: "/settings",
    icon: Settings,
    badge: null,
  },
]

const documentationNavigation = [
  {
    name: "技术栈文档",
    href: "/docs/data-stack",
    icon: BookOpen,
    badge: null,
  },
  {
    name: "API文档",
    href: "/docs/api",
    icon: FileText,
    badge: null,
  },
  {
    name: "帮助中心",
    href: "/help",
    icon: HelpCircle,
    badge: null,
  },
]

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // 检测移动设备
  useEffect(() => {
    const checkMobile = () => {
      setIsCollapsed(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  const renderNavSection = (items: typeof navigation, title?: string) => (
    <div className="space-y-1">
      {title && !isCollapsed && (
        <div className="px-3 py-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</h3>
        </div>
      )}
      {items.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setIsMobileOpen(false)}
            className={cn(
              "group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
              isCollapsed ? "justify-center" : "justify-start",
            )}
          >
            <item.icon
              className={cn(
                "flex-shrink-0",
                isActive ? "text-blue-700" : "text-gray-400 group-hover:text-gray-500",
                isCollapsed ? "h-6 w-6" : "mr-3 h-5 w-5",
              )}
            />
            {!isCollapsed && (
              <>
                <span className="flex-1">{item.name}</span>
                {item.badge && (
                  <Badge variant={item.badge === "新" ? "default" : "secondary"} className="ml-auto text-xs">
                    {item.badge}
                  </Badge>
                )}
              </>
            )}
          </Link>
        )
      })}
    </div>
  )

  return (
    <>
      {/* 移动端菜单按钮 */}
      <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 lg:hidden" onClick={toggleMobile}>
        {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* 移动端遮罩 */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* 侧边栏 */}
      <div
        className={cn(
          "fixed left-0 top-0 z-40 h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          className,
        )}
      >
        {/* 头部 */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8">
                <img src="/images/yanyu-cloud-logo.png" alt="言语云" className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-lg text-gray-900">言语云EMS</span>
            </div>
          )}

          {/* 折叠按钮 */}
          <Button variant="ghost" size="icon" onClick={toggleCollapse} className="hidden lg:flex h-8 w-8">
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* 导航菜单 */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-6 px-2">
            {/* 主要功能 */}
            {renderNavSection(navigation, isCollapsed ? undefined : "主要功能")}

            {!isCollapsed && <Separator className="mx-3" />}

            {/* 系统管理 */}
            {renderNavSection(systemNavigation, isCollapsed ? undefined : "系统管理")}

            {!isCollapsed && <Separator className="mx-3" />}

            {/* 文档和帮助 */}
            {renderNavSection(documentationNavigation, isCollapsed ? undefined : "文档和帮助")}
          </div>
        </nav>

        {/* 底部信息 */}
        {!isCollapsed && (
          <div className="border-t border-gray-200 p-4">
            <div className="text-xs text-gray-500">
              <p>版本 1.0.0</p>
              <p className="mt-1">© 2025 言语云科技</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Target,
  BarChart3,
  MessageSquare,
  FileText,
  Settings,
  Bell,
  Video,
  Share2,
  ChevronDown,
  ChevronRight,
  Building2,
  TrendingUp,
  Database,
  Shield,
  Zap,
  HelpCircle,
} from "lucide-react"

interface NavItem {
  title: string
  href?: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string | number
  children?: NavItem[]
  isExpanded?: boolean
}

export function Sidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(["communication"])

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const navigationItems: NavItem[] = [
    {
      title: "仪表板",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      title: "沟通协作",
      icon: MessageSquare,
      badge: "12",
      children: [
        {
          title: "聊天消息",
          href: "/communication/chat",
          icon: MessageSquare,
          badge: "5",
        },
        {
          title: "视频会议",
          href: "/communication/meetings",
          icon: Video,
          badge: "2",
        },
        {
          title: "文档协作",
          href: "/communication/documents",
          icon: FileText,
        },
        {
          title: "通知中心",
          href: "/communication/notifications",
          icon: Bell,
          badge: "8",
        },
        {
          title: "沟通概览",
          href: "/communication",
          icon: Share2,
        },
      ],
    },
    {
      title: "任务管理",
      href: "/tasks",
      icon: CheckSquare,
      badge: "23",
    },
    {
      title: "客户管理",
      href: "/customers",
      icon: Users,
      badge: "156",
    },
    {
      title: "目标管理",
      icon: Target,
      children: [
        {
          title: "OKR管理",
          href: "/okr",
          icon: Target,
        },
        {
          title: "KPI跟踪",
          href: "/kpi",
          icon: TrendingUp,
        },
      ],
    },
    {
      title: "数据分析",
      icon: BarChart3,
      children: [
        {
          title: "销售分析",
          href: "/analytics/sales",
          icon: TrendingUp,
        },
        {
          title: "客户分析",
          href: "/analytics/customers",
          icon: Users,
        },
        {
          title: "绩效分析",
          href: "/analytics/performance",
          icon: BarChart3,
        },
        {
          title: "数据概览",
          href: "/analytics",
          icon: Database,
        },
      ],
    },
    {
      title: "财务管理",
      icon: Building2,
      children: [
        {
          title: "财务报表",
          href: "/finance/reports",
          icon: FileText,
        },
        {
          title: "发票管理",
          href: "/finance/invoices",
          icon: FileText,
        },
        {
          title: "财务概览",
          href: "/finance",
          icon: Building2,
        },
      ],
    },
  ]

  const systemItems: NavItem[] = [
    {
      title: "系统设置",
      icon: Settings,
      children: [
        {
          title: "布局设置",
          href: "/settings/layout",
          icon: LayoutDashboard,
        },
        {
          title: "侧边栏设置",
          href: "/settings/sidebar",
          icon: Settings,
        },
        {
          title: "权限管理",
          href: "/settings/permissions",
          icon: Shield,
        },
      ],
    },
    {
      title: "系统工具",
      icon: Zap,
      children: [
        {
          title: "系统测试",
          href: "/test",
          icon: Zap,
        },
        {
          title: "数据库管理",
          href: "/database",
          icon: Database,
        },
        {
          title: "系统分析",
          href: "/analysis",
          icon: BarChart3,
        },
        {
          title: "审计日志",
          href: "/audit",
          icon: FileText,
        },
      ],
    },
    {
      title: "帮助支持",
      icon: HelpCircle,
      children: [
        {
          title: "API文档",
          href: "/docs/api",
          icon: FileText,
        },
        {
          title: "数据架构",
          href: "/docs/data-stack",
          icon: Database,
        },
      ],
    },
  ]

  const renderNavItem = (item: NavItem, level = 0) => {
    const isActive = pathname === item.href
    const isExpanded = expandedItems.includes(item.title)
    const hasChildren = item.children && item.children.length > 0
    const isParentActive = hasChildren && item.children.some((child) => pathname === child.href)

    if (hasChildren) {
      return (
        <div key={item.title} className="space-y-1">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start h-9 px-3",
              level > 0 && "ml-4 w-[calc(100%-1rem)]",
              (isParentActive || isExpanded) && "bg-blue-50 text-blue-700",
            )}
            onClick={() => toggleExpanded(item.title)}
          >
            <item.icon className="mr-2 h-4 w-4 flex-shrink-0" />
            <span className="flex-1 text-left truncate">{item.title}</span>
            {item.badge && (
              <Badge variant="secondary" className="ml-2 h-5 text-xs">
                {item.badge}
              </Badge>
            )}
            {isExpanded ? (
              <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
            ) : (
              <ChevronRight className="ml-2 h-4 w-4 flex-shrink-0" />
            )}
          </Button>
          {isExpanded && (
            <div className="space-y-1">{item.children.map((child) => renderNavItem(child, level + 1))}</div>
          )}
        </div>
      )
    }

    return (
      <Button
        key={item.title}
        variant="ghost"
        className={cn(
          "w-full justify-start h-9 px-3",
          level > 0 && "ml-4 w-[calc(100%-1rem)]",
          isActive && "bg-blue-100 text-blue-700 font-medium",
        )}
        asChild
      >
        <Link href={item.href!}>
          <item.icon className="mr-2 h-4 w-4 flex-shrink-0" />
          <span className="flex-1 text-left truncate">{item.title}</span>
          {item.badge && (
            <Badge variant={isActive ? "default" : "secondary"} className="ml-2 h-5 text-xs">
              {item.badge}
            </Badge>
          )}
        </Link>
      </Button>
    )
  }

  // 自动展开包含当前页面的菜单项
  useEffect(() => {
    navigationItems.concat(systemItems).forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some((child) => pathname === child.href)
        if (hasActiveChild && !expandedItems.includes(item.title)) {
          setExpandedItems((prev) => [...prev, item.title])
        }
      }
    })
  }, [pathname])

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
      {/* Logo区域 */}
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">企业管理系统</span>
            <span className="text-xs text-gray-500">Enterprise Management</span>
          </div>
        </Link>
      </div>

      {/* 导航菜单 */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-6">
          {/* 主要功能 */}
          <div className="space-y-1">
            <div className="px-3 py-2">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">主要功能</h2>
            </div>
            {navigationItems.map((item) => renderNavItem(item))}
          </div>

          <Separator />

          {/* 系统管理 */}
          <div className="space-y-1">
            <div className="px-3 py-2">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">系统管理</h2>
            </div>
            {systemItems.map((item) => renderNavItem(item))}
          </div>
        </div>
      </ScrollArea>

      {/* 底部信息 */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-blue-500">
            <span className="text-xs font-medium text-white">管</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">系统管理员</p>
            <p className="text-xs text-gray-500 truncate">admin@company.com</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span>在线状态</span>
          <div className="flex items-center space-x-1">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <span>正常运行</span>
          </div>
        </div>
      </div>
    </div>
  )
}

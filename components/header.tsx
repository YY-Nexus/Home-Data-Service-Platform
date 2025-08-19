"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Bell,
  Search,
  Settings,
  User,
  LogOut,
  Menu,
  Sun,
  Moon,
  Globe,
  HelpCircle,
  MessageSquare,
  Calendar,
  Plus,
  CheckSquare,
  Users,
  FileText,
} from "lucide-react"
import { LogoManager } from "@/components/logo-manager"
import { triggerQuickAction } from "@/components/quick-action-handler"

interface HeaderProps {
  onMenuClick?: () => void
  activeModule?: string
  setActiveModule?: (module: string) => void
}

interface LogoData {
  url: string
  title: string
  subtitle: string
  type: "upload" | "default"
}

export function Header({ onMenuClick, activeModule, setActiveModule }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [logoData, setLogoData] = useState<LogoData>({
    url: "/images/yanyu-cloud-logo.png",
    title: "言语云企业管理系统",
    subtitle: "YanYu Cloud Enterprise Management",
    type: "default",
  })
  const [userProfile, setUserProfile] = useState({
    username: "管理员",
    email: "admin@yanyu.cloud",
    avatar: null as string | null,
  })
  const [notifications] = useState([
    { id: 1, title: "新任务分配", content: "您有一个新的任务需要处理", time: "5分钟前", unread: true },
    { id: 2, title: "客户反馈", content: "华润集团提交了新的反馈", time: "1小时前", unread: true },
    { id: 3, title: "系统更新", content: "系统将在今晚进行维护", time: "2小时前", unread: false },
    { id: 4, title: "会议提醒", content: "下午3点有团队会议", time: "3小时前", unread: false },
  ])

  const unreadCount = notifications.filter((n) => n.unread).length

  // 监听标志更新事件
  useEffect(() => {
    const handleLogoUpdate = (event: CustomEvent) => {
      setLogoData(event.detail)
    }

    const handleProfileUpdate = (event: CustomEvent) => {
      setUserProfile((prev) => ({ ...prev, ...event.detail }))
    }

    const handleAvatarUpdate = (event: CustomEvent) => {
      setUserProfile((prev) => ({ ...prev, avatar: event.detail.avatar }))
    }

    window.addEventListener("logoUpdated", handleLogoUpdate as EventListener)
    window.addEventListener("profileUpdated", handleProfileUpdate as EventListener)
    window.addEventListener("avatarUpdated", handleAvatarUpdate as EventListener)

    // 从本地存储加载数据
    const savedLogo = localStorage.getItem("companyLogo")
    if (savedLogo) {
      try {
        setLogoData(JSON.parse(savedLogo))
      } catch (error) {
        console.error("加载标志数据失败:", error)
      }
    }

    const savedProfile = localStorage.getItem("userProfile")
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile)
        setUserProfile(profile)
      } catch (error) {
        console.error("加载用户资料失败:", error)
      }
    }

    const savedAvatar = localStorage.getItem("userAvatar")
    if (savedAvatar) {
      setUserProfile((prev) => ({ ...prev, avatar: savedAvatar }))
    }

    return () => {
      window.removeEventListener("logoUpdated", handleLogoUpdate as EventListener)
      window.removeEventListener("profileUpdated", handleProfileUpdate as EventListener)
      window.removeEventListener("avatarUpdated", handleAvatarUpdate as EventListener)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log("搜索:", searchQuery)
      // 触发全局搜索
      window.dispatchEvent(
        new CustomEvent("globalSearch", {
          detail: { query: searchQuery },
        }),
      )
    }
  }

  const handleQuickCreate = (type: string) => {
    console.log(`快速创建: ${type}`)
    switch (type) {
      case "task":
        setActiveModule?.("tasks")
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("createNewTask"))
        }, 100)
        break
      case "customer":
        setActiveModule?.("customers")
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("createNewCustomer"))
        }, 100)
        break
      case "meeting":
        triggerQuickAction.schedule()
        break
      case "project":
        setActiveModule?.("projects")
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("createNewProject"))
        }, 100)
        break
    }
  }

  const handleNotificationClick = (notificationId: number) => {
    console.log(`点击通知: ${notificationId}`)
    // 标记为已读
    const notification = notifications.find((n) => n.id === notificationId)
    if (notification) {
      notification.unread = false
    }
  }

  const handleThemeChange = (theme: string) => {
    console.log(`切换主题: ${theme}`)
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }

  const handleLanguageChange = () => {
    console.log("切换语言")
    // 这里可以实现语言切换逻辑
  }

  const handleLogout = () => {
    if (confirm("确定要退出登录吗？")) {
      console.log("用户退出登录")
      // 清除本地存储
      localStorage.removeItem("userToken")
      // 重定向到登录页面
      window.location.href = "/login"
    }
  }

  const renderUserAvatar = () => {
    if (userProfile.avatar) {
      return (
        <img
          src={userProfile.avatar || "/placeholder.svg"}
          alt={userProfile.username}
          className="w-8 h-8 rounded-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = "none"
            target.nextElementSibling?.classList.remove("hidden")
          }}
        />
      )
    }

    return (
      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
        <span className="text-white font-semibold text-sm">{userProfile.username.charAt(0)}</span>
      </div>
    )
  }

  return (
    <header className="h-16 bg-white/80 backdrop-blur-sm border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40">
      {/* 左侧 - 标志、菜单按钮和搜索 */}
      <div className="flex items-center space-x-4">
        {/* 移动端菜单按钮 */}
        <Button variant="ghost" size="sm" className="lg:hidden" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>

        {/* 企业标志 */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveModule?.("dashboard")}>
          <img
            src={logoData.url || "/images/yanyu-cloud-logo.png"}
            alt="企业标志"
            className="h-8 w-auto object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/images/yanyu-cloud-logo.png"
            }}
          />
          <div className="hidden md:block">
            <h1 className="text-lg font-bold text-slate-800">{logoData.title}</h1>
            <p className="text-xs text-slate-500">{logoData.subtitle}</p>
          </div>
        </div>

        {/* 搜索框 */}
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="搜索任务、客户、项目..."
            className="pl-10 w-64 lg:w-80 bg-slate-50 border-slate-200 focus:bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* 右侧 - 操作按钮 */}
      <div className="flex items-center space-x-2">
        {/* 快速创建按钮 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              新建
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>快速创建</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleQuickCreate("task")}>
              <CheckSquare className="h-4 w-4 mr-2" />
              新建任务
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleQuickCreate("customer")}>
              <Users className="h-4 w-4 mr-2" />
              添加客户
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleQuickCreate("meeting")}>
              <Calendar className="h-4 w-4 mr-2" />
              创建会议
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleQuickCreate("project")}>
              <FileText className="h-4 w-4 mr-2" />
              新建项目
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 消息按钮 */}
        <Button variant="ghost" size="sm" onClick={() => setActiveModule?.("communication")}>
          <MessageSquare className="h-5 w-5" />
        </Button>

        {/* 帮助按钮 */}
        <Button variant="ghost" size="sm" onClick={() => setActiveModule?.("help")}>
          <HelpCircle className="h-5 w-5" />
        </Button>

        {/* 通知按钮 */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>通知中心</SheetTitle>
              <SheetDescription>您有 {unreadCount} 条未读通知</SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    notification.unread ? "bg-blue-50 border-blue-200" : "bg-slate-50 border-slate-200"
                  }`}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <p className="text-sm text-slate-600 mt-1">{notification.content}</p>
                      <p className="text-xs text-slate-500 mt-2">{notification.time}</p>
                    </div>
                    {notification.unread && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>}
                  </div>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        {/* 设置菜单 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>系统设置</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleThemeChange("light")}>
              <Sun className="h-4 w-4 mr-2" />
              浅色主题
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
              <Moon className="h-4 w-4 mr-2" />
              深色主题
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLanguageChange}>
              <Globe className="h-4 w-4 mr-2" />
              语言设置
            </DropdownMenuItem>
            <DropdownMenuItem onClick={triggerQuickAction.settings}>
              <Settings className="h-4 w-4 mr-2" />
              系统偏好
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <LogoManager onLogoChange={setLogoData} />
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 用户菜单 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              {renderUserAvatar()}
              <span className="hidden md:block text-sm font-medium">{userProfile.username}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{userProfile.username}</p>
                <p className="text-xs text-slate-500">{userProfile.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={triggerQuickAction.profile}>
              <User className="h-4 w-4 mr-2" />
              个人资料
            </DropdownMenuItem>
            <DropdownMenuItem onClick={triggerQuickAction.settings}>
              <Settings className="h-4 w-4 mr-2" />
              账户设置
            </DropdownMenuItem>
            <DropdownMenuItem onClick={triggerQuickAction.notifications}>
              <Bell className="h-4 w-4 mr-2" />
              通知设置
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              退出登录
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

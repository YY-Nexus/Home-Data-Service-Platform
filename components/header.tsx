"use client"

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Bell, Settings, User, LogOut, MessageSquare, Calendar, HelpCircle } from "lucide-react"
import { actionManager } from "@/lib/action-manager"
import { LogoManager } from "@/components/logo-manager"

interface LogoData {
  url: string
  title: string
  subtitle: string
  type: "upload" | "default"
}

export function Header() {
  const [notifications] = useState([
    { id: 1, title: "新任务分配", message: "您有一个新的任务需要处理", time: "5分钟前", unread: true },
    { id: 2, title: "客户反馈", message: "客户对项目进度提出了建议", time: "1小时前", unread: true },
    { id: 3, title: "系统更新", message: "系统将在今晚进行维护更新", time: "2小时前", unread: false },
  ])

  const [userAvatar, setUserAvatar] = useState<string | null>(null)
  const [userProfile, setUserProfile] = useState({
    username: "管理员",
    email: "admin@yanyu.cloud",
  })
  const [logoData, setLogoData] = useState<LogoData>({
    url: "/images/yanyu-cloud-logo.png",
    title: "言语云企业管理系统",
    subtitle: "YanYu Cloud Enterprise Management",
    type: "default",
  })

  const unreadCount = notifications.filter((n) => n.unread).length

  // 从本地存储加载用户数据
  useEffect(() => {
    const savedAvatar = localStorage.getItem("userAvatar")
    const savedProfile = localStorage.getItem("userProfile")
    const savedLogo = localStorage.getItem("companyLogo")

    if (savedAvatar) {
      setUserAvatar(savedAvatar)
    }

    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile)
        setUserProfile(profile)
      } catch (error) {
        console.error("解析用户资料失败:", error)
      }
    }

    if (savedLogo) {
      try {
        const logo = JSON.parse(savedLogo)
        setLogoData(logo)
      } catch (error) {
        console.error("解析企业标志失败:", error)
      }
    }
  }, [])

  // 监听头像和资料更新事件
  useEffect(() => {
    const handleAvatarUpdate = (event: CustomEvent) => {
      setUserAvatar(event.detail.avatar)
    }

    const handleProfileUpdate = (event: CustomEvent) => {
      setUserProfile({
        username: event.detail.username || userProfile.username,
        email: event.detail.email || userProfile.email,
      })
      if (event.detail.avatar) {
        setUserAvatar(event.detail.avatar)
      }
    }

    const handleLogoUpdate = (event: CustomEvent) => {
      setLogoData(event.detail)
    }

    window.addEventListener("avatarUpdated", handleAvatarUpdate as EventListener)
    window.addEventListener("profileUpdated", handleProfileUpdate as EventListener)
    window.addEventListener("logoUpdated", handleLogoUpdate as EventListener)

    return () => {
      window.removeEventListener("avatarUpdated", handleAvatarUpdate as EventListener)
      window.removeEventListener("profileUpdated", handleProfileUpdate as EventListener)
      window.removeEventListener("logoUpdated", handleLogoUpdate as EventListener)
    }
  }, [userProfile])

  // 菜单项处理函数
  const handleMenuAction = (action: string) => {
    console.log(`头部菜单操作: ${action}`)

    switch (action) {
      case "profile":
        actionManager.trigger("profile")
        break
      case "settings":
        actionManager.trigger("settings")
        break
      case "logout":
        console.log("用户退出登录")
        if (confirm("确定要退出登录吗？")) {
          // 清除本地存储的用户数据
          localStorage.removeItem("userAvatar")
          localStorage.removeItem("userProfile")
          console.log("执行登出...")
        }
        break
      default:
        console.log(`未知菜单操作: ${action}`)
    }
  }

  const handleQuickAction = (action: string) => {
    console.log(`头部快速操作: ${action}`)

    switch (action) {
      case "schedule":
        actionManager.trigger("schedule")
        break
      case "messages":
        console.log("打开消息中心")
        break
      case "search":
        console.log("执行搜索")
        break
      case "help":
        console.log("打开帮助中心")
        break
      default:
        console.log(`未知快速操作: ${action}`)
    }
  }

  return (
    <header className="bg-white border-b border-sky-200 shadow-sm px-4 py-3 flex items-center justify-between sticky top-0 z-40">
      {/* 左侧：Logo和标题 */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <img
            src={logoData.url || "/placeholder.svg"}
            alt={logoData.title}
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

        {/* 标志管理按钮 */}
        <div className="hidden lg:block">
          <LogoManager onLogoChange={setLogoData} />
        </div>
      </div>

      {/* 中间：搜索栏 */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            type="search"
            placeholder="搜索功能、客户、任务..."
            className="pl-10 pr-4 py-2 w-full border-slate-200 focus:border-sky-500 focus:ring-sky-500"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleQuickAction("search")
              }
            }}
          />
        </div>
      </div>

      {/* 右侧：操作按钮 */}
      <div className="flex items-center space-x-2">
        {/* 移动端搜索按钮 */}
        <Button variant="ghost" size="sm" className="md:hidden" onClick={() => handleQuickAction("search")}>
          <Search className="w-4 h-4" />
        </Button>

        {/* 快速操作 */}
        <Button variant="ghost" size="sm" className="hidden lg:flex" onClick={() => handleQuickAction("schedule")}>
          <Calendar className="w-4 h-4 mr-2" />
          日程
        </Button>

        <Button variant="ghost" size="sm" className="hidden lg:flex" onClick={() => handleQuickAction("messages")}>
          <MessageSquare className="w-4 h-4 mr-2" />
          消息
        </Button>

        {/* 通知中心 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                  {unreadCount.toString()}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              通知中心
              <Badge variant="secondary">{unreadCount.toString()} 未读</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3">
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium text-sm">{notification.title}</span>
                  {notification.unread && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                </div>
                <p className="text-xs text-slate-600 mt-1">{notification.message}</p>
                <span className="text-xs text-slate-400 mt-1">{notification.time}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-center text-sky-600 hover:text-sky-700"
              onClick={() => actionManager.trigger("notifications")}
            >
              查看全部通知
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 帮助中心 */}
        <Button variant="ghost" size="sm" onClick={() => handleQuickAction("help")}>
          <HelpCircle className="w-4 h-4" />
        </Button>

        {/* 用户菜单 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userAvatar || "/placeholder.svg?height=32&width=32"} alt="用户头像" />
                <AvatarFallback className="bg-gradient-to-br from-sky-400 to-blue-500 text-white">
                  {userProfile.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userProfile.username}</p>
                <p className="text-xs leading-none text-muted-foreground">{userProfile.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleMenuAction("profile")}>
              <User className="mr-2 h-4 w-4" />
              <span>个人资料</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleMenuAction("settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>系统设置</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600" onClick={() => handleMenuAction("logout")}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>退出登录</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

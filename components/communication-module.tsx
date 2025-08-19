"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  MessageSquare,
  Video,
  Users,
  FileText,
  Bell,
  TrendingUp,
  Clock,
  Star,
  Share2,
  Activity,
  BarChart3,
} from "lucide-react"

interface CommunicationStats {
  totalMessages: number
  activeChats: number
  onlineUsers: number
  scheduledMeetings: number
  sharedDocuments: number
  unreadNotifications: number
}

interface RecentActivity {
  id: string
  type: "message" | "meeting" | "document" | "notification"
  title: string
  description: string
  timestamp: Date
  user: string
  status: "completed" | "pending" | "in-progress"
}

interface TeamMember {
  id: string
  name: string
  avatar: string
  role: string
  department: string
  status: "online" | "away" | "busy" | "offline"
  lastActive: Date
  messagesCount: number
  meetingsCount: number
}

export function CommunicationModule() {
  const [activeTab, setActiveTab] = useState("overview")

  // 统计数据
  const [stats, setStats] = useState<CommunicationStats>({
    totalMessages: 2847,
    activeChats: 23,
    onlineUsers: 156,
    scheduledMeetings: 8,
    sharedDocuments: 45,
    unreadNotifications: 12,
  })

  // 最近活动
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([
    {
      id: "1",
      type: "message",
      title: "产品开发团队讨论",
      description: "关于新功能的技术方案讨论",
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      user: "张设计师",
      status: "in-progress",
    },
    {
      id: "2",
      type: "meeting",
      title: "项目评审会议",
      description: "Q2项目进度评审和下阶段规划",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      user: "李经理",
      status: "completed",
    },
    {
      id: "3",
      type: "document",
      title: "产品需求文档更新",
      description: "用户反馈整理和需求优化",
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      user: "王产品",
      status: "pending",
    },
    {
      id: "4",
      type: "notification",
      title: "系统维护通知",
      description: "本周六晚上系统维护升级",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      user: "系统管理员",
      status: "pending",
    },
  ])

  // 团队成员
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "张经理",
      avatar: "",
      role: "部门经理",
      department: "销售部",
      status: "online",
      lastActive: new Date(),
      messagesCount: 156,
      meetingsCount: 12,
    },
    {
      id: "2",
      name: "李总监",
      avatar: "",
      role: "技术总监",
      department: "技术部",
      status: "busy",
      lastActive: new Date(Date.now() - 15 * 60 * 1000),
      messagesCount: 89,
      meetingsCount: 8,
    },
    {
      id: "3",
      name: "王设计师",
      avatar: "",
      role: "UI设计师",
      department: "设计部",
      status: "online",
      lastActive: new Date(Date.now() - 5 * 60 * 1000),
      messagesCount: 234,
      meetingsCount: 15,
    },
    {
      id: "4",
      name: "陈开发",
      avatar: "",
      role: "前端开发",
      department: "技术部",
      status: "away",
      lastActive: new Date(Date.now() - 45 * 60 * 1000),
      messagesCount: 67,
      meetingsCount: 6,
    },
  ])

  // 获取活动类型图标
  const getActivityIcon = (type: RecentActivity["type"]) => {
    switch (type) {
      case "message":
        return <MessageSquare className="w-4 h-4 text-blue-600" />
      case "meeting":
        return <Video className="w-4 h-4 text-green-600" />
      case "document":
        return <FileText className="w-4 h-4 text-purple-600" />
      case "notification":
        return <Bell className="w-4 h-4 text-orange-600" />
      default:
        return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  // 获取状态颜色
  const getStatusColor = (status: TeamMember["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "busy":
        return "bg-red-500"
      default:
        return "bg-gray-400"
    }
  }

  // 获取状态文本
  const getStatusText = (status: TeamMember["status"]) => {
    switch (status) {
      case "online":
        return "在线"
      case "away":
        return "离开"
      case "busy":
        return "忙碌"
      default:
        return "离线"
    }
  }

  // 格式化时间
  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (minutes < 1) return "刚刚"
    if (minutes < 60) return `${minutes}分钟前`
    if (hours < 24) return `${hours}小时前`
    return date.toLocaleDateString("zh-CN")
  }

  return (
    <div className="space-y-6">
      {/* 统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center">
              <MessageSquare className="w-4 h-4 mr-2 text-blue-600" />
              总消息数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-blue-600">{stats.totalMessages.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">今日新增 +156</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center">
              <Users className="w-4 h-4 mr-2 text-green-600" />
              在线用户
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-600">{stats.onlineUsers}</div>
            <p className="text-xs text-muted-foreground">活跃度 85%</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center">
              <Video className="w-4 h-4 mr-2 text-purple-600" />
              会议安排
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-purple-600">{stats.scheduledMeetings}</div>
            <p className="text-xs text-muted-foreground">本周计划</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center">
              <FileText className="w-4 h-4 mr-2 text-orange-600" />
              共享文档
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-orange-600">{stats.sharedDocuments}</div>
            <p className="text-xs text-muted-foreground">协作中 12</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center">
              <MessageSquare className="w-4 h-4 mr-2 text-indigo-600" />
              活跃聊天
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-indigo-600">{stats.activeChats}</div>
            <p className="text-xs text-muted-foreground">群组 15 个</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center">
              <Bell className="w-4 h-4 mr-2 text-red-600" />
              未读通知
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-red-600">{stats.unreadNotifications}</div>
            <p className="text-xs text-muted-foreground">需要处理</p>
          </CardContent>
        </Card>
      </div>

      {/* 详细内容 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="activities">活动</TabsTrigger>
          <TabsTrigger value="team">团队</TabsTrigger>
          <TabsTrigger value="analytics">分析</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 快速操作 */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-600" />
                  快速操作
                </CardTitle>
                <CardDescription>常用功能快速入口</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-gradient-to-r from-blue-500 to-indigo-600">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  发起群聊
                </Button>
                <Button className="w-full justify-start bg-gradient-to-r from-green-500 to-emerald-600">
                  <Video className="w-4 h-4 mr-2" />
                  开始会议
                </Button>
                <Button className="w-full justify-start bg-gradient-to-r from-purple-500 to-pink-600">
                  <FileText className="w-4 h-4 mr-2" />
                  创建文档
                </Button>
                <Button className="w-full justify-start bg-gradient-to-r from-orange-500 to-red-600">
                  <Bell className="w-4 h-4 mr-2" />
                  发送通知
                </Button>
              </CardContent>
            </Card>

            {/* 系统状态 */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-green-600" />
                  系统状态
                </CardTitle>
                <CardDescription>沟通系统运行状态</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>消息服务</span>
                    <Badge className="bg-green-100 text-green-800">正常</Badge>
                  </div>
                  <Progress value={98} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>视频服务</span>
                    <Badge className="bg-green-100 text-green-800">正常</Badge>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>文档服务</span>
                    <Badge className="bg-yellow-100 text-yellow-800">维护中</Badge>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>通知服务</span>
                    <Badge className="bg-green-100 text-green-800">正常</Badge>
                  </div>
                  <Progress value={99} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                最近活动
              </CardTitle>
              <CardDescription>团队最新的沟通协作活动</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50">
                    <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-slate-800">{activity.title}</h4>
                        <span className="text-xs text-slate-500">{formatTime(activity.timestamp)}</span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{activity.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs text-slate-500">by {activity.user}</span>
                        <Badge
                          variant={
                            activity.status === "completed"
                              ? "default"
                              : activity.status === "in-progress"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {activity.status === "completed"
                            ? "已完成"
                            : activity.status === "in-progress"
                              ? "进行中"
                              : "待处理"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-600" />
                团队成员
              </CardTitle>
              <CardDescription>团队成员状态和活跃度</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="p-4 rounded-lg border border-slate-200 hover:bg-slate-50">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(
                            member.status,
                          )}`}
                        ></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-800">{member.name}</h4>
                        <p className="text-sm text-slate-600">{member.role}</p>
                        <p className="text-xs text-slate-500">{member.department}</p>
                      </div>
                      <div className="text-right">
                        <Badge className="mb-1">{getStatusText(member.status)}</Badge>
                        <p className="text-xs text-slate-500">{formatTime(member.lastActive)}</p>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-blue-600">{member.messagesCount}</div>
                        <div className="text-xs text-slate-500">消息数</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-600">{member.meetingsCount}</div>
                        <div className="text-xs text-slate-500">会议数</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                  沟通效率分析
                </CardTitle>
                <CardDescription>团队沟通效率指标</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>消息响应率</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>会议出席率</span>
                    <span className="font-medium">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>文档协作率</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>团队活跃度</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  使用趋势
                </CardTitle>
                <CardDescription>沟通工具使用趋势</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">即时消息</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">2,847</div>
                    <div className="text-xs text-green-600">+12%</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Video className="w-4 h-4 text-purple-600" />
                    <span className="text-sm">视频会议</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">156</div>
                    <div className="text-xs text-green-600">+8%</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-orange-600" />
                    <span className="text-sm">文档协作</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">89</div>
                    <div className="text-xs text-red-600">-3%</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Share2 className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm">文件分享</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">234</div>
                    <div className="text-xs text-green-600">+15%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

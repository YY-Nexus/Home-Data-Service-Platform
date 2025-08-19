"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SalesChart } from "@/components/charts/sales-chart"
import { FinanceChart } from "@/components/charts/finance-chart"
import { PerformanceChart } from "@/components/charts/performance-chart"
import {
  Users,
  DollarSign,
  ShoppingCart,
  Target,
  Clock,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Zap,
} from "lucide-react"

const stats = [
  {
    title: "总销售额",
    value: "¥2,847,392",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "from-emerald-400 to-emerald-500",
  },
  {
    title: "活跃客户",
    value: "1,247",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    color: "from-blue-400 to-blue-500",
  },
  {
    title: "待处理订单",
    value: "156",
    change: "-3.1%",
    trend: "down",
    icon: ShoppingCart,
    color: "from-orange-400 to-orange-500",
  },
  {
    title: "完成率",
    value: "87.5%",
    change: "+5.2%",
    trend: "up",
    icon: Target,
    color: "from-purple-400 to-purple-500",
  },
]

const recentActivities = [
  {
    id: 1,
    type: "order",
    title: "新订单 #2024-001",
    description: "深圳华润集团下单 ¥125,000",
    time: "5分钟前",
    status: "success",
  },
  {
    id: 2,
    type: "task",
    title: "任务完成",
    description: "Q4销售报告制作已完成",
    time: "15分钟前",
    status: "success",
  },
  {
    id: 3,
    type: "alert",
    title: "库存预警",
    description: "产品A库存不足，需要补货",
    time: "1小时前",
    status: "warning",
  },
  {
    id: 4,
    type: "customer",
    title: "新客户注册",
    description: "广州万科地产完成注册",
    time: "2小时前",
    status: "info",
  },
]

const quickActions = [
  { label: "新建任务", icon: CheckCircle, color: "bg-blue-500" },
  { label: "添加客户", icon: Users, color: "bg-emerald-500" },
  { label: "创建订单", icon: ShoppingCart, color: "bg-orange-500" },
  { label: "生成报表", icon: Activity, color: "bg-purple-500" },
]

export function DashboardContent() {
  return (
    <div className="p-3 md:p-6 space-y-4 md:space-y-6 bg-gradient-to-br from-sky-50/50 via-blue-50/30 to-indigo-50/50 min-h-screen">
      {/* 欢迎区域 */}
      <div className="bg-gradient-to-r from-sky-400 to-blue-500 rounded-xl md:rounded-2xl p-4 md:p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
          <div>
            <h1 className="text-xl md:text-2xl font-bold mb-2">欢迎回来，管理员！</h1>
            <p className="text-sky-100 text-sm md:text-base">
              今天是{" "}
              {new Date().toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
              })}
            </p>
          </div>
          <div className="flex items-center space-x-3 md:space-x-4">
            <img
              src="/images/zuoyou-logo.png"
              alt="ZUOYOU"
              className="w-8 h-8 md:w-12 md:h-12 object-contain opacity-80"
            />
            <div className="text-right">
              <p className="text-xs md:text-sm text-sky-100">ZUOYOU 企业管理系统</p>
              <p className="text-xs text-sky-200">让管理更简单</p>
            </div>
          </div>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight

          return (
            <Card
              key={index}
              className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-lg md:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
            >
              <CardContent className="p-3 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
                  <div className="flex-1">
                    <p className="text-xs md:text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                    <p className="text-lg md:text-2xl font-bold text-slate-800 truncate">{stat.value}</p>
                    <div className="flex items-center mt-1 md:mt-2">
                      <TrendIcon
                        className={`w-3 h-3 mr-1 ${stat.trend === "up" ? "text-emerald-500" : "text-red-500"}`}
                      />
                      <span
                        className={`text-xs md:text-sm font-medium ${
                          stat.trend === "up" ? "text-emerald-600" : "text-red-600"
                        }`}
                      >
                        {stat.change}
                      </span>
                      <span className="text-xs text-slate-500 ml-1 hidden md:inline">vs 上月</span>
                    </div>
                  </div>
                  <div
                    className={`w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br ${stat.color} rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}
                  >
                    <Icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        {/* 图表区域 */}
        <div className="xl:col-span-2 space-y-4 md:space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-lg md:rounded-xl shadow-sm">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="flex items-center text-base md:text-lg">
                <Activity className="w-4 h-4 md:w-5 md:h-5 mr-2 text-sky-500" />
                业务数据分析
              </CardTitle>
              <CardDescription className="text-sm">实时监控关键业务指标</CardDescription>
            </CardHeader>
            <CardContent className="p-3 md:p-6 pt-0">
              <Tabs defaultValue="sales" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-sky-100/50 h-8 md:h-10">
                  <TabsTrigger
                    value="sales"
                    className="data-[state=active]:bg-white data-[state=active]:text-sky-700 text-xs md:text-sm"
                  >
                    销售趋势
                  </TabsTrigger>
                  <TabsTrigger
                    value="finance"
                    className="data-[state=active]:bg-white data-[state=active]:text-sky-700 text-xs md:text-sm"
                  >
                    财务状况
                  </TabsTrigger>
                  <TabsTrigger
                    value="performance"
                    className="data-[state=active]:bg-white data-[state=active]:text-sky-700 text-xs md:text-sm"
                  >
                    绩效指标
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="sales" className="mt-4 md:mt-6">
                  <div className="h-64 md:h-80">
                    <SalesChart />
                  </div>
                </TabsContent>
                <TabsContent value="finance" className="mt-4 md:mt-6">
                  <div className="h-64 md:h-80">
                    <FinanceChart />
                  </div>
                </TabsContent>
                <TabsContent value="performance" className="mt-4 md:mt-6">
                  <div className="h-64 md:h-80">
                    <PerformanceChart />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* 侧边栏信息 */}
        <div className="space-y-4 md:space-y-6">
          {/* 快速操作 */}
          <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-lg md:rounded-xl shadow-sm">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="flex items-center text-base md:text-lg">
                <Zap className="w-4 h-4 md:w-5 md:h-5 mr-2 text-sky-500" />
                快速操作
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-6 pt-0">
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-12 md:h-16 flex flex-col items-center justify-center space-y-1 md:space-y-2 border-sky-200 hover:bg-sky-50 transition-all duration-200"
                    >
                      <div
                        className={`w-6 h-6 md:w-8 md:h-8 ${action.color} rounded-lg flex items-center justify-center`}
                      >
                        <Icon className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      </div>
                      <span className="text-xs font-medium">{action.label}</span>
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* 最近活动 */}
          <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-lg md:rounded-xl shadow-sm">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="flex items-center text-base md:text-lg">
                <Clock className="w-4 h-4 md:w-5 md:h-5 mr-2 text-sky-500" />
                最近活动
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-6 pt-0">
              <div className="space-y-3 md:space-y-4">
                {recentActivities.slice(0, 4).map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 p-2 md:p-3 rounded-lg hover:bg-sky-50/50 transition-colors duration-200"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        activity.status === "success"
                          ? "bg-emerald-500"
                          : activity.status === "warning"
                            ? "bg-orange-500"
                            : activity.status === "info"
                              ? "bg-blue-500"
                              : "bg-slate-400"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">{activity.title}</p>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">{activity.description}</p>
                      <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-3 md:mt-4 border-sky-200 hover:bg-sky-50 text-sm">
                查看全部活动
              </Button>
            </CardContent>
          </Card>

          {/* 系统状态 */}
          <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-lg md:rounded-xl shadow-sm">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="flex items-center text-base md:text-lg">
                <Activity className="w-4 h-4 md:w-5 md:h-5 mr-2 text-sky-500" />
                系统状态
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-6 pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">系统运行时间</span>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                    99.9%
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">数据库状态</span>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                    正常
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">在线用户</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                    24
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">待处理任务</span>
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-xs">
                    8
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

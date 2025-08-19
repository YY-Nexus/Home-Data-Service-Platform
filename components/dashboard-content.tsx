"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  CheckSquare,
  TrendingUp,
  DollarSign,
  Calendar,
  Bell,
  Target,
  BarChart3,
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Filter,
  Download,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// 模拟数据
const salesData = [
  { month: "1月", sales: 65000, target: 70000 },
  { month: "2月", sales: 72000, target: 75000 },
  { month: "3月", sales: 68000, target: 70000 },
  { month: "4月", sales: 85000, target: 80000 },
  { month: "5月", sales: 92000, target: 90000 },
  { month: "6月", sales: 88000, target: 85000 },
]

const taskStatusData = [
  { name: "已完成", value: 45, color: "#10b981" },
  { name: "进行中", value: 32, color: "#3b82f6" },
  { name: "待开始", value: 18, color: "#f59e0b" },
  { name: "已逾期", value: 5, color: "#ef4444" },
]

const recentActivities = [
  { id: 1, type: "task", title: "完成产品原型设计", user: "张设计师", time: "2小时前", status: "completed" },
  { id: 2, type: "customer", title: "新增客户：华润集团", user: "李销售", time: "4小时前", status: "new" },
  { id: 3, type: "approval", title: "采购申请待审批", user: "财务部", time: "6小时前", status: "pending" },
  { id: 4, type: "meeting", title: "项目评审会议", user: "项目组", time: "1天前", status: "scheduled" },
]

export function DashboardContent() {
  const [selectedPeriod, setSelectedPeriod] = useState("本月")
  const [stats, setStats] = useState({
    totalCustomers: 1248,
    activeTasks: 156,
    monthlyRevenue: 892000,
    completionRate: 87,
  })

  const [trends, setTrends] = useState({
    customers: 12.5,
    tasks: -3.2,
    revenue: 18.7,
    completion: 5.4,
  })

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* 页面标题 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">仪表盘</h1>
          <p className="text-slate-600 mt-1">欢迎回来，管理员！今天是 {new Date().toLocaleDateString("zh-CN")}</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            筛选
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            导出
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
            <Plus className="w-4 h-4 mr-2" />
            新建任务
          </Button>
        </div>
      </div>

      {/* 关键指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">总客户数</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{stats.totalCustomers.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUpRight className="w-3 h-3 mr-1" />+{trends.customers}% 较上月
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">活跃任务</CardTitle>
            <CheckSquare className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{stats.activeTasks}</div>
            <div className="flex items-center text-xs text-red-600 mt-1">
              <ArrowDownRight className="w-3 h-3 mr-1" />
              {Math.abs(trends.tasks)}% 较上月
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">月度营收</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">¥{(stats.monthlyRevenue / 10000).toFixed(1)}万</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUpRight className="w-3 h-3 mr-1" />+{trends.revenue}% 较上月
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">完成率</CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{stats.completionRate}%</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUpRight className="w-3 h-3 mr-1" />+{trends.completion}% 较上月
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 图表和数据分析 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 销售趋势图 */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>销售趋势</span>
            </CardTitle>
            <CardDescription>过去6个月的销售表现</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#10b981"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 任务状态分布 */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
              <span>任务状态分布</span>
            </CardTitle>
            <CardDescription>当前任务的状态分布情况</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={taskStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {taskStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {taskStatusData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-slate-600">{item.name}</span>
                  <span className="text-sm font-semibold text-slate-800">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 最近活动和快速操作 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 最近活动 */}
        <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-purple-600" />
              <span>最近活动</span>
            </CardTitle>
            <CardDescription>系统中的最新动态</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex-shrink-0">
                    {activity.type === "task" && <CheckSquare className="w-5 h-5 text-emerald-600" />}
                    {activity.type === "customer" && <Users className="w-5 h-5 text-blue-600" />}
                    {activity.type === "approval" && <AlertTriangle className="w-5 h-5 text-orange-600" />}
                    {activity.type === "meeting" && <Calendar className="w-5 h-5 text-purple-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-800">{activity.title}</p>
                    <p className="text-sm text-slate-600">由 {activity.user} 执行</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span className="text-xs text-slate-500">{activity.time}</span>
                      <Badge
                        variant={
                          activity.status === "completed"
                            ? "default"
                            : activity.status === "pending"
                              ? "destructive"
                              : "secondary"
                        }
                        className="text-xs"
                      >
                        {activity.status === "completed"
                          ? "已完成"
                          : activity.status === "pending"
                            ? "待处理"
                            : activity.status === "new"
                              ? "新增"
                              : "已安排"}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 快速操作 */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-indigo-600" />
              <span>快速操作</span>
            </CardTitle>
            <CardDescription>常用功能快速入口</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
              <Plus className="w-4 h-4 mr-2" />
              新建任务
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Users className="w-4 h-4 mr-2" />
              添加客户
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Calendar className="w-4 h-4 mr-2" />
              安排会议
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <BarChart3 className="w-4 h-4 mr-2" />
              查看报表
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Bell className="w-4 h-4 mr-2" />
              发送通知
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 系统状态 */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span>系统状态</span>
          </CardTitle>
          <CardDescription>系统运行状态和性能指标</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">CPU使用率</span>
                <span className="font-medium">23%</span>
              </div>
              <Progress value={23} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">内存使用率</span>
                <span className="font-medium">67%</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">存储使用率</span>
                <span className="font-medium">45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

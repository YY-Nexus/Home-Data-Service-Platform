"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  CheckSquare,
  Plus,
  Search,
  Calendar,
  User,
  Clock,
  AlertTriangle,
  CheckCircle,
  Edit,
  Trash2,
  Eye,
} from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "review" | "completed"
  priority: "low" | "medium" | "high" | "urgent"
  assignee: string
  dueDate: string
  progress: number
  tags: string[]
  project: string
  createdAt: string
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "产品原型设计",
    description: "完成新产品的原型设计和用户体验优化",
    status: "in-progress",
    priority: "high",
    assignee: "张设计师",
    dueDate: "2025-06-25",
    progress: 65,
    tags: ["设计", "原型", "UX"],
    project: "新产品开发",
    createdAt: "2025-06-15",
  },
  {
    id: "2",
    title: "数据库优化",
    description: "优化数据库查询性能，提升系统响应速度",
    status: "todo",
    priority: "medium",
    assignee: "李工程师",
    dueDate: "2025-06-30",
    progress: 0,
    tags: ["技术", "优化", "数据库"],
    project: "系统维护",
    createdAt: "2025-06-18",
  },
  {
    id: "3",
    title: "市场调研报告",
    description: "完成Q2季度市场调研报告的撰写和分析",
    status: "completed",
    priority: "medium",
    assignee: "王分析师",
    dueDate: "2025-06-20",
    progress: 100,
    tags: ["调研", "报告", "分析"],
    project: "市场分析",
    createdAt: "2025-06-10",
  },
  {
    id: "4",
    title: "客户需求分析",
    description: "分析重点客户的需求变化和市场趋势",
    status: "review",
    priority: "high",
    assignee: "陈经理",
    dueDate: "2025-06-22",
    progress: 90,
    tags: ["客户", "分析", "需求"],
    project: "客户服务",
    createdAt: "2025-06-12",
  },
  {
    id: "5",
    title: "系统安全审计",
    description: "进行全面的系统安全检查和漏洞修复",
    status: "todo",
    priority: "urgent",
    assignee: "赵工程师",
    dueDate: "2025-06-28",
    progress: 0,
    tags: ["安全", "审计", "修复"],
    project: "系统维护",
    createdAt: "2025-06-19",
  },
]

export function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(mockTasks)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  // 过滤任务
  useEffect(() => {
    let filtered = tasks

    if (searchTerm) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.assignee.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((task) => task.status === statusFilter)
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter((task) => task.priority === priorityFilter)
    }

    setFilteredTasks(filtered)
  }, [tasks, searchTerm, statusFilter, priorityFilter])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "review":
        return <Eye className="w-4 h-4 text-purple-600" />
      case "todo":
        return <CheckSquare className="w-4 h-4 text-gray-600" />
      default:
        return <CheckSquare className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "已完成"
      case "in-progress":
        return "进行中"
      case "review":
        return "待审核"
      case "todo":
        return "待开始"
      default:
        return "未知"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "紧急"
      case "high":
        return "高"
      case "medium":
        return "中"
      case "low":
        return "低"
      default:
        return "未知"
    }
  }

  const updateTaskStatus = (taskId: string, newStatus: Task["status"]) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus, progress: newStatus === "completed" ? 100 : task.progress }
          : task,
      ),
    )
  }

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const getTaskStats = () => {
    const total = tasks.length
    const completed = tasks.filter((t) => t.status === "completed").length
    const inProgress = tasks.filter((t) => t.status === "in-progress").length
    const overdue = tasks.filter((t) => new Date(t.dueDate) < new Date() && t.status !== "completed").length

    return { total, completed, inProgress, overdue }
  }

  const stats = getTaskStats()

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* 页面标题 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">任务管理</h1>
          <p className="text-slate-600 mt-1">管理和跟踪项目任务进度</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
              <Plus className="w-4 h-4 mr-2" />
              新建任务
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>创建新任务</DialogTitle>
              <DialogDescription>填写任务详细信息</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  标题
                </Label>
                <Input id="title" className="col-span-3" placeholder="任务标题" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  描述
                </Label>
                <Textarea id="description" className="col-span-3" placeholder="任务描述" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="assignee" className="text-right">
                  负责人
                </Label>
                <Input id="assignee" className="col-span-3" placeholder="负责人" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dueDate" className="text-right">
                  截止日期
                </Label>
                <Input id="dueDate" type="date" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">创建任务</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">总任务数</CardTitle>
            <CheckSquare className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">已完成</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{stats.completed}</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">进行中</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{stats.inProgress}</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">已逾期</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{stats.overdue}</div>
          </CardContent>
        </Card>
      </div>

      {/* 搜索和过滤 */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="搜索任务标题、描述或负责人..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="状态筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有状态</SelectItem>
                <SelectItem value="todo">待开始</SelectItem>
                <SelectItem value="in-progress">进行中</SelectItem>
                <SelectItem value="review">待审核</SelectItem>
                <SelectItem value="completed">已完成</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="优先级筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有优先级</SelectItem>
                <SelectItem value="urgent">紧急</SelectItem>
                <SelectItem value="high">高</SelectItem>
                <SelectItem value="medium">中</SelectItem>
                <SelectItem value="low">低</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 任务列表 */}
      <div className="grid grid-cols-1 gap-4">
        {filteredTasks.map((task) => (
          <Card
            key={task.id}
            className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(task.status)}
                    <h3 className="text-lg font-semibold text-slate-800">{task.title}</h3>
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></div>
                    <Badge variant="outline" className="text-xs">
                      {getPriorityText(task.priority)}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {getStatusText(task.status)}
                    </Badge>
                  </div>
                  <p className="text-slate-600 mb-3">{task.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-slate-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{task.assignee}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{task.dueDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckSquare className="w-4 h-4" />
                      <span>{task.project}</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">进度</span>
                      <span className="font-medium">{task.progress}%</span>
                    </div>
                    <Progress value={task.progress} className="h-2" />
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {task.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateTaskStatus(task.id, task.status === "completed" ? "in-progress" : "completed")}
                  >
                    {task.status === "completed" ? "重新开始" : "标记完成"}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => deleteTask(task.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <CheckSquare className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">没有找到任务</h3>
            <p className="text-slate-500">尝试调整搜索条件或创建新任务</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

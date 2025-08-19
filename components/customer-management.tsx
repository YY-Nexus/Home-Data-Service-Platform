"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
  Users,
  Plus,
  Search,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Edit,
  Trash2,
  Eye,
  Star,
  Building,
} from "lucide-react"

interface Customer {
  id: string
  name: string
  company: string
  email: string
  phone: string
  address: string
  status: "active" | "inactive" | "potential"
  value: number
  lastContact: string
  assignedTo: string
  tags: string[]
  notes: string
  createdAt: string
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "张总",
    company: "华润集团",
    email: "zhang@huarun.com",
    phone: "138-0000-1234",
    address: "深圳市南山区科技园",
    status: "active",
    value: 500000,
    lastContact: "2025-06-19",
    assignedTo: "李销售",
    tags: ["VIP", "大客户"],
    notes: "重要客户，需要定期维护关系",
    createdAt: "2025-01-15",
  },
  {
    id: "2",
    name: "王经理",
    company: "万科地产",
    email: "wang@vanke.com",
    phone: "139-0000-5678",
    address: "广州市天河区珠江新城",
    status: "potential",
    value: 300000,
    lastContact: "2025-06-18",
    assignedTo: "陈销售",
    tags: ["潜在客户", "房地产"],
    notes: "正在洽谈中，有合作意向",
    createdAt: "2025-02-20",
  },
  {
    id: "3",
    name: "刘总监",
    company: "碧桂园",
    email: "liu@bgy.com",
    phone: "137-0000-9012",
    address: "佛山市顺德区",
    status: "active",
    value: 800000,
    lastContact: "2025-06-17",
    assignedTo: "李销售",
    tags: ["VIP", "长期合作"],
    notes: "长期合作伙伴，信任度高",
    createdAt: "2025-01-10",
  },
  {
    id: "4",
    name: "陈董事长",
    company: "腾讯科技",
    email: "chen@tencent.com",
    phone: "136-0000-3456",
    address: "深圳市南山区腾讯大厦",
    status: "active",
    value: 1200000,
    lastContact: "2025-06-16",
    assignedTo: "王销售",
    tags: ["VIP", "科技企业", "战略客户"],
    notes: "战略级合作伙伴，优先级最高",
    createdAt: "2024-12-05",
  },
  {
    id: "5",
    name: "李总经理",
    company: "阿里巴巴",
    email: "li@alibaba.com",
    phone: "135-0000-7890",
    address: "杭州市西湖区阿里巴巴园区",
    status: "potential",
    value: 900000,
    lastContact: "2025-06-15",
    assignedTo: "赵销售",
    tags: ["潜在客户", "电商", "大企业"],
    notes: "正在评估合作方案，需要技术支持",
    createdAt: "2025-03-12",
  },
]

export function CustomerManagement() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(mockCustomers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  // 过滤客户
  useEffect(() => {
    let filtered = customers

    if (searchTerm) {
      filtered = filtered.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((customer) => customer.status === statusFilter)
    }

    setFilteredCustomers(filtered)
  }, [customers, searchTerm, statusFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "potential":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "活跃客户"
      case "potential":
        return "潜在客户"
      case "inactive":
        return "非活跃"
      default:
        return "未知"
    }
  }

  const deleteCustomer = (customerId: string) => {
    setCustomers(customers.filter((customer) => customer.id !== customerId))
  }

  const getCustomerStats = () => {
    const total = customers.length
    const active = customers.filter((c) => c.status === "active").length
    const potential = customers.filter((c) => c.status === "potential").length
    const totalValue = customers.reduce((sum, c) => sum + c.value, 0)

    return { total, active, potential, totalValue }
  }

  const stats = getCustomerStats()

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* 页面标题 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">客户管理</h1>
          <p className="text-slate-600 mt-1">管理客户信息和维护客户关系</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
              <Plus className="w-4 h-4 mr-2" />
              新增客户
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>新增客户</DialogTitle>
              <DialogDescription>填写客户详细信息</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  姓名
                </Label>
                <Input id="name" className="col-span-3" placeholder="客户姓名" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="company" className="text-right">
                  公司
                </Label>
                <Input id="company" className="col-span-3" placeholder="公司名称" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  邮箱
                </Label>
                <Input id="email" type="email" className="col-span-3" placeholder="邮箱地址" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  电话
                </Label>
                <Input id="phone" className="col-span-3" placeholder="联系电话" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  备注
                </Label>
                <Textarea id="notes" className="col-span-3" placeholder="客户备注" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">创建客户</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">总客户数</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">活跃客户</CardTitle>
            <Star className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{stats.active}</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">潜在客户</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{stats.potential}</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">总价值</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">¥{(stats.totalValue / 10000).toFixed(1)}万</div>
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
                  placeholder="搜索客户姓名、公司、邮箱或负责人..."
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
                <SelectItem value="active">活跃客户</SelectItem>
                <SelectItem value="potential">潜在客户</SelectItem>
                <SelectItem value="inactive">非活跃</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 客户列表 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCustomers.map((customer) => (
          <Card
            key={customer.id}
            className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">{customer.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">{customer.name}</h3>
                    <p className="text-slate-600 flex items-center">
                      <Building className="w-4 h-4 mr-1" />
                      {customer.company}
                    </p>
                  </div>
                </div>
                <Badge className={getStatusColor(customer.status)}>{getStatusText(customer.status)}</Badge>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-slate-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {customer.email}
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {customer.phone}
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {customer.address}
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  最后联系: {customer.lastContact}
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  客户价值: ¥{customer.value.toLocaleString()}
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {customer.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {customer.notes && (
                <p className="text-sm text-slate-600 mb-4 p-3 bg-slate-50 rounded-lg">{customer.notes}</p>
              )}

              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-500">负责人: {customer.assignedTo}</div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => deleteCustomer(customer.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">没有找到客户</h3>
            <p className="text-slate-500">尝试调整搜索条件或新增客户</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

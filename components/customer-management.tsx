"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
  UserPlus,
  Edit,
  Eye,
  Download,
  MessageSquare,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
}

export function CustomerManagement() {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "1",
      name: "张总",
      company: "华润集团",
      email: "zhang@huarun.com",
      phone: "138-0000-1234",
      address: "深圳市南山区",
      status: "active",
      value: 500000,
      lastContact: "2025-06-19",
      assignedTo: "李销售",
      tags: ["VIP", "大客户"],
      notes: "重要客户，需要定期维护",
    },
    {
      id: "2",
      name: "王经理",
      company: "万科地产",
      email: "wang@vanke.com",
      phone: "139-0000-5678",
      address: "广州市天河区",
      status: "potential",
      value: 300000,
      lastContact: "2025-06-18",
      assignedTo: "陈销售",
      tags: ["潜在客户"],
      notes: "正在洽谈中，有合作意向",
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
    },
  ])

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("list")
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    status: "potential" as const,
    value: 0,
    assignedTo: "",
    notes: "",
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">活跃客户</Badge>
      case "potential":
        return <Badge className="bg-yellow-100 text-yellow-800">潜在客户</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">非活跃</Badge>
      default:
        return <Badge variant="secondary">未知</Badge>
    }
  }

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalCustomers = customers.length
  const activeCustomers = customers.filter((c) => c.status === "active").length
  const potentialCustomers = customers.filter((c) => c.status === "potential").length
  const totalValue = customers.reduce((sum, c) => sum + c.value, 0)

  // 添加客户功能
  const handleAddCustomer = () => {
    if (!newCustomer.name.trim() || !newCustomer.company.trim()) {
      alert("请填写客户姓名和公司名称")
      return
    }

    const customer: Customer = {
      id: Date.now().toString(),
      ...newCustomer,
      lastContact: new Date().toISOString().split("T")[0],
      tags: newCustomer.value > 500000 ? ["VIP", "大客户"] : ["新客户"],
    }

    setCustomers([...customers, customer])
    setNewCustomer({
      name: "",
      company: "",
      email: "",
      phone: "",
      address: "",
      status: "potential",
      value: 0,
      assignedTo: "",
      notes: "",
    })
    setIsAddDialogOpen(false)

    // 显示成功消息
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("客户添加成功", {
        body: `客户 ${customer.name} (${customer.company}) 已成功添加`,
        icon: "/images/yanyu-cloud-logo.png",
      })
    }

    console.log("客户添加成功:", customer)
  }

  // 导出客户数据
  const handleExportCustomers = () => {
    const csvContent = [
      ["姓名", "公司", "邮箱", "电话", "地址", "状态", "价值", "最后联系", "负责人"],
      ...filteredCustomers.map((customer) => [
        customer.name,
        customer.company,
        customer.email,
        customer.phone,
        customer.address,
        customer.status === "active" ? "活跃" : customer.status === "potential" ? "潜在" : "非活跃",
        customer.value.toString(),
        customer.lastContact,
        customer.assignedTo,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `客户数据_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    console.log("客户数据导出成功")
  }

  // 客户操作功能
  const handleCustomerAction = (action: string, customer: Customer) => {
    console.log(`执行客户操作: ${action}`, customer)

    switch (action) {
      case "call":
        alert(`正在拨打 ${customer.name} 的电话: ${customer.phone}`)
        break
      case "email":
        window.open(`mailto:${customer.email}?subject=来自言语云企业管理系统的邮件`)
        break
      case "message":
        alert(`正在发送消息给 ${customer.name}`)
        break
      case "edit":
        alert(`编辑客户: ${customer.name}`)
        break
      case "view":
        setSelectedCustomer(customer)
        break
      default:
        console.log(`未知操作: ${action}`)
    }
  }

  // 筛选功能
  const handleFilter = (filterType: string, value: string) => {
    console.log(`应用筛选: ${filterType} = ${value}`)
    // 这里可以添加实际的筛选逻辑
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">客户管理系统</h1>
          <p className="text-muted-foreground">全面的客户关系管理平台</p>
        </div>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="搜索客户..."
              className="pl-10 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                添加客户
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>添加新客户</DialogTitle>
                <DialogDescription>填写客户基本信息</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">客户姓名 *</Label>
                  <Input
                    id="name"
                    placeholder="请输入客户姓名"
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">公司名称 *</Label>
                  <Input
                    id="company"
                    placeholder="请输入公司名称"
                    value={newCustomer.company}
                    onChange={(e) => setNewCustomer({ ...newCustomer, company: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">邮箱地址</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="请输入邮箱地址"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">联系电话</Label>
                  <Input
                    id="phone"
                    placeholder="请输入联系电话"
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="address">联系地址</Label>
                  <Input
                    id="address"
                    placeholder="请输入联系地址"
                    value={newCustomer.address}
                    onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">客户状态</Label>
                  <Select
                    value={newCustomer.status}
                    onValueChange={(value: any) => setNewCustomer({ ...newCustomer, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择客户状态" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">活跃客户</SelectItem>
                      <SelectItem value="potential">潜在客户</SelectItem>
                      <SelectItem value="inactive">非活跃</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">预估价值</Label>
                  <Input
                    id="value"
                    type="number"
                    placeholder="请输入预估价值"
                    value={newCustomer.value || ""}
                    onChange={(e) => setNewCustomer({ ...newCustomer, value: Number(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignedTo">负责人</Label>
                  <Select
                    value={newCustomer.assignedTo}
                    onValueChange={(value) => setNewCustomer({ ...newCustomer, assignedTo: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择负责人" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="李销售">李销售</SelectItem>
                      <SelectItem value="陈销售">陈销售</SelectItem>
                      <SelectItem value="王销售">王销售</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="notes">备注信息</Label>
                  <Textarea
                    id="notes"
                    placeholder="请输入备注信息"
                    value={newCustomer.notes}
                    onChange={(e) => setNewCustomer({ ...newCustomer, notes: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  取消
                </Button>
                <Button
                  onClick={handleAddCustomer}
                  className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white"
                >
                  保存客户
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 客户统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">客户总数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">全部客户数量</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃客户</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCustomers}</div>
            <p className="text-xs text-muted-foreground">正在合作的客户</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">潜在客户</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{potentialCustomers}</div>
            <p className="text-xs text-muted-foreground">有合作意向的客户</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">客户总价值</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥{totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">预估总价值</p>
          </CardContent>
        </Card>
      </div>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>客户管理</CardTitle>
                  <CardDescription>管理您的客户信息和关系</CardDescription>
                </div>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="list">客户列表</TabsTrigger>
                    <TabsTrigger value="analytics" onClick={() => console.log("切换到客户分析")}>
                      客户分析
                    </TabsTrigger>
                    <TabsTrigger value="reports">报表统计</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsContent value="list" className="space-y-4">
                  <div className="flex space-x-2 mb-4">
                    <Select onValueChange={(value) => handleFilter("status", value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="客户状态" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部状态</SelectItem>
                        <SelectItem value="active">活跃客户</SelectItem>
                        <SelectItem value="potential">潜在客户</SelectItem>
                        <SelectItem value="inactive">非活跃</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select onValueChange={(value) => handleFilter("assignedTo", value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="负责人" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部负责人</SelectItem>
                        <SelectItem value="李销售">李销售</SelectItem>
                        <SelectItem value="陈销售">陈销售</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button variant="outline" onClick={handleExportCustomers}>
                      <Download className="w-4 h-4 mr-2" />
                      导出客户
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {filteredCustomers.map((customer) => (
                      <div
                        key={customer.id}
                        className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{customer.name}</h4>
                            <p className="text-sm text-muted-foreground">{customer.company}</p>
                          </div>
                          <div className="flex space-x-2">
                            {customer.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {getStatusBadge(customer.status)}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-1" />
                            {customer.phone}
                          </div>
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-1" />
                            {customer.email}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {customer.address}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />¥{customer.value.toLocaleString()}
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-sm text-muted-foreground">负责人: {customer.assignedTo}</span>
                          <span className="text-sm text-muted-foreground">最后联系: {customer.lastContact}</span>
                        </div>
                        <div className="flex justify-end space-x-2 mt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCustomerAction("call", customer)
                            }}
                          >
                            <Phone className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCustomerAction("email", customer)
                            }}
                          >
                            <Mail className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCustomerAction("message", customer)
                            }}
                          >
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCustomerAction("edit", customer)
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <PieChart className="w-5 h-5 mr-2" />
                          客户状态分布
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">活跃客户</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-green-500 h-2 rounded-full"
                                  style={{ width: `${(activeCustomers / totalCustomers) * 100}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">{activeCustomers}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">潜在客户</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-yellow-500 h-2 rounded-full"
                                  style={{ width: `${(potentialCustomers / totalCustomers) * 100}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">{potentialCustomers}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <BarChart3 className="w-5 h-5 mr-2" />
                          客户价值分析
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">平均客户价值</span>
                            <span className="text-sm font-medium">
                              ¥{Math.round(totalValue / totalCustomers).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">最高客户价值</span>
                            <span className="text-sm font-medium">
                              ¥{Math.max(...customers.map((c) => c.value)).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">总客户价值</span>
                            <span className="text-sm font-medium">¥{totalValue.toLocaleString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Activity className="w-5 h-5 mr-2" />
                        客户活动趋势
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center text-muted-foreground">
                        <div className="text-center">
                          <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p>客户活动趋势图表</p>
                          <p className="text-sm">显示最近30天的客户互动数据</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reports" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>客户报表统计</CardTitle>
                      <CardDescription>详细的客户数据报表和统计信息</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{totalCustomers}</div>
                          <div className="text-sm text-muted-foreground">总客户数</div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{activeCustomers}</div>
                          <div className="text-sm text-muted-foreground">活跃客户</div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-yellow-600">{potentialCustomers}</div>
                          <div className="text-sm text-muted-foreground">潜在客户</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>客户详情</CardTitle>
              <CardDescription>查看和编辑客户信息</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedCustomer ? (
                <Tabs defaultValue="info" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="info">基本信息</TabsTrigger>
                    <TabsTrigger value="follow">跟进记录</TabsTrigger>
                    <TabsTrigger value="opportunities">销售机会</TabsTrigger>
                  </TabsList>

                  <TabsContent value="info" className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{selectedCustomer.name}</h3>
                          <p className="text-muted-foreground">{selectedCustomer.company}</p>
                        </div>
                        {getStatusBadge(selectedCustomer.status)}
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{selectedCustomer.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{selectedCustomer.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{selectedCustomer.address}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">¥{selectedCustomer.value.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">最后联系: {selectedCustomer.lastContact}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">标签</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedCustomer.tags.map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">备注</h4>
                        <p className="text-sm text-muted-foreground">{selectedCustomer.notes}</p>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white"
                          onClick={() => handleCustomerAction("edit", selectedCustomer)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          编辑
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCustomerAction("view", selectedCustomer)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          详情
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="follow" className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">跟进记录</h4>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white"
                          onClick={() => console.log("添加跟进记录")}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          添加跟进
                        </Button>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-sky-50/50 rounded-xl border border-sky-100">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <div>
                              <p className="font-medium text-slate-800">合同续签跟进</p>
                              <p className="text-sm text-slate-600">需要在本周内完成续签谈判</p>
                            </div>
                          </div>
                          <Badge variant="destructive">紧急</Badge>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-sky-50/50 rounded-xl border border-sky-100">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <div>
                              <p className="font-medium text-slate-800">需求调研</p>
                              <p className="text-sm text-slate-600">了解客户新的业务需求</p>
                            </div>
                          </div>
                          <Badge variant="outline">普通</Badge>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="opportunities" className="space-y-4">
                    <div className="space-y-3">
                      <h4 className="font-medium">销售机会</h4>
                      <div className="text-center py-8 text-muted-foreground">
                        <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>暂无销售机会</p>
                        <Button
                          size="sm"
                          className="mt-2 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white"
                          onClick={() => console.log("创建销售机会")}
                        >
                          创建销售机会
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">请选择客户查看详情</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>快速操作</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => selectedCustomer && handleCustomerAction("call", selectedCustomer)}
                  disabled={!selectedCustomer}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  拨打电话
                </Button>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => selectedCustomer && handleCustomerAction("email", selectedCustomer)}
                  disabled={!selectedCustomer}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  发送邮件
                </Button>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => console.log("安排会议")}
                  disabled={!selectedCustomer}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  安排会议
                </Button>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => console.log("添加跟进")}
                  disabled={!selectedCustomer}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  添加跟进
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

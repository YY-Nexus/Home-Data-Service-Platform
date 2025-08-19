"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Database,
  Server,
  Cloud,
  Shield,
  Zap,
  Code,
  GitBranch,
  Monitor,
  Layers,
  Network,
  FileText,
  Settings,
  BarChart3,
  Lock,
  Globe,
  Download,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Info,
  Lightbulb,
  Calendar,
  Users,
} from "lucide-react"

export function DataStackDocumentation() {
  const [activeTab, setActiveTab] = useState("overview")

  const techStack = {
    frontend: [
      { name: "Next.js 14", version: "14.0+", description: "React全栈框架，支持SSR/SSG", status: "stable" },
      { name: "React 18", version: "18.0+", description: "用户界面构建库", status: "stable" },
      { name: "TypeScript", version: "5.0+", description: "类型安全的JavaScript", status: "stable" },
      { name: "Tailwind CSS", version: "3.4+", description: "原子化CSS框架", status: "stable" },
      { name: "shadcn/ui", version: "latest", description: "现代化UI组件库", status: "stable" },
      { name: "Lucide React", version: "latest", description: "图标库", status: "stable" },
    ],
    backend: [
      { name: "Node.js", version: "18.0+", description: "JavaScript运行时环境", status: "stable" },
      { name: "IndexedDB", version: "native", description: "浏览器本地数据库", status: "stable" },
      { name: "Service Worker", version: "native", description: "离线支持和缓存", status: "stable" },
      { name: "Web Workers", version: "native", description: "后台数据处理", status: "experimental" },
    ],
    database: [
      { name: "IndexedDB", version: "native", description: "主要本地存储", status: "stable" },
      { name: "LocalStorage", version: "native", description: "配置和缓存", status: "stable" },
      { name: "SessionStorage", version: "native", description: "会话数据", status: "stable" },
      { name: "Cache API", version: "native", description: "资源缓存", status: "stable" },
    ],
    tools: [
      { name: "ESLint", version: "8.0+", description: "代码质量检查", status: "stable" },
      { name: "Prettier", version: "3.0+", description: "代码格式化", status: "stable" },
      { name: "Husky", version: "8.0+", description: "Git钩子管理", status: "stable" },
      { name: "Vercel", version: "latest", description: "部署和托管平台", status: "stable" },
    ],
  }

  const architectureLayers = [
    {
      name: "表现层 (Presentation Layer)",
      description: "用户界面和交互逻辑",
      technologies: ["React", "Next.js", "Tailwind CSS", "shadcn/ui"],
      responsibilities: ["用户界面渲染", "用户交互处理", "状态管理", "路由导航"],
      color: "bg-blue-100 text-blue-800",
    },
    {
      name: "业务逻辑层 (Business Logic Layer)",
      description: "核心业务逻辑和数据处理",
      technologies: ["TypeScript", "Custom Hooks", "Context API"],
      responsibilities: ["业务规则实现", "数据验证", "工作流管理", "权限控制"],
      color: "bg-green-100 text-green-800",
    },
    {
      name: "数据访问层 (Data Access Layer)",
      description: "数据存储和访问抽象",
      technologies: ["IndexedDB API", "Local Database Service"],
      responsibilities: ["数据CRUD操作", "查询优化", "事务管理", "数据同步"],
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      name: "存储层 (Storage Layer)",
      description: "本地化数据存储",
      technologies: ["IndexedDB", "LocalStorage", "Cache API"],
      responsibilities: ["数据持久化", "离线存储", "缓存管理", "备份恢复"],
      color: "bg-purple-100 text-purple-800",
    },
  ]

  const dataFlow = [
    {
      step: 1,
      title: "用户交互",
      description: "用户在界面上执行操作",
      component: "React组件",
      action: "触发事件处理器",
    },
    {
      step: 2,
      title: "业务逻辑处理",
      description: "验证输入并执行业务规则",
      component: "Custom Hooks",
      action: "数据验证和转换",
    },
    {
      step: 3,
      title: "数据访问",
      description: "通过数据访问层操作数据",
      component: "Database Service",
      action: "执行CRUD操作",
    },
    {
      step: 4,
      title: "本地存储",
      description: "数据持久化到本地数据库",
      component: "IndexedDB",
      action: "数据写入/读取",
    },
    {
      step: 5,
      title: "状态更新",
      description: "更新应用状态并重新渲染",
      component: "React State",
      action: "触发重新渲染",
    },
  ]

  const performanceMetrics = [
    { metric: "首屏加载时间", target: "< 2秒", current: "1.8秒", status: "good" },
    { metric: "数据库查询响应", target: "< 100ms", current: "45ms", status: "excellent" },
    { metric: "离线可用性", target: "100%", current: "100%", status: "excellent" },
    { metric: "数据同步延迟", target: "< 500ms", current: "200ms", status: "good" },
    { metric: "内存使用", target: "< 100MB", current: "65MB", status: "good" },
    { metric: "存储空间效率", target: "> 80%", current: "92%", status: "excellent" },
  ]

  const securityFeatures = [
    {
      feature: "本地数据加密",
      description: "敏感数据在本地存储时进行加密",
      implementation: "AES-256加密算法",
      status: "implemented",
    },
    {
      feature: "访问权限控制",
      description: "基于角色的访问控制系统",
      implementation: "RBAC权限模型",
      status: "implemented",
    },
    {
      feature: "数据完整性验证",
      description: "确保数据在传输和存储过程中的完整性",
      implementation: "校验和验证",
      status: "implemented",
    },
    {
      feature: "审计日志",
      description: "记录所有数据操作的详细日志",
      implementation: "活动日志系统",
      status: "implemented",
    },
    {
      feature: "备份加密",
      description: "数据备份文件的加密保护",
      implementation: "端到端加密",
      status: "planned",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "stable":
        return "bg-green-100 text-green-800"
      case "experimental":
        return "bg-yellow-100 text-yellow-800"
      case "deprecated":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPerformanceColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-600"
      case "good":
        return "text-blue-600"
      case "warning":
        return "text-yellow-600"
      case "poor":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* 头部 */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Database className="w-8 h-8 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-900">数据路技术栈文档</h1>
          <p className="text-xl text-gray-600 mt-2">言语云企业管理系统技术架构详解</p>
        </div>
        <div className="flex justify-center space-x-4">
          <Badge className="bg-blue-100 text-blue-800">版本 1.0.0</Badge>
          <Badge className="bg-green-100 text-green-800">生产就绪</Badge>
          <Badge className="bg-purple-100 text-purple-800">本地化优先</Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">技术概览</TabsTrigger>
          <TabsTrigger value="architecture">系统架构</TabsTrigger>
          <TabsTrigger value="dataflow">数据流程</TabsTrigger>
          <TabsTrigger value="database">数据库设计</TabsTrigger>
          <TabsTrigger value="performance">性能指标</TabsTrigger>
          <TabsTrigger value="security">安全特性</TabsTrigger>
          <TabsTrigger value="deployment">部署指南</TabsTrigger>
        </TabsList>

        {/* 技术概览 */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Code className="w-5 h-5" />
                <span>技术栈总览</span>
              </CardTitle>
              <CardDescription>系统采用的核心技术和工具</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 前端技术 */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Monitor className="w-5 h-5 mr-2" />
                    前端技术栈
                  </h3>
                  <div className="space-y-3">
                    {techStack.frontend.map((tech) => (
                      <div key={tech.name} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{tech.name}</div>
                          <div className="text-sm text-gray-600">{tech.description}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">{tech.version}</div>
                          <Badge className={getStatusColor(tech.status)}>{tech.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 后端技术 */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Server className="w-5 h-5 mr-2" />
                    后端技术栈
                  </h3>
                  <div className="space-y-3">
                    {techStack.backend.map((tech) => (
                      <div key={tech.name} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{tech.name}</div>
                          <div className="text-sm text-gray-600">{tech.description}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">{tech.version}</div>
                          <Badge className={getStatusColor(tech.status)}>{tech.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 数据库技术 */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Database className="w-5 h-5 mr-2" />
                    数据存储技术
                  </h3>
                  <div className="space-y-3">
                    {techStack.database.map((tech) => (
                      <div key={tech.name} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{tech.name}</div>
                          <div className="text-sm text-gray-600">{tech.description}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">{tech.version}</div>
                          <Badge className={getStatusColor(tech.status)}>{tech.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 开发工具 */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    开发工具
                  </h3>
                  <div className="space-y-3">
                    {techStack.tools.map((tech) => (
                      <div key={tech.name} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{tech.name}</div>
                          <div className="text-sm text-gray-600">{tech.description}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">{tech.version}</div>
                          <Badge className={getStatusColor(tech.status)}>{tech.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 技术特色 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="w-5 h-5" />
                <span>技术特色与优势</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 border rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">完全本地化</h3>
                  <p className="text-sm text-gray-600">无需服务器依赖，所有数据存储在本地，确保数据安全和隐私保护</p>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">高性能响应</h3>
                  <p className="text-sm text-gray-600">本地数据库查询响应时间小于100ms，提供流畅的用户体验</p>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">企业级安全</h3>
                  <p className="text-sm text-gray-600">多层安全防护，包括数据加密、权限控制和审计日志</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 系统架构 */}
        <TabsContent value="architecture" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Layers className="w-5 h-5" />
                <span>分层架构设计</span>
              </CardTitle>
              <CardDescription>系统采用经典的分层架构模式，确保代码的可维护性和扩展性</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {architectureLayers.map((layer, index) => (
                  <div key={layer.name} className="border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <h3 className="text-lg font-semibold">{layer.name}</h3>
                        <Badge className={layer.color}>核心层</Badge>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{layer.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">使用技术</h4>
                        <div className="flex flex-wrap gap-2">
                          {layer.technologies.map((tech) => (
                            <Badge key={tech} variant="outline">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">主要职责</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {layer.responsibilities.map((responsibility) => (
                            <li key={responsibility} className="flex items-center">
                              <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                              {responsibility}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 组件关系图 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Network className="w-5 h-5" />
                <span>组件关系图</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-center text-gray-500 py-12">
                  <Network className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>组件关系图将在后续版本中提供</p>
                  <p className="text-sm mt-2">包含详细的模块依赖关系和数据流向</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 数据流程 */}
        <TabsContent value="dataflow" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <GitBranch className="w-5 h-5" />
                <span>数据流程图</span>
              </CardTitle>
              <CardDescription>从用户交互到数据持久化的完整流程</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {dataFlow.map((flow, index) => (
                  <div key={flow.step} className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold">{flow.step}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{flow.title}</h3>
                          <p className="text-gray-600">{flow.description}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">{flow.component}</Badge>
                          <p className="text-sm text-gray-500 mt-1">{flow.action}</p>
                        </div>
                      </div>
                    </div>
                    {index < dataFlow.length - 1 && (
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 text-gray-400">→</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 数据同步机制 */}
          <Card>
            <CardHeader>
              <CardTitle>数据同步机制</CardTitle>
              <CardDescription>本地数据的同步和一致性保证</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">实时同步</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      数据变更即时更新到本地数据库
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      UI状态与数据库状态保持一致
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      支持乐观锁防止数据冲突
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3">离线支持</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      完全离线操作能力
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      离线数据队列管理
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      网络恢复后自动同步
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 数据库设计 */}
        <TabsContent value="database" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5" />
                <span>数据库架构设计</span>
              </CardTitle>
              <CardDescription>基于IndexedDB的本地化数据库设计</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* 数据表结构 */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">核心数据表</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      {
                        name: "customers",
                        description: "客户信息表",
                        fields: ["id", "name", "company", "email", "phone", "status"],
                        indexes: ["name", "company", "status"],
                      },
                      {
                        name: "tasks",
                        description: "任务管理表",
                        fields: ["id", "title", "status", "priority", "assignee", "dueDate"],
                        indexes: ["status", "priority", "assignee"],
                      },
                      {
                        name: "okrs",
                        description: "OKR目标表",
                        fields: ["id", "title", "owner", "department", "quarter", "progress"],
                        indexes: ["owner", "department", "quarter"],
                      },
                      {
                        name: "invoices",
                        description: "发票管理表",
                        fields: ["id", "number", "customerName", "amount", "status", "dueDate"],
                        indexes: ["number", "status", "customerName"],
                      },
                      {
                        name: "users",
                        description: "用户信息表",
                        fields: ["id", "name", "email", "role", "department", "status"],
                        indexes: ["email", "role", "department"],
                      },
                      {
                        name: "notifications",
                        description: "通知消息表",
                        fields: ["id", "type", "title", "content", "isRead", "userId"],
                        indexes: ["type", "userId", "isRead"],
                      },
                    ].map((table) => (
                      <div key={table.name} className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">{table.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{table.description}</p>
                        <div className="space-y-2">
                          <div>
                            <span className="text-xs font-medium text-gray-500">字段:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {table.fields.map((field) => (
                                <Badge key={field} variant="outline" className="text-xs">
                                  {field}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-xs font-medium text-gray-500">索引:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {table.indexes.map((index) => (
                                <Badge key={index} className="text-xs bg-blue-100 text-blue-800">
                                  {index}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 数据关系 */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">数据关系</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center">
                        <span className="font-medium w-24">customers</span>
                        <span className="text-gray-500 mx-2">→</span>
                        <span>tasks (assignedTo), invoices (customerName)</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium w-24">users</span>
                        <span className="text-gray-500 mx-2">→</span>
                        <span>tasks (assignee), okrs (owner), notifications (userId)</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium w-24">okrs</span>
                        <span className="text-gray-500 mx-2">→</span>
                        <span>keyResults (embedded), tasks (project)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 查询优化 */}
          <Card>
            <CardHeader>
              <CardTitle>查询优化策略</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">索引策略</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      为常用查询字段建立索引
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      复合索引支持多字段查询
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      定期索引维护和优化
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3">缓存机制</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      查询结果内存缓存
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      智能缓存失效策略
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      分页查询优化
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 性能指标 */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>性能监控指标</span>
              </CardTitle>
              <CardDescription>系统关键性能指标的实时监控</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {performanceMetrics.map((metric) => (
                  <div key={metric.metric} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{metric.metric}</h4>
                      <Badge className={`${getPerformanceColor(metric.status)} bg-transparent border-current`}>
                        {metric.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">目标值:</span>
                        <span className="font-medium">{metric.target}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">当前值:</span>
                        <span className={`font-medium ${getPerformanceColor(metric.status)}`}>{metric.current}</span>
                      </div>
                      <Progress
                        value={
                          metric.status === "excellent"
                            ? 100
                            : metric.status === "good"
                              ? 80
                              : metric.status === "warning"
                                ? 60
                                : 40
                        }
                        className="h-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 性能优化建议 */}
          <Card>
            <CardHeader>
              <CardTitle>性能优化建议</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">数据库优化</h4>
                    <p className="text-sm text-blue-800 mt-1">
                      定期清理过期数据，优化索引结构，使用批量操作减少事务开销
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900">缓存策略</h4>
                    <p className="text-sm text-green-800 mt-1">
                      实施智能缓存策略，预加载常用数据，使用虚拟滚动优化大列表渲染
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900">内存管理</h4>
                    <p className="text-sm text-yellow-800 mt-1">监控内存使用情况，及时释放不需要的对象，避免内存泄漏</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 安全特性 */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>安全特性</span>
              </CardTitle>
              <CardDescription>多层次的安全防护机制</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityFeatures.map((feature) => (
                  <div key={feature.feature} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{feature.feature}</h4>
                      <Badge
                        className={
                          feature.status === "implemented"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {feature.status === "implemented" ? "已实现" : "计划中"}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-2">{feature.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Lock className="w-4 h-4 mr-2" />
                      <span>实现方式: {feature.implementation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 安全最佳实践 */}
          <Card>
            <CardHeader>
              <CardTitle>安全最佳实践</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">数据保护</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      敏感数据本地加密存储
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      定期数据备份和恢复测试
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      数据访问权限控制
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3">系统安全</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      输入验证和数据清理
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      安全的错误处理机制
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      完整的审计日志记录
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 部署指南 */}
        <TabsContent value="deployment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Cloud className="w-5 h-5" />
                <span>部署指南</span>
              </CardTitle>
              <CardDescription>系统部署和配置说明</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* 环境要求 */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">环境要求</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">开发环境</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          Node.js 18.0+
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          npm 9.0+ 或 yarn 1.22+
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          Git 2.30+
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">浏览器支持</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          Chrome 90+
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          Firefox 88+
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          Safari 14+
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          Edge 90+
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 部署步骤 */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">部署步骤</h3>
                  <div className="space-y-4">
                    {[
                      {
                        step: 1,
                        title: "克隆代码仓库",
                        command: "git clone https://github.com/your-org/yanyu-ems.git",
                        description: "从Git仓库获取最新代码",
                      },
                      {
                        step: 2,
                        title: "安装依赖",
                        command: "npm install",
                        description: "安装项目所需的所有依赖包",
                      },
                      {
                        step: 3,
                        title: "环境配置",
                        command: "cp .env.example .env.local",
                        description: "复制并配置环境变量文件",
                      },
                      {
                        step: 4,
                        title: "构建项目",
                        command: "npm run build",
                        description: "构建生产版本的应用",
                      },
                      {
                        step: 5,
                        title: "启动服务",
                        command: "npm start",
                        description: "启动生产环境服务",
                      },
                    ].map((step) => (
                      <div key={step.step} className="flex items-start space-x-4 p-4 border rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 font-bold text-sm">{step.step}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{step.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm">{step.command}</code>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 配置选项 */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">配置选项</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="text-sm text-gray-700">
                      {`# .env.local 配置示例
NEXT_PUBLIC_APP_NAME="言语云企业管理系统"
NEXT_PUBLIC_APP_VERSION="1.0.0"
NEXT_PUBLIC_ENABLE_PWA=true
NEXT_PUBLIC_ENABLE_OFFLINE=true
NEXT_PUBLIC_DEBUG_MODE=false`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 部署平台 */}
          <Card>
            <CardHeader>
              <CardTitle>推荐部署平台</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 border rounded-lg">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">V</span>
                  </div>
                  <h3 className="font-semibold mb-2">Vercel</h3>
                  <p className="text-sm text-gray-600 mb-4">推荐的部署平台，零配置部署</p>
                  <Button size="sm" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    部署到Vercel
                  </Button>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">N</span>
                  </div>
                  <h3 className="font-semibold mb-2">Netlify</h3>
                  <p className="text-sm text-gray-600 mb-4">静态站点托管，支持CI/CD</p>
                  <Button size="sm" variant="outline" className="w-full bg-transparent">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    部署到Netlify
                  </Button>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">D</span>
                  </div>
                  <h3 className="font-semibold mb-2">Docker</h3>
                  <p className="text-sm text-gray-600 mb-4">容器化部署，支持私有云</p>
                  <Button size="sm" variant="outline" className="w-full bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    下载Dockerfile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 底部信息 */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                <span>文档版本: 1.0.0</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>更新时间: 2025年6月28日</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span>维护团队: 言语云技术团队</span>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              <p>© 2025 言语云科技有限公司. 保留所有权利.</p>
              <p className="mt-1">本文档包含专有技术信息，仅供内部使用。</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

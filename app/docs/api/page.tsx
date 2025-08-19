import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, FileText, Zap } from "lucide-react"

export default function ApiDocumentationPage() {
  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
            <Code className="w-8 h-8 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-900">API 文档</h1>
          <p className="text-xl text-gray-600 mt-2">本地化数据库API接口文档</p>
        </div>
        <div className="flex justify-center space-x-4">
          <Badge className="bg-green-100 text-green-800">RESTful API</Badge>
          <Badge className="bg-blue-100 text-blue-800">TypeScript</Badge>
          <Badge className="bg-purple-100 text-purple-800">本地化</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="w-5 h-5" />
              <span>数据库操作API</span>
            </CardTitle>
            <CardDescription>本地IndexedDB数据库的CRUD操作接口</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <code className="text-sm font-mono">localDB.create()</code>
                  <Badge variant="outline">POST</Badge>
                </div>
                <p className="text-sm text-gray-600">创建新的数据记录</p>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <code className="text-sm font-mono">localDB.read()</code>
                  <Badge variant="outline">GET</Badge>
                </div>
                <p className="text-sm text-gray-600">读取指定ID的数据记录</p>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <code className="text-sm font-mono">localDB.update()</code>
                  <Badge variant="outline">PUT</Badge>
                </div>
                <p className="text-sm text-gray-600">更新现有数据记录</p>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <code className="text-sm font-mono">localDB.delete()</code>
                  <Badge variant="outline">DELETE</Badge>
                </div>
                <p className="text-sm text-gray-600">删除指定的数据记录</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>查询和搜索API</span>
            </CardTitle>
            <CardDescription>数据查询、搜索和统计接口</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <code className="text-sm font-mono">localDB.list()</code>
                  <Badge variant="outline">GET</Badge>
                </div>
                <p className="text-sm text-gray-600">获取数据列表，支持分页和排序</p>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <code className="text-sm font-mono">localDB.search()</code>
                  <Badge variant="outline">GET</Badge>
                </div>
                <p className="text-sm text-gray-600">全文搜索数据记录</p>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <code className="text-sm font-mono">localDB.count()</code>
                  <Badge variant="outline">GET</Badge>
                </div>
                <p className="text-sm text-gray-600">统计数据记录数量</p>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <code className="text-sm font-mono">localDB.backup()</code>
                  <Badge variant="outline">GET</Badge>
                </div>
                <p className="text-sm text-gray-600">导出完整数据备份</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>使用示例</span>
          </CardTitle>
          <CardDescription>常用API调用示例代码</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-2">创建客户记录</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm text-gray-700">
                  {`// 创建新客户
const customerId = await localDB.create('customers', {
  name: '张总',
  company: '华润集团',
  email: 'zhang@huarun.com',
  phone: '138-0000-1234',
  status: 'active'
});

console.log('客户创建成功，ID:', customerId);`}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">查询客户列表</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm text-gray-700">
                  {`// 获取活跃客户列表
const activeCustomers = await localDB.list('customers', {
  index: 'status',
  range: IDBKeyRange.only('active'),
  limit: 10,
  offset: 0
});

console.log('活跃客户:', activeCustomers);`}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">搜索功能</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm text-gray-700">
                  {`// 搜索客户
const searchResults = await localDB.search('customers', '华润', [
  'name', 'company', 'email'
]);

console.log('搜索结果:', searchResults);`}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">数据备份</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm text-gray-700">
                  {`// 导出数据备份
const backupData = await localDB.backup();

// 下载备份文件
const blob = new Blob([JSON.stringify(backupData, null, 2)], {
  type: 'application/json'
});
const url = URL.createObjectURL(blob);
const link = document.createElement('a');
link.href = url;
link.download = 'database-backup.json';
link.click();`}
                </pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>错误处理</CardTitle>
          <CardDescription>API错误处理和异常情况说明</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">常见错误类型</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <code>DatabaseNotInitialized</code> - 数据库未初始化
                </li>
                <li>
                  <code>RecordNotFound</code> - 记录不存在
                </li>
                <li>
                  <code>ValidationError</code> - 数据验证失败
                </li>
                <li>
                  <code>StorageQuotaExceeded</code> - 存储空间不足
                </li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">错误处理示例</h4>
              <div className="bg-gray-50 p-3 rounded">
                <pre className="text-sm text-gray-700">
                  {`try {
  const customer = await localDB.read('customers', 'invalid-id');
} catch (error) {
  if (error.message === '数据不存在') {
    console.log('客户记录未找到');
  } else {
    console.error('查询失败:', error);
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function DocumentsLoading() {
  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* 页面标题和操作栏骨架 */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex items-center space-x-3">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-28" />
          <Skeleton className="h-9 w-20" />
        </div>
      </div>

      {/* 搜索和筛选栏骨架 */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-20" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 文件夹树骨架 */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="w-6 h-6 rounded" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50">
                  <Skeleton className="w-4 h-4" />
                  <Skeleton className="w-4 h-4" />
                  <Skeleton className={`h-4 ${i % 3 === 0 ? "w-24" : i % 3 === 1 ? "w-20" : "w-28"}`} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 文档列表骨架 */}
        <div className="lg:col-span-3 space-y-4">
          {/* 视图切换骨架 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Skeleton className="w-8 h-8 rounded" />
              <Skeleton className="w-8 h-8 rounded" />
              <Skeleton className="w-8 h-8 rounded" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>

          {/* 文档网格骨架 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <Card
                key={i}
                className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* 文件图标和类型 */}
                    <div className="flex items-center justify-between">
                      <Skeleton className="w-12 h-12 rounded-lg" />
                      <Skeleton className="w-6 h-6 rounded" />
                    </div>

                    {/* 文件名 */}
                    <Skeleton className={`h-5 ${i % 3 === 0 ? "w-32" : i % 3 === 1 ? "w-28" : "w-36"}`} />

                    {/* 文件信息 */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-3 w-12" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-3 w-14" />
                      </div>
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center space-x-1">
                        <Skeleton className="w-6 h-6 rounded" />
                        <Skeleton className="w-6 h-6 rounded" />
                        <Skeleton className="w-6 h-6 rounded" />
                      </div>
                      <Skeleton className="h-6 w-12 rounded-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 分页骨架 */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-32" />
            <div className="flex items-center space-x-2">
              <Skeleton className="w-8 h-8 rounded" />
              <Skeleton className="w-8 h-8 rounded" />
              <Skeleton className="w-8 h-8 rounded" />
              <Skeleton className="w-8 h-8 rounded" />
              <Skeleton className="w-8 h-8 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* 最近访问骨架 */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-8 w-16" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-3 p-3 border rounded-lg">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

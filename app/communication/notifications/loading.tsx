"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function NotificationsLoading() {
  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* 页面标题骨架 */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex items-center space-x-3">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-16" />
        </div>
      </div>

      {/* 通知统计卡片骨架 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="w-5 h-5 rounded" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-12 mb-2" />
              <Skeleton className="h-4 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 筛选器骨架 */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <Skeleton className="h-6 w-16" />
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 类型筛选 */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-12" />
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Skeleton className="w-4 h-4 rounded" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-6 ml-auto" />
                  </div>
                ))}
              </div>
            </div>

            {/* 优先级筛选 */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Skeleton className="w-4 h-4 rounded" />
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-4 ml-auto" />
                  </div>
                ))}
              </div>
            </div>

            {/* 状态筛选 */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-12" />
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Skeleton className="w-4 h-4 rounded" />
                    <Skeleton className="h-4 w-14" />
                    <Skeleton className="h-4 w-6 ml-auto" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 通知列表骨架 */}
        <div className="lg:col-span-3 space-y-4">
          {/* 搜索和排序骨架 */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-64" />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>

          {/* 通知项骨架 */}
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card
                key={i}
                className={`bg-white/80 backdrop-blur-sm border-0 shadow-lg ${i % 3 === 0 ? "border-l-4 border-l-blue-500" : i % 3 === 1 ? "border-l-4 border-l-orange-500" : "border-l-4 border-l-green-500"}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    {/* 通知图标 */}
                    <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />

                    {/* 通知内容 */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <Skeleton className={`h-5 ${i % 3 === 0 ? "w-48" : i % 3 === 1 ? "w-56" : "w-40"}`} />
                          <Skeleton className={`h-4 ${i % 3 === 0 ? "w-64" : i % 3 === 1 ? "w-72" : "w-52"}`} />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Skeleton className="h-5 w-12 rounded-full" />
                          <Skeleton className="w-6 h-6 rounded" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Skeleton className="h-3 w-16" />
                          <Skeleton className="h-3 w-20" />
                          <Skeleton className="h-3 w-12" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Skeleton className="w-6 h-6 rounded" />
                          <Skeleton className="w-6 h-6 rounded" />
                          <Skeleton className="w-6 h-6 rounded" />
                        </div>
                      </div>
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

      {/* 通知设置面板骨架 */}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-5 w-20" />
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="flex items-center justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="w-10 h-6 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

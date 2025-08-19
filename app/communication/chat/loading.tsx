"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function ChatLoading() {
  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* 左侧聊天列表 */}
      <div className="w-80 border-r bg-white/80 backdrop-blur-sm">
        {/* 搜索框骨架 */}
        <div className="p-4 border-b">
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>

        {/* 聊天列表骨架 */}
        <div className="p-2 space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-12" />
                </div>
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 右侧聊天区域 */}
      <div className="flex-1 flex flex-col">
        {/* 聊天头部骨架 */}
        <div className="p-4 border-b bg-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="w-8 h-8 rounded" />
              <Skeleton className="w-8 h-8 rounded" />
              <Skeleton className="w-8 h-8 rounded" />
            </div>
          </div>
        </div>

        {/* 消息区域骨架 */}
        <div className="flex-1 p-4 space-y-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
              <div
                className={`flex items-start space-x-2 max-w-xs ${i % 2 === 0 ? "" : "flex-row-reverse space-x-reverse"}`}
              >
                <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
                <div className="space-y-1">
                  <Skeleton className={`h-4 ${i % 3 === 0 ? "w-32" : i % 3 === 1 ? "w-48" : "w-24"}`} />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 输入区域骨架 */}
        <div className="p-4 border-t bg-white/80 backdrop-blur-sm">
          <div className="flex items-end space-x-2">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-20 w-full rounded-lg" />
            </div>
            <div className="flex flex-col space-y-2">
              <Skeleton className="w-8 h-8 rounded" />
              <Skeleton className="w-8 h-8 rounded" />
              <Skeleton className="w-16 h-8 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

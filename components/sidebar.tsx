"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { TrendingUp, PieChart, Cloud, Smartphone, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import generalData from "../public/general_data.json"

interface SidebarProps {
  isMobile?: boolean
}

export default function Sidebar({ isMobile }: SidebarProps) {
  const pathname = usePathname()

  const navItems = [
    { name: "概览", href: "/", icon: Home },
    { name: "小站指数", href: "/jrsindex", icon: TrendingUp },
    { name: "情绪分析", href: "/sentiment", icon: PieChart },
    { name: "词云分析", href: "/wordcloud", icon: Cloud },
    // { name: "移动端预览", href: "/mobile-preview", icon: Smartphone },
  ]

  return (
    <aside
      className={cn(
        "bg-white border-r border-gray-200 w-64 flex-shrink-0",
        isMobile ? "w-full h-full" : "hidden md:block",
      )}
    >
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">小站指数</h2>
        <p className="text-sm text-gray-500 mt-1">v1.0.0</p>
      </div>

      <nav className="p-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium",
                    isActive ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="absolute bottom-4 left-4 p-2 bg-blue-50 rounded-lg border border-blue-100 hidden md:block w-48">
        <h3 className="font-medium text-blue-800 mb-1">数据更新时间</h3>
        <p className="text-sm text-blue-600">{generalData.last_updated}</p>
      </div>
    </aside>
  )
}

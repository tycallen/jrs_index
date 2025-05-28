"use client"

import { useState } from "react"
import { Bell, Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Sidebar from "./sidebar"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">打开菜单</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <Sidebar isMobile />
          </SheetContent>
        </Sheet>

        <h1 className="text-xl font-bold text-gray-800 hidden md:block">小站指数</h1>
      </div>

      <div className="flex items-center gap-2">
        {isSearchOpen ? (
          <div className="relative">
            <Input type="search" placeholder="搜索..." className="w-full md:w-64" autoFocus />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0"
              onClick={() => setIsSearchOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">关闭搜索</span>
            </Button>
          </div>
        ) : (
          <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
            <Search className="h-5 w-5" />
            <span className="sr-only">搜索</span>
          </Button>
        )}

        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">通知</span>
        </Button>

        <Button variant="ghost" size="sm" className="ml-2 hidden md:flex">
          导出数据
        </Button>
      </div>
    </header>
  )
}

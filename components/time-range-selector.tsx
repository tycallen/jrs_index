"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"

export default function TimeRangeSelector() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-8" onClick={() => {
          console.log("本月按钮被点击")
          setDate(new Date())
          // 触发其它组件的刷新
          window.dispatchEvent(new CustomEvent('refreshComponent', { detail: 'monthly' }))
        }}>
          本月
        </Button>
        <Button variant="outline" size="sm" className="h-8" onClick={() => {
          console.log("本季按钮被点击")
          setDate(new Date())
          // 触发其它组件的刷新
          window.dispatchEvent(new CustomEvent('refreshComponent', { detail: 'quarterly' }))
        }}>
          本季
        </Button>
        <Button variant="outline" size="sm" className="h-8" onClick={() => {
          console.log("本年按钮被点击")
          setDate(new Date())
          // 触发其它组件的刷新
          window.dispatchEvent(new CustomEvent('refreshComponent', { detail: 'yearly' }))
        }}>
          本年
        </Button>
        <Button variant="outline" size="sm" className="h-8" onClick={() => {
          console.log("全年按钮被点击")
          setDate(new Date())
          // 触发其它组件的刷新
          window.dispatchEvent(new CustomEvent('refreshComponent', { detail: 'all' }))
        }}>
          全部
        </Button>
      </div>

      {/* <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn("h-8 justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP", { locale: zhCN }) : <span>选择日期</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
        </PopoverContent>
      </Popover> */}
    </div>
  )
}

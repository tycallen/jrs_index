"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

interface MobilePreviewProps {
  title: string
  path: string
}

export default function MobilePreview({ title, path }: MobilePreviewProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="device-frame">
        <div className="device-screen">
          <iframe src={path} className="w-full h-full border-0" title={`${title} 移动端预览`} />
        </div>
      </div>
    </Card>
  )
}

"use client"

import { useEffect, useRef } from "react"

interface WordCloudChartProps {
  type: "all" | "positive" | "negative"
}

export default function WordCloudChart({ type }: WordCloudChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // 模拟词云数据
  const generateWords = () => {
    const allWords = [
      { text: "数据分析", size: 60, color: "#3b82f6", sentiment: "neutral" },
      { text: "用户体验", size: 55, color: "#10b981", sentiment: "positive" },
      { text: "响应式设计", size: 50, color: "#10b981", sentiment: "positive" },
      { text: "性能优化", size: 45, color: "#10b981", sentiment: "positive" },
      { text: "加载时间", size: 40, color: "#ef4444", sentiment: "negative" },
      { text: "可视化", size: 65, color: "#3b82f6", sentiment: "neutral" },
      { text: "交互设计", size: 48, color: "#3b82f6", sentiment: "neutral" },
      { text: "用户反馈", size: 42, color: "#10b981", sentiment: "positive" },
      { text: "界面布局", size: 38, color: "#3b82f6", sentiment: "neutral" },
      { text: "系统崩溃", size: 35, color: "#ef4444", sentiment: "negative" },
      { text: "数据可靠性", size: 52, color: "#10b981", sentiment: "positive" },
      { text: "加载失败", size: 32, color: "#ef4444", sentiment: "negative" },
      { text: "图表展示", size: 58, color: "#3b82f6", sentiment: "neutral" },
      { text: "社区活跃度", size: 45, color: "#10b981", sentiment: "positive" },
      { text: "用户增长", size: 50, color: "#10b981", sentiment: "positive" },
      { text: "内容质量", size: 47, color: "#3b82f6", sentiment: "neutral" },
      { text: "系统稳定", size: 43, color: "#10b981", sentiment: "positive" },
      { text: "操作复杂", size: 36, color: "#ef4444", sentiment: "negative" },
    ]

    if (type === "all") return allWords
    return allWords.filter((word) => word.sentiment === (type === "positive" ? "positive" : "negative"))
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // 设置画布尺寸
    const container = canvas.parentElement
    if (container) {
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    }

    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 获取词云数据
    const words = generateWords()

    // 绘制词云
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const maxRadius = Math.min(centerX, centerY) * 0.9

    // 随机放置词语
    words.forEach((word, index) => {
      // 计算角度和半径
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * maxRadius

      // 计算位置
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)

      // 设置字体大小和颜色
      ctx.font = `${word.size}px Arial`
      ctx.fillStyle = word.color
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      // 绘制文本
      ctx.fillText(word.text, x, y)
    })
  }, [type])

  return (
    <div className="h-full w-full">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

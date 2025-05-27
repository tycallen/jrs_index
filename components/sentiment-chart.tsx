"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface SentimentChartProps {
  simplified?: boolean
}

export default function SentimentChart({ simplified = false }: SentimentChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  // 模拟数据
  const generateData = () => {
    const labels = []
    const positiveData = []
    const neutralData = []
    const negativeData = []
    const pointCount = 14

    for (let i = 0; i < pointCount; i++) {
      const date = new Date()
      date.setDate(date.getDate() - (pointCount - i - 1))
      labels.push(date.toLocaleDateString("zh-CN", { month: "short", day: "numeric" }))

      // 生成情绪数据
      positiveData.push(Math.floor(Math.random() * 40) + 30)
      neutralData.push(Math.floor(Math.random() * 30) + 20)
      negativeData.push(Math.floor(Math.random() * 20) + 10)
    }

    return { labels, positiveData, neutralData, negativeData }
  }

  useEffect(() => {
    if (chartRef.current) {
      // 清除旧图表
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const { labels, positiveData, neutralData, negativeData } = generateData()

      // 创建新图表
      const ctx = chartRef.current.getContext("2d")
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels,
            datasets: [
              {
                label: "正面情绪",
                data: positiveData,
                borderColor: "#10b981",
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                borderWidth: 2,
                tension: 0.3,
                fill: true,
                pointBackgroundColor: "#10b981",
                pointRadius: simplified ? 0 : 3,
                pointHoverRadius: 5,
              },
              {
                label: "中性情绪",
                data: neutralData,
                borderColor: "#6b7280",
                backgroundColor: "rgba(107, 114, 128, 0.1)",
                borderWidth: 2,
                tension: 0.3,
                fill: true,
                pointBackgroundColor: "#6b7280",
                pointRadius: simplified ? 0 : 3,
                pointHoverRadius: 5,
              },
              {
                label: "负面情绪",
                data: negativeData,
                borderColor: "#ef4444",
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                borderWidth: 2,
                tension: 0.3,
                fill: true,
                pointBackgroundColor: "#ef4444",
                pointRadius: simplified ? 0 : 3,
                pointHoverRadius: 5,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: !simplified,
                position: "top",
              },
              tooltip: {
                mode: "index",
                intersect: false,
              },
            },
            scales: {
              x: {
                display: true,
                grid: {
                  display: !simplified,
                  drawBorder: !simplified,
                },
                ticks: {
                  display: !simplified,
                },
              },
              y: {
                display: true,
                grid: {
                  display: !simplified,
                  drawBorder: !simplified,
                },
                ticks: {
                  display: !simplified,
                },
              },
            },
            interaction: {
              mode: "nearest",
              axis: "x",
              intersect: false,
            },
          },
        })
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [simplified])

  return (
    <div className="h-full">
      <canvas ref={chartRef} />
    </div>
  )
}

"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export default function SentimentDistribution() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      // 清除旧图表
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      // 模拟数据
      const data = {
        labels: ["正面", "中性", "负面"],
        datasets: [
          {
            data: [45, 35, 20],
            backgroundColor: ["#10b981", "#6b7280", "#ef4444"],
            borderWidth: 0,
          },
        ],
      }

      // 创建新图表
      const ctx = chartRef.current.getContext("2d")
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "doughnut",
          data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const label = context.label || ""
                    const value = context.raw as number
                    return `${label}: ${value}%`
                  },
                },
              },
            },
            cutout: "60%",
          },
        })
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="h-full">
      <canvas ref={chartRef} />
    </div>
  )
}

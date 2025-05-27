"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export default function TopicSentiment() {
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
        labels: ["用户界面", "性能体验", "内容质量", "社区互动", "功能完善度"],
        datasets: [
          {
            label: "正面情绪",
            data: [75, 60, 80, 85, 70],
            backgroundColor: "rgba(16, 185, 129, 0.7)",
          },
          {
            label: "中性情绪",
            data: [15, 25, 10, 10, 20],
            backgroundColor: "rgba(107, 114, 128, 0.7)",
          },
          {
            label: "负面情绪",
            data: [10, 15, 10, 5, 10],
            backgroundColor: "rgba(239, 68, 68, 0.7)",
          },
        ],
      }

      // 创建新图表
      const ctx = chartRef.current.getContext("2d")
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
              },
              tooltip: {
                mode: "index",
                intersect: false,
              },
            },
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
                max: 100,
                ticks: {
                  callback: (value) => value + "%",
                },
              },
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
  }, [])

  return (
    <div className="h-full">
      <canvas ref={chartRef} />
    </div>
  )
}

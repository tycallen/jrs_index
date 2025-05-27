"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"
import posts_count_data from '../public/posts_count_data.json';

Chart.register(...registerables)

interface IndexChartProps {
  type: "daily" | "weekly" | "monthly"
  simplified?: boolean
}

export default function IndexChart({ type, simplified = false }: IndexChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const currentRange = useRef<string>("yearly")
  const maxValue = useRef<number>(0)
  const minValue = useRef<number>(0)
  const changeMount = {
    value: 0,
    isPositive: false,
    isNeutral: false
  }

  // 模拟数据
  const generateData = (range: string) => {
    let filteredData;

    if (range === "all") {
      filteredData = posts_count_data.all;
    } else if (range === "monthly") {
      filteredData = posts_count_data.month;
    } else if (range === "quarterly") {
      filteredData = posts_count_data.quarter;
    } else if (range === "yearly") {
      filteredData = posts_count_data.year;
    }
    currentRange.current = range

    if (type === "daily") {
      filteredData = filteredData.daily;
    } else if (type === "weekly") {
      filteredData = filteredData.weekly;
    } else {
      filteredData = filteredData.monthly;
    }
    return filteredData;
  }
  const updateValues = (filteredData) => {
    maxValue.current = Math.max(...filteredData.datasets[0].data)
    minValue.current = Math.min(...filteredData.datasets[0].data)
    const latestValue = filteredData.datasets[0].data[filteredData.datasets[0].data.length - 1]
    const previousValue = filteredData.datasets[0].data[filteredData.datasets[0].data.length - 2]
    const value = (latestValue - previousValue) / previousValue
    changeMount.value = value 
    changeMount.isPositive = value > 0
    changeMount.isNeutral = Math.abs(value) < 0.001
    // 动态更新HTML
    if (document.querySelector('.max-value')) {
      document.querySelector('.max-value').textContent = `最高: ${maxValue.current}`
      document.querySelector('.min-value').textContent = `最低: ${minValue.current}`
      document.querySelector('.change-value').textContent = `${(changeMount.value * 100).toFixed(2)}%`
      console.log(changeMount, latestValue, previousValue)
      const upIcon = document.querySelector('.up-icon')
      const downIcon = document.querySelector('.down-icon')
      const neutralIcon = document.querySelector('.equal-icon')
      const latestValueElement = document.querySelector('.latest-value')
      if (changeMount.isNeutral) {
        neutralIcon.style.display = 'block'
        upIcon.style.display = 'none'
        downIcon.style.display = 'none'
      } else if (changeMount.isPositive) {
        upIcon.style.display = 'block'
        downIcon.style.display = 'none'
        neutralIcon.style.display = 'none'
      } else {
        upIcon.style.display = 'none'
        downIcon.style.display = 'block'
        neutralIcon.style.display = 'none'
      }
      latestValueElement.textContent = latestValue.toFixed(2)
    }
  }

  useEffect(() => {
    const handleRefresh = (event: CustomEvent) => {
      if (event.detail === 'monthly' || event.detail === 'quarterly' || event.detail === 'yearly' || event.detail === 'all') {
        console.log("接收到范围刷新事件")
        // 在这里可以添加刷新逻辑，例如重新获取数据或更新图表
        createChart(event.detail)
      }
    }

    window.addEventListener('refreshComponent', handleRefresh as EventListener)

    return () => {
      window.removeEventListener('refreshComponent', handleRefresh as EventListener)
    }
  }, [])

  const createChart = (range: string) => {
    if (chartRef.current) {
      // 清除旧图表
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
      const _dataset = generateData(range)
      updateValues(_dataset) // 更新最大、最小、变化值
      // 创建新图表
      const ctx = chartRef.current.getContext("2d")
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: _dataset['labels'],
            datasets: [
              {
                label: "小站指数",
                data: _dataset['datasets'][0]['data'],
                borderColor: _dataset['datasets'][0]['borderColor'],
                backgroundColor: _dataset['datasets'][0]['backgroundColor'],
                borderWidth: 2,
                tension: 0.3,
                fill: true,
                pointBackgroundColor: _dataset['datasets'][0]['borderColor'],
                pointRadius: simplified ? 0 : 3,
                pointHoverRadius: 5,
              },
              {
                type: "line", // 使用折线图
                label: _dataset['datasets'][1]['label'],
                data: _dataset['datasets'][1]['data'], // 假设均线数据在第二个数据集中
                borderColor: _dataset['datasets'][1]['borderColor'],
                backgroundColor: _dataset['datasets'][1]['backgroundColor'],
                borderWidth: 2,
                tension: 0.3,
                fill: false,
                pointBackgroundColor: _dataset['datasets'][1]['borderColor'],
                pointRadius: 0,
                pointHoverRadius: 0,
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
                  maxRotation: 0,
                  autoSkip: true,
                  maxTicksLimit: 10, // 限制最大显示的刻度数量
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
            // 添加滚动条和动态加载
            plugins: {
              zoom: {
                pan: {
                  enabled: true,
                  mode: 'x',
                },
                zoom: {
                  wheel: {
                    enabled: true,
                  },
                  pinch: {
                    enabled: true
                  },
                  mode: 'x',
                }
              },
             
            }
          },
        })
      }
    }
  }

  useEffect(() => {
    createChart(currentRange.current)
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [type, simplified])

  return (
    <div className="h-full flex flex-col">
      {!simplified && (
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <span className="text-xl font-bold text-blue-600 latest-value">103.45</span>
            <div className="flex items-center mt-1">
                <span className="change-icon">
                     <Minus className="h-4 w-4 text-gray-500 equal-icon"  />
                    <ArrowUpRight className="h-4 w-4 text-red-500 up-icon" />
                    <ArrowDownRight className="h-4 w-4 text-green-500 down-icon" /> 
                </span>
              <span
                className={`text-sm ml-1 change-value ${
                  changeMount.isNeutral ? "text-gray-500" : changeMount.isPositive ? "text-red-500" : "text-green-500"
                }`}
              >
                {changeMount.value}%
              </span>
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-500 max-value">最高: {maxValue.current}</div>
            <div className="text-sm text-gray-500 min-value">最低: {minValue.current}</div>
          </div>
        </div>
      )}

      <div className="flex-1 min-h-0">
        <canvas ref={chartRef} />
      </div>
    </div>
  )
}

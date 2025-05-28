import DashboardOverview from "@/components/dashboard-overview"

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">小站数据可视化概览</h1>
      <DashboardOverview />
    </div>
  )
}

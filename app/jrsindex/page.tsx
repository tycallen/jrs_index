import IndexChart from "@/components/index-chart"
import TimeRangeSelector from "@/components/time-range-selector"
import StatsCards from "@/components/stats-cards"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function IndexPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">小站指数分析</h1>
        <TimeRangeSelector />
      </div>

      <StatsCards />

      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <Tabs defaultValue="daily">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">回帖量趋势</h2>
            <TabsList>
              <TabsTrigger value="daily">日线</TabsTrigger>
              <TabsTrigger value="weekly">周线</TabsTrigger>
              <TabsTrigger value="monthly">月线</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="daily" className="h-[400px]">
            <IndexChart type="daily" />
          </TabsContent>

          <TabsContent value="weekly" className="h-[400px]">
            <IndexChart type="weekly" />
          </TabsContent>

          <TabsContent value="monthly" className="h-[400px]">
            <IndexChart type="monthly" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

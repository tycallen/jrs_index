import WordCloudChart from "@/components/wordcloud-chart"
import TimeRangeSelector from "@/components/time-range-selector"
import TrendingTopics from "@/components/trending-topics"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function WordCloudPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">词云分析(待开发...)</h1>
        <TimeRangeSelector />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <Tabs defaultValue="all">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">热门词云</h2>
            <TabsList>
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="positive">正面</TabsTrigger>
              <TabsTrigger value="negative">负面</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="h-[500px]">
            <WordCloudChart type="all" />
          </TabsContent>

          <TabsContent value="positive" className="h-[500px]">
            <WordCloudChart type="positive" />
          </TabsContent>

          <TabsContent value="negative" className="h-[500px]">
            <WordCloudChart type="negative" />
          </TabsContent>
        </Tabs>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">热门话题趋势</h2>
        <div className="h-[300px]">
          <TrendingTopics />
        </div>
      </div>
    </div>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import IndexChart from "./index-chart"
import SentimentChart from "./sentiment-chart"
import WordCloudChart from "./wordcloud-chart"
import StatsCards from "./stats-cards"

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center justify-between">
              小站指数趋势
              <Tabs defaultValue="daily" className="w-auto">
                <TabsList className="h-8">
                  <TabsTrigger value="daily" className="text-xs px-2 py-1">
                    日线
                  </TabsTrigger>
                  <TabsTrigger value="weekly" className="text-xs px-2 py-1">
                    周线
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <IndexChart type="daily" simplified />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">回帖情绪趋势</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <SentimentChart simplified />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">热门词云</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <WordCloudChart type="all" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

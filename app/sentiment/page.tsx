import SentimentChart from "@/components/sentiment-chart"
import SentimentDistribution from "@/components/sentiment-distribution"
import TimeRangeSelector from "@/components/time-range-selector"
import TopicSentiment from "@/components/topic-sentiment"

export default function SentimentPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">回帖情绪分析(待开发...)</h1>
        <TimeRangeSelector />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-4 md:p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">情绪趋势</h2>
          <div className="h-[350px]">
            <SentimentChart />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">情绪分布</h2>
          <div className="h-[350px]">
            <SentimentDistribution />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">主题情绪分析</h2>
        <div className="h-[300px]">
          <TopicSentiment />
        </div>
      </div>
    </div>
  )
}

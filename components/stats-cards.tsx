import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, Users, MessageSquare, Eye, TrendingUp } from "lucide-react"
import generalData from "../public/general_data.json"

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">活跃用户</CardTitle>
          <Users className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{generalData.active_users.weekly}</div>
          <div className={`flex items-center text-xs mt-1 ${generalData.active_users_change.weekly < 0 ? 'text-green-500' : 'text-red-500'}`}>
            {generalData.active_users_change.weekly > 0 ? (
              <ArrowUpRight className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDownRight className="h-3 w-3 mr-1" />
            )}
            <span>{generalData.active_users_change.weekly}% 较上周</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">回帖数量</CardTitle>
          <MessageSquare className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{generalData.replies.weekly}</div>
          <div className={`flex items-center text-xs mt-1 ${generalData.reply_change.weekly < 0 ? 'text-green-500' : 'text-red-500'}`}>
            {generalData.reply_change.weekly > 0 ? (
              <ArrowUpRight className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDownRight className="h-3 w-3 mr-1" />
            )}
            <span>{generalData.reply_change.weekly}% 较上周</span>
          </div>
        </CardContent>
      </Card>


      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">情绪指数（待开发...）</CardTitle>
          <TrendingUp className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">103.45</div>
          <div className="flex items-center text-xs text-green-500 mt-1">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            <span>2.8% 较上周</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

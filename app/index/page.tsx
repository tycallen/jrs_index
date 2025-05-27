import { Card } from "@/components/ui/card"

export default function IndexPage() {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">数据可视化原型展示</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2">首页概览</h2>
          <iframe src="/" className="w-full h-[600px] border rounded-lg" />
        </Card>

        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2">小站指数</h2>
          <iframe src="/jrsindex" className="w-full h-[600px] border rounded-lg" />
        </Card>

        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2">情绪分析</h2>
          <iframe src="/sentiment" className="w-full h-[600px] border rounded-lg" />
        </Card>

        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2">词云分析</h2>
          <iframe src="/wordcloud" className="w-full h-[600px] border rounded-lg" />
        </Card>

        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2">移动端预览</h2>
          <iframe src="/mobile-preview" className="w-full h-[600px] border rounded-lg" />
        </Card>
      </div>
    </div>
  )
}

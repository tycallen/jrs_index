import MobilePreview from "@/components/mobile-preview"

export default function MobilePreviewPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">移动端预览</h1>
      <p className="text-gray-600">以下是本应用在 iPhone 15 Pro 上的预览效果</p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <MobilePreview title="首页概览" path="/" />
        <MobilePreview title="小站指数" path="/jrsindex" />
        <MobilePreview title="情绪分析" path="/sentiment" />
        <MobilePreview title="词云分析" path="/wordcloud" />
      </div>
    </div>
  )
}

import type React from "react"
export default function IframeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className="bg-white">{children}</body>
    </html>
  )
}

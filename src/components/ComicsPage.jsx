import { Navigate } from 'react-router-dom'

// 已合并到医学可视化聚合页，旧 URL 自动跳转
export default function ComicsPage() {
  return <Navigate to="/medical-visualization#comics" replace />
}

import { useQuery } from '@tanstack/react-query'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getStats, getTrends } from '../services/api'
import { TrendingUp, FileCode, AlertCircle } from 'lucide-react'

export default function Analytics() {
  const { data: stats } = useQuery({
    queryKey: ['stats'],
    queryFn: getStats,
  })

  const { data: trends } = useQuery({
    queryKey: ['trends'],
    queryFn: getTrends,
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-2">Track your code quality metrics</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Total Reviews</span>
            <FileCode className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats?.total_reviews || 0}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Average Score</span>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats?.average_score || 0}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Total Issues</span>
            <AlertCircle className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats?.total_issues || 0}</p>
        </div>
      </div>

      {trends && trends.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Score Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="average_score" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {trends && trends.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-6">Review Activity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="review_count" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

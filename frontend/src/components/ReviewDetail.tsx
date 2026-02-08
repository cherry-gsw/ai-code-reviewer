import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getReview } from '../services/api'
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react'

export default function ReviewDetail() {
  const { id } = useParams()
  const { data: review, isLoading } = useQuery({
    queryKey: ['review', id],
    queryFn: () => getReview(Number(id)),
    refetchInterval: (data) => data?.status === 'processing' ? 2000 : false,
  })

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>
  }

  if (!review) {
    return <div className="text-center py-12">Review not found</div>
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'medium':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'low':
        return <Info className="w-5 h-5 text-blue-500" />
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{review.title}</h1>
        <div className="flex items-center space-x-4 mt-2">
          <span className="text-sm text-gray-600">{review.language}</span>
          <span className="text-sm text-gray-600">
            {new Date(review.created_at).toLocaleDateString()}
          </span>
          <span className={`text-sm px-3 py-1 rounded-full ${
            review.status === 'completed' ? 'bg-green-100 text-green-800' :
            review.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {review.status}
          </span>
        </div>
      </div>

      {review.status === 'processing' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800">Analysis in progress... This may take a few moments.</p>
        </div>
      )}

      {review.score !== null && (
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Overall Score</h2>
          <div className="flex items-center space-x-4">
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full ${
                  review.score >= 80 ? 'bg-green-500' :
                  review.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${review.score}%` }}
              />
            </div>
            <span className="text-2xl font-bold text-gray-900">{review.score}/100</span>
          </div>
        </div>
      )}

      {review.analysis && (
        <>
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <p className="text-gray-700">{review.analysis.summary}</p>
          </div>

          {review.analysis.strengths?.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span>Strengths</span>
              </h2>
              <ul className="space-y-2">
                {review.analysis.strengths.map((strength: string, idx: number) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {review.analysis.issues?.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Issues Found</h2>
              <div className="space-y-4">
                {review.analysis.issues.map((issue: any, idx: number) => (
                  <div key={idx} className="border-l-4 border-gray-200 pl-4 py-2">
                    <div className="flex items-start space-x-3">
                      {getSeverityIcon(issue.severity)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">{issue.category}</span>
                          {issue.line_number && (
                            <span className="text-sm text-gray-500">Line {issue.line_number}</span>
                          )}
                        </div>
                        <p className="text-gray-700 mb-2">{issue.message}</p>
                        {issue.suggestion && (
                          <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                            💡 {issue.suggestion}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-4">Code</h2>
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <code>{review.code}</code>
        </pre>
      </div>
    </div>
  )
}

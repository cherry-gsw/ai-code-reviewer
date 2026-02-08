import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { FileCode, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { getReviews } from '../services/api'

export default function Dashboard() {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: getReviews,
  })

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Code Reviews</h1>
        <p className="text-gray-600 mt-2">View and manage your code reviews</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews?.map((review: any) => (
          <Link
            key={review.id}
            to={`/review/${review.id}`}
            className="bg-white rounded-lg shadow-sm border hover:shadow-md transition p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <FileCode className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-gray-500">{review.language}</span>
              </div>
              {review.status === 'completed' ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : review.status === 'processing' ? (
                <Clock className="w-5 h-5 text-yellow-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-gray-400" />
              )}
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">{review.title}</h3>
            
            {review.score !== null && (
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      review.score >= 80 ? 'bg-green-500' :
                      review.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${review.score}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">{review.score}</span>
              </div>
            )}

            <div className="text-sm text-gray-500">
              {new Date(review.created_at).toLocaleDateString()}
            </div>
          </Link>
        ))}
      </div>

      {reviews?.length === 0 && (
        <div className="text-center py-12">
          <FileCode className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
          <p className="text-gray-600 mb-4">Create your first code review to get started</p>
          <Link
            to="/new"
            className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Create Review
          </Link>
        </div>
      )}
    </div>
  )
}

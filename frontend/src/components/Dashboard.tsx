import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { FileCode, Clock, CheckCircle, AlertCircle, Sparkles, ArrowRight } from 'lucide-react'
import { getReviews } from '../services/api'

export default function Dashboard() {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: getReviews,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#1F3A2C] border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-12">
        <div className="flex items-center space-x-3 mb-4">
          <Sparkles className="w-8 h-8 text-[#8B7355]" />
          <h1 className="text-5xl font-bold text-[#1F3A2C]">Your Code Reviews</h1>
        </div>
        <p className="text-xl text-[#2D5240]/70">AI-powered insights for better code quality</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews?.map((review: any) => (
          <Link
            key={review.id}
            to={`/review/${review.id}`}
            className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-[#E8E1D3] hover:border-[#8B7355] transform hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-[#1F3A2C] to-[#2D5240] rounded-xl">
                  <FileCode className="w-6 h-6 text-[#F5F1E8]" />
                </div>
                <span className="text-sm font-semibold text-[#8B7355] uppercase tracking-wide">{review.language}</span>
              </div>
              {review.status === 'completed' ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : review.status === 'processing' ? (
                <Clock className="w-6 h-6 text-yellow-600 animate-pulse" />
              ) : (
                <AlertCircle className="w-6 h-6 text-gray-400" />
              )}
            </div>

            <h3 className="text-2xl font-bold text-[#1F3A2C] mb-4 group-hover:text-[#2D5240] transition-colors">{review.title}</h3>
            
            {review.score !== null && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#2D5240]">Quality Score</span>
                  <span className="text-2xl font-bold text-[#1F3A2C]">{review.score}</span>
                </div>
                <div className="h-3 bg-[#E8E1D3] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      review.score >= 80 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                      review.score >= 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 
                      'bg-gradient-to-r from-red-500 to-red-600'
                    }`}
                    style={{ width: `${review.score}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-sm text-[#2D5240]/60">
              <span>{new Date(review.created_at).toLocaleDateString()}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {reviews?.length === 0 && (
        <div className="text-center py-20">
          <div className="inline-block p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl mb-6">
            <FileCode className="w-20 h-20 text-[#8B7355] mx-auto" />
          </div>
          <h3 className="text-3xl font-bold text-[#1F3A2C] mb-4">No reviews yet</h3>
          <p className="text-xl text-[#2D5240]/70 mb-8">Start your first code review to see AI-powered insights</p>
          <Link
            to="/new"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#1F3A2C] to-[#2D5240] text-[#F5F1E8] px-8 py-4 rounded-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 font-semibold text-lg"
          >
            <Sparkles className="w-5 h-5" />
            <span>Create Your First Review</span>
          </Link>
        </div>
      )}
    </div>
  )
}

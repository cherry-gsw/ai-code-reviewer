import { Link } from 'react-router-dom'
import { Code2, Sparkles, TrendingUp } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-[#1F3A2C] to-[#2D5240] border-b border-[#8B7355]/20 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Code2 className="w-10 h-10 text-[#F5F1E8] group-hover:text-[#8B7355] transition-colors" />
              <Sparkles className="w-4 h-4 text-[#8B7355] absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="text-2xl font-bold text-[#F5F1E8] tracking-tight">AI Code Reviewer</span>
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-[#F5F1E8]/80 hover:text-[#F5F1E8] transition-colors font-medium">
              Reviews
            </Link>
            <Link to="/analytics" className="flex items-center space-x-2 text-[#F5F1E8]/80 hover:text-[#F5F1E8] transition-colors font-medium">
              <TrendingUp className="w-4 h-4" />
              <span>Analytics</span>
            </Link>
            <Link 
              to="/new" 
              className="flex items-center space-x-2 bg-[#8B7355] text-[#F5F1E8] px-6 py-3 rounded-lg hover:bg-[#8B7355]/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" />
              <span className="font-semibold">New Review</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

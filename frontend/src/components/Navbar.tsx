import { Link } from 'react-router-dom'
import { Code2, BarChart3, Plus } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-gray-900">AI Code Review</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary transition">
              Reviews
            </Link>
            <Link to="/analytics" className="flex items-center space-x-1 text-gray-700 hover:text-primary transition">
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </Link>
            <Link 
              to="/new" 
              className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              <Plus className="w-4 h-4" />
              <span>New Review</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

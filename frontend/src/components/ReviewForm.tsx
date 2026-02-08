import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { createReview } from '../services/api'
import { Send } from 'lucide-react'

export default function ReviewForm() {
  const [title, setTitle] = useState('')
  const [language, setLanguage] = useState('python')
  const [code, setCode] = useState('')
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createReview,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
      navigate(`/review/${data.id}`)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({ title, language, code })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">New Code Review</h1>
        <p className="text-gray-600 mt-2">Submit your code for AI-powered analysis</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="e.g., User Authentication Module"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="java">Java</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
            <option value="cpp">C++</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Code
          </label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
            rows={20}
            placeholder="Paste your code here..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
          <span>{mutation.isPending ? 'Analyzing...' : 'Submit for Review'}</span>
        </button>
      </form>
    </div>
  )
}

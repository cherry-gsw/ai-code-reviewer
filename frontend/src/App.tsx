import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Dashboard from './components/Dashboard'
import ReviewForm from './components/ReviewForm'
import ReviewDetail from './components/ReviewDetail'
import Analytics from './components/Analytics'
import Navbar from './components/Navbar'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-[#F5F1E8] via-[#E8E1D3] to-[#F5F1E8]">
          <Navbar />
          <main className="container mx-auto px-4 py-12">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/new" element={<ReviewForm />} />
              <Route path="/review/:id" element={<ReviewDetail />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App

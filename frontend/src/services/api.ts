import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

export const getReviews = async () => {
  const { data } = await api.get('/reviews/')
  return data
}

export const getReview = async (id: number) => {
  const { data } = await api.get(`/reviews/${id}`)
  return data
}

export const createReview = async (reviewData: {
  title: string
  language: string
  code: string
}) => {
  const { data } = await api.post('/reviews/', reviewData)
  return data
}

export const getStats = async () => {
  const { data } = await api.get('/analytics/stats')
  return data
}

export const getTrends = async () => {
  const { data } = await api.get('/analytics/trends')
  return data
}

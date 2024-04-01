import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchProducts = async (projectId) => {
  const res = await axios.get('https://42c56e69edd041d8afddac6929f0ea8b.api.mockbin.io/')
  return res.data.data
}

export const useFetch = (projectId) => {
  return useQuery({
    queryKey: ['projects', projectId],
    queryFn: async () => {
      return fetchProducts(projectId)
    },
  })
}

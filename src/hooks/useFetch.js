import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchProducts = async (projectId) => {
  const res = await axios.get('https://42c56e69edd041d8afddac6929f0ea8b.api.mockbin.io/')
  return res.data.data
}

const fetchContracts = async (contractId) => {
  const res = await axios.get('https://2b3570b8072a44e09ce5b5a80a4c8012.api.mockbin.io/')
  return res.data.data
}

export const useFetchProyects = (projectId) => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      return fetchProducts(projectId)
    },
  })
}

export const useFetchContract = (contractId) => {
  return useQuery({
    queryKey: ['contracts'],
    queryFn: async () => {
      return fetchContracts(contractId)
    },
  })
}

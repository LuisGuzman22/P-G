import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchProducts = async (projectId) => {
  const res = await axios.get('https://pyg-production.up.railway.app/api/v1/projects')
  return res.data.data
}

const fetchUsers = async () => {
  const res = await axios.get('https://b4b07e25f42d4135b6fc3791a6e1d1f8.api.mockbin.io/')
  return res.data.data
}

const fetchContracts = async (contractId) => {
  const res = await axios.get('https://2b3570b8072a44e09ce5b5a80a4c8012.api.mockbin.io/')
  return res.data.data
}

const fetchBasicData = async (contractId) => {
  const res = await axios.get('https://ad66ae1fb4124d5d84a95b384d69a128.api.mockbin.io/')
  return res.data.data
}

export const fetchReportsData = async () => {
  const res = await axios.get('https://pyg-production.up.railway.app/api/v1/reports')
  return res.data.data
}

const userType = localStorage.getItem('USER_TYPE')

export const useFetchProyects = (projectId) => {
  return useQuery({
    queryKey: ['projects'],
    refetchType: 'all',
    // refetchInterval: 10000,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      return fetchProducts(projectId)
    },
  })
}

export const useFetchContract = (contractId) => {
  return useQuery({
    queryKey: ['contracts'],
    refetchType: 'all',
    queryFn: async () => {
      return fetchContracts(contractId)
    },
  })
}

export const useFetchBasicData = (contractId) => {
  return useQuery({
    queryKey: ['basics'],
    staleTime: 0,
    gcTime: 2147483647,
    refetchType: 'all',
    queryFn: async () => {
      return fetchBasicData(contractId)
    },
  })
}

export const useFetchUserList = () => {
  return useQuery({
    queryKey: ['users'],
    refetchType: 'all',
    queryFn: async () => {
      return fetchUsers()
    },
  })
}

export const useFetchReportsData = () => {
  return useQuery({
    queryKey: ['reports'],
    staleTime: 0,
    gcTime: 2147483647,
    refetchType: 'all',
    queryFn: async () => {
      return fetchReportsData()
    },
  })
}

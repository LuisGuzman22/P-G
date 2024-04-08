import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchProducts = async (projectId) => {
  const res = await axios.get('https://42c56e69edd041d8afddac6929f0ea8b.api.mockbin.io/')
  return res.data.data
}

const fetchUsers = async () => {
  const res = await axios.get('https://b4b07e25f42d4135b6fc3791a6e1d1f8.api.mockbin.io/')
  console.log('res.data.data', res.data.data)
  return res.data.data
}

const fetchContracts = async (contractId) => {
  const res = await axios.get('https://2b3570b8072a44e09ce5b5a80a4c8012.api.mockbin.io/')
  return res.data.data
}

const fetchBasicData = async (contractId) => {
  const res = await axios.get('https://07a397da689a439a8a9f86b1df79836e.api.mockbin.io/')
  return res.data.data
}

export const useFetchProyects = (projectId) => {
  return useQuery({
    queryKey: ['projects'],
    refetchType: 'all',
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

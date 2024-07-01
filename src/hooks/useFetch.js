import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchProducts = async (projectId) => {
  let url = `${process.env.REACT_APP_BASE_URL}api/v1/projects`
  const company_id = localStorage.getItem('company_user')
  if (company_id !== undefined && company_id !== null && company_id !== 'null') {
    url = url + `/search?company_id=${company_id}`
  }
  const res = await axios.get(url, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
  return res.data.data
}

const fetchUsers = async () => {
  const res = await axios.get(`https://b4b07e25f42d4135b6fc3791a6e1d1f8.api.mockbin.io/`)
  return res.data.data
}

const fetchContracts = async (contractId) => {
  const res = await axios.get(`https://2b3570b8072a44e09ce5b5a80a4c8012.api.mockbin.io/`)
  return res.data.data
}

const fetchBasicData = async (contractId) => {
  const res = await axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/basicData`, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
  return res.data.data
}

const fetchTrisemanalData = async () => {
  const res = await axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/clusters`, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
  return res.data.data
}

const testToken = async () => {
  const res = await axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/test`, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
  return res.data.data
}

const fetchMachinery = async () => {
  const res = await axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/machineries`, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
  return res.data.data
}

// export const fetchReportsData = async () => {
//   // const res = await axios.get(
//   //   `https://mpm.pgproject.cl/api/v1/reports/search?contract_id=${contractId}&project_id=${projectId}`,
//   //   {
//   const res = await axios.get(`https://mpm.pgproject.cl/api/v1/reports`, {
//     headers: {
//       Authorization: 'Bearer ' + localStorage.getItem('token'),
//     },
//   })
//   return res.data.data
// }

export const fetchReportsData = async (contractId, projectId) => {
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}api/v1/reports/search?contract_id=${contractId}&project_id=${projectId}`,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    },
  )
  return res.data.data
}

export const fetchReportDataByReportId = async (reportId) => {
  const res = await axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/reports/${reportId}`, {
    // const res = await axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/reports`, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
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

// export const useFetchReportsData = () => {
//   return useQuery({
//     queryKey: ['reports'],
//     staleTime: 0,
//     gcTime: 2147483647,
//     refetchType: 'all',
//     queryFn: async () => {
//       return fetchReportsData()
//     },
//   })
// }

export const useFetchReportsData = (contractId, projectId) => {
  return useQuery({
    queryKey: ['reports'],
    staleTime: 0,
    gcTime: 2147483647,
    refetchType: 'all',
    queryFn: async () => {
      return fetchReportsData(contractId, projectId)
    },
  })
}

export const useFetchReportData = () => {
  const reportId = localStorage.getItem('daily_report')
  return useQuery({
    queryKey: ['selectedReport'],
    staleTime: 0,
    gcTime: 2147483647,
    refetchType: 'all',
    queryFn: async () => {
      return reportId && reportId !== 'undefined' ? fetchReportDataByReportId(reportId) : undefined
    },
  })
}

export const useFetchTrisemanalData = () => {
  return useQuery({
    queryKey: ['trisemanal'],
    staleTime: 0,
    gcTime: 2147483647,
    refetchType: 'all',
    queryFn: async () => {
      return fetchTrisemanalData()
    },
  })
}

export const useFetchMachinery = () => {
  return useQuery({
    queryKey: ['machinery'],
    refetchType: 'all',
    // refetchInterval: 10000,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      return fetchMachinery()
    },
  })
}

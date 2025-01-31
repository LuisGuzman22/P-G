import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchProyects = async (projectId) => {
  let url = `${process.env.REACT_APP_BASE_URL}api/v1/projects`
  // const company_id = localStorage.getItem('company_user')
  // if (company_id !== undefined && company_id !== null && company_id !== 'null') {
  //   url = url + `/search?company_id=${company_id}`
  // }
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
  const res = await axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/contracts`)
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

const fetchTrisemanalData = async (planningId) => {
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}api/v1/clusters?planning_id=${planningId}`,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    },
  )
  return res.data.data
}

const fetchPlanninglData = async (projectId, contractId) => {
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}api/v1/plannings/search?contract_id=${contractId}&project_id=${projectId}`,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    },
  )
  return res.data.data
}

const fetchActivityData = async (projectId, contractId) => {
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}api/v1/activities/search?contract_id=${contractId}&project_id=${projectId}`,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    },
  )
  return res.data.data
}

const fetchActivityDataPerPrimaveraId = async (projectId, contractId, primaveraId) => {
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}api/v1/activities/search?contract_id=${contractId}&project_id=${projectId}&id_primavera=${primaveraId}`,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    },
  )
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
  const res = await axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/machineries-with-trashed`, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
  return res.data.data
}

const fetchVehicle = async () => {
  const res = await axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/vehicles-with-trashed`, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
  return res.data.data
}

const fetchEquipment = async () => {
  const res = await axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/equipments-with-trashed`, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
  return res.data.data
}

const fetchRestriction = async () => {
  const res = await axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/restrictions`, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
  return res.data.data
}

const fetchUser = async () => {
  const res = await axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/users`, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
  return res.data.data
}

const fetchDirectPersonal = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}api/v1/indirect-personals-with-trashed`,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    },
  )
  return res.data.data
}

const fetchIndirectPersonal = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}api/v1/indirect-personals-with-trashed`,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    },
  )
  return res.data.data
}

const fetchAljibe = async () => {
  const res = await axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/waterTrucks-with-trashed`, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
  return res.data.data
}

const fetchTechnicalDocumentation = async (projectId, contractId) => {
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}api/v1/documentation/getTechnicalDocumentationUrls/${projectId}/${contractId}`,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    },
  )
  return res.data.data
}

const fetchTechnicalDocumentationCategories = async (projectId, contractId) => {
  const res = await axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/categories`, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
  return res.data.data
}

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
  console.log('fetchReportDataByReportId', res.data.data)
  return res.data.data
}

const fetchCompany = async () => {
  const res = await axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/companies`, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
  return res.data.data
}

const fetchGantt = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}api/v1/activities/gantt?start_date=2024-01-01&end_date=2024-12-12`,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    },
  )
  return res.data
}

const fetchSChart = async (contractId, projectId) => {
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}api/v1/projects/curvaS/${projectId}/${contractId}`,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    },
  )
  return res.data
}

const fetchGeneralProgress = async (contractId, projectId) => {
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}api/v1/projects/generalAdvance/${projectId}/${contractId}`,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    },
  )
  return res.data
}

const userType = localStorage.getItem('USER_TYPE')

export const useFetchProyects = (projectId) => {
  return useQuery({
    queryKey: ['projects'],
    // refetchType: 'all',
    // refetchInterval: 10000,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      return fetchProyects(projectId)
    },
  })
}

export const useFetchContract = (contractId) => {
  return useQuery({
    queryKey: ['contracts'],
    // refetchType: 'all',
    queryFn: async () => {
      return fetchContracts(contractId)
    },
  })
}

export const useFetchBasicData = (contractId) => {
  return useQuery({
    queryKey: ['basics'],
    staleTime: 1000 * 60 * 60,
    gcTime: 2147483647,
    // refetchType: 'all',
    queryFn: async () => {
      return fetchBasicData(contractId)
    },
  })
}

export const useFetchUserList = () => {
  return useQuery({
    queryKey: ['users'],
    // refetchType: 'all',
    queryFn: async () => {
      return fetchUsers()
    },
  })
}

// export const useFetchReportsData = () => {
//   return useQuery({
//     queryKey: ['reports'],
//     staleTime: 1000 * 60 * 60,
//     gcTime: 2147483647,
//     // refetchType: 'all',
//     queryFn: async () => {
//       return fetchReportsData()
//     },
//   })
// }

export const useFetchReportsData = (contractId, projectId) => {
  return useQuery({
    queryKey: ['reports'],
    staleTime: 1000 * 60 * 60,
    gcTime: 2147483647,
    // refetchType: 'all',
    queryFn: async () => {
      return fetchReportsData(contractId, projectId)
    },
  })
}

export const useFetchReportData = () => {
  const reportId = localStorage.getItem('daily_report')
  console.log('reportId', reportId)
  return useQuery({
    queryKey: ['selectedReport'],
    staleTime: 1000 * 60 * 60,
    gcTime: 2147483647,
    // refetchType: 'all',
    queryFn: async () => {
      return reportId && reportId !== 'undefined' ? fetchReportDataByReportId(reportId) : undefined
    },
  })
}

export const useFetchPlanningData = (projectId, contractId) => {
  return useQuery({
    queryKey: ['planning'],
    staleTime: 1000 * 60 * 60,
    gcTime: 2147483647,
    // refetchType: 'all',
    queryFn: async () => {
      return fetchPlanninglData(projectId, contractId)
    },
  })
}

export const useFetchTrisemanalData = (planningId) => {
  return useQuery({
    queryKey: ['trisemanal'],
    staleTime: 1000 * 60 * 60,
    gcTime: 2147483647,
    // refetchType: 'all',
    queryFn: async () => {
      return fetchTrisemanalData(planningId)
    },
  })
}

export const useFetchMachinery = () => {
  return useQuery({
    queryKey: ['machinery'],
    // refetchType: 'all',
    // refetchInterval: 10000,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      return fetchMachinery()
    },
  })
}

export const useFetchVehicle = () => {
  return useQuery({
    queryKey: ['vehicle'],
    // refetchType: 'all',
    // refetchInterval: 10000,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      return fetchVehicle()
    },
  })
}

export const useFetchEquipment = () => {
  return useQuery({
    queryKey: ['equipment'],
    // refetchType: 'all',
    // refetchInterval: 10000,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      return fetchEquipment()
    },
  })
}

export const useFetchRestriction = () => {
  return useQuery({
    queryKey: ['restriction'],
    // refetchType: 'all',
    // refetchInterval: 10000,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      return fetchRestriction()
    },
  })
}

export const useFetchDirectPersonal = () => {
  return useQuery({
    queryKey: ['direct-personal'],
    // refetchType: 'all',
    // refetchInterval: 10000,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      return fetchDirectPersonal()
    },
  })
}

export const useFetchIndirectPersonal = () => {
  return useQuery({
    queryKey: ['indirect-personal'],
    // refetchType: 'all',
    // refetchInterval: 10000,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      return fetchIndirectPersonal()
    },
  })
}

export const useFetchAljibe = () => {
  return useQuery({
    queryKey: ['aljibe'],
    // refetchType: 'all',
    // refetchInterval: 10000,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      return fetchAljibe()
    },
  })
}

export const useFetchGetTechnicalDocumentation = (projectId, contractId) => {
  return useQuery({
    queryKey: ['technical-documentation'],
    // refetchType: 'all',
    // refetchInterval: 10000,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      return fetchTechnicalDocumentation(projectId, contractId)
    },
  })
}

export const useFetchGetTechnicalDocumentationCategories = (projectId, contractId) => {
  return useQuery({
    queryKey: ['technical-documentation-categories'],
    // refetchType: 'all',
    // refetchInterval: 10000,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      return fetchTechnicalDocumentationCategories(projectId, contractId)
    },
  })
}

export const useFetchUser = () => {
  return useQuery({
    queryKey: ['user'],
    // refetchType: 'all',
    // refetchInterval: 10000,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      return fetchUser()
    },
  })
}

export const useFetchCompany = () => {
  return useQuery({
    queryKey: ['company'],
    // refetchType: 'all',
    // refetchInterval: 10000,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      return fetchCompany()
    },
  })
}

export const useFetchActivityData = (projectId, contractId) => {
  return useQuery({
    queryKey: ['activities'],
    staleTime: 1000 * 60 * 60,
    gcTime: 2147483647,
    // refetchType: 'all',
    queryFn: async () => {
      return fetchActivityData(projectId, contractId)
    },
  })
}

export const useFetchActivityDataPerPrimaveraId = (projectId, contractId, primaveraId) => {
  return useQuery({
    queryKey: ['primavera-activity'],
    staleTime: 1000 * 60 * 60,
    gcTime: 2147483647,
    // refetchType: 'all',
    queryFn: async () => {
      return fetchActivityDataPerPrimaveraId(projectId, contractId, primaveraId)
    },
  })
}

export const useFetchGant = () => {
  return useQuery({
    queryKey: ['gantt-chart'],
    // refetchType: 'all',
    // refetchInterval: 10000,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      return fetchGantt()
    },
  })
}

export const useFetchSChart = (projectId, contractId) => {
  return useQuery({
    queryKey: ['s-chart'],
    // refetchType: 'all',
    // refetchInterval: 10000,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      return fetchSChart(projectId, contractId)
    },
  })
}

export const useFetchGeneralProgress = (projectId, contractId) => {
  return useQuery({
    queryKey: ['general-progress-chart'],
    // refetchType: 'all',
    // refetchInterval: 10000,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      return fetchGeneralProgress(projectId, contractId)
    },
  })
}

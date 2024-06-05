// import { useState } from 'react'
// import { useFetchReportsData } from './useFetch'
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
// import axios from 'axios'

// const useGetReportsData = () => {
//   const [error, setError] = useState()
//   const [isError, setIsError] = useState(false)
//   const queryClient = useQueryClient()

//   const fetchReportsData = async () => {
//     const res = await axios.get('https://mpm.pgproject.cl/api/v1/reports')
//     return res.data.data
//   }

//   const getData = () => {
//     return useQuery({
//       queryKey: ['reports'],
//       staleTime: 0,
//       gcTime: 2147483647,
//       refetchType: 'all',
//       queryFn: async () => {
//         return fetchReportsData()
//       },
//     })
//   }

//   return { getData }
// }

// export default useGetReportsData

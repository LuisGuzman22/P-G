import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import useRegisterGeneralData from './useRegisterGeneralData'
import { useState } from 'react'

const useGetActivityDataPerPrimaveraId = () => {
  const { getProject, getContract } = useRegisterGeneralData()
  const queryClient = useQueryClient()

  const projectLS = JSON.parse(getProject())
  const contractLS = JSON.parse(getContract())

  const [isLoading, setIsLoading] = useState(false)

  const mutation = useMutation({
    mutationFn: async (primaveraId) => {
      const primaveraIdQuery = primaveraId ? `&id_primavera=${primaveraId}` : ''
      setIsLoading(true)
      return await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/v1/activities/search?contract_id=${contractLS.id}&project_id=${projectLS.id}${primaveraIdQuery}`,
      )
    },
    onSuccess: (suc) => {
      setIsLoading(false)
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
    onError: (err) => {
      setIsLoading(false)
      return false
    },
  })

  const getActivity = async (primaveraId) => {
    const response = await mutation.mutate(primaveraId)
    return response
  }

  return {
    getActivity, // Función para ejecutar la consulta
    isLoading,
    error: mutation.error,
    activityData: mutation.data, // Resultado de la consulta
  }
}

export default useGetActivityDataPerPrimaveraId

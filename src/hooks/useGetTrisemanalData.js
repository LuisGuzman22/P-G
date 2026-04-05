import { useState } from 'react'
import { useFetchPlanningData, useFetchTrisemanalData } from './useFetch'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import useRegisterGeneralData from './useRegisterGeneralData'

const useGetTrisemanalData = () => {
  const [success, setSuccess] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMutate, setErrorMutate] = useState()
  const queryClient = useQueryClient()
  const { getProject, getContract } = useRegisterGeneralData()

  const projectLS = JSON.parse(getProject())
  const contractLS = JSON.parse(getContract())

  const {
    data: planningData,
    isLoading: loadingPlanning,
    error: errorPlanning,
  } = useFetchPlanningData(projectLS.id, contractLS.id)

  const {
    data,
    isLoading: loadingTrisemanal,
    error: errorTrisemanal,
  } = useFetchTrisemanalData(planningData ? planningData[0]?.id : 0)

  const registerMutation = useMutation({
    mutationFn: async (newTodo) => {
      return await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/v1/trisemanal/upload-trisemanal/${projectLS.id}/${contractLS.id}`,
        newTodo,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        },
      )
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['trisemanal'] })
      queryClient.invalidateQueries({ queryKey: ['planning'] })
      setSuccess(suc.data.message)
      setIsLoading(false)

      return suc
    },
    onError: (err) => {
      queryClient.invalidateQueries({ queryKey: ['trisemanal'] })
      queryClient.invalidateQueries({ queryKey: ['planning'] })
      setErrorMutate('Error subir trisemanal')
      setIsLoading(false)

      return false
    },
  })

  const uploadTrisemanal = (data) => {
    setIsLoading(true)
    const response = registerMutation.mutate({ file: data })
    return response
  }

  return {
    data,
    errorMutate,
    success,
    isLoading,
    loadingTrisemanal,
    errorTrisemanal,
    uploadTrisemanal,
    loadingPlanning,
    loadingTrisemanal,
  }
}

export default useGetTrisemanalData

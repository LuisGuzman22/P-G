import { useState } from 'react'
import { useFetchPlanningData, useFetchTrisemanalData } from './useFetch'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { HttpStatusCode } from 'axios'
import useRegisterGeneralData from './useRegisterGeneralData'

const useGetTrisemanalData = () => {
  const [error, setError] = useState()
  const [isError, setIsError] = useState(false)
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
          },
        },
      )
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['trisemanal'] })
      queryClient.invalidateQueries({ queryKey: ['planning'] })
    },
    onError: (err) => {
      queryClient.invalidateQueries({ queryKey: ['trisemanal'] })
      queryClient.invalidateQueries({ queryKey: ['planning'] })
      setErrorMutate('Error subir trisemanal')
      setIsError(true)
      return false
    },
  })

  const uploadTrisemanal = (data) => {
    setIsError(false)
    const response = registerMutation.mutate({ file: data })
    return response
  }

  return {
    data,
    errorMutate,
    loadingTrisemanal,
    errorTrisemanal,
    uploadTrisemanal,
    loadingPlanning,
    loadingTrisemanal,
  }
}

export default useGetTrisemanalData

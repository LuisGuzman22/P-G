import { useState } from 'react'
import { useFetchTrisemanalData } from './useFetch'
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

  const { data, isLoading: loadingTrisemanal, error: errorTrisemanal } = useFetchTrisemanalData()

  const registerMutation = useMutation({
    mutationFn: async (newTodo) => {
      return await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}api/v1/trisemanal/upload-trisemanal/${projectLS.id}/${contractLS.id}`,
          newTodo,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        .then((res) => {
          if (res.status === HttpStatusCode.Created) {
            setIsError(false)
            return res.ok
          } else {
            setErrorMutate('Error al registrar proyecto')
            setIsError(true)
            return false
          }
        })
        .catch((err) => {
          setErrorMutate('Error al registrar proyecto')
          setIsError(true)
          return false
        })
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['technical-documentation'] })
    },
    onError: (err) => {
      setErrorMutate('Error al registrar proyecto')
      setIsError(true)
      return false
    },
  })

  const uploadTrisemanal = (data) => {
    setIsError(false)
    const response = registerMutation.mutate(data)
    return response
  }

  return { data, loadingTrisemanal, errorTrisemanal, uploadTrisemanal }
}

export default useGetTrisemanalData

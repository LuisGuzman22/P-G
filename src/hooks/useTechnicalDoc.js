import { useState } from 'react'
import { useFetchGetTechnicalDocumentation, useFetchVehicle } from './useFetch'
import axios, { HttpStatusCode } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useRegisterGeneralData from './useRegisterGeneralData'

const useTechnicalDoc = () => {
  const [errorMutate, setErrorMutate] = useState()
  const [isError, setIsError] = useState(false)
  const queryClient = useQueryClient()
  const { getProject, getContract } = useRegisterGeneralData()

  const projectLS = JSON.parse(getProject())
  const contractLS = JSON.parse(getContract())

  const { data, isLoading, error, refetch, isRefetching } = useFetchGetTechnicalDocumentation(
    projectLS.id,
    contractLS.id,
  )

  const registerMutation = useMutation({
    mutationFn: async (newTodo) => {
      return await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}api/v1/documentation/uploadTechnicalDocumentation/${projectLS.id}/${contractLS.id}`,
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

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axios
        .delete(
          `${process.env.REACT_APP_BASE_URL}api/v1/documentation/deleteTechnicalDocumentation/${projectLS.id}/${contractLS.id}`,
          { data: { media_ids: [id] } },
        )
        .then((res) => {
          if (res.status === HttpStatusCode.Created) {
            setIsError(false)
            return res.ok
          } else {
            setErrorMutate('Error al registrar documento')
            setIsError(true)
            return false
          }
        })
        .catch((err) => {
          setErrorMutate('Error al registrar documento')
          setIsError(true)
          return false
        })
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['technical-documentation'] })
    },
    onError: (err) => {
      setErrorMutate('Error al registrar documento')
      setIsError(true)
      return false
    },
  })

  const register = (data) => {
    setIsError(false)
    const response = registerMutation.mutate(data)
    return response
  }

  const deleteVehicle = (data) => {
    console.log('data', data)
    setIsError(false)
    const response = deleteMutation.mutate(data)
    return response
  }

  return {
    register,
    errorMutate,
    isError,
    data,
    isLoading,
    error,
    refetch,
    isRefetching,
    deleteVehicle,
  }
}

export default useTechnicalDoc

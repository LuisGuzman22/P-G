import { useState } from 'react'
import {
  useFetchGetCarousel,
  useFetchGetTechnicalDocumentation,
  useFetchGetTechnicalDocumentationCategories,
  useFetchVehicle,
} from './useFetch'
import axios, { HttpStatusCode } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useRegisterGeneralData from './useRegisterGeneralData'

const useCarousel = () => {
  const [errorMutate, setErrorMutate] = useState()
  const [isError, setIsError] = useState(false)
  const queryClient = useQueryClient()
  const { getProject, getContract } = useRegisterGeneralData()

  const projectLS = JSON.parse(getProject())
  const contractLS = JSON.parse(getContract())

  const { data, isLoading, error, refetch, isRefetching } = useFetchGetCarousel(projectLS.id)

  const registerMutation = useMutation({
    mutationFn: async (newTodo) => {
      return await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/v1/carrusel/uploadCarousel/${projectLS.id}`,
        newTodo,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
    },
    onSuccess: (suc) => {
      console.log('suc', suc)
      queryClient.invalidateQueries({ queryKey: ['carousel'] })
    },
    onError: (err) => {
      console.log('err', err)
      setErrorMutate('Error al registrar proyecto')
      setIsError(true)
      return false
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axios.delete(
        `${process.env.REACT_APP_BASE_URL}api/v1/carrusel/deleteCarousel/${projectLS.id}`,
        { data: { media_ids: [id] } },
      )
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['carousel'] })
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

  const deleteDoc = (data) => {
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
    deleteDoc,
  }
}

export default useCarousel

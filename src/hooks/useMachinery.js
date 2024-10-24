import { useState } from 'react'
import { useFetchMachinery } from './useFetch'
import axios, { HttpStatusCode } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useMachinery = () => {
  const { data, isLoading, error, refetch, isRefetching } = useFetchMachinery()

  const [errorMutate, setErrorMutate] = useState()
  const [isError, setIsError] = useState(false)
  const queryClient = useQueryClient()
  const [errorMessage, setErrorMessage] = useState()

  const registerMutation = useMutation({
    mutationFn: async (newTodo) => {
      return await axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/machineries`, newTodo)
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['machinery'] })
      setErrorMessage([])
    },
    onError: (err) => {
      setErrorMessage(Object.values(err.response.data.errors).flat())
      setErrorMutate('Error al registrar maquinaria')
      setIsError(true)
      return false
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axios.delete(`${process.env.REACT_APP_BASE_URL}api/v1/machineries/${id}`)
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['machinery'] })
      setErrorMessage([])
    },
    onError: (err) => {
      setErrorMutate('Error al registrar maquinaria')
      setErrorMessage(Object.values(err.response.data.errors).flat())
      setIsError(true)
      return false
    },
  })

  const mutationUpdate = useMutation({
    mutationFn: async (newTodo) => {
      return await axios.put(
        `${process.env.REACT_APP_BASE_URL}api/v1/machineries/${newTodo.id}`,
        newTodo,
      )
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['machinery'] })
      setErrorMessage([])
    },
    onError: (err) => {
      setErrorMutate('Error al actualizar maquinaria')
      setErrorMessage(Object.values(err.response.data.errors).flat())
      setIsError(true)
      return false
    },
  })

  const mutationRestore = useMutation({
    mutationFn: async (newTodo) => {
      return await axios.patch(
        `${process.env.REACT_APP_BASE_URL}api/v1/machineries/${newTodo}/restore`,
      )
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['machinery'] })
      setErrorMessage([])
    },
    onError: (err) => {
      setErrorMutate('Error al actualizar maquinaria')
      setErrorMessage(Object.values(err.response.data.errors).flat())
      setIsError(true)
      return false
    },
  })

  const register = (data) => {
    setIsError(false)
    const response = registerMutation.mutate(data)
    return response
  }

  const deleteMachinery = (id) => {
    setIsError(false)
    const response = deleteMutation.mutate(id)
    return response
  }

  const updateMachinery = (data) => {
    setIsError(false)
    const response = mutationUpdate.mutate(data)
    return response
  }

  const restoreMachinery = (data) => {
    setIsError(false)
    const response = mutationRestore.mutate(data)
    return response
  }

  return {
    data,
    isLoading,
    error,
    refetch,
    isRefetching,
    register,
    errorMutate,
    isError,
    deleteMachinery,
    updateMachinery,
    restoreMachinery,
    errorMessage,
  }
}

export default useMachinery

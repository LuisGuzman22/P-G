import { useFetchCompany, useFetchContract, useFetchShifts } from './useFetch'
import { useEffect, useState } from 'react'
import axios, { HttpStatusCode } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useShift = () => {
  const { data, isLoading, error, refetch, isRefetching } = useFetchShifts()

  const [errorMutate, setErrorMutate] = useState()
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const queryClient = useQueryClient()

  const registerMutation = useMutation({
    mutationFn: async (newTodo) => {
      return await axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/shifts`, newTodo)
    },
    onSuccess: (suc) => {
      setErrorMessage([])
      queryClient.invalidateQueries({ queryKey: ['shifts'] })
    },
    onError: (err) => {
      setErrorMessage(Object.values(err.response.data.errors).flat())
      setErrorMutate('Error al registrar el turno')
      setIsError(true)
      return false
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axios.delete(`${process.env.REACT_APP_BASE_URL}api/v1/shifts/${id}`)
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['shifts'] })
      setErrorMessage([])
    },
    onError: (err) => {
      setErrorMessage(Object.values(err.response.data.errors).flat())
      setErrorMutate('Error al registrar el turno')
      setIsError(true)
      return false
    },
  })

  const mutationUpdate = useMutation({
    mutationFn: async (newTodo) => {
      return await axios.put(
        `${process.env.REACT_APP_BASE_URL}api/v1/shifts/${newTodo.id}`,
        newTodo,
      )
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['shifts'] })
      setErrorMessage([])
    },
    onError: (err) => {
      setErrorMessage(Object.values(err.response.data.errors).flat())
      setErrorMutate('Error al actualizar el turno')
      setIsError(true)
      return false
    },
  })

  const mutationRestore = useMutation({
    mutationFn: async (newTodo) => {
      return await axios.patch(`${process.env.REACT_APP_BASE_URL}api/v1/shifts/${newTodo}/restore`)
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['shifts'] })
      setErrorMessage([])
    },
    onError: (err) => {
      setErrorMessage(Object.values(err.response.data.errors).flat())
      setErrorMutate('Error al actualizar el turno')
      setIsError(true)
      return false
    },
  })

  const register = (data) => {
    setIsError(false)
    const response = registerMutation.mutate(data)
    return response
  }

  const deleteShift = (id) => {
    setIsError(false)
    const response = deleteMutation.mutate(id)
    return response
  }

  const updateShift = (data) => {
    setIsError(false)
    const response = mutationUpdate.mutate(data)
    return response
  }

  const restoreShift = (data) => {
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
    deleteShift,
    updateShift,
    restoreShift,
    errorMessage,
  }
}

export default useShift

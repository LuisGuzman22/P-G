import { useFetchDirectStaffShifts } from './useFetch'
import { useEffect, useState } from 'react'
import axios, { HttpStatusCode } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useRegisterGeneralData from './useRegisterGeneralData'

const useDirectStaffShift = () => {
  const { getProject, getContract } = useRegisterGeneralData()
  const contractLS = JSON.parse(getContract())
  const projectLS = JSON.parse(getProject())

  const { data, isLoading, error, refetch, isRefetching } = useFetchDirectStaffShifts(
    projectLS?.id,
    contractLS?.id,
  )

  const [errorMutate, setErrorMutate] = useState()
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const queryClient = useQueryClient()

  const registerMutation = useMutation({
    mutationFn: async (newTodo) => {
      return await axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/directStaffShifts`, newTodo)
    },
    onSuccess: (suc) => {
      setErrorMessage([])
      queryClient.invalidateQueries({ queryKey: ['direct_staff_shift'] })
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
      return await axios.delete(`${process.env.REACT_APP_BASE_URL}api/v1/directStaffShifts/${id}`)
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['direct_staff_shift'] })
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
        `${process.env.REACT_APP_BASE_URL}api/v1/directStaffShifts/${newTodo.id}`,
        newTodo,
      )
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['direct_staff_shift'] })
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
      return await axios.patch(
        `${process.env.REACT_APP_BASE_URL}api/v1/directStaffShifts/${newTodo}/restore`,
      )
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['direct_staff_shift'] })
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

  const deleteDirectStaffShift = (id) => {
    setIsError(false)
    const response = deleteMutation.mutate(id)
    return response
  }

  const updateDirectStaffShift = (data) => {
    setIsError(false)
    const response = mutationUpdate.mutate(data)
    return response
  }

  const restoreDirectStaffShift = (data) => {
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
    deleteDirectStaffShift,
    updateDirectStaffShift,
    restoreDirectStaffShift,
    errorMessage,
  }
}

export default useDirectStaffShift

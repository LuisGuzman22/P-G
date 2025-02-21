import {
  useFetchCompany,
  useFetchContract,
  useFetchIndirectStaffShifts,
  useFetchShifts,
} from './useFetch'
import { useEffect, useState } from 'react'
import axios, { HttpStatusCode } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useIndirectStaffShift = () => {
  const { data, isLoading, error, refetch, isRefetching } = useFetchIndirectStaffShifts()

  const [errorMutate, setErrorMutate] = useState()
  const [isError, setIsError] = useState(false)
  const queryClient = useQueryClient()

  const registerMutation = useMutation({
    mutationFn: async (newTodo) => {
      return await axios
        .post(`${process.env.REACT_APP_BASE_URL}api/v1/indirectStaffShifts`, newTodo)
        .then((res) => {
          if (res.status === HttpStatusCode.Created) {
            setIsError(false)
            return res.ok
          } else {
            setErrorMutate('Error al registrar el turno')
            setIsError(true)
            return false
          }
        })
        .catch((err) => {
          setErrorMutate('Error al registrar el turno')
          setIsError(true)
          return false
        })
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['indirect_staff_shift'] })
    },
    onError: (err) => {
      setErrorMutate('Error al registrar el turno')
      setIsError(true)
      return false
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axios
        .delete(`${process.env.REACT_APP_BASE_URL}api/v1/indirectStaffShifts/${id}`)
        .then((res) => {
          if (res.status === HttpStatusCode.Created) {
            setIsError(false)
            return res.ok
          } else {
            setErrorMutate('Error al registrar el turno')
            setIsError(true)
            return false
          }
        })
        .catch((err) => {
          setErrorMutate('Error al registrar el turno')
          setIsError(true)
          return false
        })
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['indirect_staff_shift'] })
    },
    onError: (err) => {
      setErrorMutate('Error al registrar el turno')
      setIsError(true)
      return false
    },
  })

  const mutationUpdate = useMutation({
    mutationFn: async (newTodo) => {
      return await axios
        .put(`${process.env.REACT_APP_BASE_URL}api/v1/indirectStaffShifts/${newTodo.id}`, newTodo)
        .then((res) => {
          if (res.status === HttpStatusCode.Created) {
            setIsError(false)
            return res.ok
          } else {
            setErrorMutate('Error al actualizar el turno')
            setIsError(true)
            return false
          }
        })
        .catch((err) => {
          setErrorMutate('Error al actualizar el turno')
          setIsError(true)
          return false
        })
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['indirect_staff_shift'] })
    },
    onError: (err) => {
      setErrorMutate('Error al actualizar el turno')
      setIsError(true)
      return false
    },
  })

  const mutationRestore = useMutation({
    mutationFn: async (newTodo) => {
      return await axios
        .patch(`${process.env.REACT_APP_BASE_URL}api/v1/indirectStaffShifts/${newTodo}/restore`)
        .then((res) => {
          if (res.status === HttpStatusCode.Created) {
            setIsError(false)
            return res.ok
          } else {
            setErrorMutate('Error al actualizar el turno')
            setIsError(true)
            return false
          }
        })
        .catch((err) => {
          setErrorMutate('Error al actualizar el turno')
          setIsError(true)
          return false
        })
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['indirect_staff_shift'] })
    },
    onError: (err) => {
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

  const deleteIndirectStaffShift = (id) => {
    setIsError(false)
    const response = deleteMutation.mutate(id)
    return response
  }

  const updateIndirectStaffShift = (data) => {
    setIsError(false)
    const response = mutationUpdate.mutate(data)
    return response
  }

  const restoreIndirectStaffShift = (data) => {
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
    deleteIndirectStaffShift,
    updateIndirectStaffShift,
    restoreIndirectStaffShift,
  }
}

export default useIndirectStaffShift

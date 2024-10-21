import { useState } from 'react'
import { useFetchUser } from './useFetch'
import axios, { HttpStatusCode } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useUser = () => {
  const { data, isLoading, error, refetch, isRefetching } = useFetchUser()

  const [errorMutate, setErrorMutate] = useState()
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState()

  const queryClient = useQueryClient()

  const registerMutation = useMutation({
    mutationFn: async (newTodo) => {
      return await axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/users`, newTodo)
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      setErrorMessage([])
    },
    onError: (err) => {
      setErrorMessage(Object.values(err.response.data.errors).flat())
      setErrorMutate('Error al registrar usuario')
      setIsError(true)
      return false
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axios
        .delete(`${process.env.REACT_APP_BASE_URL}api/v1/users/${id}`)
        .then((res) => {
          if (res.status === HttpStatusCode.Created) {
            setIsError(false)
            return res.ok
          } else {
            setErrorMutate('Error al registrar usuario')
            setIsError(true)
            return false
          }
        })
        .catch((err) => {
          setErrorMutate('Error al registrar usuario')
          setIsError(true)
          return false
        })
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (err) => {
      setErrorMutate('Error al registrar usuario')
      setIsError(true)
      return false
    },
  })

  const mutationUpdate = useMutation({
    mutationFn: async (newTodo) => {
      return await axios.put(`${process.env.REACT_APP_BASE_URL}api/v1/users/${newTodo.id}`, newTodo)
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      setErrorMessage([])
    },
    onError: (err) => {
      setErrorMutate('Error al actualizar usuario')
      setErrorMessage(Object.values(err.response.data.errors).flat())
      setIsError(true)
      return false
    },
  })

  const mutationRestore = useMutation({
    mutationFn: async (newTodo) => {
      return await axios
        .patch(`${process.env.REACT_APP_BASE_URL}api/v1/users/${newTodo}/restore`)
        .then((res) => {
          if (res.status === HttpStatusCode.Created) {
            setIsError(false)
            return res.ok
          } else {
            setErrorMutate('Error al actualizar usuario')
            setIsError(true)
            return false
          }
        })
        .catch((err) => {
          setErrorMutate('Error al actualizar usuario')
          setIsError(true)
          return false
        })
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (err) => {
      setErrorMutate('Error al actualizar usuario')
      setIsError(true)
      return false
    },
  })

  const register = (data) => {
    setIsError(false)
    setErrorMessage()
    const response = registerMutation.mutate(data)
    return response
  }

  const deleteUser = (id) => {
    setIsError(false)
    const response = deleteMutation.mutate(id)
    return response
  }

  const updateUser = (data) => {
    setIsError(false)
    setErrorMessage()
    const response = mutationUpdate.mutate(data)
    return response
  }

  const restoreUser = (data) => {
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
    deleteUser,
    updateUser,
    restoreUser,
    errorMessage,
  }
}

export default useUser

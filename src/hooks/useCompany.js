import { useFetchCompany, useFetchContract } from './useFetch'
import { useEffect, useState } from 'react'
import axios, { HttpStatusCode } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useCompany = () => {
  const { data, isLoading, error, refetch, isRefetching } = useFetchCompany()

  const [errorMutate, setErrorMutate] = useState()
  const [isError, setIsError] = useState(false)
  const queryClient = useQueryClient()

  const registerMutation = useMutation({
    mutationFn: async (newTodo) => {
      return await axios
        .post(`${process.env.REACT_APP_BASE_URL}api/v1/companies`, newTodo)
        .then((res) => {
          if (res.status === HttpStatusCode.Created) {
            setIsError(false)
            return res.ok
          } else {
            setErrorMutate('Error al registrar la compañia')
            setIsError(true)
            return false
          }
        })
        .catch((err) => {
          setErrorMutate('Error al registrar la compañia')
          setIsError(true)
          return false
        })
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['company'] })
    },
    onError: (err) => {
      setErrorMutate('Error al registrar la compañia')
      setIsError(true)
      return false
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axios
        .delete(`${process.env.REACT_APP_BASE_URL}api/v1/companies/${id}`)
        .then((res) => {
          if (res.status === HttpStatusCode.Created) {
            setIsError(false)
            return res.ok
          } else {
            setErrorMutate('Error al registrar la compañia')
            setIsError(true)
            return false
          }
        })
        .catch((err) => {
          setErrorMutate('Error al registrar la compañia')
          setIsError(true)
          return false
        })
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['company'] })
    },
    onError: (err) => {
      setErrorMutate('Error al registrar la compañia')
      setIsError(true)
      return false
    },
  })

  const mutationUpdate = useMutation({
    mutationFn: async (newTodo) => {
      return await axios
        .put(`${process.env.REACT_APP_BASE_URL}api/v1/companies/${newTodo.id}`, newTodo)
        .then((res) => {
          if (res.status === HttpStatusCode.Created) {
            setIsError(false)
            return res.ok
          } else {
            setErrorMutate('Error al actualizar la compañia')
            setIsError(true)
            return false
          }
        })
        .catch((err) => {
          setErrorMutate('Error al actualizar la compañia')
          setIsError(true)
          return false
        })
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['company'] })
    },
    onError: (err) => {
      setErrorMutate('Error al actualizar la compañia')
      setIsError(true)
      return false
    },
  })

  const mutationRestore = useMutation({
    mutationFn: async (newTodo) => {
      return await axios
        .patch(`${process.env.REACT_APP_BASE_URL}api/v1/companies/${newTodo}/restore`)
        .then((res) => {
          if (res.status === HttpStatusCode.Created) {
            setIsError(false)
            return res.ok
          } else {
            setErrorMutate('Error al actualizar la compañia')
            setIsError(true)
            return false
          }
        })
        .catch((err) => {
          setErrorMutate('Error al actualizar la compañia')
          setIsError(true)
          return false
        })
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['company'] })
    },
    onError: (err) => {
      setErrorMutate('Error al actualizar la compañia')
      setIsError(true)
      return false
    },
  })

  const register = (data) => {
    setIsError(false)
    const response = registerMutation.mutate(data)
    return response
  }

  const deleteCompany = (id) => {
    setIsError(false)
    const response = deleteMutation.mutate(id)
    return response
  }

  const updateCompany = (data) => {
    setIsError(false)
    const response = mutationUpdate.mutate(data)
    return response
  }

  const restoreCompany = (data) => {
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
    deleteCompany,
    updateCompany,
    restoreCompany,
  }
}

export default useCompany

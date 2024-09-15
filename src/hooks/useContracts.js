import { useFetchContract } from './useFetch'
import { useState } from 'react'
import axios, { HttpStatusCode } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useContracts = (contractId) => {
  const [errorMutate, setErrorMutate] = useState()
  const [isError, setIsError] = useState(false)
  const queryClient = useQueryClient()

  const { data, isLoading, error, refetch, isRefetching } = useFetchContract(contractId)

  const mutation = useMutation({
    mutationFn: async (newTodo) => {
      return await axios
        .post(`${process.env.REACT_APP_BASE_URL}api/v1/contracts`, newTodo)
        .then((res) => {
          if (res.status === HttpStatusCode.Created) {
            setIsError(false)
            return res.ok
          } else {
            setErrorMutate('Error al registrar contrato')
            setIsError(true)
            return false
          }
        })
        .catch((err) => {
          setErrorMutate('Error al registrar contrato')
          setIsError(true)
          return false
        })
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] })
    },
    onError: (err) => {
      setErrorMutate('Error al registrar contrato')
      setIsError(true)
      return false
    },
  })

  const mutationUpdate = useMutation({
    mutationFn: async (newTodo) => {
      return await axios
        .put(`${process.env.REACT_APP_BASE_URL}api/v1/contracts/${newTodo.id}`, newTodo)
        .then((res) => {
          if (res.status === HttpStatusCode.Created) {
            setIsError(false)
            return res.ok
          } else {
            setErrorMutate('Error al actualizar contrato')
            setIsError(true)
            return false
          }
        })
        .catch((err) => {
          setErrorMutate('Error al actualizar contrato')
          setIsError(true)
          return false
        })
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] })
    },
    onError: (err) => {
      setErrorMutate('Error al actualizar contrato')
      setIsError(true)
      return false
    },
  })

  const mutationDelete = useMutation({
    mutationFn: async (newTodo) => {
      return await axios
        .delete(`${process.env.REACT_APP_BASE_URL}api/v1/contracts/${newTodo}`)
        .then((res) => {
          if (res.status === HttpStatusCode.Created) {
            setIsError(false)
            return res.ok
          } else {
            setErrorMutate('Error al actualizar contrato')
            setIsError(true)
            return false
          }
        })
        .catch((err) => {
          setErrorMutate('Error al actualizar contrato')
          setIsError(true)
          return false
        })
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] })
    },
    onError: (err) => {
      setErrorMutate('Error al actualizar contrato')
      setIsError(true)
      return false
    },
  })

  const register = (data) => {
    setIsError(false)
    const projectData = {
      name: data.projectName,
      description: data.projectDescription,
      manager: data.projectManager,
    }
    const response = mutation.mutate(projectData)
    return response
  }

  const update = (data) => {
    setIsError(false)
    const response = mutationUpdate.mutate(data)
    return response
  }

  const deleteProject = (data) => {
    setIsError(false)
    const response = mutationDelete.mutate(data)
    return response
  }

  return {
    data,
    isLoading,
    error,
    refetch,
    isRefetching,
    errorMutate,
    isError,
    register,
    update,
    deleteProject,
  }
}

export default useContracts

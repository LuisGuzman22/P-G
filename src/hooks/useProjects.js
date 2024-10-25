import { useState } from 'react'
import axios, { HttpStatusCode } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useFetchProyects } from './useFetch'

const useProjects = () => {
  const [errorMutate, setErrorMutate] = useState()
  const [isError, setIsError] = useState(false)
  const queryClient = useQueryClient()

  const { data, isLoading, error, refetch, isRefetching } = useFetchProyects(1)
  const [errorMessage, setErrorMessage] = useState()

  const mutation = useMutation({
    mutationFn: async (newTodo) => {
      return await axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/projects`, newTodo)
      // .then((res) => {
      //   if (res.status === HttpStatusCode.Created) {
      //     setIsError(false)
      //     return res.ok
      //   } else {
      //     setErrorMutate('Error al registrar proyecto')
      //     setIsError(true)
      //     return false
      //   }
      // })
      // .catch((err) => {
      //   setErrorMutate('Error al registrar proyecto')
      //   setIsError(true)
      //   return false
      // })
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      setErrorMessage([])
    },
    onError: (err) => {
      setErrorMessage(Object.values(err.response.data.errors).flat())
      setErrorMutate('Error al registrar proyecto')
      setIsError(true)
      return false
    },
  })

  const mutationUpdate = useMutation({
    mutationFn: async (newTodo) => {
      return await axios.put(
        `${process.env.REACT_APP_BASE_URL}api/v1/projects/${newTodo.id}`,
        newTodo,
      )
      // .then((res) => {
      //   if (res.status === HttpStatusCode.Created) {
      //     setIsError(false)
      //     return res.ok
      //   } else {
      //     setErrorMutate('Error al actualizar proyecto')
      //     setIsError(true)
      //     return false
      //   }
      // })
      // .catch((err) => {
      //   setErrorMutate('Error al actualizar proyecto')
      //   setIsError(true)
      //   return false
      // })
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      setErrorMessage([])
    },
    onError: (err) => {
      setErrorMutate('Error al actualizar proyecto')
      setErrorMessage(Object.values(err.response.data.errors).flat())
      setIsError(true)
      return false
    },
  })

  const mutationDelete = useMutation({
    mutationFn: async (newTodo) => {
      return await axios
        .delete(`${process.env.REACT_APP_BASE_URL}api/v1/projects/${newTodo}`)
        .then((res) => {
          if (res.status === HttpStatusCode.Created) {
            setIsError(false)
            return res.ok
          } else {
            setErrorMutate('Error al actualizar proyecto')
            setIsError(true)
            return false
          }
        })
        .catch((err) => {
          setErrorMutate('Error al actualizar proyecto')
          setIsError(true)
          return false
        })
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
    onError: (err) => {
      setErrorMutate('Error al actualizar proyecto')
      setIsError(true)
      return false
    },
  })

  const register = (data) => {
    setIsError(false)
    setErrorMessage()

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
    setErrorMessage()
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
    errorMessage,
  }
}

export default useProjects

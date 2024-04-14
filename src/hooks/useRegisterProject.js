import { useState } from 'react'
import axios, { HttpStatusCode } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useRegisterProject = () => {
  const [error, setError] = useState()
  const [isError, setIsError] = useState(false)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (newTodo) => {
      return await axios
        .post('https://pyg-production.up.railway.app/api/v1/projects', newTodo)
        .then((res) => {
          if (res.status === HttpStatusCode.Created) {
            setIsError(false)
            return res.ok
          } else {
            setError('Error al registrar proyecto')
            setIsError(true)
            return false
          }
        })
        .catch((err) => {
          setError('Error al registrar proyecto')
          setIsError(true)
          return false
        })
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
    onError: (err) => {
      setError('Error al registrar proyecto')
      setIsError(true)
      return false
    },
  })

  // const useMutateTodo = () => {
  //   const queryClient = useQueryClient()

  //   return useMutation(editTodo, {
  //     // Notice the second argument is the variables object that the `mutate` function receives
  //     onSuccess: (data, variables) => {
  //       queryClient.setQueryData(['todo', { id: variables.id }], data)
  //     },
  //   })
  // }

  const mutationUpdate = useMutation({
    mutationFn: async (newTodo) => {
      return await axios
        .put(`https://pyg-production.up.railway.app/api/v1/projects/${newTodo.id}`, newTodo)
        .then((res) => {
          if (res.status === HttpStatusCode.Created) {
            setIsError(false)
            return res.ok
          } else {
            setError('Error al actualizar proyecto')
            setIsError(true)
            return false
          }
        })
        .catch((err) => {
          setError('Error al actualizar proyecto')
          setIsError(true)
          return false
        })
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
    onError: (err) => {
      setError('Error al actualizar proyecto')
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

  return { register, error, isError, update }
}

export default useRegisterProject

import { useState } from 'react'
import { useFetchEquipment } from './useFetch'
import axios, { HttpStatusCode } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useEquipment = () => {
  const { data, isLoading, error, refetch, isRefetching } = useFetchEquipment()

  const [errorMutate, setErrorMutate] = useState()
  const [isError, setIsError] = useState(false)
  const queryClient = useQueryClient()

  const registerMutation = useMutation({
    mutationFn: async (newTodo) => {
      return await axios
        .post(`${process.env.REACT_APP_BASE_URL}api/v1/equipments`, newTodo)
        .then((res) => {
          if (res.status === HttpStatusCode.Created) {
            setIsError(false)
            return res.ok
          } else {
            setErrorMutate('Error al registrar proyecto')
            setIsError(true)
            return false
          }
        })
        .catch((err) => {
          setErrorMutate('Error al registrar proyecto')
          setIsError(true)
          return false
        })
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['equipment'] })
    },
    onError: (err) => {
      setErrorMutate('Error al registrar proyecto')
      setIsError(true)
      return false
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axios
        .delete(`${process.env.REACT_APP_BASE_URL}api/v1/equipments/${id}`)
        .then((res) => {
          if (res.status === HttpStatusCode.Created) {
            setIsError(false)
            return res.ok
          } else {
            setErrorMutate('Error al registrar proyecto')
            setIsError(true)
            return false
          }
        })
        .catch((err) => {
          setErrorMutate('Error al registrar proyecto')
          setIsError(true)
          return false
        })
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['equipment'] })
    },
    onError: (err) => {
      setErrorMutate('Error al registrar proyecto')
      setIsError(true)
      return false
    },
  })

  const mutationUpdate = useMutation({
    mutationFn: async (newTodo) => {
      return await axios
        .put(`${process.env.REACT_APP_BASE_URL}api/v1/equipments/${newTodo.id}`, newTodo)
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
      queryClient.invalidateQueries({ queryKey: ['equipment'] })
    },
    onError: (err) => {
      setErrorMutate('Error al actualizar proyecto')
      setIsError(true)
      return false
    },
  })

  const mutationRestore = useMutation({
    mutationFn: async (newTodo) => {
      return await axios
        .patch(`${'https://dev.pgproject.cl/'}api/v1/equipments/${newTodo}/restore`)
        .then((res) => {
          if (res.status === HttpStatusCode.Created) {
            setIsError(false)
            return res.ok
          } else {
            setErrorMutate('Error al actualizar vehículo')
            setIsError(true)
            return false
          }
        })
        .catch((err) => {
          setErrorMutate('Error al actualizar vehículo')
          setIsError(true)
          return false
        })
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['equipment'] })
    },
    onError: (err) => {
      setErrorMutate('Error al actualizar vehículo')
      setIsError(true)
      return false
    },
  })

  const register = (data) => {
    setIsError(false)
    const response = registerMutation.mutate(data)
    return response
  }

  const deleteEquipment = (id) => {
    setIsError(false)
    const response = deleteMutation.mutate(id)
    return response
  }

  const updateEquipment = (data) => {
    setIsError(false)
    const response = mutationUpdate.mutate(data)
    return response
  }

  const restoreEquipment = (data) => {
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
    deleteEquipment,
    updateEquipment,
    restoreEquipment,
  }
}

export default useEquipment

import { useState } from 'react'
import { useFetchWeather } from './useFetch'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useRegisterGeneralData from './useRegisterGeneralData'

const useWeather = () => {
  const { getProject, getContract } = useRegisterGeneralData()
  const contractLS = JSON.parse(getContract())
  const projectLS = JSON.parse(getProject())

  const { data, isLoading, error, refetch, isRefetching } = useFetchWeather(
    projectLS?.id,
    contractLS?.id,
  )

  const [errorMutate, setErrorMutate] = useState()
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const queryClient = useQueryClient()

  const registerMutation = useMutation({
    mutationFn: async (newTodo) => {
      return await axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/weathers`, newTodo, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
    },
    onSuccess: (suc) => {
      setErrorMessage([])
      queryClient.invalidateQueries({ queryKey: ['wheather'] })
    },
    onError: (err) => {
      setErrorMessage(Object.values(err.response.data.errors).flat())
      setErrorMutate('Error al registrar clima')
      setIsError(true)
      return false
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axios.delete(`${process.env.REACT_APP_BASE_URL}api/v1/weathers/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['weather'] })
      setErrorMessage([])
    },
    onError: (err) => {
      setErrorMessage(Object.values(err.response.data.errors).flat())
      setErrorMutate('Error al registrar clima')
      setIsError(true)
      return false
    },
  })

  const mutationUpdate = useMutation({
    mutationFn: async (newTodo) => {
      return await axios.put(
        `${process.env.REACT_APP_BASE_URL}api/v1/weathers/${newTodo.id}`,
        newTodo,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        },
      )
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['weather'] })
      setErrorMessage([])
    },
    onError: (err) => {
      setErrorMessage(Object.values(err.response.data.errors).flat())
      setErrorMutate('Error al actualizar clima')
      setIsError(true)
      return false
    },
  })

  const mutationRestore = useMutation({
    mutationFn: async (newTodo) => {
      return await axios.patch(
        `${process.env.REACT_APP_BASE_URL}api/v1/weathers/${newTodo}/restore`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        },
      )
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['weather'] })
      setErrorMessage([])
    },
    onError: (err) => {
      setErrorMessage(Object.values(err.response.data.errors).flat())
      setErrorMutate('Error al actualizar personal indirecto')
      setIsError(true)
      return false
    },
  })

  const register = (data) => {
    setIsError(false)
    const response = registerMutation.mutate(data)
    return response
  }

  const deleteWeather = (id) => {
    setIsError(false)
    const response = deleteMutation.mutate(id)
    return response
  }

  const updateWeather = (data) => {
    setIsError(false)
    const response = mutationUpdate.mutate(data)
    return response
  }

  const restoreWeather = (data) => {
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
    deleteWeather,
    updateWeather,
    restoreWeather,
    errorMessage,
  }
}

export default useWeather

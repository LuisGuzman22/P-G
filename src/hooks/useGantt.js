import { useState } from 'react'
import { useFetchGetGantt } from './useFetch'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useRegisterGeneralData from './useRegisterGeneralData'

const useGantt = () => {
  const [errorMutate, setErrorMutate] = useState()
  const [isError, setIsError] = useState(false)
  const queryClient = useQueryClient()
  const { getProject, getContract } = useRegisterGeneralData()

  const projectLS = JSON.parse(getProject())
  const contractLS = JSON.parse(getContract())

  const { data, isLoading, error, refetch, isRefetching } = useFetchGetGantt(
    projectLS.id,
    contractLS.id,
  )

  const registerMutation = useMutation({
    mutationFn: async (newTodo) => {
      return await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/v1/gantt/uploadGantt/${projectLS.id}/${contractLS.id}`,
        newTodo,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        },
      )
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['gantt'] })
    },
    onError: (err) => {
      console.log('err', err)
      setErrorMutate('Error al registrar gantt')
      setIsError(true)
      return false
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axios.delete(
        `${process.env.REACT_APP_BASE_URL}api/v1/gantt/deleteGantt/${projectLS.id}/${contractLS.id}`,
        { data: { media_ids: [id] } },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        },
      )
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['gantt'] })
    },
    onError: (err) => {
      setErrorMutate('Error al registrar gantt')
      setIsError(true)
      return false
    },
  })

  const register = (data) => {
    setIsError(false)
    const response = registerMutation.mutate(data)
    return response
  }

  const deleteDoc = (data) => {
    setIsError(false)
    const response = deleteMutation.mutate(data)
    return response
  }

  return {
    register,
    errorMutate,
    isError,
    data,
    isLoading,
    error,
    refetch,
    isRefetching,
    deleteDoc,
  }
}

export default useGantt

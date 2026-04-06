import { useFetchContract } from './useFetch'
import { useState } from 'react'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAsignContracts from './useAsignContract'
import useRegisterGeneralData from './useRegisterGeneralData'

const useContracts = (contractId) => {
  const [errorMutate, setErrorMutate] = useState()
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const queryClient = useQueryClient()

  const { register: asignContract } = useAsignContracts()
  const { getProject } = useRegisterGeneralData()
  const projectLS = getProject() ? JSON.parse(getProject()) : null

  const { data, isLoading, error, refetch, isRefetching } = useFetchContract(projectLS?.id)

  const mutation = useMutation({
    mutationFn: async (newTodo) => {
      return await axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/contracts`, newTodo, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
    },
    onSuccess: (suc) => {
      const contractData = {
        contract: suc.data.data.id,
        project: projectLS.id,
      }
      asignContract(contractData)
      queryClient.refetchQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['contracts'] })
      setErrorMessage([])
      return suc
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
        `${process.env.REACT_APP_BASE_URL}api/v1/contracts/${newTodo.id}`,
        newTodo,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        },
      )
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] })
      setErrorMessage([])
    },
    onError: (err) => {
      setErrorMutate('Error al actualizar contrato')
      setErrorMessage(Object.values(err.response.data.errors).flat())
      setIsError(true)
      return false
    },
  })

  const mutationDelete = useMutation({
    mutationFn: async (newTodo) => {
      return await axios.delete(`${process.env.REACT_APP_BASE_URL}api/v1/contracts/${newTodo}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
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

  const register = async (data) => {
    setIsError(false)
    setErrorMessage()

    const contractData = {
      name: data.name,
      detail: data.detail,
      telephone: data.telephone,
      email: data.email,
      company_id: data.company_id,
      code: data.code,
    }
    const response = await mutation.mutate(contractData)
    console.log('response', response)
    return response
  }

  const update = (data) => {
    setErrorMessage()
    setIsError(false)
    const response = mutationUpdate.mutate(data)
    return response
  }

  const deleteContract = (data) => {
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
    deleteContract,
    errorMessage,
  }
}

export default useContracts

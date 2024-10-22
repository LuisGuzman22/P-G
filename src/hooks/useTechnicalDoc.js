import { useState } from 'react'
import {
  useFetchGetTechnicalDocumentation,
  useFetchGetTechnicalDocumentationCategories,
  useFetchVehicle,
} from './useFetch'
import axios, { HttpStatusCode } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useRegisterGeneralData from './useRegisterGeneralData'

const useTechnicalDoc = () => {
  const [errorMutate, setErrorMutate] = useState()
  const [isError, setIsError] = useState(false)
  const queryClient = useQueryClient()
  const { getProject, getContract } = useRegisterGeneralData()

  const projectLS = JSON.parse(getProject())
  const contractLS = JSON.parse(getContract())

  const { data, isLoading, error, refetch, isRefetching } = useFetchGetTechnicalDocumentation(
    projectLS.id,
    contractLS.id,
  )

  const {
    data: categoryData,
    isLoading: categoriLoading,
    error: categoryError,
    refetch: categoryRefetch,
    isRefetching: categoryIsRefetching,
  } = useFetchGetTechnicalDocumentationCategories(projectLS.id, contractLS.id)

  const registerMutation = useMutation({
    mutationFn: async (newTodo) => {
      return await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}api/v1/documentation/uploadTechnicalDocumentation/${projectLS.id}/${contractLS.id}`,
          newTodo,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
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
      queryClient.invalidateQueries({ queryKey: ['technical-documentation'] })
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
        .delete(
          `${process.env.REACT_APP_BASE_URL}api/v1/documentation/deleteTechnicalDocumentation/${projectLS.id}/${contractLS.id}`,
          { data: { media_ids: [id] } },
        )
        .then((res) => {
          if (res.status === HttpStatusCode.Created) {
            setIsError(false)
            return res.ok
          } else {
            setErrorMutate('Error al registrar documento')
            setIsError(true)
            return false
          }
        })
        .catch((err) => {
          setErrorMutate('Error al registrar documento')
          setIsError(true)
          return false
        })
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['technical-documentation'] })
    },
    onError: (err) => {
      setErrorMutate('Error al registrar documento')
      setIsError(true)
      return false
    },
  })

  const registerCategoryMutation = useMutation({
    mutationFn: async (newTodo) => {
      return await axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/categories`, newTodo)
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['technical-documentation-categories'] })
    },
    onError: (err) => {
      setErrorMutate('Error al registrar proyecto')
      setIsError(true)
      return false
    },
  })

  const deleteCategoryMutation = useMutation({
    mutationFn: async (id) => {
      return await axios.delete(`${process.env.REACT_APP_BASE_URL}api/v1/categories/${id}`)
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['technical-documentation-categories'] })
    },
    onError: (err) => {
      setErrorMutate('Error al eliminar categoria')
      setIsError(true)
      return false
    },
  })

  const updateCategoryMutation = useMutation({
    mutationFn: async (category) => {
      return await axios.put(
        `${process.env.REACT_APP_BASE_URL}api/v1/categories/${category.id}`,
        category,
      )
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['technical-documentation-categories'] })
    },
    onError: (err) => {
      setErrorMutate('Error al eliminar categoria')
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
    console.log('data', data)
    setIsError(false)
    const response = deleteMutation.mutate(data)
    return response
  }

  const registerCategory = (data) => {
    setIsError(false)
    const response = registerCategoryMutation.mutate(data)
    return response
  }

  const editCategory = (data) => {
    setIsError(false)
    const response = updateCategoryMutation.mutate(data)
    return response
  }

  const deleteCategory = (data) => {
    setIsError(false)
    const response = deleteCategoryMutation.mutate(data)
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
    registerCategory,
    editCategory,
    deleteCategory,
    categoryData,
    categoriLoading,
    categoryError,
    categoryRefetch,
    categoryIsRefetching,
  }
}

export default useTechnicalDoc

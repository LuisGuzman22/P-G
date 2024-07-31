import { useState } from 'react'
import { useFetchTrisemanalData } from './useFetch'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const useGetTrisemanalData = () => {
  const [error, setError] = useState()
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()

  const { data, isLoading: loadingTrisemanal, error: errorTrisemanal } = useFetchTrisemanalData()

  const mutation = useMutation({
    mutationFn: async (newTodo) => {
      setError('')
      setIsLoading(true)
      return await axios
        .post(`${process.env.REACT_APP_BASE_URL}api/v1/login`, newTodo)
        .then((res) => {
          // if (res.status === HttpStatusCode.Ok) {
          //   localStorage.setItem('token', res.data.data.token)
          //   localStorage.setItem('company_user', res.data.data.user.company_id)
          //   setIsLoading(false)
          //   setIsError(false)
          //   navigate(`/project_selector`)
          //   return res.ok
          // } else {
          //   setError('Usuario / contraseña incorrecto')
          //   setIsError(true)
          //   setIsLoading(false)
          //   return false
          // }
        })
        .catch((err) => {
          setError('Usuario / contraseña incorrecto')
          setIsError(true)
          setIsLoading(false)
          return false
        })
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      setIsLoading(false)
    },
    onError: (err) => {
      setError('Usuario / contraseña incorrecto')
      setIsError(true)
      setIsLoading(false)
      return false
    },
  })

  const uploadTrisemanal = (file) => {}

  return { data, loadingTrisemanal, errorTrisemanal, uploadTrisemanal }
}

export default useGetTrisemanalData

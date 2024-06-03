import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios, { HttpStatusCode } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useLogin = () => {
  const [error, setError] = useState()
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: async (newTodo) => {
      setError('')
      setIsLoading(true)
      return await axios
        .post(`${process.env.REACT_APP_BASE_URL}api/v1/login`, newTodo)
        .then((res) => {
          if (res.status === HttpStatusCode.Ok) {
            // console.log('res', res.data.data)
            localStorage.setItem('token', res.data.data.token)
            setIsLoading(false)
            setIsError(false)
            navigate(`/project_selector`)
            return res.ok
          } else {
            setError('Usuario / contraseña incorrecto')
            setIsError(true)
            setIsLoading(false)

            return false
          }
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

  const trueLogin = async (data) => {
    const { user, password } = data
    console.log('REACT_APP_BASE_URL', process.env.REACT_APP_BASE_URL)

    const loginData = {
      email: user,
      password,
    }
    const response = await mutation.mutate(loginData)
    return response
  }

  const login = (data) => {
    const { user, password } = data

    if (user === 'prueba@gmail.com' && password === 'prueba#12345') {
      setError()
      navigate(`/project_selector`)
      localStorage.setItem('USER_TYPE', 'basic')
      return true
    } else if (user === 'asd2@asd.cl' && password === '12345') {
      navigate(`/contrato`)
      localStorage.setItem('USER_TYPE', 'admin')
      return true
    } else {
      setError('Usuario y/o contraseña incorrecto')
      return false
    }
  }

  return { login, trueLogin, error, isLoading }
}

export default useLogin

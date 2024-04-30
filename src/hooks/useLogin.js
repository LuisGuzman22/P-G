import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios, { HttpStatusCode } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useLogin = () => {
  const [error, setError] = useState()
  const [isError, setIsError] = useState(false)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: async (newTodo) => {
      return await axios
        .post('https://pyg-production.up.railway.app/api/v1/login', newTodo)
        .then((res) => {
          console.log('res', res)
          if (res.status === HttpStatusCode.Created) {
            setIsError(false)
            return res.ok
          } else {
            setError('Usuario / contraseña incorrecto')
            setIsError(true)
            return false
          }
        })
        .catch((err) => {
          console.log('err', err)
          setError('Usuario / contraseña incorrecto')
          setIsError(true)
          return false
        })
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
    onError: (err) => {
      console.log('2err', err)

      setError('Usuario / contraseña incorrecto')
      setIsError(true)
      return false
    },
  })

  const trueLogin = async (data) => {
    const { user, password } = data

    const loginData = {
      email: user,
      password,
    }
    const response = await mutation.mutate(loginData)
    console.log('response', response)
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

  return { login, trueLogin, error }
}

export default useLogin

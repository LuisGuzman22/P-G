import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'

const useRegisterUser = () => {
  const [error, setError] = useState()
  const [isError, setIsError] = useState(false)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (newTodo) => {
      return await axios
        .post('/prueba', newTodo)
        .then((res) => {
          if (res.ok) {
            setIsError(false)
            return res.ok
          } else {
            setError('Error al registrar usuario')
            setIsError(true)
            return false
          }
        })
        .catch((err) => {
          setError('Error al registrar usuario')
          setIsError(true)
          return false
        })
    },
    onSuccess: (suc) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (err) => {
      setError('Error al registrar usuario')
      setIsError(true)
      return false
    },
  })

  const register = (data) => {
    setIsError(false)
    const response = mutation.mutate(data)
    return response
  }

  return { register, error, isError }
}

export default useRegisterUser

import { useState } from 'react'

const useLogin = () => {
  const [error, setError] = useState()

  const login = (data) => {
    const { user, password } = data
    console.log('user', user)
    console.log('password', password)

    if (user === 'asd@asd.cl' && password === '12345') {
      setError()
      return true
    } else {
      setError('Usuario y/o contraseña incorrecto')
      return false
    }
  }

  return { login, error }
}

export default useLogin

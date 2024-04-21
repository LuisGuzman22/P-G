import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const useLogin = () => {
  const [error, setError] = useState()
  const navigate = useNavigate()

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

  return { login, error }
}

export default useLogin

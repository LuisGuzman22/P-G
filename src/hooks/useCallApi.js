import { useState, useCallback } from 'react'
import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_BASE_URL

const useCallApi = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(async (method, url, data = null, params = {}) => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios({
        method,
        url: `${API_BASE_URL}${url}`,
        data,
        params, // Axios maneja los query params automáticamente
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      console.log('response', response)
      return response // Devuelve los datos de la respuesta
    } catch (err) {
      setError(err.response?.data?.message || err.message)
      return err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loading,
    error,
    get: (url, params = {}) => request('GET', url, null, params),
    delete: (url, params = {}) => request('DELETE', url, null, params),
    post: (url, data) => request('POST', url, data),
    put: (url, data) => request('PUT', url, data),
    patch: (url, data, params = {}) => request('PATCH', url, data, params),
  }
}

export default useCallApi

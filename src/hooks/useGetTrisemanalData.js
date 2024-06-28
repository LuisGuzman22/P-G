import { useFetchTrisemanalData } from './useFetch'

const useGetTrisemanalData = () => {
  const { data, isLoading, error } = useFetchTrisemanalData()
  return { data, isLoading, error }
}

export default useGetTrisemanalData

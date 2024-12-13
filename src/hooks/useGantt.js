import { useFetchGant } from './useFetch'

const useGantt = () => {
  const { data, isLoading, error, refetch, isRefetching } = useFetchGant()

  return {
    data,
    isLoading,
    error,
    refetch,
    isRefetching,
  }
}

export default useGantt

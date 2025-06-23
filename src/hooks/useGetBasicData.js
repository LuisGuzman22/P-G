import { useFetchBasicData } from './useFetch'

const useGetBasicData = (contractId) => {
  const { data, isLoading, error, refetch } = useFetchBasicData(contractId)
  return { data, isLoading, error, refetch }
}

export default useGetBasicData

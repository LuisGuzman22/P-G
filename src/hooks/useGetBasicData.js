import { useFetchBasicData } from './useFetch'

const useGetBasicData = (contractId) => {
  const { data, isLoading, error } = useFetchBasicData(contractId)
  return { data, isLoading, error }
}

export default useGetBasicData

import { useFetchBasicData } from './useFetch'

const useGetBasicData = (contractId) => {
  console.log('projectId', contractId)
  const { data, isLoading, error } = useFetchBasicData(contractId)
  return { data, isLoading, error }
}

export default useGetBasicData

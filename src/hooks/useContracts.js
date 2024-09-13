import { useFetchContract } from './useFetch'

const useContracts = (contractId) => {
  const { data, isLoading, error } = useFetchContract(contractId)

  return { data, isLoading, error }
}

export default useContracts

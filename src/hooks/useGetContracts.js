import { useEffect, useState } from 'react'
import { useFetchContract } from './useFetch'

const useGetContracts = (contractId) => {
  const { data, isLoading, error } = useFetchContract(contractId)

  return { data, isLoading, error }
}

export default useGetContracts

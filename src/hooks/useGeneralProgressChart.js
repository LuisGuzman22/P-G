import { useFetchGeneralProgress } from './useFetch'
import useRegisterGeneralData from './useRegisterGeneralData'

const useGeneralProgressChart = () => {
  const { getProject, getContract } = useRegisterGeneralData()

  const projectLS = JSON.parse(getProject())
  const contractLS = JSON.parse(getContract())

  const { data, isLoading, error, refetch, isRefetching } = useFetchGeneralProgress(
    projectLS.id,
    contractLS.id,
  )

  return {
    data,
    isLoading,
    error,
    refetch,
    isRefetching,
  }
}

export default useGeneralProgressChart

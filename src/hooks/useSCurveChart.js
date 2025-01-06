import { useFetchGant, useFetchSChart } from './useFetch'
import useRegisterGeneralData from './useRegisterGeneralData'

const useSCurveChart = () => {
  const { getProject, getContract } = useRegisterGeneralData()

  const projectLS = JSON.parse(getProject())
  const contractLS = JSON.parse(getContract())

  const { data, isLoading, error, refetch, isRefetching } = useFetchSChart(
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

export default useSCurveChart

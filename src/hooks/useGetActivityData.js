import { useFetchActivityData } from './useFetch'
import useRegisterGeneralData from './useRegisterGeneralData'

const useGetActivityData = () => {
  const { getProject, getContract } = useRegisterGeneralData()

  const projectLS = JSON.parse(getProject())
  const contractLS = JSON.parse(getContract())

  const { data, isLoading, error } = useFetchActivityData(projectLS.id, contractLS.id)

  return {
    data,
    isLoading,
    error,
  }
}

export default useGetActivityData

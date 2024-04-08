import { useFetchUserList } from './useFetch'

const useGetUserList = () => {
  const { data, isLoading, error } = useFetchUserList()
  return { data, isLoading, error }
}

export default useGetUserList

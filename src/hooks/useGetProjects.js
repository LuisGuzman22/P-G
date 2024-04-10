import { useFetchProyects } from './useFetch'

const useGetProjects = (projectId) => {
  const { data, isLoading, error, refetch, isRefetching } = useFetchProyects(projectId)
  return { data, isLoading, error, refetch, isRefetching }
}

export default useGetProjects

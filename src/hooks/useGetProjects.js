import { useFetchProyects } from './useFetch'

const useGetProjects = (projectId) => {
  const { data, isLoading, error } = useFetchProyects(projectId)
  return { data, isLoading, error }
}

export default useGetProjects

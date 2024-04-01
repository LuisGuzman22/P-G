import { useFetch } from './useFetch'

const useGetProjects = (projectId) => {
  const { data, isLoading, error } = useFetch(projectId)
  return { data, isLoading, error }
}

export default useGetProjects

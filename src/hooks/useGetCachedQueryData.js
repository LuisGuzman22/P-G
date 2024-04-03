import { useQueryClient } from '@tanstack/react-query'

const useGetCachedQueryData = () => {
  const queryClient = useQueryClient()

  // First create a helper function
  const getData = (key) => {
    // Make sure that the key is wrapped in an array for this to work
    const data = queryClient.getQueryData([key])
    return data
  }

  return { getData }
}

export default useGetCachedQueryData

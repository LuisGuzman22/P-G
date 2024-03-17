import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import axios from 'axios'
import { DailyReportContext } from 'src/context/DailyReportContext'

const useRegisterDailyReport = () => {
  const { company, indirectWorkForceList, directWorkForceList } = useContext(DailyReportContext)

  const mutation = useMutation({
    mutationFn: (newTodo) => {
      return axios.post('/prueba', newTodo)
    },
  })

  const registerData = async () => {
    console.log('🚀 ~ useRegisterDailyReport ~ company:', company)
    console.log('🚀 ~ useRegisterDailyReport ~ indirectWorkForceList:', indirectWorkForceList)
    console.log('🚀 ~ useRegisterDailyReport ~ directWorkForceList:', directWorkForceList)

    mutation.mutate({ company })
  }

  return { registerData }
}

export default useRegisterDailyReport

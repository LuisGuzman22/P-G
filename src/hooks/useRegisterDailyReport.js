import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import axios from 'axios'
import { DailyReportContext } from 'src/context/DailyReportContext'

const useRegisterDailyReport = () => {
  const {
    company,
    indirectWorkForceList,
    directWorkForceList,
    totalIndirectWorkForce,
    totalDirectWorkForce,
    indirectDotationWorkForceList,
    directDotationWorkForceList,
    machineryWorkForceList,
    equipmentWorkForceList,
    vehicleWorkForceList,
    incident,
    comments,
  } = useContext(DailyReportContext)

  const mutation = useMutation({
    mutationFn: (newTodo) => {
      return axios.post('/prueba', newTodo)
    },
  })

  const registerData = async () => {
    console.log('🚀 ~ useRegisterDailyReport ~ company:', company)
    console.log('🚀 ~ useRegisterDailyReport ~ indirectWorkForceList:', indirectWorkForceList)
    console.log('🚀 ~ useRegisterDailyReport ~ directWorkForceList:', directWorkForceList)
    console.log('🚀 ~ useRegisterDailyReport ~ totalIndirectWorkForce:', totalIndirectWorkForce)
    console.log('🚀 ~ useRegisterDailyReport ~ totalDirectWorkForce:', totalDirectWorkForce)
    console.log(
      '🚀 ~ useRegisterDailyReport ~ indirectDotationWorkForceList:',
      indirectDotationWorkForceList,
    )
    console.log(
      '🚀 ~ useRegisterDailyReport ~ directDotationWorkForceList:',
      directDotationWorkForceList,
    )
    console.log('🚀 ~ useRegisterDailyReport ~ machineryWorkForceList:', machineryWorkForceList)
    console.log('🚀 ~ useRegisterDailyReport ~ equipmentWorkForceList:', equipmentWorkForceList)
    console.log('🚀 ~ useRegisterDailyReport ~ vehicleWorkForceList:', vehicleWorkForceList)
    console.log('🚀 ~ useRegisterDailyReport ~ incident:', incident)
    console.log('🚀 ~ useRegisterDailyReport ~ comments:', comments)

    mutation.mutate({
      company,
      indirectWorkForceList,
      directWorkForceList,
      totalIndirectWorkForce,
      totalDirectWorkForce,
      indirectDotationWorkForceList,
      directDotationWorkForceList,
      machineryWorkForceList,
      equipmentWorkForceList,
      vehicleWorkForceList,
      incident,
      comments,
    })
  }

  return { registerData }
}

export default useRegisterDailyReport

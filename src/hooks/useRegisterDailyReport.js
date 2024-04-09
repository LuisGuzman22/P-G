import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import axios from 'axios'
import { DailyReportContext } from 'src/context/DailyReportContext'
import useRegisterGeneralData from './useRegisterGeneralData'

const useRegisterDailyReport = () => {
  const { getProject, getContract } = useRegisterGeneralData()
  const projectLS = JSON.parse(getProject())
  const contractLS = JSON.parse(getContract())

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
    workforceDotation,
    comments,
    machineryList,
    equipmentList,
    vehicleList,
    activityList,
  } = useContext(DailyReportContext)

  const mutation = useMutation({
    mutationFn: (newTodo) => {
      return axios.post('https://pyg-production.up.railway.app/api/v1/reports', newTodo)
    },
  })

  const registerData = async () => {
    mutation.mutate({
      projectId: projectLS.id,
      contractId: contractLS.id,
      company, // 1
      indirectWorkForceList, // 2
      totalIndirectWorkForce, // 3
      directWorkForceList, // 4
      totalDirectWorkForce, // 5
      indirectDotationWorkForceList, // 6
      directDotationWorkForceList, // 7
      workforceDotation, // 8
      machineryList, // 9
      machineryWorkForceList, // 10
      equipmentList, // 11
      equipmentWorkForceList, // 12
      vehicleList, // 13
      vehicleWorkForceList, // 14
      activityList, // 15
      comments, // 16
      // 17 (graficos)
      incident, // 18 //
    })
  }

  return { registerData }
}

export default useRegisterDailyReport

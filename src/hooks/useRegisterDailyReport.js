import { useMutation } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { DailyReportContext } from 'src/context/DailyReportContext'
import useRegisterGeneralData from './useRegisterGeneralData'

const useRegisterDailyReport = () => {
  const { getProject, getContract } = useRegisterGeneralData()
  const projectLS = JSON.parse(getProject())
  const contractLS = JSON.parse(getContract())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const {
    company,
    indirectWorkForceList,
    directWorkForceList,
    totalIndirectWorkForce,
    totalDirectWorkForce,
    directDotationWorkForceList,
    machineryWorkForceList,
    equipmentWorkForceList,
    vehicleWorkForceList,
    incident,
    comment,
    machineryList,
    equipmentList,
    vehicleList,
    activityList,
    asarcoMachineryList,
    equipmentPlateList,
    aljibeList,
  } = useContext(DailyReportContext)

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: async (newTodo) =>
      axios.post('https://pyg-production.up.railway.app/api/v1/reports', newTodo),
    onSuccess: () => {
      console.log('ok')
      setLoading(false)
      setSuccess(true)
    },
    onError: (err) => {
      setLoading(false)
      setSuccess(false)
      setError(err.message)
    },
  })

  let equipList = []
  let equip = {}
  for (let eq of equipmentList) {
    equip = {}
    equip.equipment = eq.equipment
    equip.actions = JSON.stringify(eq.actions)
    equipList.push(equip)
  }

  let machinList = []
  let machin = {}
  for (let ma of machineryList) {
    machin = {}
    machin.machinery = ma.machinery
    machin.actions = JSON.stringify(ma.actions)
    machinList.push(machin)
  }

  let vehicList = []
  let vehic = {}
  for (let ve of vehicleList) {
    vehic = {}
    vehic.vehicle = ve.vehicle
    vehic.actions = JSON.stringify(ve.actions)
    vehicList.push(vehic)
  }

  const registerData = async () => {
    setLoading(true)
    setError()
    setSuccess(false)
    const data = mutate({
      projectId: projectLS.id,
      contractId: contractLS.id,
      company, // 1
      indirectWorkForceList, // 2
      totalIndirectWorkForce, // 3
      directWorkForceList, // 4
      totalDirectWorkForce, // 5
      directDotationWorkForceList, // 7
      machineryList: machinList, // 9
      machineryWorkForceList, // 10
      equipmentList: equipList, // 11
      equipmentWorkForceList, // 12
      vehicleList: vehicList, // 13
      vehicleWorkForceList, // 14
      activityList, // 15
      comment: comment.comment, // 16
      // 17 (graficos)
      incident, // 18 //
      asarcoMachineryList, // 9
      equipmentPlateList, // 11
      aljibeList, // 16
    })
    return data
  }

  return { registerData, loading, error, success }
}

export default useRegisterDailyReport

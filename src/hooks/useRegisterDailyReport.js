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
    directDotationWorkForceList,
    machineryWorkForceList,
    equipmentWorkForceList,
    vehicleWorkForceList,
    incident,
    comments,
    machineryList,
    equipmentList,
    vehicleList,
    activityList,
    asarcoMachineryList,
    equipmentPlateList,
    aljibeList,
  } = useContext(DailyReportContext)

  const mutation = useMutation({
    mutationFn: (newTodo) => {
      return axios.post('https://pyg-production.up.railway.app/api/v1/reports', newTodo)
    },
  })

  // let iwfList = []
  // let iwf = {}
  // for (let indi of indirectWorkForceList) {
  //   iwf = {}
  //   iwf.indirectWorkForce = indi.indirectWorkForce
  //   iwf.offeredNumber = indi.offeredNumber
  //   iwf.contractedNumber = indi.contractedNumber
  //   iwf.certified = indi.certified
  //   iwf.breakNumber = indi.breakNumber
  //   iwf.workNumber = indi.workNumber
  //   iwf.hh = indi.indirectWorkForhhce
  //   iwfList.push(iwf)
  // }

  // let dwfList = []
  // let dwf = {}
  // for (let direct of directWorkForceList) {
  //   dwf = {}
  //   dwf.indirectWorkForce = direct.indirectWorkForce
  //   dwf.offeredNumber = direct.offeredNumber
  //   dwf.contractedNumber = direct.contractedNumber
  //   dwf.certified = direct.certified
  //   dwf.breakNumber = direct.breakNumber
  //   dwf.workNumber = direct.workNumber
  //   dwf.hh = direct.indirectWorkForhhce
  //   dwfList.push(dwf)
  // }

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

  // let ddwfList = []
  // let ddwf = {}
  // for (let directDotation of directDotationWorkForceList) {
  //   ddwf = {}
  //   ddwf.directDotationWorkForceObservation = directDotation.directDotationWorkForceObservation
  //   ddwf.directWorkFront = directDotation.directWorkFront
  //   ddwf.directSubWorkFront = directDotation.directSubWorkFront
  //   ddwf.directWorkFrontCharge = directDotation.directWorkFrontCharge
  //   ddwf.directWorkFrontQuantity = directDotation.directWorkFrontQuantity
  //   ddwfList.push(ddwf)
  // }

  // let mwfList = []
  // let mwf = {}
  // for (let machineryWF of machineryWorkForceList) {
  //   mwf = {}
  //   mwf.machineryWorkForcebservation = machineryWF.machineryWorkForcebservation
  //   mwf.machineryWorkForce = machineryWF.machineryWorkForce
  //   mwf.machinerySubWorkFront = machineryWF.machinerySubWorkFront
  //   mwf.machineryWorkFrontCharge = machineryWF.machineryWorkFrontCharge
  //   mwf.machineryWorkFrontQuantity = machineryWF.machineryWorkFrontQuantity
  //   mwfList.push(mwf)
  // }

  // let ewfList = []
  // let ewf = {}
  // for (let equipmentWF of equipmentWorkForceList) {
  //   ewf = {}
  //   ewf.equipmentWorkForce = equipmentWF.equipmentWorkForce
  //   ewf.equipmentWorkForceObservation = equipmentWF.equipmentWorkForceObservation
  //   ewf.equipmentSubWorkFront = equipmentWF.equipmentSubWorkFront
  //   ewf.equipmentWorkFrontCharge = equipmentWF.equipmentWorkFrontCharge
  //   ewf.equipmentWorkFrontQuantity = equipmentWF.equipmentWorkFrontQuantity
  //   ewfList.push(ewf)
  // }

  const registerData = async () => {
    mutation.mutate({
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
      comment: comments, // 16
      // 17 (graficos)
      incident, // 18 //
      asarcoMachineryList, // 9
      equipmentPlateList, // 11
      aljibeList, // 16
    })
  }

  return { registerData }
}

export default useRegisterDailyReport

import { React, useEffect, useState } from 'react'
import { createContext } from 'react'

export const DailyReportContext = createContext({
  dailyReportContractManagerName: undefined,
  dailyReportDate: undefined,
  dailyReportNumber: undefined,
  dailyReportContratistName: undefined,
  dailyReportWeather: undefined,
  dailyReportContratistNumber: undefined,
  dailyReportContractName: undefined,
  dailyReportDirectPersonalShift: undefined,
  dailyReportDirectPersonalHours: undefined,
  dailyReportDirectPersonalJourney: undefined,
  dailyReportIndirectPersonalShift: undefined,
  dailyReportIndirectPersonalHours: undefined,
  dailyReportIndirectPersonalJourney: undefined,
})

// eslint-disable-next-line react/prop-types
export const DailyReportProvider = ({ children }) => {
  const [company, setCompany] = useState({
    dailyReportContractManagerName: undefined,
    dailyReportDate: undefined,
    dailyReportNumber: undefined,
    dailyReportContratistName: undefined,
    dailyReportWeather: undefined,
    dailyReportContratistNumber: undefined,
    dailyReportContractName: undefined,
    dailyReportDirectPersonalShift: undefined,
    dailyReportDirectPersonalHours: undefined,
    dailyReportDirectPersonalJourney: undefined,
    dailyReportIndirectPersonalShift: undefined,
    dailyReportIndirectPersonalHours: undefined,
    dailyReportIndirectPersonalJourney: undefined,
  })

  const [totalIndirectWorkForce, setTotalIndirectWorkForce] = useState()
  const [totalDirectWorkForce, setTotalDirectWorkForce] = useState()

  const [directWorkForceList, setDirectWorkForceList] = useState([])
  const [indirectWorkForceList, setIndirectWorkForceList] = useState([])
  const [indirectDotationWorkForceList, setIndirectDotationWorkForceList] = useState([])
  const [directDotationWorkForceList, setDirectDotationWorkForceList] = useState([])
  const [machineryWorkForceList, setMachineryWorkForceList] = useState([])
  const [equipmentWorkForceList, setEquipmentWorkForceList] = useState([])
  const [vehicleWorkForceList, setVehicletWorkForceList] = useState([])
  const [comments, setComments] = useState('')
  const [incident, setIncident] = useState([])
  const [machineryList, setMachineryList] = useState([])
  const [equipmentList, setEquipmentList] = useState([])
  const [vehicleList, setVehicleList] = useState([])
  const [vehiclePlateList, setVehiclePlateList] = useState([])
  const [activityList, setActivityList] = useState([])
  const [asarcoMachineryList, setAsarcoMachineryList] = useState([])
  const [equipmentPlateList, setEquipmentPlateList] = useState([])
  const [aljibeList, setAljibeList] = useState([])

  const [workforceDotation, setWorkforceDotation] = useState({
    workforceDotationPersonalFront1: undefined,
    workforceDotationPersonalFront2: undefined,
    workforceDotationPersonalFront3: undefined,
    workforceDotationPersonalFront4: undefined,
    workforceDotationPersonalFront5: undefined,
    workforceDotationPersonalFront6: undefined,
    workforceDotationPersonalFront7: undefined,
    workforceDotationObservation: undefined,
  })

  const storeCompanyData = async (data) => {
    switch (data.target.id) {
      case 'dailyReportDate':
        setCompany({ ...company, dailyReportDate: data.target.value })
        break
      case 'dailyReportNumber':
        setCompany({ ...company, dailyReportNumber: data.target.value })
        break
      case 'dailyReportContratistName':
        setCompany({ ...company, dailyReportContratistName: data.target.value })
        break
      case 'dailyReportContratistNumber':
        setCompany({ ...company, dailyReportContratistNumber: data.target.value })
        break
      case 'dailyReportContractName':
        setCompany({ ...company, dailyReportContractName: data.target.value })
        break
      case 'dailyReportDirectPersonalShift':
        setCompany({ ...company, dailyReportDirectPersonalShift: data.target.value })
        break
      case 'dailyReportDirectPersonalHours':
        setCompany({ ...company, dailyReportDirectPersonalHours: data.target.value })
        break
      case 'dailyReportDirectPersonalJourney':
        setCompany({ ...company, dailyReportDirectPersonalJourney: data.target.value })
        break
      case 'dailyReportIndirectPersonalShift':
        setCompany({ ...company, dailyReportIndirectPersonalShift: data.target.value })
        break
      case 'dailyReportIndirectPersonalHours':
        setCompany({ ...company, dailyReportIndirectPersonalHours: data.target.value })
        break
      case 'dailyReportIndirectPersonalJourney':
        setCompany({ ...company, dailyReportIndirectPersonalJourney: data.target.value })
        break
      case 'dailyReportContractManagerName':
        setCompany({ ...company, dailyReportContractManagerName: data.target.value })
        break
      case 'dailyReportWeather':
        setCompany({ ...company, dailyReportWeather: data.target.value })
        break
      default:
        break
    }
  }

  useEffect(() => {
    console.log(company)
  }, [company])

  const storeTotalIndirectWorkForce = async (data) => {
    setTotalIndirectWorkForce(data)
  }

  const storeTotalDirectWorkForce = async (data) => {
    setTotalDirectWorkForce(data)
  }

  const storeDirectWorkForce = async (data) => {
    setDirectWorkForceList(data)
  }

  const storeIndirectWorkForceData = async (data) => {
    setIndirectWorkForceList(data)
  }

  const removeDirectWorkForce = async (id) => {
    const newData = directWorkForceList.filter((item) => item.id !== id)
    setDirectWorkForceList(newData)
  }

  const removeIndirectWorkForce = async (id) => {
    const newData = indirectWorkForceList.filter((item) => item.id !== id)
    setIndirectWorkForceList(newData)
  }

  const storeIndirectDotationWorkForceData = async (data) => {
    setIndirectDotationWorkForceList(data)
  }

  const removeIndirectDotationWorkForce = async (id) => {
    const newData = indirectDotationWorkForceList.filter((item) => item.id !== id)
    setIndirectDotationWorkForceList(newData)
  }

  const storeDirectDotationWorkForceData = async (data) => {
    setDirectDotationWorkForceList(data)
  }

  const removeDirectDotationWorkForce = async (id) => {
    const newData = directDotationWorkForceList.filter((item) => item.id !== id)
    setDirectDotationWorkForceList(newData)
  }

  const storeDotationWorkfoce = async (data) => {
    setWorkforceDotation(data)
  }

  const removeMachineryWorkForce = async (id) => {
    const newData = machineryWorkForceList.filter((item) => item.id !== id)
    setMachineryWorkForceList(newData)
  }

  const storeMachineryWorkForce = async (data) => {
    setMachineryWorkForceList(data)
  }

  const removeEquipmentWorkForce = async (id) => {
    const newData = equipmentWorkForceList.filter((item) => item.id !== id)
    setEquipmentWorkForceList(newData)
  }

  const storeEquipmentWorkForce = async (data) => {
    setEquipmentWorkForceList(data)
  }

  const removeVehicleWorkForce = async (id) => {
    const newData = vehicleWorkForceList.filter((item) => item.id !== id)
    setVehicletWorkForceList(newData)
  }

  const storeVehicleWorkForce = async (data) => {
    setVehicletWorkForceList(data)
  }

  const storeComment = async (data) => {
    setComments(data)
  }

  const storeIncident = async (data) => {
    setIncident(data)
  }

  const removeIncident = async (id) => {
    const newData = incident.filter((item) => item.id !== id)
    setIncident(newData)
  }

  const storeMachinery = async (data) => {
    setMachineryList(data)
  }

  const removeMachinery = async (id) => {
    const newData = machineryList.filter((item) => item.id !== id)
    setMachineryList(newData)
  }

  const storeEquipment = async (data) => {
    setEquipmentList(data)
  }

  const removeEquipment = async (id) => {
    const newData = equipmentList.filter((item) => item.id !== id)
    setEquipmentList(newData)
  }

  const storeVehicle = async (data) => {
    setVehicleList(data)
  }

  const removeVehicle = async (id) => {
    const newData = vehicleList.filter((item) => item.id !== id)
    setVehicleList(newData)
  }

  const storeActivity = async (data) => {
    setActivityList(data)
  }

  const removeActivity = async (id) => {
    const newData = activityList.filter((item) => item.id !== id)
    setActivityList(newData)
  }

  const storeAsarcoMachinery = async (data) => {
    setAsarcoMachineryList(data)
  }

  const removeAsarcoMachinery = async (id) => {
    const newData = asarcoMachineryList.filter((item) => item.id !== id)
    setAsarcoMachineryList(newData)
  }

  const storeEquipmentPlate = async (data) => {
    setEquipmentPlateList(data)
  }

  const removeEquipmentPlate = async (id) => {
    const newData = equipmentPlateList.filter((item) => item.id !== id)
    setEquipmentPlateList(newData)
  }

  const storeVehiclePlate = async (data) => {
    setVehiclePlateList(data)
  }

  const removeVehiclePlate = async (id) => {
    const newData = vehiclePlateList.filter((item) => item.id !== id)
    setVehiclePlateList(newData)
  }

  const storealjibe = async (data) => {
    setAljibeList(data)
  }

  const removealjibe = async (id) => {
    const newData = aljibeList.filter((item) => item.id !== id)
    setAljibeList(newData)
  }

  return (
    <DailyReportContext.Provider
      value={{
        company,
        totalIndirectWorkForce,
        directWorkForceList,
        storeCompanyData,
        storeIndirectWorkForceData,
        storeTotalIndirectWorkForce,
        totalIndirectWorkForce,
        storeDirectWorkForce,
        removeDirectWorkForce,
        indirectWorkForceList,
        removeIndirectWorkForce,
        indirectDotationWorkForceList,
        storeTotalDirectWorkForce,
        totalDirectWorkForce,
        storeIndirectDotationWorkForceData,
        removeIndirectDotationWorkForce,
        directDotationWorkForceList,
        storeDirectDotationWorkForceData,
        removeDirectDotationWorkForce,
        storeDotationWorkfoce,
        workforceDotation,
        machineryWorkForceList,
        removeMachineryWorkForce,
        storeMachineryWorkForce,
        storeEquipmentWorkForce,
        removeEquipmentWorkForce,
        equipmentWorkForceList,
        storeVehicleWorkForce,
        removeVehicleWorkForce,
        vehicleWorkForceList,
        storeComment,
        storeIncident,
        removeIncident,
        incident,
        comments,
        storeMachinery,
        removeMachinery,
        machineryList,
        storeEquipment,
        removeEquipment,
        equipmentList,
        storeVehicle,
        removeVehicle,
        vehicleList,
        storeActivity,
        removeActivity,
        activityList,
        storeAsarcoMachinery,
        removeAsarcoMachinery,
        asarcoMachineryList,
        storeEquipmentPlate,
        removeEquipmentPlate,
        equipmentPlateList,
        storeVehiclePlate,
        removeVehiclePlate,
        vehiclePlateList,
        storealjibe,
        removealjibe,
        aljibeList,
      }}
    >
      {children}
    </DailyReportContext.Provider>
  )
}

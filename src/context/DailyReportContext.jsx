import { React, useEffect, useState } from 'react'
import { createContext } from 'react'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import useRegisterGeneralData from 'src/hooks/useRegisterGeneralData'

export const DailyReportContext = createContext({
  data: null,
})

// eslint-disable-next-line react/prop-types
export const DailyReportProvider = ({ children }) => {
  const { getContract } = useRegisterGeneralData()

  const contractLS = JSON.parse(getContract())

  const { getData } = useGetCachedQueryData()

  const reportsQuery = getData('reports')

  const reportId = localStorage.getItem('daily_report')
  let selectedReport

  if (reportId && reportsQuery) {
    selectedReport = reportsQuery.find((report) => {
      return report.id.toString() === reportId.toString()
    })
  }

  const selectedCompany = selectedReport?.company
  const selectedIndirectWorkForceList = selectedReport?.indirectWorkForceList
  const selectedTotalIndirectWorkForce = selectedReport?.totalIndirectWorkForce
  const selectedDirectWorkForceList = selectedReport?.directWorkForceList
  const selectedTotalDirectWorkForce = selectedReport?.totalDirectWorkForce
  const selectedDirectDotationWorkForceList = selectedReport?.directDotationWorkForceList
  const selectedMachineryList = selectedReport?.machineryList
  const selectedMachineryWorkForceList = selectedReport?.machineryWorkForceList
  const selectedAsarcoMachineryList = selectedReport?.asarcoMachineryList
  const selectedEquipmentList = selectedReport?.equipmentList
  const selectedEquipmentWorkForceList = selectedReport?.equipmentWorkForceList
  const selectedVehicleList = selectedReport?.vehicleList
  const selectedActivityList = selectedReport?.activityList
  const selectedIncident = selectedReport?.incident
  const selectedEquipmentPlateList = selectedReport?.equipmentPlateList
  const selectedAljibeList = selectedReport?.aljibeList
  const selectedComment = selectedReport?.comment
  const selectedVehiclePlateList = selectedReport?.vehiclePlateList
  const selectedGraphList = selectedReport?.graphList

  const [company, setCompany] = useState({
    dailyReportContractManagerName: selectedCompany
      ? selectedCompany.dailyReportContractManagerName
      : undefined,
    dailyReportDate: selectedCompany ? selectedCompany.dailyReportDate : undefined,
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

  useEffect(() => {
    setCompany({
      dailyReportContractManagerName: selectedCompany
        ? selectedCompany.dailyReportContractManagerName
        : undefined,
      dailyReportDate: selectedCompany ? selectedCompany.dailyReportDate : undefined,
      dailyReportNumber: selectedCompany ? selectedCompany.dailyReportNumber : undefined,
      dailyReportContratistName: selectedCompany
        ? selectedCompany.dailyReportContratistName
        : undefined,
      dailyReportWeather: selectedCompany ? selectedCompany.dailyReportWeather : undefined,
      dailyReportContratistNumber: selectedCompany
        ? selectedCompany.dailyReportContratistNumber
        : undefined,
      dailyReportContractName: selectedCompany
        ? selectedCompany.dailyReportContractName
        : undefined,
      dailyReportDirectPersonalShift: selectedCompany
        ? selectedCompany.dailyReportDirectPersonalShift
        : undefined,
      dailyReportDirectPersonalHours: selectedCompany
        ? selectedCompany.dailyReportDirectPersonalHours
        : undefined,
      dailyReportDirectPersonalJourney: selectedCompany
        ? selectedCompany.dailyReportDirectPersonalJourney
        : undefined,
      dailyReportIndirectPersonalShift: selectedCompany
        ? selectedCompany.dailyReportIndirectPersonalShift
        : undefined,
      dailyReportIndirectPersonalHours: selectedCompany
        ? selectedCompany.dailyReportIndirectPersonalHours
        : undefined,
      dailyReportIndirectPersonalJourney: selectedCompany
        ? selectedCompany.dailyReportIndirectPersonalJourney
        : undefined,
    })
  }, [selectedCompany])

  useEffect(() => {
    setTotalIndirectWorkForce({
      indirectCurrentAccumulated: selectedTotalIndirectWorkForce?.indirectCurrentAccumulated,
      indirectPreviusAccumulated: selectedTotalIndirectWorkForce?.indirectPreviusAccumulated,
      indirectSubstotalHHNumber: selectedTotalIndirectWorkForce?.indirectSubstotalHHNumber,
      indirectSubtotalBreakNumber: selectedTotalIndirectWorkForce?.indirectSubtotalBreakNumber,
      indirectSubtotalCertifiedNumber:
        selectedTotalIndirectWorkForce?.indirectSubtotalCertifiedNumber,
      indirectSubtotalContractedNumber:
        selectedTotalIndirectWorkForce?.indirectSubtotalContractedNumber,
      indirectSubtotalOfferedNumber: selectedTotalIndirectWorkForce?.indirectSubtotalOfferedNumber,
      indirectSubtotalWorkNumber: selectedTotalIndirectWorkForce?.indirectSubtotalWorkNumber,
    })
  }, [selectedTotalIndirectWorkForce])

  const [totalDirectWorkForce, setTotalDirectWorkForce] = useState()

  useEffect(() => {
    setTotalDirectWorkForce({
      directCurrentAccumulated: selectedTotalDirectWorkForce?.directCurrentAccumulated,
      directPreviusAccumulated: selectedTotalDirectWorkForce?.directPreviusAccumulated,
      directSubstotalHHNumber: selectedTotalDirectWorkForce?.directSubstotalHHNumber,
      directSubtotalBreakNumber: selectedTotalDirectWorkForce?.directSubtotalBreakNumber,
      directSubtotalCertifiedNumber: selectedTotalDirectWorkForce?.directSubtotalCertifiedNumber,
      directSubtotalContractedNumber: selectedTotalDirectWorkForce?.directSubtotalContractedNumber,
      directSubtotalOfferedNumber: selectedTotalDirectWorkForce?.directSubtotalOfferedNumber,
      directSubtotalWorkNumber: selectedTotalDirectWorkForce?.directSubtotalWorkNumber,
    })
  }, [selectedTotalDirectWorkForce])

  const [machineryWorkForceList, setMachineryWorkForceList] = useState([])

  const [directWorkForceList, setDirectWorkForceList] = useState([]) // ANTES ERA UN ARRAY
  const [indirectWorkForceList, setIndirectWorkForceList] = useState([]) // ANTES ERA UN ARRAY
  const [indirectDotationWorkForceList, setIndirectDotationWorkForceList] = useState([]) // ANTES ERA UN ARRAY
  const [directDotationWorkForceList, setDirectDotationWorkForceList] = useState([]) // ANTES ERA UN ARRAY
  const [vehicleWorkForceList, setVehicletWorkForceList] = useState([])

  const [machineryList, setMachineryList] = useState([])

  useEffect(() => {
    const maList = []
    if (selectedMachineryList)
      for (let mach of selectedMachineryList) {
        const machMachinery = mach.machinery
        const actions = JSON.parse(mach.actions)
        maList.push({
          machinery: machMachinery,
          actions,
        })
      }
    setMachineryList(maList)
  }, [selectedMachineryList])

  const [totalIndirectWorkForce, setTotalIndirectWorkForce] = useState()

  useEffect(() => {
    setMachineryWorkForceList(selectedMachineryWorkForceList || [])
  }, [selectedMachineryWorkForceList])

  const [asarcoMachineryList, setAsarcoMachineryList] = useState([])

  useEffect(() => {
    setAsarcoMachineryList(selectedAsarcoMachineryList || [])
  }, [selectedAsarcoMachineryList])

  const [equipmentList, setEquipmentList] = useState([])

  useEffect(() => {
    const equipList = []
    if (selectedEquipmentList) {
      for (let equi of selectedEquipmentList) {
        const equipEquip = equi.equipment
        const actions = JSON.parse(equi.actions)
        equipList.push({
          equipment: equipEquip,
          actions,
        })
      }
    }
    setEquipmentList(equipList)
  }, [selectedEquipmentList])

  const [equipmentWorkForceList, setEquipmentWorkForceList] = useState([])

  useEffect(() => {
    setEquipmentWorkForceList(selectedEquipmentWorkForceList || [])
  }, [selectedEquipmentWorkForceList])

  const [vehicleList, setVehicleList] = useState([])

  useEffect(() => {
    const vehList = []
    if (selectedVehicleList) {
      for (let veh of selectedVehicleList) {
        const vehVehicle = veh.vehicle
        const actions = JSON.parse(veh.actions)
        vehList.push({
          vehicle: vehVehicle,
          actions,
        })
      }
    }
    setVehicleList(vehList)
  }, [selectedVehicleList])

  const [activityList, setActivityList] = useState([])

  useEffect(() => {
    setActivityList(selectedActivityList || [])
  }, [selectedActivityList])

  const [incident, setIncident] = useState([])

  useEffect(() => {
    setIncident(selectedIncident || [])
  }, [selectedIncident])

  const [equipmentPlateList, setEquipmentPlateList] = useState([])

  useEffect(() => {
    setEquipmentPlateList(selectedEquipmentPlateList || [])
  }, [selectedEquipmentPlateList])

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

  useEffect(() => {
    console.log('selectedIndirectWorkForceList', selectedIndirectWorkForceList)
    if (selectedIndirectWorkForceList) {
      setIndirectWorkForceList(selectedIndirectWorkForceList)
    }
  }, [selectedIndirectWorkForceList])

  useEffect(() => {
    if (selectedDirectWorkForceList) {
      setDirectWorkForceList(selectedDirectWorkForceList)
    }
  }, [selectedDirectWorkForceList])

  useEffect(() => {
    if (selectedDirectDotationWorkForceList)
      setDirectDotationWorkForceList(selectedDirectDotationWorkForceList)
  }, [selectedDirectDotationWorkForceList])

  const [aljibeList, setAljibeList] = useState([])

  useEffect(() => {
    setAljibeList(selectedAljibeList || [])
  }, [selectedAljibeList])

  const [comment, setComment] = useState('')

  useEffect(() => {
    setComment({ comment: selectedComment?.comment || '' })
  }, [selectedComment])

  const [vehiclePlateList, setVehiclePlateList] = useState([])

  useEffect(() => {
    setVehiclePlateList(selectedVehiclePlateList || [])
  }, [selectedVehiclePlateList])

  const storeCompanyData = async (data) => {
    switch (data.target.id) {
      case 'dailyReportDate':
        setCompany({
          ...company,
          dailyReportDate: data.target.value,
          dailyReportContratistNumber: contractLS.code,
          dailyReportContractName: contractLS.name,
        })
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

  const [graphList, setGraphList] = useState([])

  useEffect(() => {
    setGraphList(selectedGraphList || [])
  }, [selectedGraphList])

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
    setComment(data)
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

  const storeGraphs = async (data) => {
    let graph = []
    if (graphList.length === 0) {
      setGraphList([data])
    } else {
      const graphFilter = graphList?.filter((item) => item.name !== data.name)
      if (graphFilter.length === 0) {
        setGraphList([data])
      } else {
        graph = graphFilter
        graph.push(data)
        setGraphList(graph)
      }
    }
  }

  const clearContext = () => {
    setCompany({
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
    setTotalDirectWorkForce({
      directCurrentAccumulated: undefined,
      directPreviusAccumulated: undefined,
      directSubstotalHHNumber: undefined,
      directSubtotalBreakNumber: undefined,
      directSubtotalCertifiedNumber: undefined,
      directSubtotalContractedNumber: undefined,
      directSubtotalOfferedNumber: undefined,
      directSubtotalWorkNumber: undefined,
    })
    setMachineryWorkForceList([])
    setDirectWorkForceList([])
    setIndirectWorkForceList([])
    setIndirectDotationWorkForceList([])
    setDirectDotationWorkForceList([])
    setVehicletWorkForceList([])
    setMachineryList([])
    setTotalIndirectWorkForce({
      indirectCurrentAccumulated: undefined,
      indirectPreviusAccumulated: undefined,
      indirectSubstotalHHNumber: undefined,
      indirectSubtotalBreakNumber: undefined,
      indirectSubtotalCertifiedNumber: undefined,
      indirectSubtotalContractedNumber: undefined,
      indirectSubtotalOfferedNumber: undefined,
      indirectSubtotalWorkNumber: undefined,
    })
    setAsarcoMachineryList([])
    setEquipmentList([])
    setEquipmentWorkForceList([])
    setVehicleList([])
    setActivityList([])
    setIncident([])
    setEquipmentPlateList([])
    setWorkforceDotation({
      workforceDotationPersonalFront1: undefined,
      workforceDotationPersonalFront2: undefined,
      workforceDotationPersonalFront3: undefined,
      workforceDotationPersonalFront4: undefined,
      workforceDotationPersonalFront5: undefined,
      workforceDotationPersonalFront6: undefined,
      workforceDotationPersonalFront7: undefined,
      workforceDotationObservation: undefined,
    })
    setAljibeList([])
    setComment('')
    setVehiclePlateList([])
    setGraphList([])
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
        comment,
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
        clearContext,
        storeGraphs,
        graphList,
      }}
    >
      {children}
    </DailyReportContext.Provider>
  )
}

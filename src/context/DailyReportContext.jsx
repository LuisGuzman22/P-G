import { React, useEffect, useState } from 'react'
import { createContext } from 'react'

export const DailyReportContext = createContext({
  dailyReportDate: undefined,
  dailyReportNumber: undefined,
  dailyReportContratistName: undefined,
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
    dailyReportDate: undefined,
    dailyReportNumber: undefined,
    dailyReportContratistName: undefined,
    dailyReportContratistNumber: undefined,
    dailyReportContractName: undefined,
    dailyReportDirectPersonalShift: undefined,
    dailyReportDirectPersonalHours: undefined,
    dailyReportDirectPersonalJourney: undefined,
    dailyReportIndirectPersonalShift: undefined,
    dailyReportIndirectPersonalHours: undefined,
    dailyReportIndirectPersonalJourney: undefined,
  })

  const [totalIndirectWorkForce, setTotalIndirectWorkForce] = useState({
    indirectSubtotal: {
      offeredNumber: undefined,
      contractedNumber: undefined,
      certified: undefined,
      breakNumber: undefined,
      workNumber: undefined,
      hh: undefined,
    },
    indirectPreviusAccumulated: undefined,
    indirectCurrentAccumulated: undefined,
  })

  const [totalDirectWorkForce, setTotalDirectWorkForce] = useState({
    directSubtotal: {
      offeredNumber: undefined,
      contractedNumber: undefined,
      certified: undefined,
      breakNumber: undefined,
      workNumber: undefined,
      hh: undefined,
    },
    directPreviusAccumulated: undefined,
    directCurrentAccumulated: undefined,
  })

  const [directWorkForceList, setDirectWorkForceList] = useState([])
  const [indirectWorkForceList, setIndirectWorkForceList] = useState([])
  const [indirectDotationWorkForceList, setIndirectDotationWorkForceList] = useState([])
  const [directDotationWorkForceList, setDirectDotationWorkForceList] = useState([])
  const [machineryWorkForceList, setMachineryWorkForceList] = useState([])
  const [equipmentWorkForceList, setEquipmentWorkForceList] = useState([])
  const [vehicleWorkForceList, setVehicletWorkForceList] = useState([])
  const [comments, setComments] = useState('')
  const [incident, setIncident] = useState({
    incident: '',
    nonConformity: '',
  })

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
      default:
        break
    }
  }

  const storeTotalIndirectWorkForce = async (data) => {
    switch (data.target.id) {
      case 'indirectSubtotalOfferedNumber':
        setTotalIndirectWorkForce({
          ...totalIndirectWorkForce,
          indirectSubtotal: {
            ...totalIndirectWorkForce.indirectSubtotal,
            offeredNumber: data.target.value,
          },
        })
        break
      case 'indirectSubtotalContractedNumber':
        setTotalIndirectWorkForce({
          ...totalIndirectWorkForce,
          indirectSubtotal: {
            ...totalIndirectWorkForce.indirectSubtotal,
            contractedNumber: data.target.value,
          },
        })
        break
      case 'indirectSubtotalCertifiedNumber':
        setTotalIndirectWorkForce({
          ...totalIndirectWorkForce,
          indirectSubtotal: {
            ...totalIndirectWorkForce.indirectSubtotal,
            certified: data.target.value,
          },
        })
        break
      case 'indirectSubtotalBreakNumber':
        setTotalIndirectWorkForce({
          ...totalIndirectWorkForce,
          indirectSubtotal: {
            ...totalIndirectWorkForce.indirectSubtotal,
            breakNumber: data.target.value,
          },
        })
        break
      case 'indirectSubtotalWorkNumber':
        setTotalIndirectWorkForce({
          ...totalIndirectWorkForce,
          indirectSubtotal: {
            ...totalIndirectWorkForce.indirectSubtotal,
            workNumber: data.target.value,
          },
        })
        break
      case 'indirectSubtotalHHNumber':
        setTotalIndirectWorkForce({
          ...totalIndirectWorkForce,
          indirectSubtotal: {
            ...totalIndirectWorkForce.indirectSubtotal,
            hh: data.target.value,
          },
        })
        break
      case 'indirectPreviusAccumulated':
        setTotalIndirectWorkForce({
          ...totalIndirectWorkForce,
          indirectPreviusAccumulated: data.target.value,
        })
        break
      case 'indirectCurrentAccumulated':
        setTotalIndirectWorkForce({
          ...totalIndirectWorkForce,
          indirectCurrentAccumulated: data.target.value,
        })
        break
      default:
        break
    }
  }

  const storeTotalDirectWorkForce = async (data) => {
    switch (data.target.id) {
      case 'directSubtotalOfferedNumber':
        setTotalDirectWorkForce({
          ...totalDirectWorkForce,
          directSubtotal: {
            ...totalDirectWorkForce.directSubtotal,
            offeredNumber: data.target.value,
          },
        })
        break
      case 'directSubtotalContractedNumber':
        setTotalDirectWorkForce({
          ...totalDirectWorkForce,
          directSubtotal: {
            ...totalDirectWorkForce.directSubtotal,
            contractedNumber: data.target.value,
          },
        })
        break
      case 'directSubtotalCertifiedNumber':
        setTotalDirectWorkForce({
          ...totalDirectWorkForce,
          directSubtotal: {
            ...totalDirectWorkForce.directSubtotal,
            certified: data.target.value,
          },
        })
        break
      case 'directSubtotalBreakNumber':
        setTotalDirectWorkForce({
          ...totalDirectWorkForce,
          directSubtotal: {
            ...totalDirectWorkForce.directSubtotal,
            breakNumber: data.target.value,
          },
        })
        break
      case 'directSubtotalWorkNumber':
        setTotalDirectWorkForce({
          ...totalDirectWorkForce,
          directSubtotal: {
            ...totalDirectWorkForce.directSubtotal,
            workNumber: data.target.value,
          },
        })
        break
      case 'DirectSubtotalHHNumber':
        setTotalDirectWorkForce({
          ...totalDirectWorkForce,
          directSubtotal: {
            ...totalDirectWorkForce.directSubtotal,
            hh: data.target.value,
          },
        })
        break
      case 'directPreviusAccumulated':
        setTotalDirectWorkForce({
          ...totalDirectWorkForce,
          directPreviusAccumulated: data.target.value,
        })
        break
      case 'directCurrentAccumulated':
        setTotalDirectWorkForce({
          ...totalDirectWorkForce,
          directCurrentAccumulated: data.target.value,
        })
        break
      default:
        break
    }
  }

  useEffect(() => {
    console.log('totalDirectWorkForce', totalDirectWorkForce)
  }, [totalDirectWorkForce])

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

  useEffect(() => {
    console.log('incident', incident)
  }, [incident])

  return (
    <DailyReportContext.Provider
      value={{
        company,
        totalIndirectWorkForce,
        directWorkForceList,
        storeCompanyData,
        storeIndirectWorkForceData,
        storeTotalIndirectWorkForce,
        storeDirectWorkForce,
        removeDirectWorkForce,
        indirectWorkForceList,
        removeIndirectWorkForce,
        indirectDotationWorkForceList,
        storeTotalDirectWorkForce,
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
      }}
    >
      {children}
    </DailyReportContext.Provider>
  )
}

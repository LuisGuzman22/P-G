/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react'
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer'
import useRegisterGeneralData from 'src/hooks/useRegisterGeneralData'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import ReactDOMServer from 'react-dom/server'
import { Html } from 'react-pdf-html'
import firma1 from 'src/assets/images/firma1.png'
import firma2 from 'src/assets/images/firma2.png'
import firma3 from 'src/assets/images/firma3.png'
import not_found from 'src/assets/images/not_found.jpeg'

/**
 * 
 * @returns         <View>
          <Image
            style={styles.image}
            src="https://images.pexels.com/photos/20066389/pexels-photo-20066389/free-photo-of-a-bubble-is-floating-in-the-sky-over-trees.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
        </View>
 */
const Pdf = (props) => {
  const { getProject, getContract } = useRegisterGeneralData()
  const projectLS = JSON.parse(getProject())
  const contractLS = JSON.parse(getContract())

  const {
    company,
    indirectCompanyTurnList,
    indirectWorkForceList,
    totalIndirectWorkForce,
    directWorkForceList,
    totalDirectWorkForce,
    asarcoMachineryList,
    basicQuery,
    machineryList,
    equipmentPlateList,
    equipmentList,
    vehiclePlateList,
    vehicleList,
    activityList,
    aljibeList,
    comment,
    incident,
    directDotationWorkForceList,
    machineryWorkForceList,
    equipmentWorkForceList,
    graphList,
    photoList,
    barChartData,
    pieChartData,
  } = props
  const {
    indirectPersonal,
    directPersonal,
    machinery,
    equipment,
    vehicles,
    aljibe,
    workFront,
    weather,
    direct_staff_shift,
    indirect_staff_shift,
    shifts,
    diciplines,
  } = basicQuery
  // console.log('props', props.photoList)

  const [selectedWeather, setSelectedWeather] = useState('')
  const [selectedDirectStaffShift, setSelectedDirectStaffShift] = useState('')
  const [selectedIndirectStaffShift, setSelectedIndirectStaffShift] = useState('')
  const [selectedDirectShift, setSelectedDirectShift] = useState('')
  const [selectedIndirectShift, setSelectedIndirectShift] = useState('')
  const [selectedIndirectHours, setSelectedIndirectHours] = useState('')

  useEffect(() => {
    const weatherSel = company?.dailyReportWeather
      ? weather.find((weath) => weath.id === company?.dailyReportWeather)
      : undefined
    const directStaffShiftSel = company?.dailyReportDirectPersonalShift
      ? direct_staff_shift.find(
          (dss) => dss.id.toString() === company?.dailyReportDirectPersonalShift.toString(),
        )
      : undefined

    const directShiftSel = company?.dailyReportDirectPersonalJourney
      ? shifts.find(
          (shift) => shift.id.toString() === company?.dailyReportDirectPersonalJourney.toString(),
        )
      : undefined

    setSelectedWeather(weatherSel?.name || '')
    setSelectedDirectStaffShift(directStaffShiftSel?.name || '')
    setSelectedDirectShift(directShiftSel?.name || '')
  }, [company])

  const [totalMacOffered, setTotalMacOffered] = useState(0)
  const [totalMacCertified, setTotalMacCertified] = useState(0)
  const [totalMacWork, setTotalMacWork] = useState(0)
  const [totalMacEffectiveTime, setTotalMacEffectiveTime] = useState(0)
  const [totalMacUnscheduleMaintenance, setTotalMacUnscheduleMaintenance] = useState(0)
  const [totalMacScheduleMaintenance, setTotalMacScheduleMaintenance] = useState(0)
  const [totalMacUnscheduleDelay, setTotalMacUnscheduleDelay] = useState(0)
  const [totalMacScheduleDelay, setTotalMacScheduleDelay] = useState(0)
  const [totalMacReserves, setTotalMacReserves] = useState(0)
  const [totalMacOpperationalLoss, setTotalMacOpperationalLoss] = useState(0)
  const [totalMacHorometer, setTotalMacHorometer] = useState(0)

  useEffect(() => {
    let macOffered = 0
    let macCertified = 0
    let macWork = 0
    let macEffectiveTime = 0
    let macUnscheduleMaintenance = 0
    let macScheduleMaintenance = 0
    let macUnscheduleDelay = 0
    let macScheduleDelay = 0
    let macReserves = 0
    let macOperationalLoss = 0
    let macHorometer = 0
    machineryList.map((mac) => {
      macOffered = macOffered + Number(mac.actions.machineryOfferedNumber)
      macCertified = macCertified + Number(mac.actions.machineryCertifiedNumber)
      macWork = macWork + Number(mac.actions.machineryWorkNumber)

      const selectedAsarco = asarcoMachineryList.find((asarco) => {
        return asarco.machinery === mac.machinery
      })

      macEffectiveTime =
        macEffectiveTime + Number(selectedAsarco?.asarcoMachineryEffectiveTime || 0)
      macUnscheduleMaintenance =
        macUnscheduleMaintenance + Number(selectedAsarco?.asarcoMachineryUnscheduleMaintenance)
      macScheduleMaintenance =
        macScheduleMaintenance + Number(selectedAsarco?.asarcoMachineryScheduleMaintenance)
      macUnscheduleDelay =
        macUnscheduleDelay + Number(selectedAsarco?.asarcoMachineryUnscheduleDelay)
      macScheduleDelay = macScheduleDelay + Number(selectedAsarco?.asarcoMachineryScheduleDelay)
      macReserves = macReserves + Number(selectedAsarco?.asarcoMachineryReserves)
      macOperationalLoss =
        macOperationalLoss + Number(selectedAsarco?.asarcoMachineryOpperationalLoss)
      macHorometer = macHorometer + Number(selectedAsarco?.asarcoMachineryHorometer)
    })

    setTotalMacOffered(macOffered)
    setTotalMacCertified(macCertified)
    setTotalMacWork(macWork)
    setTotalMacEffectiveTime(macEffectiveTime)
    setTotalMacUnscheduleMaintenance(macUnscheduleMaintenance)
    setTotalMacScheduleMaintenance(macScheduleMaintenance)
    setTotalMacUnscheduleDelay(macUnscheduleDelay)
    setTotalMacScheduleDelay(macScheduleDelay)
    setTotalMacReserves(macReserves)
    setTotalMacOpperationalLoss(macOperationalLoss)
    setTotalMacHorometer(macHorometer)
  }, [machineryList])

  const concatWithPipe = (arr) => {
    return arr
      .map((str, index) => {
        if (index < arr.length - 1) {
          return str + ' | '
        }
        return str
      })
      .join('')
  }
  useEffect(() => {
    let shiftList = []
    let journeyList = []
    let hourList = []
    indirectCompanyTurnList.map((indirect) => {
      const indirectStaffShiftSel = indirect_staff_shift.find(
        (iss) => iss.id.toString() === indirect.dailyReportIndirectPersonalShift.toString(),
      )

      shiftList.push(indirectStaffShiftSel.name)

      const indirectShiftSel = shifts.find(
        (shift) => shift.id.toString() === indirect.dailyReportIndirectPersonalJourney.toString(),
      )

      journeyList.push(indirectShiftSel.name)

      hourList.push(indirect.dailyReportIndirectPersonalHours)
    })

    setSelectedIndirectStaffShift(concatWithPipe(shiftList))
    setSelectedIndirectShift(concatWithPipe(journeyList))
    setSelectedIndirectHours(concatWithPipe(hourList))
  }, [indirectCompanyTurnList])

  const [totalEquipOffered, setTotalEquipOffered] = useState(0)
  const [totalEquipCertified, setTotalEquipCertified] = useState(0)
  const [totalEquipWork, setTotalEquipWork] = useState(0)
  const [totalEquipEffectiveTime, setTotalEquipEffectiveTime] = useState(0)
  const [totalEquipCorrectiveMaintenance, setTotalEquipCorrectiveMaintenance] = useState(0)
  const [totalEquipPreventiveMaintenance, setTotalEquipPreventiveMaintenance] = useState(0)
  const [totalEquipOutOfService, setTotalEquipOutOfService] = useState(0)
  const [totalEquipWaiting, setTotalEquipWaiting] = useState(0)
  const [totalEquipNoOperator, setTotalEquipNoOperator] = useState(0)
  const [totalEquipInitialHorometer, setTotalEquipInitialHorometer] = useState(0)
  const [totalEquipFinalHorometer, setTotalEquipFinalHorometer] = useState(0)

  useEffect(() => {
    let equipOffered = 0
    let equipCertified = 0
    let equipWork = 0
    let equipEffectiveTime = 0
    let equipCorrectiveMaintenance = 0
    let equipPreventiveMaintenance = 0
    let equipOutOfService = 0
    let equipWaiting = 0
    let equipNoOperator = 0
    let equipInitialHorometer = 0
    let equipFinalHorometer = 0

    equipmentList.map((equi) => {
      equipOffered = equipOffered + Number(equi.actions.equipmentOfferedNumber)
      equipCertified = equipCertified + Number(equi.actions.equipmentCertifiedNumber)
      equipWork = equipWork + Number(equi.actions.equipmentWorkNumber)

      const selectedEquipmentPlate = equipmentPlateList.find((equipPlate) => {
        return equipPlate.equipment === equi.equipment
      })
      equipEffectiveTime =
        equipEffectiveTime + Number(selectedEquipmentPlate?.equipmentEffectiveTime || 0)
      equipCorrectiveMaintenance =
        equipCorrectiveMaintenance + Number(selectedEquipmentPlate?.equipmentCorrectiveMaintenance)
      equipPreventiveMaintenance =
        equipPreventiveMaintenance + Number(selectedEquipmentPlate?.equipmentPreventiveMaintenance)
      equipOutOfService = equipOutOfService + Number(selectedEquipmentPlate?.equipmentOutOfService)
      equipWaiting = equipWaiting + Number(selectedEquipmentPlate?.equipmentWaiting)
      equipNoOperator = equipNoOperator + Number(selectedEquipmentPlate?.equipmentNoOperator)
      equipInitialHorometer =
        equipInitialHorometer + Number(selectedEquipmentPlate?.equipmentInitialHorometer)
      equipFinalHorometer =
        equipFinalHorometer + Number(selectedEquipmentPlate?.equipmentFinalHorometer)
    })

    setTotalEquipOffered(equipOffered)
    setTotalEquipCertified(equipCertified)
    setTotalEquipWork(equipWork)
    setTotalEquipEffectiveTime(equipEffectiveTime)
    setTotalEquipCorrectiveMaintenance(equipCorrectiveMaintenance)
    setTotalEquipPreventiveMaintenance(equipPreventiveMaintenance)
    setTotalEquipOutOfService(equipOutOfService)
    setTotalEquipWaiting(equipWaiting)
    setTotalEquipNoOperator(equipNoOperator)
    setTotalEquipInitialHorometer(equipInitialHorometer)
    setTotalEquipFinalHorometer(equipFinalHorometer)
  }, [equipmentList])

  const [totalVehicOffered, setTotalVehicOffered] = useState(0)
  const [totalVehicCertified, setTotalVehicCertified] = useState(0)
  const [totalVehicWork, setTotalVehicWork] = useState(0)
  const [totalVehicEffectiveTime, setTotalVehicEffectiveTime] = useState(0)
  const [totalVehicCorrectiveMaintenance, setTotalVehicCorrectiveMaintenance] = useState(0)
  const [totalVehicPreventiveMaintenance, setTotalVehicPreventiveMaintenance] = useState(0)
  const [totalVehicOutOfService, setTotalVehicOutOfService] = useState(0)
  const [totalVehicWaiting, setTotalVehicWaiting] = useState(0)
  const [totalVehicNoOperator, setTotalVehicNoOperator] = useState(0)
  const [totalVehicInitialHorometer, setTotalVehicInitialHorometer] = useState(0)
  const [totalVehicFinalHorometer, setTotalVehicFinalHorometer] = useState(0)

  useEffect(() => {
    let vehicOffered = 0
    let vehicCertified = 0
    let vehicWork = 0
    let vehicEffectiveTime = 0
    let vehicCorrectiveMaintenance = 0
    let vehicPreventiveMaintenance = 0
    let vehicOutOfService = 0
    let vehicWaiting = 0
    let vehicNoOperator = 0
    let vehicInitialHorometer = 0
    let vehicFinalHorometer = 0

    vehicleList.map((veh) => {
      vehicOffered = vehicOffered + Number(veh.actions.vehicleOfferedNumber)
      vehicCertified = vehicCertified + Number(veh.actions.vehicleCertifiedNumber)
      vehicWork = vehicWork + Number(veh.actions.vehicleWorkNumber)

      const selectedVehiclePlate = vehiclePlateList.find((VehicPlate) => {
        return VehicPlate.vehicle === veh.vehicle
      })

      vehicEffectiveTime =
        vehicEffectiveTime + Number(selectedVehiclePlate?.vehicleEffectiveTime || 0)
      vehicCorrectiveMaintenance =
        vehicCorrectiveMaintenance + Number(selectedVehiclePlate?.vehicleCorrectiveMaintenance)
      vehicPreventiveMaintenance =
        vehicPreventiveMaintenance + Number(selectedVehiclePlate?.vehiclePreventiveMaintenance)
      vehicOutOfService = vehicOutOfService + Number(selectedVehiclePlate?.vehicleOutOfService)
      vehicWaiting = vehicWaiting + Number(selectedVehiclePlate?.vehicleWaiting)
      vehicNoOperator = vehicNoOperator + Number(selectedVehiclePlate?.vehicleNoOperator)
      vehicInitialHorometer =
        vehicInitialHorometer + Number(selectedVehiclePlate?.vehicleInitialHorometer)
      vehicFinalHorometer =
        vehicFinalHorometer + Number(selectedVehiclePlate?.vehicleFinalHorometer)
    })

    setTotalVehicOffered(vehicOffered)
    setTotalVehicCertified(vehicCertified)
    setTotalVehicWork(vehicWork)
    setTotalVehicEffectiveTime(vehicEffectiveTime)
    setTotalVehicCorrectiveMaintenance(vehicCorrectiveMaintenance)
    setTotalVehicPreventiveMaintenance(vehicPreventiveMaintenance)
    setTotalVehicOutOfService(vehicOutOfService)
    setTotalVehicWaiting(vehicWaiting)
    setTotalVehicNoOperator(vehicNoOperator)
    setTotalVehicInitialHorometer(vehicInitialHorometer)
    setTotalVehicFinalHorometer(vehicFinalHorometer)
  }, [vehicleList])

  const [imagenColumnChart, setImagenColumnChart] = useState('')
  const [imagenPieChart, setImagenPieChart] = useState('')

  useEffect(() => {
    const dotationChart = graphList?.find((graph) => graph.name === 'dotationChart')
    const asarcoChart = graphList?.find((graph) => graph.name === 'asarcoChart')
    setImagenColumnChart(dotationChart?.value || '')
    setImagenPieChart(asarcoChart?.value || '')
  }, [graphList])

  // const toDataURL = (url) =>
  //   fetch(url, { mode: 'no-cors' })
  //     .then((response) => response.blob())
  //     .then(
  //       (blob) =>
  //         new Promise((resolve, reject) => {
  //           const reader = new FileReader()
  //           reader.onloadend = () => resolve(reader.result)
  //           reader.onerror = reject
  //           reader.readAsDataURL(blob)
  //         }),
  //     )

  // toDataURL('https://pyg-production.up.railway.app/storage/report-images/8/copia.jpeg')
  //   .then((dataUrl) => {
  //     console.log('RESULT:', dataUrl)
  //   })
  //   .catch((err) => {
  //     console.log('err', err)
  //   })

  // const fetchPromise = fetch(
  //   'https://pyg-production.up.railway.app/storage/report-images/8/copia.jpeg',
  //   { mode: 'no-cors' },
  // )

  // fetchPromise
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log('fetch 2 ok', data)
  //   })
  //   .catch((err) => {
  //     console.log('fetch 2 err', err)
  //   })

  const element = (
    <html>
      <body>
        <style>
          {`
        .heading4 {
          color: white;
        }
        pre {
          background-color: #eee;
          padding: 10px;
        }
        .img{
          width: 20px;
          height: 20px;
        }
        table, th, td {
            border: 1px solid black;
        }
        td {
          font-size: 14;
          padding: 5px;
          text-align: center;
        }
        .td-workers-label {
          background-color: #028080;
          color: white;
        }
        .td-machinery-label {
          background-color: #c2f0c8;
        }
        .td-workers-name {
          text-align: left;
        }
        .td-green-label {
          background-color: #3c7d23;
          color: white;
        }
        .td-total-label{
          background-color: #ffcc66;
        }
        .td-label {
          background-color: #006666;
          color: white;
        }
        .td-label-gray {
          background-color: #818181;
          color: white;
        }`}
        </style>

        <table border={1}>
          <tbody>
            <tr>
              <td className="td-label">Informe diario N°</td>
              <td>{company?.dailyReportNumber}</td>
              <td className="td-label">Clima</td>
              <td>{selectedWeather || ''}</td>
              <td className="td-label">Fecha</td>
              <td>{company?.dailyReportDate}</td>
            </tr>
            <tr>
              <td className="td-label">Nombre de contratista</td>
              <td>{company?.dailyReportContratistName}</td>
              <td className="td-label" colSpan="2">
                Personal Directo
              </td>
              <td className="td-label"></td>

              <td className="td-label" colSpan={2}>
                Personal Indirecto
              </td>
              <td className="td-label"></td>
            </tr>
            <tr>
              <td className="td-label">N° de Contrato</td>
              <td>{contractLS.code}</td>
              <td className="td-label">Turno</td>
              <td>{selectedDirectStaffShift}</td>
              <td className="td-label">Turno</td>
              <td>{selectedIndirectStaffShift}</td>
            </tr>
            <tr>
              <td className="td-label">Nombre de Contrato</td>
              <td>{company?.dailyReportContractName}</td>
              <td className="td-label">Horas Turno</td>
              <td>{company?.dailyReportDirectPersonalHours}</td>
              <td className="td-label">Horas Turno</td>
              <td>{selectedIndirectHours}</td>
            </tr>
            <tr>
              <td className="td-label">Nombre del Administrador de Contrato</td>
              <td>{company?.dailyReportContractManagerName}</td>
              <td className="td-label">Jornada</td>
              <td>{selectedDirectShift}</td>
              <td className="td-label">Jornada</td>
              <td>{selectedIndirectShift}</td>
            </tr>
          </tbody>
        </table>
        <table border={1}>
          <tbody>
            <tr>
              <td className="td-label" style={{ textAlign: 'center' }}>
                FUERZA LABORAL CONTRATISTA
              </td>
            </tr>
          </tbody>
        </table>
        <table border={1}>
          <tbody>
            <tr>
              <td className="td-workers-label">INDIRECTOS</td>
              <td className="td-green-label">N° Ofertado</td>
              <td className="td-workers-label">N° Contratados</td>
              <td className="td-workers-label">Acreditados</td>
              <td className="td-workers-label">N° Descanso</td>
              <td className="td-workers-label">N° Obra</td>
              <td className="td-workers-label">HH (turno)</td>
            </tr>
            {indirectWorkForceList.length > 0 && (
              <>
                {indirectWorkForceList.map((data) => {
                  const selectedIndirectPersonal = indirectPersonal.find((personal) => {
                    return personal.id === data.indirectWorkForce
                  })
                  return (
                    <tr key={data.id}>
                      <td className="td-workers-name">{selectedIndirectPersonal?.name || ''}</td>
                      <td className="td-green-label">{data.offeredNumber}</td>
                      <td className="">{data.contractedNumber}</td>
                      <td className="">{data.certified}</td>
                      <td className="">{data.breakNumber}</td>
                      <td className="">{data.workNumber}</td>
                      <td className="">{data.hh}</td>
                    </tr>
                  )
                })}
              </>
            )}
            {totalIndirectWorkForce && (
              <>
                <tr>
                  <td className="td-workers-label">Subtotal Indirectos</td>
                  <td className="td-green-label">
                    {totalIndirectWorkForce.indirectSubtotalOfferedNumber}
                  </td>
                  <td className="td-workers-label">
                    {totalIndirectWorkForce.indirectSubtotalContractedNumber}
                  </td>
                  <td className="td-workers-label">
                    {totalIndirectWorkForce.indirectSubtotalCertifiedNumber}
                  </td>
                  <td className="td-workers-label">
                    {totalIndirectWorkForce.indirectSubtotalBreakNumber}
                  </td>
                  <td className="td-workers-label">
                    {totalIndirectWorkForce.indirectSubtotalWorkNumber}
                  </td>
                  <td className="td-workers-label">
                    {totalIndirectWorkForce.indirectSubstotalHHNumber}
                  </td>
                </tr>
                <tr>
                  <td className="td-workers-label">Total HH Indirectos Acumulado Anterior</td>
                  <td className="td-workers-label">
                    {totalIndirectWorkForce.indirectPreviusAccumulated}
                  </td>
                </tr>
                <tr>
                  <td className="td-workers-label">Total HH Indirectos Acumulado Actual</td>
                  <td className="td-workers-label">
                    {totalIndirectWorkForce.indirectCurrentAccumulated}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
        <table border={1}>
          <tbody>
            <tr>
              <td className="td-workers-label">Directos</td>
              <td className="td-green-label">Dotación Planeada</td>
              <td className="td-workers-label">N° Contratados</td>
              <td className="td-workers-label">Acreditados</td>
              <td className="td-workers-label">N° Descanso</td>
              <td className="td-workers-label">N° Obra</td>
              <td className="td-workers-label">HH (turno)</td>
              {workFront
                .sort((a, b) => a.id - b.id)
                .map((wf) => {
                  return (
                    <>
                      <td className="td-machinery-label">{wf.name}</td>
                    </>
                  )
                })}
            </tr>
            {directWorkForceList.length > 0 && (
              <>
                {directWorkForceList.map((data) => {
                  const selectedDirectPersonal = directPersonal.find((personal) => {
                    return personal.id === data.directWorkForce
                  })
                  return (
                    <tr key={data.id}>
                      <td className="td-workers-name">{selectedDirectPersonal?.name || ''}</td>
                      <td className="td-green-label">{data.offeredNumber}</td>
                      <td className="">{data.contractedNumber}</td>
                      <td className="">{data.certified}</td>
                      <td className="">{data.breakNumber}</td>
                      <td className="">{data.workNumber}</td>
                      <td className="">{data.hh}</td>
                      {workFront
                        .sort((a, b) => a.id - b.id)
                        .map((wf) => {
                          const selectedDotation = directDotationWorkForceList.find((dot) => {
                            return dot.directWorkFront === wf.id
                          })

                          return (
                            <>
                              <td className="">
                                {selectedDotation?.directWorkFrontQuantity || ''}
                              </td>
                            </>
                          )
                        })}
                    </tr>
                  )
                })}
              </>
            )}
            {totalDirectWorkForce && (
              <>
                <tr>
                  <td className="td-workers-label">Subtotal directos</td>
                  <td className="td-green-label">
                    {totalDirectWorkForce.directSubtotalOfferedNumber}
                  </td>
                  <td className="td-workers-label">
                    {totalDirectWorkForce.directSubtotalContractedNumber}
                  </td>
                  <td className="td-workers-label">
                    {totalDirectWorkForce.directSubtotalCertifiedNumber}
                  </td>
                  <td className="td-workers-label">
                    {totalDirectWorkForce.directSubtotalBreakNumber}
                  </td>
                  <td className="td-workers-label">
                    {totalDirectWorkForce.directSubtotalWorkNumber}
                  </td>
                  <td className="td-workers-label">
                    {totalDirectWorkForce.directSubstotalHHNumber}
                  </td>
                  {workFront
                    .sort((a, b) => a.id - b.id)
                    .map((wf) => {
                      return (
                        <>
                          <td className=""></td>
                        </>
                      )
                    })}
                </tr>
                <tr>
                  <td className="td-workers-label">Total HH Directos Acumulado Anterior</td>
                  <td className="td-workers-label">
                    {totalDirectWorkForce.directPreviusAccumulated}
                  </td>
                </tr>
                <tr>
                  <td className="td-workers-label">Total HH Directos Acumulado Actual</td>
                  <td className="td-workers-label">
                    {totalDirectWorkForce.directCurrentAccumulated}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
        <table border={1}>
          <tbody>
            <tr>
              <td className="td-label" style={{ textAlign: 'center' }}>
                EQUIPOS Y MAQUINARIAS CONTRATISTA
              </td>
            </tr>
          </tbody>
        </table>
        {asarcoMachineryList.length > 0 && (
          <>
            <table border={1}>
              <tbody>
                <tr>
                  <td className="td-machinery-label">MAQUINARIA (NOMBRE)</td>
                  <td className="td-machinery-label">PATENTE</td>
                  <td className="td-machinery-label">N° Maq oferta</td>
                  <td className="td-machinery-label">N° Maq Acreditados</td>
                  <td className="td-machinery-label">N° Maq en Obra</td>
                  <td className="td-machinery-label">Tiempo Efectivo (Hrs)</td>
                  <td className="td-machinery-label">Mantención No Programada (Hrs)</td>
                  <td className="td-machinery-label">Mantención Programada (Hrs)</td>
                  <td className="td-machinery-label">Demora No Programada (Hrs)</td>
                  <td className="td-machinery-label">Demora Programada (Hrs)</td>
                  <td className="td-machinery-label">Reservas (Hrs)</td>
                  <td className="td-machinery-label">Perdida Operacional (Hrs)</td>
                  <td className="td-machinery-label">Horometro</td>
                  {workFront
                    .sort((a, b) => a.id - b.id)
                    .map((wf) => {
                      return (
                        <>
                          <td className="td-machinery-label">{wf.name}</td>
                        </>
                      )
                    })}
                </tr>
                {machineryList.length > 0 && (
                  <>
                    {machineryList.map((data) => {
                      const selectedAsarco = asarcoMachineryList.find((asarco) => {
                        return asarco.machinery === data.machinery
                      })
                      if (selectedAsarco) {
                        const selectedMachinery = machinery.find((mac) => {
                          return mac.id === selectedAsarco.machinery
                        })

                        const selectedPlate = selectedMachinery.plate.find((plate) => {
                          return plate.id === selectedAsarco.machineryPlate
                        })

                        return (
                          <tr key={data.id}>
                            <td className="">{selectedMachinery.name ?? ''}</td>
                            <td className="">{selectedPlate.label ?? ''}</td>
                            <td className="">{data.actions.machineryOfferedNumber}</td>
                            <td className="">{data.actions.machineryCertifiedNumber}</td>
                            <td className="">{data.actions.machineryWorkNumber}</td>
                            <td className="">{selectedAsarco.asarcoMachineryEffectiveTime || 0}</td>
                            <td className="">
                              {selectedAsarco.asarcoMachineryUnscheduleMaintenance}
                            </td>
                            <td className="">
                              {selectedAsarco.asarcoMachineryScheduleMaintenance}
                            </td>
                            <td className="">{selectedAsarco.asarcoMachineryUnscheduleDelay}</td>
                            <td className="">{selectedAsarco.asarcoMachineryScheduleDelay}</td>
                            <td className="">{selectedAsarco.asarcoMachineryReserves}</td>
                            <td className="">{selectedAsarco.asarcoMachineryOpperationalLoss}</td>
                            <td className="">{selectedAsarco.asarcoMachineryHorometer}</td>
                            {workFront
                              .sort((a, b) => a.id - b.id)
                              .map((wf) => {
                                const selectedDotation = machineryWorkForceList.find((dot) => {
                                  return dot.machineryWorkForce === wf.id
                                })

                                return (
                                  <>
                                    <td className="">
                                      {selectedDotation?.machineryWorkFrontQuantity || ''}
                                    </td>
                                  </>
                                )
                              })}
                          </tr>
                        )
                      }
                    })}
                    <tr>
                      <td className="td-total-label">Total</td>
                      <td className="td-total-label"></td>
                      <td className="td-total-label">{totalMacOffered}</td>
                      <td className="td-total-label">{totalMacCertified}</td>
                      <td className="td-total-label">{totalMacWork}</td>
                      <td className="td-total-label">{totalMacEffectiveTime}</td>
                      <td className="td-total-label">{totalMacUnscheduleMaintenance}</td>
                      <td className="td-total-label">{totalMacScheduleMaintenance}</td>
                      <td className="td-total-label">{totalMacUnscheduleDelay}</td>
                      <td className="td-total-label">{totalMacScheduleDelay}</td>
                      <td className="td-total-label">{totalMacReserves}</td>
                      <td className="td-total-label">{totalMacOpperationalLoss}</td>
                      <td className="td-total-label">{totalMacHorometer}</td>
                      {workFront
                        .sort((a, b) => a.id - b.id)
                        .map((wf) => {
                          return (
                            <>
                              <td className="td-total-label"></td>
                            </>
                          )
                        })}
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </>
        )}
        {equipmentPlateList.length > 0 && (
          <>
            <table border={1}>
              <tbody>
                <tr>
                  <td className="td-machinery-label">EQUIPO (NOMBRE)</td>
                  <td className="td-machinery-label">PATENTE</td>
                  <td className="td-machinery-label">N° Equipos oferta</td>
                  <td className="td-machinery-label">N° Equipos Acreditados</td>
                  <td className="td-machinery-label">N° Equipos en Obra</td>
                  <td className="td-machinery-label">Operativos (Hrs)</td>
                  <td className="td-machinery-label">Mantención Correctiva (Hrs)</td>
                  <td className="td-machinery-label">Mantención Preventiva (Hrs)</td>
                  <td className="td-machinery-label">Fuera de Servicio (Hrs)</td>
                  <td className="td-machinery-label">En espera (Hrs)</td>
                  <td className="td-machinery-label">Sin Operador (hrs)</td>
                  <td className="td-machinery-label">Horometro Inicial</td>
                  <td className="td-machinery-label">Horometro Final</td>
                  {workFront
                    .sort((a, b) => a.id - b.id)
                    .map((wf) => {
                      return (
                        <>
                          <td className="td-machinery-label">{wf.name}</td>
                        </>
                      )
                    })}
                </tr>
                {equipmentList.length > 0 && (
                  <>
                    {equipmentList.map((data) => {
                      const selectedEquipmentPlate = equipmentPlateList.find((equipPlate) => {
                        return equipPlate.equipment === data.equipment
                      })
                      if (selectedEquipmentPlate) {
                        const selectedEquipment = equipment.find((eq) => {
                          return eq.id === selectedEquipmentPlate.equipment
                        })

                        const selectedPlate = selectedEquipment.plate.find((plate) => {
                          return plate.id === selectedEquipmentPlate.equipmentPlate
                        })

                        return (
                          <tr key={data.id}>
                            <td className="">{selectedEquipment.name ?? ''}</td>
                            <td className="">{selectedPlate.label ?? ''}</td>
                            <td className="">{data.actions.equipmentOfferedNumber}</td>
                            <td className="">{data.actions.equipmentCertifiedNumber}</td>
                            <td className="">{data.actions.equipmentWorkNumber}</td>
                            <td className="">
                              {selectedEquipmentPlate.equipmentEffectiveTime || 0}
                            </td>
                            <td className="">
                              {selectedEquipmentPlate.equipmentCorrectiveMaintenance}
                            </td>
                            <td className="">
                              {selectedEquipmentPlate.equipmentPreventiveMaintenance}
                            </td>
                            <td className="">{selectedEquipmentPlate.equipmentOutOfService}</td>
                            <td className="">{selectedEquipmentPlate.equipmentWaiting}</td>
                            <td className="">{selectedEquipmentPlate.equipmentNoOperator}</td>
                            <td className="">{selectedEquipmentPlate.equipmentInitialHorometer}</td>
                            <td className="">{selectedEquipmentPlate.equipmentFinalHorometer}</td>
                            {workFront
                              .sort((a, b) => a.id - b.id)
                              .map((wf) => {
                                const selectedDotation = equipmentWorkForceList.find((dot) => {
                                  return dot.equipmentWorkForce === wf.id
                                })

                                return (
                                  <>
                                    <td className="">
                                      {selectedDotation?.equipmentWorkFrontQuantity || ''}
                                    </td>
                                  </>
                                )
                              })}
                          </tr>
                        )
                      }
                    })}
                    <tr>
                      <td className="td-total-label">Total</td>
                      <td className="td-total-label"></td>
                      <td className="td-total-label">{totalEquipOffered}</td>
                      <td className="td-total-label">{totalEquipCertified}</td>
                      <td className="td-total-label">{totalEquipWork}</td>
                      <td className="td-total-label">{totalEquipEffectiveTime}</td>
                      <td className="td-total-label">{totalEquipCorrectiveMaintenance}</td>
                      <td className="td-total-label">{totalEquipPreventiveMaintenance}</td>
                      <td className="td-total-label">{totalEquipOutOfService}</td>
                      <td className="td-total-label">{totalEquipWaiting}</td>
                      <td className="td-total-label">{totalEquipNoOperator}</td>
                      <td className="td-total-label">{totalEquipInitialHorometer}</td>
                      <td className="td-total-label">{totalEquipFinalHorometer}</td>
                      {workFront
                        .sort((a, b) => a.id - b.id)
                        .map((wf) => {
                          return (
                            <>
                              <td className="td-total-label"></td>
                            </>
                          )
                        })}
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </>
        )}

        {vehiclePlateList.length > 0 && (
          <>
            <table border={1}>
              <tbody>
                <tr>
                  <td className="td-machinery-label">VEHICULOS MENORES (NOMBRE)</td>
                  <td className="td-machinery-label">PATENTE</td>
                  <td className="td-machinery-label">N° Vehículos oferta</td>
                  <td className="td-machinery-label">N° Vehículos Acreditados</td>
                  <td className="td-machinery-label">N° Vehículos en Obra</td>
                  <td className="td-machinery-label">Operativos (Hrs)</td>
                  <td className="td-machinery-label">Mantención Correctiva (Hrs)</td>
                  <td className="td-machinery-label">Mantención Preventiva (Hrs)</td>
                  <td className="td-machinery-label">Fuera de Servicio (Hrs)</td>
                  <td className="td-machinery-label">En espera (Hrs)</td>
                  <td className="td-machinery-label">Sin Operador (hrs)</td>
                  <td className="td-machinery-label">Horometro Inicial</td>
                  <td className="td-machinery-label">Horometro Final</td>
                </tr>
                {vehicleList.length > 0 && (
                  <>
                    {vehicleList.map((data) => {
                      const selectedVehiclePlate = vehiclePlateList.find((vehPlate) => {
                        return vehPlate.vehicle === data.vehicle
                      })
                      if (selectedVehiclePlate) {
                        const selectedVehicle = vehicles.find((veh) => {
                          return veh.id === selectedVehiclePlate.vehicle
                        })

                        const selectedPlate = selectedVehicle.plate.find((plate) => {
                          return plate.id === selectedVehiclePlate.vehiclePlate
                        })

                        return (
                          <tr key={data.id}>
                            <td className="">{selectedVehicle.name ?? ''}</td>
                            <td className="">{selectedPlate.label ?? ''}</td>
                            <td className="">{data.actions.vehicleOfferedNumber}</td>
                            <td className="">{data.actions.vehicleCertifiedNumber}</td>
                            <td className="">{data.actions.vehicleWorkNumber}</td>
                            <td className="">{selectedVehiclePlate.vehicleEffectiveTime || 0}</td>
                            <td className="">
                              {selectedVehiclePlate.vehicleCorrectiveMaintenance}
                            </td>
                            <td className="">
                              {selectedVehiclePlate.vehiclePreventiveMaintenance}
                            </td>
                            <td className="">{selectedVehiclePlate.vehicleOutOfService}</td>
                            <td className="">{selectedVehiclePlate.vehicleWaiting}</td>
                            <td className="">{selectedVehiclePlate.vehicleNoOperator}</td>
                            <td className="">{selectedVehiclePlate.vehicleInitialHorometer}</td>
                            <td className="">{selectedVehiclePlate.vehicleFinalHorometer}</td>
                          </tr>
                        )
                      }
                    })}
                    <tr>
                      <td className="td-total-label">Total</td>
                      <td className="td-total-label"></td>
                      <td className="td-total-label">{totalVehicOffered}</td>
                      <td className="td-total-label">{totalVehicCertified}</td>
                      <td className="td-total-label">{totalVehicWork}</td>
                      <td className="td-total-label">{totalVehicEffectiveTime}</td>
                      <td className="td-total-label">{totalVehicCorrectiveMaintenance}</td>
                      <td className="td-total-label">{totalVehicPreventiveMaintenance}</td>
                      <td className="td-total-label">{totalVehicOutOfService}</td>
                      <td className="td-total-label">{totalVehicWaiting}</td>
                      <td className="td-total-label">{totalVehicNoOperator}</td>
                      <td className="td-total-label">{totalVehicInitialHorometer}</td>
                      <td className="td-total-label">{totalVehicFinalHorometer}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </>
        )}

        <table border={1}>
          <tbody>
            <tr>
              <td className="td-label" style={{ textAlign: 'center' }}>
                DESCRIPCIÓN DE LAS ACTIVIDADES DESARROLLADAS
              </td>
            </tr>
          </tbody>
        </table>
        <table border={1}>
          <tbody>
            <tr>
              <td className="td-machinery-label">ID actividad Primavera</td>
              <td className="td-machinery-label">Nombre de actividad</td>
              <td className="td-machinery-label">Disciplina</td>
              <td className="td-machinery-label">Cantidad Total</td>
              <td className="td-machinery-label">Cantidad Acum anterior</td>
              <td className="td-machinery-label">Cantidad Real turno</td>
              <td className="td-machinery-label">% Avance Acumulado</td>
              <td className="td-machinery-label">Unidad</td>
              <td className="td-machinery-label">HH gastada Anterior</td>
              <td className="td-machinery-label">HH gastada Real Turno</td>
              <td className="td-machinery-label">HH gastada Acumulada</td>
            </tr>
            {activityList.length > 0 && (
              <>
                {activityList.map((activity) => {
                  const selectedDicipline = diciplines.find((dicipline) => {
                    return dicipline.id.toString() === activity.activityDiscipline.toString()
                  })
                  return (
                    <tr key={activity.id}>
                      <td className="">{activity.primaveraId}</td>
                      <td className="">{activity.activityName}</td>
                      <td className="">{selectedDicipline.name}</td>
                      <td className="">{activity.activityTotalAmount}</td>
                      <td className="">{activity.activityPreviousAcumulatedAmount}</td>
                      <td className="">{activity.activityActualShiftQuantity}</td>
                      <td className="">{activity.activityAccumulatedAdvancePercent}</td>
                      <td className="">{activity.activityUnit}</td>
                      <td className="">{activity.activityHoursSpendPrevius}</td>
                      <td className="">{activity.activityHoursSpendShift}</td>
                      <td className="">{activity.activityHoursAccumulated}</td>
                    </tr>
                  )
                })}
              </>
            )}
          </tbody>
        </table>
        {aljibeList.length > 0 && (
          <>
            <table border={1}>
              <tbody>
                <tr>
                  <td className="td-label" style={{ textAlign: 'center' }}>
                    CONTROL DE AGUAS INDUSTRIALES UTILIZAD
                  </td>
                </tr>
              </tbody>
            </table>
            <table border={1}>
              <tbody>
                <tr>
                  <td className="td-machinery-label">VEHICULOS MENORES (NOMBRE)</td>
                  <td className="td-machinery-label">PATENTE</td>
                  <td className="td-machinery-label">Nombre Cachimba</td>
                  <td className="td-machinery-label">m3</td>
                </tr>
                {aljibeList.length > 0 && (
                  <>
                    {aljibeList.map((al) => {
                      const selectedAljibe = aljibe.find((alji) => {
                        return alji.aljibe === aljibe.id
                      })

                      const selectedPlate = selectedAljibe.plate.find((plate) => {
                        return plate.id.toString() == al.aljibePlate.toString()
                      })

                      return (
                        <tr key={al.id}>
                          <td className="">{selectedAljibe?.name}</td>
                          <td className="">{selectedPlate?.label}</td>
                          <td className="">{al.aljibeCachimbaName}</td>
                          <td className="">{al.aljibeM3}</td>
                        </tr>
                      )
                    })}
                  </>
                )}
                <tr>
                  <td>Total m3</td>
                  <td></td>
                  <td></td>
                  <td>{aljibeList[0]?.aljibeM3Accumulated || 0}</td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        <table border={1}>
          <tbody>
            <tr>
              <td className="td-label" style={{ textAlign: 'center' }}>
                COMENTARIOS Y ALERTAS EN GENERAL
              </td>
            </tr>
            <tr>
              <td className="">{comment.comment}</td>
            </tr>
          </tbody>
        </table>
        <table border={1}>
          <tbody>
            <tr>
              <td className="td-label" style={{ textAlign: 'center' }}>
                INCIDENTES, LESIONES O EVENTOS
              </td>
              <td className="td-label" style={{ textAlign: 'center' }}>
                NO CONFORMIDADES O INTERFERENCIAS
              </td>
            </tr>
            {incident.length > 0 && (
              <>
                {incident.map((inci) => {
                  return (
                    <tr key={inci.id}>
                      <td>{inci.incident}</td>
                      <td>{inci.nonConformity}</td>
                    </tr>
                  )
                })}
              </>
            )}
          </tbody>
        </table>
        <table border={1}>
          <tbody>
            <tr>
              <td className="td-label" style={{ textAlign: 'center' }}>
                FOTOGRAFÍAS
              </td>
            </tr>
          </tbody>
        </table>
        <table border={1}>
          <tbody>
            <tr>
              {photoList.map((photo, i) => {
                // console.log(`https://mpm.pgproject.cl${photo.url}`)
                return (
                  <td className="" style={{ textAlign: 'center' }} key={i}>
                    <div style={{ textAlign: 'center', width: '100%' }}>
                      <img
                        src={photo.base64}
                        // src={`https://mpm.pgproject.cl${photo.url}`}
                        // src={not_found}
                        style={{ width: '500px', height: '500px', textAlign: 'center' }}
                      />
                      <label style={{ textAlign: 'justify' }}>{photo.description}</label>
                    </div>
                  </td>
                )
              })}
            </tr>

            {/* <tr>
              <td className="" style={{ textAlign: 'center' }}>
                <img
                  src="https://pyg-production.up.railway.app/storage/report-images/10/copia.jpeg"
                  style={{ width: '50%', textAlign: 'center' }}
                />
              </td>
            </tr> */}
          </tbody>
        </table>
        <table border={1}>
          <tbody>
            <tr>
              <td className="td-label" style={{ textAlign: 'center' }}>
                GRÁFICOS DEL DÍA
              </td>
            </tr>
          </tbody>
        </table>
        <table border={1}>
          <tbody>
            <tr>
              <td className="" style={{ textAlign: 'center' }}>
                <table>
                  <tr>
                    <td>Dotación planeada directos total</td>
                    <td>{barChartData?.totalPlanedDotation || 0}</td>
                  </tr>
                  <tr>
                    <td>Dotación directos obra total</td>
                    <td>{barChartData?.totalWorkDotation || 0}</td>
                  </tr>
                </table>
                <img src={imagenColumnChart} style={{ width: '100%', textAlign: 'center' }} />
              </td>
              <td className="" style={{ textAlign: 'center' }}>
                <table>
                  <tr>
                    <td>Tiempo Efectivo (Hrs)</td>
                    <td>{pieChartData?.effectiveTime || 0}</td>
                  </tr>
                  <tr>
                    <td>Mantención Programada (Hrs)</td>
                    <td>{pieChartData?.scheduleMaintimeTime || 0}</td>
                  </tr>
                  <tr>
                    <td>Demora Programada (Hrs)</td>
                    <td>{pieChartData?.scheduleDelay || 0}</td>
                  </tr>
                  <tr>
                    <td>Perdida Operacional (Hrs)</td>
                    <td>{pieChartData?.opperationalLoss || 0}</td>
                  </tr>
                  <tr>
                    <td>Mantención No Programada (Hrs)</td>
                    <td>{pieChartData?.unscheduleMaintimeTime || 0}</td>
                  </tr>
                  <tr>
                    <td>Demora No Programada (Hrs)</td>
                    <td>{pieChartData?.unscheduleDelay || 0}</td>
                  </tr>
                  <tr>
                    <td>Reservas (Hrs)</td>
                    <td>{pieChartData?.reserves || 0}</td>
                  </tr>
                </table>
                <img src={imagenPieChart} style={{ width: '100%', textAlign: 'center' }} />
              </td>
            </tr>
          </tbody>
        </table>
        <table border={1}>
          <tbody>
            <tr>
              <td className="td-label" style={{ textAlign: 'center' }}>
                CUADRO FIRMAS
              </td>
            </tr>
          </tbody>
        </table>
        <table border={1}>
          <tbody>
            <tr>
              <td className="td-label" style={{ textAlign: 'center' }}>
                Encargado de terreno
              </td>
              <td className="td-label" style={{ textAlign: 'center' }}>
                Encargado Oficina Técnica
              </td>
              <td className="td-label" style={{ textAlign: 'center' }}>
                Administrador de contrato
              </td>
              <td
                className="td-label-gray"
                style={{ textAlign: 'center', backgroundColor: '#818181' }}
              >
                ITO Construcción
              </td>
              <td
                className="td-label-gray"
                style={{ textAlign: 'center', backgroundColor: '#818181' }}
              >
                Minera Centinela
              </td>
            </tr>
          </tbody>
        </table>
        <table border={1}>
          <tbody>
            <tr>
              <td className="">Nombre</td>
              <td className=""></td>
              <td className="">Nombre</td>
              <td className=""></td>
              <td className="">Nombre</td>
              <td className=""></td>
              <td className="">Nombre</td>
              <td className=""></td>
              <td className="">Nombre</td>
              <td className=""></td>
            </tr>
            <tr>
              <td className="">Firma</td>
              <td className="">
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                {/* <img src={firma2} style={{ width: 'auto' }} /> */}
              </td>
              <td className="">Firma</td>
              <td className="">
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                {/* <img src={firma3} style={{ width: 'auto' }} /> */}
              </td>
              <td className="">Firma</td>
              <td className="">
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                {/* <img src={firma1} style={{ width: 'auto' }} /> */}
              </td>
              <td className="">Firma</td>
              <td className="">
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                {/* <img src={firma1} style={{ width: 'auto' }} /> */}
              </td>
              <td className="">Firma</td>
              <td className="">
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                {/* <img src={firma1} style={{ width: 'auto' }} /> */}
              </td>
            </tr>
            <tr>
              <td className="">Fecha</td>
              <td>{company?.dailyReportDate}</td>
              <td className="">Fecha</td>
              <td>{company?.dailyReportDate}</td>
              <td className="">Fecha</td>
              <td>{company?.dailyReportDate}</td>
              <td className="">Fecha</td>
              <td>{company?.dailyReportDate}</td>
              <td className="">Fecha</td>
              <td>{company?.dailyReportDate}</td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  )

  const html = ReactDOMServer.renderToStaticMarkup(element)

  return (
    <Document>
      <Page size="2A0" orientation="landscape">
        <Html>{html}</Html>
      </Page>
    </Document>
  )
}

export default Pdf

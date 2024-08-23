import React, { useEffect, useRef, useState } from 'react'
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CButton,
  CCol,
  CRow,
} from '@coreui/react'
import CompanyReport from './daily-report/company-report'
import IndirectWorkForce from './daily-report/indirect-work-force'
import TotalIndirectWorkForce from './daily-report/total-indirect-work-force'
import TotalDirectWorkForce from './daily-report/total-direct-work-force'
import IndirectDotationWorkForce from './daily-report/indirect-dotation-work-force'
import DirectDotationWorkForce from './daily-report/direct-dotation-work-force'
import DotationWorkForce from './daily-report/dotation-work-force'
import Machinery from './daily-report/machinery'
import MachineryWorkForce from './daily-report/machinery-work-force'
import EquipmentMachinery from './daily-report/equipment-machinery'
import EquipmentWorkForce from './daily-report/equipment-work-force'
import Vehicle from './daily-report/vehicle'
import VehicleWorkForce from './daily-report/vehicle-work-force'
import Activities from './daily-report/activities'
import Comments from './daily-report/comments'
import Graphs from './daily-report/graphs'
import Incidents from './daily-report/incidents'
import DirectWorkForce from './daily-report/direct-work-force'
import useRegisterDailyReport from 'src/hooks/useRegisterDailyReport'
import AsarcoMachinery from './daily-report/asarco-machinery'
import EquipmentPlate from './daily-report/equipment-plate'
import VehiclePlate from './daily-report/vehicle-plate'
import IndustrialWaterControl from './daily-report/industrial-water-control'
import PhotoRecord from './daily-report/photo-record'
import { useLocation, useNavigate } from 'react-router-dom'
import ModalSendDailyReport from './ModalSendDailyReport'
import { PDFDownloadLink } from '@react-pdf/renderer'
import Pdf from './Pdf'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import Loading from './loading'
import Skeleton from 'react-loading-skeleton'

import { Chart } from 'react-google-charts'
import { toPng } from 'html-to-image'
import { useFetchReportData } from 'src/hooks/useFetch'

const DailyReportViewCollapse = () => {
  const currentLocation = useLocation().pathname
  const isViewMode = currentLocation.includes('/view')

  const { isFetching } = useFetchReportData()

  const [visibleSendDailyReportModal, setVisibleSendDailyReportModal] = useState(false)
  const {
    company,
    indirectCompanyTurnList,
    indirectWorkForceList,
    totalIndirectWorkForce,
    directWorkForceList,
    totalDirectWorkForce,
    asarcoMachineryList,
    machineryList,
    equipmentList,
    equipmentPlateList,
    vehicleList,
    vehiclePlateList,
    activityList,
    aljibeList,
    comment,
    incident,
    directDotationWorkForceList,
    machineryWorkForceList,
    equipmentWorkForceList,
    graphList,
    photoList,
    loadData,
  } = useRegisterDailyReportCompany()

  const [isLoading, setIsloading] = useState(false)
  const [blobData, setBlobData] = useState()
  const [url, setUrl] = useState()
  const [pdfName, setPdfName] = useState('')

  useEffect(() => {
    if (!isFetching) loadData()
  }, [isFetching])

  const [totalPlanedDotation, setTotalPlanedDotation] = useState(0)
  const [totalWorkDotation, setTotalWorkDotation] = useState(0)

  useEffect(() => {
    setTotalPlanedDotation(totalDirectWorkForce.directSubtotalOfferedNumber)
    setTotalWorkDotation(totalDirectWorkForce.directSubtotalWorkNumber)
  }, [totalDirectWorkForce])

  const [effectiveTime, setEffectiveTime] = useState(0)
  const [scheduleMaintimeTime, setScheduleMaintimeTime] = useState(0)
  const [scheduleDelay, setScheduleDelay] = useState(0)
  const [opperationalLoss, setOpperationalLoss] = useState(0)
  const [unscheduleMaintimeTime, setUnscheduleMaintimeTime] = useState(0)
  const [unscheduleDelay, setUnscheduleDelay] = useState(0)
  const [reserves, setReserves] = useState(0)
  const [totals, setTotals] = useState(0)
  const [showAsarcoChart, setShowAsarcoChart] = useState(false)
  useEffect(() => {
    for (let asarcoData of asarcoMachineryList) {
      setShowAsarcoChart(true)
      setTotals(
        totals +
          Number(asarcoData.asarcoMachineryEffectiveTime) +
          Number(asarcoData.asarcoMachineryScheduleMaintenance) +
          Number(asarcoData.asarcoMachineryScheduleDelay) +
          Number(asarcoData.asarcoMachineryOpperationalLoss) +
          Number(asarcoData.asarcoMachineryUnscheduleMaintenance) +
          Number(asarcoData.asarcoMachineryUnscheduleDelay) +
          Number(asarcoData.asarcoMachineryReserves),
      )
      setEffectiveTime(effectiveTime + Number(asarcoData.asarcoMachineryEffectiveTime))
      setScheduleMaintimeTime(
        scheduleMaintimeTime + Number(asarcoData.asarcoMachineryScheduleMaintenance),
      )
      setScheduleDelay(scheduleDelay + Number(asarcoData.asarcoMachineryScheduleDelay))
      setOpperationalLoss(opperationalLoss + Number(asarcoData.asarcoMachineryOpperationalLoss))
      setUnscheduleMaintimeTime(
        unscheduleMaintimeTime + Number(asarcoData.asarcoMachineryUnscheduleMaintenance),
      )
      setUnscheduleDelay(unscheduleDelay + Number(asarcoData.asarcoMachineryUnscheduleDelay))
      setReserves(reserves + Number(asarcoData.asarcoMachineryReserves))
    }
  }, [asarcoMachineryList])

  const { getData } = useGetCachedQueryData()
  const basicQuery = getData('basics')

  const { registerData } = useRegisterDailyReport()

  const registerDailyReport = () => {
    if (isViewMode) {
      setVisibleSendDailyReportModal(!visibleSendDailyReportModal)
    } else {
      registerData()
    }
  }

  useEffect(() => {
    setPdfName(
      `${company?.dailyReportContractName?.replaceAll(' ', '_')}-${company.dailyReportNumber}.pdf`,
    )
  }, [company])

  return (
    <div className="dailyReport">
      {!isFetching && (
        <>
          {visibleSendDailyReportModal && (
            <ModalSendDailyReport
              visible={true}
              sendDataToParent={async (data) => {
                setVisibleSendDailyReportModal(data)
              }}
            />
          )}
          <div>
            <PDFDownloadLink
              document={
                <Pdf
                  company={company}
                  indirectCompanyTurnList={indirectCompanyTurnList}
                  indirectWorkForceList={indirectWorkForceList}
                  basicQuery={basicQuery}
                  totalIndirectWorkForce={totalIndirectWorkForce}
                  directWorkForceList={directWorkForceList}
                  totalDirectWorkForce={totalDirectWorkForce}
                  asarcoMachineryList={asarcoMachineryList}
                  machineryList={machineryList}
                  equipmentList={equipmentList}
                  equipmentPlateList={equipmentPlateList}
                  vehiclePlateList={vehiclePlateList}
                  vehicleList={vehicleList}
                  activityList={activityList}
                  aljibeList={aljibeList}
                  comment={comment}
                  incident={incident}
                  directDotationWorkForceList={directDotationWorkForceList}
                  machineryWorkForceList={machineryWorkForceList}
                  equipmentWorkForceList={equipmentWorkForceList}
                  graphList={graphList}
                  photoList={photoList}
                  barChartData={{ totalPlanedDotation, totalWorkDotation }}
                  pieChartData={{
                    effectiveTime,
                    scheduleMaintimeTime,
                    scheduleDelay,
                    opperationalLoss,
                    unscheduleMaintimeTime,
                    unscheduleDelay,
                    reserves,
                  }}
                />
              }
              fileName={pdfName || 'Reporte 1.pdf'}
            >
              {({ blob, url, loading, error }) => {
                setIsloading(loading)
                setBlobData(blob)
                setUrl(url)
                return loading ? 'Generando documento...' : 'Descargar PDF'
              }}
            </PDFDownloadLink>
          </div>
          {!isLoading && url && blobData ? (
            <>
              <CAccordion className="dailyReport-accordion" activeItemKey={1}>
                <CAccordionItem itemKey={1}>
                  <CAccordionHeader>1) Empresa</CAccordionHeader>
                  <CAccordionBody className="dailyReport-accordion">
                    <CompanyReport />
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={2}>
                  <CAccordionHeader>2) Fuerza de trabajo personal indirecto</CAccordionHeader>
                  <CAccordionBody className="dailyReport-accordion">
                    <IndirectWorkForce />
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={3}>
                  <CAccordionHeader>3) Fuerza laboral total personal indirecto</CAccordionHeader>
                  <CAccordionBody className="dailyReport-accordion">
                    <TotalIndirectWorkForce />
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={4}>
                  <CAccordionHeader>
                    4) Fuerza laboral contratista personal directo
                  </CAccordionHeader>
                  <CAccordionBody className="dailyReport-accordion">
                    <DirectWorkForce />
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={5}>
                  <CAccordionHeader>5) Fuerza laboral total personal directo</CAccordionHeader>
                  <CAccordionBody className="dailyReport-accordion">
                    <TotalDirectWorkForce />
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={6}>
                  <CAccordionHeader>
                    6) Dotación por frente de trabajo personal directo
                  </CAccordionHeader>
                  <CAccordionBody className="dailyReport-accordion">
                    <DirectDotationWorkForce />
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={7}>
                  <CAccordionHeader>7) Maquinarias contratistas</CAccordionHeader>
                  <CAccordionBody className="dailyReport-accordion">
                    <Machinery />
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={8}>
                  <CAccordionHeader>8) Maquinarias por frente de trabajo</CAccordionHeader>
                  <CAccordionBody className="dailyReport-accordion">
                    <MachineryWorkForce />
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={9}>
                  <CAccordionHeader>9) ASARCO Maquinarias</CAccordionHeader>
                  <CAccordionBody className="dailyReport-accordion">
                    <AsarcoMachinery />
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={10}>
                  <CAccordionHeader>10) Equipos contratistas</CAccordionHeader>
                  <CAccordionBody className="dailyReport-accordion">
                    <EquipmentMachinery />
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={11}>
                  <CAccordionHeader>11) Equipos con patentes contratistas</CAccordionHeader>
                  <CAccordionBody className="dailyReport-accordion">
                    <EquipmentPlate />
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={12}>
                  <CAccordionHeader>12) Equipos por frente de trabajo</CAccordionHeader>
                  <CAccordionBody className="dailyReport-accordion">
                    <EquipmentWorkForce />
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={13}>
                  <CAccordionHeader>13) Vehículos menores contratistas</CAccordionHeader>
                  <CAccordionBody className="dailyReport-accordion">
                    <Vehicle />
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={14}>
                  <CAccordionHeader>
                    14) Vehículos con patente menores contratistas
                  </CAccordionHeader>
                  <CAccordionBody className="dailyReport-accordion">
                    <VehiclePlate />
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={15}>
                  <CAccordionHeader>15) Descripción de actividades desarrolladas</CAccordionHeader>
                  <CAccordionBody className="dailyReport-accordion">
                    <Activities />
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={16}>
                  <CAccordionHeader>16) Control de aguas industriales utilizadas</CAccordionHeader>
                  <CAccordionBody className="dailyReport-accordion">
                    <IndustrialWaterControl />
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={17}>
                  <CAccordionHeader>17) Comentarios y alertas en general</CAccordionHeader>
                  <CAccordionBody className="dailyReport-accordion">
                    <Comments />
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={18}>
                  <CAccordionHeader>18) Registro fotográfico diario</CAccordionHeader>
                  <CAccordionBody className="dailyReport-accordion">
                    <PhotoRecord />
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={19}>
                  <CAccordionHeader>19) Incidentes, lesiones o eventos</CAccordionHeader>
                  <CAccordionBody className="dailyReport-accordion">
                    <Incidents />
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={20}>
                  <CAccordionHeader>20) Firmas</CAccordionHeader>
                  <CAccordionBody className="dailyReport-accordion">
                    <></>
                  </CAccordionBody>
                </CAccordionItem>
              </CAccordion>
              {/* <CButton
                className="btn-project-action"
                onClick={() => {
                  // registerData()
                  registerDailyReport()
                }}
              >
                Registrar informe diario
              </CButton> */}
            </>
          ) : (
            <>
              <Skeleton count={2} />
            </>
          )}
        </>
      )}
    </div>
  )
}

export default DailyReportViewCollapse

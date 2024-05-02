import React, { useEffect, useRef, useState } from 'react'
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CButton,
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

// import { Chart } from 'react-google-charts'
// import { toPng } from 'html-to-image'

const DailyReportCollapse = () => {
  const currentLocation = useLocation().pathname
  const isEditMode = currentLocation.includes('/edit')
  const navigate = useNavigate()
  // const elementRef = useRef(null)

  const [visibleSendDailyReportModal, setVisibleSendDailyReportModal] = useState(false)
  const {
    company,
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
  } = useRegisterDailyReportCompany()
  const [imagen, setImagen] = useState()

  const [isLoading, setIsloading] = useState(false)
  const [blobData, setBlobData] = useState()
  const [url, setUrl] = useState()

  useEffect(() => {
    if (!company.dailyReportDate) window.location.reload()
  }, [company])

  const { getData } = useGetCachedQueryData()
  const basicQuery = getData('basics')

  const { registerData } = useRegisterDailyReport()

  const registerDailyReport = () => {
    if (isEditMode) {
      setVisibleSendDailyReportModal(!visibleSendDailyReportModal)
    } else {
      registerData()
    }
  }

  // const data = [
  //   ['Element', 'Density', { role: 'style' }],
  //   ['Copper', 8.94, '#b87333'], // RGB value
  //   ['Silver', 10.49, 'silver'], // English color name
  //   ['Gold', 19.3, 'gold'],
  //   ['Platinum', 21.45, 'color: #e5e4e2'], // CSS-style declaration
  // ]

  // useEffect(() => {
  //   htmlToImageConvert()
  // }, [])

  // const htmlToImageConvert = () => {
  //   setImagen()
  //   console.log('convirtiendo')
  //   toPng(elementRef.current, { cacheBust: false })
  //     .then((dataUrl) => {
  //       console.log('dataUrl', dataUrl)
  //       setImagen(dataUrl)
  //       // const link = document.createElement('a')
  //       // console.log('link', link)
  //       // link.download = 'my-image-name.png'
  //       // link.href = dataUrl
  //       // link.click()
  //     })
  //     .catch((err) => {
  //       console.log('ERROR', err)
  //     })
  // }

  // useEffect(() => {
  //   if (elementRef.current) {
  //     htmlToImageConvert()
  //   }
  // }, [elementRef])

  // useEffect(() => {
  //   console.log('imagen', imagen === undefined || imagen.includes('data:,'))
  //   if (imagen === undefined || imagen.includes('data:,')) {
  //     htmlToImageConvert()
  //   }
  // }, [imagen])

  return (
    <div className="dailyReport">
      {visibleSendDailyReportModal && (
        <ModalSendDailyReport
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleSendDailyReportModal(data)
          }}
        />
      )}
      <div>
        {/* <div ref={elementRef}>
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="400px"
            data={data}
            onSuccess={() => {
              console.log('success')
            }}
          />
        </div> */}

        <PDFDownloadLink
          document={
            <Pdf
              company={company}
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
              image={imagen}
            />
          }
          fileName="Reporte 1.pdf"
        >
          {({ blob, url, loading, error }) => {
            // console.log('blob', blob)
            // console.log('url', url)
            // console.log('loading', loading)
            // console.log('error', error)
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
              <CAccordionHeader>4) Fuerza laboral contratista personal directo</CAccordionHeader>
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
              <CAccordionHeader>14) Vehículos con patente menores contratistas</CAccordionHeader>
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
            <CAccordionItem itemKey={19}>
              <CAccordionHeader>19) Registro fotográfico diario</CAccordionHeader>
              <CAccordionBody className="dailyReport-accordion">
                <PhotoRecord />
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={20}>
              <CAccordionHeader>20) Graficos del día</CAccordionHeader>
              <CAccordionBody className="dailyReport-accordion">
                <Graphs />
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={21}>
              <CAccordionHeader>21) Incidentes, lesiones o eventos</CAccordionHeader>
              <CAccordionBody className="dailyReport-accordion">
                <Incidents />
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={22}>
              <CAccordionHeader>22) Firmas</CAccordionHeader>
              <CAccordionBody className="dailyReport-accordion">
                <></>
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
          <CButton
            className="btn-project-action"
            onClick={() => {
              // registerData()
              registerDailyReport()
            }}
          >
            Registrar informe diario
          </CButton>
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </div>
  )
}

export default DailyReportCollapse
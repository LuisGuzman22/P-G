import React, { useState, useEffect } from 'react'
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CToast,
  CToastBody,
} from '@coreui/react'
import CompanyReport from './daily-report/company-report'
import IndirectWorkForce from './daily-report/indirect-work-force'
import TotalIndirectWorkForce from './daily-report/total-indirect-work-force'
import TotalDirectWorkForce from './daily-report/total-direct-work-force'
import DirectDotationWorkForce from './daily-report/direct-dotation-work-force'
import Machinery from './daily-report/machinery'
import MachineryWorkForce from './daily-report/machinery-work-force'
import EquipmentMachinery from './daily-report/equipment-machinery'
import EquipmentWorkForce from './daily-report/equipment-work-force'
import Vehicle from './daily-report/vehicle'
import Activities from './daily-report/activities'
import Comments from './daily-report/comments'
import Incidents from './daily-report/incidents'
import DirectWorkForce from './daily-report/direct-work-force'
import useRegisterDailyReport from 'src/hooks/useRegisterDailyReport'
import AsarcoMachinery from './daily-report/asarco-machinery'
import EquipmentPlate from './daily-report/equipment-plate'
import VehiclePlate from './daily-report/vehicle-plate'
import IndustrialWaterControl from './daily-report/industrial-water-control'
import PhotoRecord from './daily-report/photo-record'
import { useNavigate, useLocation } from 'react-router-dom'
import Loading from './loading'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import { useFetchReportData } from 'src/hooks/useFetch'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'
import Skeleton from 'react-loading-skeleton'

const DailyReportCollapse = () => {
  const { registerData, loading, error, success, errorMessage } = useRegisterDailyReport()
  const { loadData } = useRegisterDailyReportCompany()
  const navigate = useNavigate()
  const { getData } = useGetCachedQueryData()
  const reportsQuery = getData('reports')
  const [visible, setVisible] = useState(false)
  const currentLocation = useLocation().pathname
  const { isFetching } = useFetchReportData()

  // useEffect(() => {
  //   if (isCreatingMode) {
  //     localStorage.removeItem('daily_report')
  //     clearData()
  //   }
  // }, [])

  // useEffect(() => {
  //   console.log('report id', localStorage.getItem('daily_report'))
  //   loadData()
  // }, [localStorage.getItem('daily_report')])

  // useEffect(() => {
  //   if (!isFetching) loadData()
  // }, [isFetching])

  useEffect(() => {}, [loading])

  const [showError, setShowError] = useState(false)
  useEffect(() => {
    if (error) setShowError(true)
  }, [error])

  useEffect(() => {
    if (success) navigate(`/inicio`)
  }, [success])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setVisible(reportsQuery !== undefined && reportsQuery.length > 0)
  }, [reportsQuery])

  const handleLoadData = () => {
    setVisible(false)
    // console.log('reportsQuery', reportsQuery)
    // console.log('reportsQuery.length', reportsQuery.length - 1)
    // console.log('reportsQuery[reportsQuery.length].id', reportsQuery[reportsQuery.length - 1].id)
    localStorage.setItem('daily_report', reportsQuery[reportsQuery.length - 1].id)
    loadData()
  }

  return (
    <div className="dailyReport">
      <CModal
        scrollable
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="ScrollingLongContentExampleLabel2"
        size="xl"
        className="project-creation-modal"
      >
        <CModalHeader>
          {/* <CModalTitle id="ScrollingLongContentExampleLabel2">Categorías</CModalTitle> */}
        </CModalHeader>
        <CModalBody>¿Quieres pre cargar los datos del informe diario del día anterior?</CModalBody>
        <CModalFooter>
          <CButton
            className="cancel-btn"
            onClick={() => {
              setVisible(false)
            }}
          >
            No cargar
          </CButton>
          {!isFetching ? (
            <CButton
              className="confirm-btn"
              onClick={() => {
                localStorage.removeItem('daily_report')
                handleLoadData()
              }}
            >
              Cargar
            </CButton>
          ) : (
            <Skeleton width={100} height={40} />
          )}
        </CModalFooter>
      </CModal>
      {!visible && (
        <>
          <CAccordion className="dailyReport-accordion" activeItemKey={1}>
            <CAccordionItem itemKey={1}>
              <CAccordionHeader className="custom-accordion-header">
                1) Empresa
                <div className="corner-colors">
                  <div className="color-box yellow"></div>
                  <div className="color-box red"></div>
                  <div className="color-box light-blue"></div>
                  <div className="color-box dark-blue"></div>
                  <div className="color-box gray"></div>
                </div>
              </CAccordionHeader>
              <CAccordionBody className="dailyReport-accordion">
                <CompanyReport />
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={2}>
              <CAccordionHeader className="custom-accordion-header">
                2) Fuerza de trabajo personal indirecto
                <div className="corner-colors">
                  <div className="color-box yellow"></div>
                  <div className="color-box red"></div>
                  <div className="color-box light-blue"></div>
                  <div className="color-box dark-blue"></div>
                  <div className="color-box gray"></div>
                </div>
              </CAccordionHeader>
              <CAccordionBody className="dailyReport-accordion">
                <IndirectWorkForce />
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={3}>
              <CAccordionHeader className="custom-accordion-header">
                3) Fuerza laboral total personal indirecto
                <div className="corner-colors">
                  <div className="color-box yellow"></div>
                  <div className="color-box red"></div>
                  <div className="color-box light-blue"></div>
                  <div className="color-box dark-blue"></div>
                  <div className="color-box gray"></div>
                </div>
              </CAccordionHeader>
              <CAccordionBody className="dailyReport-accordion">
                <TotalIndirectWorkForce />
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={4}>
              <CAccordionHeader className="custom-accordion-header">
                4) Fuerza laboral contratista personal directo
                <div className="corner-colors">
                  <div className="color-box yellow"></div>
                  <div className="color-box red"></div>
                  <div className="color-box light-blue"></div>
                  <div className="color-box dark-blue"></div>
                  <div className="color-box gray"></div>
                </div>
              </CAccordionHeader>
              <CAccordionBody className="dailyReport-accordion">
                <DirectWorkForce />
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={5}>
              <CAccordionHeader className="custom-accordion-header">
                5) Fuerza laboral total personal directo
                <div className="corner-colors">
                  <div className="color-box yellow"></div>
                  <div className="color-box red"></div>
                  <div className="color-box light-blue"></div>
                  <div className="color-box dark-blue"></div>
                  <div className="color-box gray"></div>
                </div>
              </CAccordionHeader>
              <CAccordionBody className="dailyReport-accordion">
                <TotalDirectWorkForce />
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={6}>
              <CAccordionHeader className="custom-accordion-header">
                6) Dotación por frente de trabajo personal directo
                <div className="corner-colors">
                  <div className="color-box yellow"></div>
                  <div className="color-box red"></div>
                  <div className="color-box light-blue"></div>
                  <div className="color-box dark-blue"></div>
                  <div className="color-box gray"></div>
                </div>
              </CAccordionHeader>
              <CAccordionBody className="dailyReport-accordion">
                <DirectDotationWorkForce />
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={7}>
              <CAccordionHeader className="custom-accordion-header">
                7) Maquinarias contratistas
                <div className="corner-colors">
                  <div className="color-box yellow"></div>
                  <div className="color-box red"></div>
                  <div className="color-box light-blue"></div>
                  <div className="color-box dark-blue"></div>
                  <div className="color-box gray"></div>
                </div>
              </CAccordionHeader>
              <CAccordionBody className="dailyReport-accordion">
                <Machinery />
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={8}>
              <CAccordionHeader className="custom-accordion-header">
                8) Maquinarias por frente de trabajo
                <div className="corner-colors">
                  <div className="color-box yellow"></div>
                  <div className="color-box red"></div>
                  <div className="color-box light-blue"></div>
                  <div className="color-box dark-blue"></div>
                  <div className="color-box gray"></div>
                </div>
              </CAccordionHeader>
              <CAccordionBody className="dailyReport-accordion">
                <MachineryWorkForce />
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={9}>
              <CAccordionHeader className="custom-accordion-header">
                9) ASARCO Maquinarias
                <div className="corner-colors">
                  <div className="color-box yellow"></div>
                  <div className="color-box red"></div>
                  <div className="color-box light-blue"></div>
                  <div className="color-box dark-blue"></div>
                  <div className="color-box gray"></div>
                </div>
              </CAccordionHeader>
              <CAccordionBody className="dailyReport-accordion">
                <AsarcoMachinery />
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={10}>
              <CAccordionHeader className="custom-accordion-header">
                10) Equipos contratistas
                <div className="corner-colors">
                  <div className="color-box yellow"></div>
                  <div className="color-box red"></div>
                  <div className="color-box light-blue"></div>
                  <div className="color-box dark-blue"></div>
                  <div className="color-box gray"></div>
                </div>
              </CAccordionHeader>
              <CAccordionBody className="dailyReport-accordion">
                <EquipmentMachinery />
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={11}>
              <CAccordionHeader className="custom-accordion-header">
                11) Equipos con patentes contratistas
                <div className="corner-colors">
                  <div className="color-box yellow"></div>
                  <div className="color-box red"></div>
                  <div className="color-box light-blue"></div>
                  <div className="color-box dark-blue"></div>
                  <div className="color-box gray"></div>
                </div>
              </CAccordionHeader>
              <CAccordionBody className="dailyReport-accordion">
                <EquipmentPlate />
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={12}>
              <CAccordionHeader className="custom-accordion-header">
                12) Equipos por frente de trabajo
                <div className="corner-colors">
                  <div className="color-box yellow"></div>
                  <div className="color-box red"></div>
                  <div className="color-box light-blue"></div>
                  <div className="color-box dark-blue"></div>
                  <div className="color-box gray"></div>
                </div>
              </CAccordionHeader>
              <CAccordionBody className="dailyReport-accordion">
                <EquipmentWorkForce />
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={13}>
              <CAccordionHeader className="custom-accordion-header">
                13) Vehículos menores contratistas
                <div className="corner-colors">
                  <div className="color-box yellow"></div>
                  <div className="color-box red"></div>
                  <div className="color-box light-blue"></div>
                  <div className="color-box dark-blue"></div>
                  <div className="color-box gray"></div>
                </div>
              </CAccordionHeader>
              <CAccordionBody className="dailyReport-accordion">
                <Vehicle />
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={14}>
              <CAccordionHeader className="custom-accordion-header">
                14) Vehículos con patente menores contratistas
                <div className="corner-colors">
                  <div className="color-box yellow"></div>
                  <div className="color-box red"></div>
                  <div className="color-box light-blue"></div>
                  <div className="color-box dark-blue"></div>
                  <div className="color-box gray"></div>
                </div>
              </CAccordionHeader>
              <CAccordionBody className="dailyReport-accordion">
                <VehiclePlate />
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={15}>
              <CAccordionHeader className="custom-accordion-header">
                15) Descripción de actividades desarrolladas
                <div className="corner-colors">
                  <div className="color-box yellow"></div>
                  <div className="color-box red"></div>
                  <div className="color-box light-blue"></div>
                  <div className="color-box dark-blue"></div>
                  <div className="color-box gray"></div>
                </div>
              </CAccordionHeader>
              <CAccordionBody className="dailyReport-accordion">
                <Activities />
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={16}>
              <CAccordionHeader className="custom-accordion-header">
                16) Control de aguas industriales utilizadas
                <div className="corner-colors">
                  <div className="color-box yellow"></div>
                  <div className="color-box red"></div>
                  <div className="color-box light-blue"></div>
                  <div className="color-box dark-blue"></div>
                  <div className="color-box gray"></div>
                </div>
              </CAccordionHeader>
              <CAccordionBody className="dailyReport-accordion">
                <IndustrialWaterControl />
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={17}>
              <CAccordionHeader className="custom-accordion-header">
                17) Comentarios y alertas en general
                <div className="corner-colors">
                  <div className="color-box yellow"></div>
                  <div className="color-box red"></div>
                  <div className="color-box light-blue"></div>
                  <div className="color-box dark-blue"></div>
                  <div className="color-box gray"></div>
                </div>
              </CAccordionHeader>
              <CAccordionBody className="dailyReport-accordion">
                <Comments />
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={18}>
              <CAccordionHeader className="custom-accordion-header">
                18) Registro fotográfico diario
                <div className="corner-colors">
                  <div className="color-box yellow"></div>
                  <div className="color-box red"></div>
                  <div className="color-box light-blue"></div>
                  <div className="color-box dark-blue"></div>
                  <div className="color-box gray"></div>
                </div>
              </CAccordionHeader>
              <CAccordionBody className="dailyReport-accordion">
                <PhotoRecord />
              </CAccordionBody>
            </CAccordionItem>
            {/* <CAccordionItem itemKey={19}>
          <CAccordionHeader
            onClick={() => {
              setChartOpen(!chartOpen)
            }}
          >
            19) Graficos del día
           <div className="corner-colors">
                  <div className="color-box yellow"></div>
                  <div className="color-box red"></div>
                  <div className="color-box light-blue"></div>
                  <div className="color-box dark-blue"></div>
                  <div className="color-box gray"></div>
                </div>
              </CAccordionHeader>
          <CAccordionBody className="dailyReport-accordion">
            <Graphs isOpen={chartOpen} />
          </CAccordionBody>
        </CAccordionItem> */}
            <CAccordionItem itemKey={19}>
              <CAccordionHeader className="custom-accordion-header">
                19) Incidentes, lesiones o eventos
                <div className="corner-colors">
                  <div className="color-box yellow"></div>
                  <div className="color-box red"></div>
                  <div className="color-box light-blue"></div>
                  <div className="color-box dark-blue"></div>
                  <div className="color-box gray"></div>
                </div>
              </CAccordionHeader>
              <CAccordionBody className="dailyReport-accordion">
                <Incidents />
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={20}>
              <CAccordionHeader className="custom-accordion-header">
                20) Firmas{' '}
                <div className="corner-colors">
                  <div className="color-box yellow"></div>
                  <div className="color-box red"></div>
                  <div className="color-box light-blue"></div>
                  <div className="color-box dark-blue"></div>
                  <div className="color-box gray"></div>
                </div>
              </CAccordionHeader>
              <CAccordionBody className="dailyReport-accordion">
                <></>
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
          {/* {errorMessage.length > 0 ? <></> : <></>} */}
          {/* {errorMessage.map((error, index) => (
            <CToast
              key={index}
              autohide={true}
              visible={showError}
              color="danger"
              onClose={() => {
                setShowError(false)
              }}
              className="text-white align-items-center"
            >
              <div className="d-flex">
                <CToastBody>{error}</CToastBody>
              </div>
            </CToast>
          ))} */}
          <CToast
            autohide={true}
            visible={showError}
            color="danger"
            onClose={() => {
              setShowError(false)
            }}
            className="text-white align-items-center"
          >
            <div className="d-flex">
              <CToastBody>
                {errorMessage.map((error, index) => (
                  <span key={index}>
                    {error}
                    <br />
                  </span>
                ))}
              </CToastBody>
            </div>
          </CToast>
          {loading && <Loading />}
          <CButton
            className="btn-project-action"
            disabled={loading}
            onClick={() => {
              registerData()
            }}
          >
            Registrar informe diario
          </CButton>
        </>
      )}
    </div>
  )
}

export default DailyReportCollapse

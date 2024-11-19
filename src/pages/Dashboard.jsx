import React, { useEffect } from 'react'
import InformativePanel from 'src/components/InformativePanel'
import {
  CCard,
  CCardHeader,
  CButton,
  CCardBody,
  CCardText,
  CRow,
  CCol,
  CListGroupItem,
  CListGroup,
  CTooltip,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import ProjectCollapse from 'src/components/ProjectCollapse'
import useRegisterGeneralData from 'src/hooks/useRegisterGeneralData'
import { useFetchReportsData } from 'src/hooks/useFetch'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import useGetBasicData from 'src/hooks/useGetBasicData'
import useRegisterDailyReport from 'src/hooks/useRegisterDailyReport'
import Chart from 'react-google-charts'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useQueryClient } from '@tanstack/react-query'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBan,
  faCalendarDay,
  faCalendarDays,
  faChartGantt,
  faCoffee,
  faDownload,
  faRectangleList,
  faTableList,
} from '@fortawesome/free-solid-svg-icons'

const Dashboard = () => {
  const queryClient = useQueryClient()
  let navigate = useNavigate()
  const { getProject, getContract } = useRegisterGeneralData()
  const { clearData } = useRegisterDailyReport()

  const projectLS = JSON.parse(getProject())
  const contractLS = JSON.parse(getContract())

  const { data, isLoading, error } = useGetBasicData(contractLS.id)
  const { getData } = useGetCachedQueryData()

  // const { isFetching } = useFetchReportsData()
  const { isFetching } = useFetchReportsData(contractLS.id, projectLS.id)
  // const reportsQuery = getData('reports')
  const reportsQuery = getData('reports')

  useEffect(() => {
    localStorage.removeItem('daily_report')
    clearData()
    queryClient.removeQueries('selectedReport')
  }, [])

  useEffect(() => {
    if (!projectLS || !contractLS) {
      navigate(`/project_selector`)
    }
  }, [projectLS, contractLS])

  const redirectTo = (url) => {
    navigate(url)
  }

  const datagraph = [
    ['Element', 'Density', { role: 'style' }],
    ['Copper', 8.94, '#b87333'], // RGB value
    ['Silver', 10.49, 'silver'], // English color name
    ['Gold', 19.3, 'gold'],
    ['Platinum', 21.45, 'color: #e5e4e2'], // CSS-style declaration
  ]
  return (
    <div className="dashboard">
      <div style={{ display: 'none' }}>
        <Chart chartType="ColumnChart" width="100%" height="400px" data={datagraph} />
      </div>

      <CCard>
        {/* <CCardHeader>Panel Informativo</CCardHeader> */}
        <CCardBody>
          <CCardText>
            <InformativePanel />
          </CCardText>
        </CCardBody>
      </CCard>

      <br />
      <CCard>
        <CCardBody>
          <CCardText>
            <ProjectCollapse />
          </CCardText>
        </CCardBody>
      </CCard>
      <br />

      <CCard>
        <CCardBody>
          {!isFetching ? (
            <CCardText>
              <div>
                <CRow>
                  <CCol sm={4}>
                    <CButton
                      className="dashboard-button"
                      onClick={() => {
                        redirectTo('/informe-diario')
                        localStorage.setItem('daily_report', reportsQuery[0]?.id || undefined)
                      }}
                    >
                      <div className="button-container">
                        <FontAwesomeIcon
                          icon={faRectangleList}
                          size="2xl"
                          className="icon-button"
                        />
                        <div className="button-label">
                          <label className="label">Informe Diario</label>
                        </div>
                      </div>
                    </CButton>
                  </CCol>
                  <CCol sm={4}>
                    {/* <CTooltip
                      content="Aquí encontrarás el historial de todos los reportes diarios, en donde podrás acceder a ellos para editarlos o descargar su PDF."
                      placement="top"
                      // style={customTooltipStyle}
                    > */}
                    <CButton
                      className="dashboard-button"
                      onClick={() => redirectTo('/dashboard-reportes')}
                    >
                      <div className="button-container">
                        <FontAwesomeIcon icon={faCalendarDays} size="2xl" className="icon-button" />
                        <div className="button-label">
                          <label className="label">Historial reportes diarios</label>
                        </div>
                      </div>
                    </CButton>
                    {/* </CTooltip> */}
                  </CCol>
                  <CCol sm={4}>
                    <CButton
                      className="dashboard-button"
                      onClick={() => {
                        redirectTo('/trisemanal')
                      }}
                    >
                      <div className="button-container">
                        <FontAwesomeIcon icon={faTableList} size="2xl" className="icon-button" />
                        <div className="button-label">
                          <label className="label">Trisemanal</label>
                        </div>
                      </div>
                    </CButton>
                  </CCol>
                </CRow>
                <CRow>
                  {/* <CCol sm={4}>
                    <CButton
                      className="dashboard-button"
                      onClick={() => {
                        redirectTo('/avance')
                      }}
                    >
                      Avance
                    </CButton>
                  </CCol> */}
                  <CCol sm={4}>
                    <CButton
                      className="dashboard-button"
                      onClick={() => {
                        redirectTo('/carta-gantt')
                      }}
                    >
                      <div className="button-container">
                        <FontAwesomeIcon icon={faChartGantt} size="2xl" className="icon-button" />
                        <div className="button-label">
                          <label className="label"> Carta Gantt</label>
                        </div>
                      </div>
                    </CButton>
                  </CCol>
                  <CCol sm={4}>
                    <CButton
                      className="dashboard-button"
                      onClick={() => redirectTo('/exportar-datos')}
                    >
                      <div className="button-container">
                        <FontAwesomeIcon icon={faDownload} size="2xl" className="icon-button" />
                        <div className="button-label">
                          <label className="label">Exportar datos</label>
                        </div>
                      </div>
                    </CButton>
                  </CCol>
                  <CCol sm={4}>
                    <CButton className="dashboard-button">
                      <div className="button-container">
                        <FontAwesomeIcon icon={faBan} size="2xl" className="icon-button" />
                        <div className="button-label">
                          <label className="label">TOP NO+PAPEL</label>
                        </div>
                      </div>
                    </CButton>
                  </CCol>
                </CRow>
              </div>
            </CCardText>
          ) : (
            <Skeleton count={2} />
          )}
        </CCardBody>
      </CCard>

      <br />
      {/* {reportsQuery && reportsQuery.length > 0 && (
        <>
          <br />
          <CCard>
            <CCardBody>
              {!isFetching ? (
                <CCardText>
                  <>
                    <span>Tienes {reportsQuery.length} informes diarios generados.</span>
                    <CListGroup>
                      {reportsQuery
                        .sort((a, b) => b.id - a.id)
                        .map((report) => {
                          return (
                            <>
                              <CListGroupItem
                                as="a"
                                key={report.id}
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  localStorage.setItem('daily_report', report.id)
                                  redirectTo('/informe-diario/edit')
                                }}
                              >
                                Reporte número {report.id}
                              </CListGroupItem>
                            </>
                          )
                        })}
                    </CListGroup>
                 
                  </>
                </CCardText>
              ) : (
                <Skeleton count={2} />
              )}
            </CCardBody>
          </CCard>
        </>
      )} */}
    </div>
  )
}

export default Dashboard

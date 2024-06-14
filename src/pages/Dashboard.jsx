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
        <CCardHeader>Panel Informativo</CCardHeader>
        <CCardBody>
          <CCardText>
            <InformativePanel />
          </CCardText>
        </CCardBody>
      </CCard>
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
                      Informe Diario
                    </CButton>
                  </CCol>
                  <CCol sm={4}>
                    <CButton
                      className="dashboard-button"
                      onClick={() => {
                        redirectTo('/trisemanal')
                      }}
                    >
                      Trisemanal
                    </CButton>
                  </CCol>
                  <CCol sm={4}>
                    <CButton
                      className="dashboard-button"
                      onClick={() => {
                        redirectTo('/carta-gantt')
                      }}
                    >
                      Carta Gantt
                    </CButton>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm={4}>
                    <CButton
                      className="dashboard-button"
                      onClick={() => {
                        redirectTo('/avance')
                      }}
                    >
                      Avance
                    </CButton>
                  </CCol>
                  <CCol sm={4}>
                    <CButton className="dashboard-button">TOP NO+PAPEL</CButton>
                  </CCol>
                  <CCol sm={4}>
                    {/* <CButton className="dashboard-button">Carta Gantt</CButton> */}
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
      <CCard>
        <CCardBody>
          <CCardText>
            <ProjectCollapse />
          </CCardText>
        </CCardBody>
      </CCard>
      <br />
      {reportsQuery && reportsQuery.length > 0 && (
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
                                  redirectTo('/informe-diario/view')
                                }}
                              >
                                Reporte número {report.id}
                              </CListGroupItem>
                            </>
                          )
                        })}
                    </CListGroup>
                    {/* <CRow>
                      {reportsQuery
                        .sort((a, b) => b.id - a.id)
                        .map((report) => {
                          return (
                            <>
                              <CCol>
                                <CButton
                                  className="dashboard-button"
                                  onClick={() => {
                                    localStorage.setItem('daily_report', report.id)
                                    redirectTo('/informe-diario/view')
                                  }}
                                >
                                  {report.id}
                                </CButton>
                              </CCol>
                            </>
                          )
                        })}
                    </CRow> */}
                  </>
                </CCardText>
              ) : (
                <Skeleton count={2} />
              )}
            </CCardBody>
          </CCard>
        </>
      )}
    </div>
  )
}

export default Dashboard

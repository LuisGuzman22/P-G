import React, { useEffect } from 'react'
import InformativePanel from 'src/components/InformativePanel'
import { CCard, CButton, CCardBody, CCardText } from '@coreui/react'
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
  faChartColumn,
  faCalendarDays,
  faChartGantt,
  faDownload,
  faRectangleList,
  faTableList,
} from '@fortawesome/free-solid-svg-icons'
import { usePermissions } from 'src/providers/PermissionsProvider'
import { PERMISSIONS } from 'src/utils/contant'

const HomePage = () => {
  const queryClient = useQueryClient()
  let navigate = useNavigate()
  const { getProject, getContract } = useRegisterGeneralData()
  const { clearData } = useRegisterDailyReport()

  const projectLS = JSON.parse(getProject())
  const contractLS = JSON.parse(getContract())

  useGetBasicData(contractLS.id)
  const { getData } = useGetCachedQueryData()

  const { isFetching } = useFetchReportsData(contractLS.id, projectLS.id)
  const reportsQuery = getData('reports')
  const { hasPermission } = usePermissions()

  useEffect(() => {
    localStorage.removeItem('daily_report')
    clearData()
    queryClient.removeQueries('selectedReport')
  }, [clearData, queryClient])

  useEffect(() => {
    if (!projectLS || !contractLS) {
      navigate(`/project_selector`)
    }
  }, [projectLS, contractLS, navigate])

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

  const dashboardButtons = [
    {
      label: 'Informe Diario',
      icon: faRectangleList,
      onClick: () => {
        redirectTo('/informe-diario')
        localStorage.setItem(
          'daily_report',
          reportsQuery.length > 0
            ? reportsQuery[reportsQuery.length - 1].id || undefined
            : undefined,
        )
      },
      visible: hasPermission(PERMISSIONS.REPORTS.CREATE),
    },
    {
      label: 'Listado de Actividades',
      icon: faTableList,
      onClick: () => redirectTo('/actividades'),
      visible: hasPermission(PERMISSIONS.ACTIVITY.VIEW),
      // visible: true,
    },
    {
      label: 'Dashboard',
      icon: faChartColumn,
      onClick: () => redirectTo('/dashboard'),
      visible: hasPermission(PERMISSIONS.DASHBOARD.VIEW),
    },
    {
      label: 'Historial reportes diarios',
      icon: faCalendarDays,
      onClick: () => redirectTo('/dashboard-reportes'),
      visible: hasPermission(PERMISSIONS.REPORTS.CREATE),
    },
    {
      label: 'Carta Gantt',
      icon: faChartGantt,
      // onClick: () => window.open('https://chatgpt.com/', '_blank'),
      onClick: () => redirectTo('/carta-gantt'),
      visible: hasPermission(PERMISSIONS.GANTT.VIEW),
    },
    {
      label: 'Exportar datos',
      icon: faDownload,
      onClick: () => redirectTo('/exportar-datos'),
      visible: hasPermission(PERMISSIONS.EXPORT.DATA),
    },
  ]

  return (
    <div className="dashboard">
      <div style={{ display: 'none' }}>
        <Chart chartType="ColumnChart" width="100%" height="400px" data={datagraph} />
      </div>

      {/* <CCard>
        <CCardBody>
          <CCardText>
            <Chart
              chartType="ComboChart"
              width="100%"
              height="100%"
              data={dataTest}
              options={options}
            />
          </CCardText>
        </CCardBody>
      </CCard>

      <br /> */}

      <CCard>
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
                <div className="dashboard-grid">
                  {dashboardButtons
                    .filter((button) => button.visible)
                    .map((button, index) => (
                      <div className="dashboard-card" key={index}>
                        <CButton className="dashboard-button" onClick={button.onClick}>
                          <div className="button-container">
                            <FontAwesomeIcon
                              icon={button.icon}
                              size="2xl"
                              className="icon-button"
                            />
                            <div className="button-label">
                              <label className="label">{button.label}</label>
                            </div>
                            <div className="corner-colors">
                              <div className="color-box yellow"></div>
                              <div className="color-box red"></div>
                              <div className="color-box light-blue"></div>
                              <div className="color-box dark-blue"></div>
                              <div className="color-box gray"></div>
                            </div>
                          </div>
                        </CButton>
                      </div>
                    ))}
                </div>
              </div>
            </CCardText>
          ) : (
            <Skeleton count={2} />
          )}
        </CCardBody>
      </CCard>

      <br />
    </div>
  )
}

export default HomePage

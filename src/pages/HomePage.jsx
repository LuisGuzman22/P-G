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
  faChartColumn,
  faCalendarDay,
  faCalendarDays,
  faChartGantt,
  faCoffee,
  faDownload,
  faRectangleList,
  faTableList,
} from '@fortawesome/free-solid-svg-icons'

const HomePage = () => {
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

  // const dataTest = [
  //   [
  //     'Fecha',
  //     'Parcial Real',
  //     'Promedio Exc.',
  //     'Cumulativo Real',
  //     'Cumulativo Plan',
  //     'Promedio Rend. Plan',
  //   ],
  //   ['30-08-2024', 1000, 500, 1000, 1200, 700],
  //   ['06-09-2024', 1500, 600, 2500, 2400, 800],
  //   ['13-09-2024', 2000, 700, 4500, 3600, 900],
  //   ['20-09-2024', 2500, 800, 6000, 4800, 1000],
  //   ['27-09-2024', 3000, 900, 7500, 5400, 1100],
  //   ['28-09-2024', 4000, 1000, 7500, 5400, 1100],
  //   ['29-09-2024', 5000, 1100, 7500, 5400, 1100],
  //   ['30-09-2024', 6000, 1200, 7500, 5400, 1100],
  //   ['01-10-2024', 7000, 1300, 7500, 5400, 1100],
  //   ['02-10-2024', 8000, 1400, 7500, 5400, 1100],
  //   ['03-10-2024', 9000, 1500, 7500, 5400, 1100],
  //   ['04-10-2024', 10000, 1600, 7500, 5400, 1100],
  //   ['05-10-2024', 11000, 1700, 7500, 5400, 1100],
  //   ['06-10-2024', 12000, 1800, 7500, 5400, 1100],
  //   ['07-10-2024', 13000, 1900, 7500, 5400, 1100],
  // ]

  // const options = {
  //   title: 'Avance general de excavado y rendimiento (m3)',
  //   vAxes: {
  //     0: { title: 'Volumen (m3)' },
  //     1: { title: 'Rendimiento' },
  //   },
  //   hAxis: {
  //     title: 'Fecha',
  //   },
  //   seriesType: 'bars', // Barras por defecto
  //   series: {
  //     1: { type: 'line', lineDashStyle: [4, 4], color: 'purple' }, // Línea punteada
  //     2: { type: 'line', color: 'blue' }, // Línea continua azul
  //     3: { type: 'line', color: 'red' }, // Línea continua roja
  //     4: { type: 'line', lineDashStyle: [2, 2], color: 'green' }, // Línea punteada verde
  //   },
  //   colors: ['green'], // Color de las barras
  // }
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
                <CRow>
                  <CCol sm={4}>
                    <CButton
                      className="dashboard-button"
                      onClick={() => {
                        redirectTo('/informe-diario')
                        localStorage.setItem(
                          'daily_report',
                          reportsQuery.length > 0
                            ? reportsQuery[reportsQuery.length - 1].id || undefined
                            : undefined,
                        )
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
                        <div className="corner-colors">
                          <div className="color-box yellow"></div>
                          <div className="color-box red"></div>
                          <div className="color-box light-blue"></div>
                          <div className="color-box dark-blue"></div>
                          <div className="color-box gray"></div>
                        </div>
                      </div>
                    </CButton>
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
                          <label className="label">Avance del proyecto</label>
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
                    {/* <CTooltip
                      content="Aquí encontrarás el historial de todos los reportes diarios, en donde podrás acceder a ellos para editarlos o descargar su PDF."
                      placement="top"
                      // style={customTooltipStyle}
                    > */}

                    {/* </CTooltip> */}
                  </CCol>
                  <CCol sm={4}>
                    <CButton className="dashboard-button" onClick={() => redirectTo('/dashboard')}>
                      <div className="button-container">
                        <FontAwesomeIcon icon={faChartColumn} size="2xl" className="icon-button" />
                        <div className="button-label">
                          <label className="label">Dashboard</label>
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
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm={4}>
                    <CButton
                      className="dashboard-button"
                      onClick={() => redirectTo('/dashboard-reportes')}
                    >
                      <div className="button-container">
                        <FontAwesomeIcon icon={faCalendarDays} size="2xl" className="icon-button" />
                        <div className="button-label">
                          <label className="label">Historial reportes diarios</label>
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
                  </CCol>
                  <CCol sm={4}>
                    <a href="https://chatgpt.com/" rel="noreferrer">
                      <CButton
                        className="dashboard-button"
                        onClick={() => {
                          // redirectTo('/carta-gantt')
                        }}
                      >
                        <div className="button-container">
                          <FontAwesomeIcon icon={faChartGantt} size="2xl" className="icon-button" />
                          <div className="button-label">
                            <label className="label"> Inteligencia Artificial</label>
                          </div>
                          <div className="corner-colors">
                            <div className="color-box yellow"></div>
                            <div className="color-box red"></div>
                            <div className="color-box light-blue"></div>
                            <div className="color-box dark-blue"></div>
                            <div className="color-box gray"></div>
                          </div>
                        </div>
                      </CButton>{' '}
                    </a>
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
                        <div className="corner-colors">
                          <div className="color-box yellow"></div>
                          <div className="color-box red"></div>
                          <div className="color-box light-blue"></div>
                          <div className="color-box dark-blue"></div>
                          <div className="color-box gray"></div>
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
    </div>
  )
}

export default HomePage

import React, { useEffect, useState } from 'react'
import InformativePanel from 'src/components/InformativePanel'
import { CCard, CCardHeader, CButton, CCardBody, CCardText, CRow, CCol } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import ProjectCollapse from 'src/components/ProjectCollapse'
import useRegisterGeneralData from 'src/hooks/useRegisterGeneralData'
import useGetBasicData from 'src/hooks/useGetBasicData'
import useGetReportsData from 'src/hooks/useGetReportsData'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { fetchReportsData, useFetchReportsData, useFetchUserList } from 'src/hooks/useFetch'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'

const Dashboard = () => {
  let navigate = useNavigate()
  const { getProject, getContract } = useRegisterGeneralData()

  const projectLS = JSON.parse(getProject())
  const contractLS = JSON.parse(getContract())

  const { data, isLoading, error } = useGetBasicData(contractLS.id)
  const { getData } = useGetCachedQueryData()

  useFetchReportsData()
  const reportsQuery = getData('reports')

  useEffect(() => {
    if (!projectLS || !contractLS) {
      navigate(`/project_selector`)
    }
  }, [projectLS, contractLS])

  const redirectTo = (url) => {
    navigate(url)
  }
  return (
    <div className="dashboard">
      <CCard>
        <CCardHeader>Panel Informativo</CCardHeader>
        <CCardBody>
          <CCardText>
            <InformativePanel />
          </CCardText>
        </CCardBody>
      </CCard>
      {reportsQuery && reportsQuery.length > 0 && (
        <>
          <br />
          <CCard>
            <CCardBody>
              <CCardText>
                <>
                  <span>Tienes {reportsQuery.length} informes diarios por firmar.</span>
                  {reportsQuery.map((report) => {
                    return (
                      <>
                        <CRow>
                          <CButton
                            className="dashboard-button"
                            onClick={() => {
                              localStorage.setItem('daily_report', report.id)
                              redirectTo('/informe-diario/edit')
                            }}
                          >
                            {report.id}
                          </CButton>
                        </CRow>
                      </>
                    )
                  })}
                </>
              </CCardText>
            </CCardBody>
          </CCard>
        </>
      )}

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
          <CCardText>
            <div>
              <CRow>
                <CCol sm={4}>
                  <CButton
                    className="dashboard-button"
                    onClick={() => {
                      redirectTo('/informe-diario')
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
        </CCardBody>
      </CCard>
    </div>
  )
}

export default Dashboard

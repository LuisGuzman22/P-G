import React from 'react'
import InformativePanel from 'src/components/InformativePanel'
import { CCard, CCardHeader, CButton, CCardBody, CCardText, CRow, CCol } from '@coreui/react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  let navigate = useNavigate()

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
                  {/* <CButton className="dashboard-button">Trisemanal</CButton> */}
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

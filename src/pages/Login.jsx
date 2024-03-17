import { React } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const navigate = useNavigate()

  const onClickHandler = () => navigate(`/project_selector`)

  return (
    <div className="min-vh-100 d-flex flex-row align-items-center login-container">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <h1 className="login-title">P&G PROJECT CONTROL ESTRATEGICO</h1>

            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <p className="text-body-secondary">Inicia sesión</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Email" autoComplete="email" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={12}>
                        <CButton
                          className="px-4 login-button"
                          onClick={() => {
                            onClickHandler()
                          }}
                        >
                          Ingresar
                        </CButton>
                      </CCol>
                      {/* <CCol xs={12} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login

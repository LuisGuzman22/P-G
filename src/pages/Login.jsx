import { React, useEffect, useState } from 'react'
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
import useLogin from 'src/hooks/useLogin'

const Login = () => {
  const navigate = useNavigate()
  const [errorUser, setErrorUser] = useState(false)
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const { login, error } = useLogin()

  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const onChangeData = (e) => {
    switch (e.target.id) {
      case 'user':
        setUser(e.target.value)
        break
      case 'password':
        setPassword(e.target.value)
        break
      default:
        break
    }
  }

  useEffect(() => {
    localStorage.removeItem('project')
    localStorage.removeItem('contract')
    localStorage.removeItem('USER_TYPE')
  }, [])

  const onClickHandler = () => {
    login({ user, password })
  }

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
                      <CFormInput
                        invalid={errorUser}
                        placeholder="Email"
                        type="email"
                        autoComplete="email"
                        id="user"
                        feedback="Error al ingresar el correo"
                        onBlur={(e) => {
                          if (user.match(regex)) {
                            setErrorUser(false)
                          } else {
                            setErrorUser(true)
                          }
                        }}
                        onChange={(e) => {
                          onChangeData(e)
                        }}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => {
                          onChangeData(e)
                        }}
                      />
                    </CInputGroup>
                    {error && <>{error}</>}

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

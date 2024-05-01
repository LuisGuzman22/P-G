import { React, useEffect, useState } from 'react'
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
import { useQueryClient } from '@tanstack/react-query'
import { regex } from 'src/utils/regex'

const Login = () => {
  const queryClient = useQueryClient()
  const [errorUser, setErrorUser] = useState(false)
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, trueLogin } = useLogin()

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
    localStorage.removeItem('REACT_QUERY_OFFLINE_CACHE')
    localStorage.setItem('color', 'light')
    localStorage.removeItem('token')

    // localStorage.clear()
    queryClient.clear()
  }, [])

  const onClickHandler = async () => {
    await trueLogin({ user, password })
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
                            // htmlToImageConvert()
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

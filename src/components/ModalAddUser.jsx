/* eslint-disable react/prop-types */
import { React, useEffect, useState } from 'react'
import {
  CButton,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CModal,
  CModalBody,
  CForm,
  CFormInput,
  CRow,
  CCol,
  CFormSelect,
  CToast,
  CToastBody,
  CToastClose,
  CFormCheck,
} from '@coreui/react'
import useRegisterUser from 'src/hooks/useRegisterUser'
import { regex } from 'src/utils/regex'
const ModalAddUser = (props) => {
  const initialState = {
    userName: undefined,
    userMail: undefined,
    userProject: undefined,
    userContract: undefined,
    userPassword: undefined,
    isActive: undefined,
  }

  const [user, setUser] = useState(props.selectedUser ? props.selectedUser : initialState)
  const [userNameError, setUserNameError] = useState(false)
  const [userMailError, setUserMailError] = useState(false)
  const [userProjectError, setUserProjectError] = useState(false)
  const [userContractError, setUserContractError] = useState(false)
  const [userPasswordError, setUserPasswordError] = useState(false)
  const [errorForm, setErrorForm] = useState(0)

  const { register, error, isError } = useRegisterUser()

  const onChangeData = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value })
  }

  const handleClick = () => {
    props.sendDataToParent(false)
  }

  const handleRegisterUser = () => {
    if (!user.name || user.name === '') {
      setErrorForm(1)
      setUserNameError(true)
    } else {
      setErrorForm(3)
      setUserNameError(false)
    }
    if (!user.userMail || user.userMail === '') {
      setErrorForm(1)
      setUserMailError(true)
    } else {
      setErrorForm(3)
      setUserMailError(false)
    }
    if (!user.userPassword || user.userPassword === '') {
      setErrorForm(1)
      setUserPasswordError(true)
    } else {
      setErrorForm(3)
      setUserPasswordError(false)
    }
    if (!user.userContract || user.userContract === '-1') {
      setErrorForm(1)
      setUserContractError(true)
    } else {
      setErrorForm(3)
      setUserContractError(false)
    }
    if (!user.userProject || user.userProject === '-1') {
      setErrorForm(1)
      setUserProjectError(true)
    } else {
      setErrorForm(3)
      setUserProjectError(false)
    }
  }

  useEffect(() => {
    if (user.isActive === undefined) {
      user.isActive = false
    }
    if (errorForm === 3) register(user)
  }, [errorForm])

  return (
    <CModal
      scrollable
      visible={props.visible}
      onClose={() => handleClick()}
      aria-labelledby="ScrollingLongContentExampleLabel2"
      size="xl"
      className="project-creation-modal"
    >
      <CModalHeader>
        <CModalTitle id="ScrollingLongContentExampleLabel2">Añadir Usuario</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CToast
          autohide={true}
          visible={isError}
          color="danger"
          className="text-white align-items-center" // VER EVENTO DE ESCONDERSE PARA RESETEAR EL STATE DE ERROR
        >
          <div className="d-flex">
            <CToastBody>{error}</CToastBody>
          </div>
        </CToast>
        <CToast
          autohide={true}
          visible={errorForm === 1}
          color="danger"
          onClose={() => {
            setErrorForm(2)
          }}
          className="text-white align-items-center"
        >
          <div className="d-flex">
            <CToastBody>Debe completar todos los datos para crear el usuario</CToastBody>
          </div>
        </CToast>
        <CForm>
          <CRow>
            <CCol sm={6}>
              <CFormInput
                type="text"
                invalid={userNameError}
                id="userName"
                label="Nombre"
                placeholder="Nombre"
                value={user.userName || ''}
                text=""
                onBlur={(e) => {
                  if (e.target.value !== '') {
                    setUserNameError(false)
                  } else {
                    setUserNameError(true)
                  }
                }}
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CCol>
            <CCol sm={6}>
              <CFormInput
                type="text"
                invalid={userMailError}
                id="userMail"
                value={user.userMail || ''}
                label="Correo"
                placeholder="Correo"
                text=""
                onBlur={(e) => {
                  if (e.target.value && e.target.value.match(regex)) {
                    setUserMailError(false)
                  } else {
                    setUserMailError(true)
                  }
                }}
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={6}>
              <CFormSelect
                aria-label="Default select example"
                label="Proyecto"
                id="userProject"
                invalid={userProjectError}
                value={user.userProject}
                onBlur={(e) => {
                  if (e.target.value !== '-1') {
                    setUserProjectError(false)
                  } else {
                    setUserProjectError(true)
                  }
                }}
                onChange={(e) => {
                  if (e.target.value !== '-1') {
                    setUserProjectError(false)
                  } else {
                    setUserProjectError(true)
                  }
                  onChangeData(e)
                }}
              >
                <option value={'-1'}>Seleccione</option>
                <option value={'Proyecto 1'}>Proyecto 1</option>
                <option value={'Proyecto 2'}>Proyecto 2</option>
              </CFormSelect>
            </CCol>
            <CCol sm={6}>
              <CFormSelect
                aria-label="Default select example"
                label="Contrato"
                invalid={userContractError}
                value={user.userContract}
                id="userContract"
                onBlur={(e) => {
                  if (e.target.value !== '-1') {
                    setUserContractError(false)
                  } else {
                    setUserContractError(true)
                  }
                }}
                onChange={(e) => {
                  if (e.target.value !== '-1') {
                    setUserContractError(false)
                  } else {
                    setUserContractError(true)
                  }
                  onChangeData(e)
                }}
              >
                <option value={'-1'}>Seleccione</option>
                <option value={'Contrato 1'}>Contrato 1</option>
                <option value={'Contrato 2'}>Contrato 2</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={6}>
              <CFormInput
                type="password"
                id="userPassword"
                invalid={userPasswordError}
                value={user.userPassword || ''}
                label="Contraseña"
                placeholder="Contraseña"
                text=""
                onBlur={(e) => {
                  if (e.target.value !== '') {
                    setUserPasswordError(false)
                  } else {
                    setUserPasswordError(true)
                  }
                }}
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CCol>
            <CCol sm={6}>
              <CFormCheck
                id="isActive"
                label="Activo"
                defaultChecked={user.isActive}
                onChange={(e) => {
                  setUser({ ...user, [e.target.id]: !user.isActive })
                }}
              />
            </CCol>
          </CRow>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => handleClick()}>
          Cerrar
        </CButton>
        <CButton className="btn-add" onClick={() => handleRegisterUser()}>
          Añadir usuario
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalAddUser

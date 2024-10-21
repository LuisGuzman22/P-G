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
  CFormTextarea,
  CFormCheck,
  CToast,
  CToastBody,
} from '@coreui/react'
import { v4 as uuidv4 } from 'uuid'
import useMachinery from 'src/hooks/useMachinery'
import useRegisterGeneralData from 'src/hooks/useRegisterGeneralData'
import './css.scss'
import useUser from 'src/hooks/useUser'
import { regex } from 'src/utils/regex'

const ModalAddUser = (props) => {
  const initialState = {
    name: undefined,
    email: undefined,
    password: undefined,
    company_id: 2,
  }
  const { getProject, getContract } = useRegisterGeneralData()
  const projectLS = JSON.parse(getProject())
  const contractLS = JSON.parse(getContract())

  const [user, setUser] = useState(props.selectedUser ? props.selectedUser : initialState)
  const [userNameError, setUserNameError] = useState(false)
  const [userEmailError, setUserEmailError] = useState(false)
  const [userPasswordError, setUserPasswordError] = useState(false)

  const handleClick = () => {
    props.sendDataToParent(false)
  }

  const [errorForm, setErrorForm] = useState(0)

  const {
    register,
    errorUser: error,
    isError,
    updateUser,
    errorMessage,
    refetch,
    isRefetching,
  } = useUser()

  const onChangeData = (e) => {
    setErrorForm(0)
    setUser({ ...user, [e.target.id]: e.target.value })
  }

  const handleRegisterUser = () => {
    if (!user.name || user.name === '') {
      // setErrorForm(1)
      setUserNameError(true)
    } else {
      // setErrorForm(3)
      setUserNameError(false)
    }
    if (!user.email || user.email === '' || !user.email.match(regex)) {
      // setErrorForm(1)
      setUserEmailError(true)
    } else {
      // setErrorForm(3)
      setUserEmailError(false)
    }
    if (!user.password || user.password === '' || user.password.length < 8) {
      // setErrorForm(1)
      setUserPasswordError(true)
    } else {
      // setErrorForm(3)
      setUserPasswordError(false)
    }

    if (
      !user.name ||
      user.name === '' ||
      !user.email ||
      user.email === '' ||
      !user.password ||
      user.password === '' ||
      user.password.length < 8 ||
      !user.email.match(regex)
    ) {
      setErrorForm(1)
    } else {
      setErrorForm(3)
    }
  }

  useEffect(() => {
    if (errorForm === 3) {
      if (props?.selectedUser?.name) {
        updateUser({
          id: props.selectedUser.id,
          name: user.name,
          email: user.email,
          password: user.password,
          company_id: user.company_id,
        })
        // props.sendDataToParent(false)
      } else {
        register({
          name: user.name,
          email: user.email,
          password: user.password,
          company_id: user.company_id,
        })
        // props.sendDataToParent(false)
      }
    }
  }, [errorForm])

  useEffect(() => {
    if (errorForm === 3) {
      console.log('1')
      if (errorMessage) {
        console.log('2')
        if (errorMessage.length === 0) {
          console.log('se cierra')
          props.sendDataToParent(false)
        } else {
          console.log('3')
        }
      } else {
        console.log('4')
      }
    } else {
      console.log('5')
    }
  }, [errorMessage, errorForm])

  return (
    <CModal
      scrollable
      visible={props.visible}
      onClose={() => handleClick()}
      aria-labelledby="ScrollingLongContentExampleLabel2"
      size="xl"
      className="creation-modal"
    >
      <CModalHeader>
        <CModalTitle id="ScrollingLongContentExampleLabel2">
          {props?.selectedMachinery?.name ? 'Editar Usuario' : 'Registrar Usuario'}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CToast
          autohide={true}
          visible={isError}
          color="danger"
          className="text-white align-items-center"
        >
          <div className="d-flex">
            {error && <CToastBody>{error}</CToastBody>}
            {errorMessage && <CToastBody>{errorMessage}</CToastBody>}
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
            <CToastBody>Debe completar todos los datos para registrar el usuario</CToastBody>
          </div>
        </CToast>
        <CForm>
          <CRow>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="name"
                label="Nombre"
                placeholder="Nombre"
                invalid={userNameError}
                value={user.name || ''}
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
          </CRow>
          <CRow>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="email"
                label="Correo"
                placeholder="Correo"
                invalid={userEmailError}
                value={user.email || ''}
                text={userEmailError ? 'El correo debe ser un correo válido' : ''}
                onBlur={(e) => {
                  if (e.target.value !== '') {
                    setUserEmailError(false)
                  } else {
                    setUserEmailError(true)
                  }

                  if (user.email.match(regex)) {
                    setUserEmailError(false)
                  } else {
                    setUserEmailError(true)
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
              <CFormInput
                type="password"
                id="password"
                label="Contraseña"
                placeholder="Contraseña"
                invalid={userPasswordError}
                value={user.password || ''}
                text={
                  userPasswordError
                    ? 'El largo de la contraseña debe ser de 8 caracteres mínimo'
                    : ''
                }
                onBlur={(e) => {
                  if (e.target.value !== '') {
                    setUserPasswordError(false)
                  } else {
                    setUserPasswordError(true)
                  }

                  if (e.target.value.length >= 8) {
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
          </CRow>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => handleClick()}>
          Cerrar
        </CButton>
        <CButton className="btn-add" onClick={() => handleRegisterUser()}>
          {props?.selectedUser?.name ? 'Editar' : 'Registrar'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalAddUser

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
  const { register, error, isError } = useRegisterUser()

  const onChangeData = (e) => {
    // if (e.target.id === 'isActive') {
    //   console.log(e.target.id, e.target.value)

    //   setUser({ ...user, [e.target.id]: e.target.value === 'on' ? true : false })
    // } else {
    setUser({ ...user, [e.target.id]: e.target.value })
    // }
  }

  const handleClick = () => {
    props.sendDataToParent(false)
  }

  const handleRegisterUser = () => {
    register(user)
  }

  useEffect(() => {
    console.log('user', user)
  }, [user])

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
          className="text-white align-items-center"
        >
          <div className="d-flex">
            <CToastBody>{error}</CToastBody>
          </div>
        </CToast>
        <CForm>
          <CRow>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="userName"
                label="Nombre"
                placeholder="Nombre"
                value={user.userName || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CCol>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="userMail"
                value={user.userMail || ''}
                label="Correo"
                placeholder="Correo"
                text=""
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
                value={user.userProject}
                onChange={(e) => {
                  onChangeData(e)
                }}
              >
                <option>Seleccione</option>
                <option value={'Proyecto 1'}>Proyecto 1</option>
                <option value={'Proyecto 2'}>Proyecto 2</option>
              </CFormSelect>
            </CCol>
            <CCol sm={6}>
              <CFormSelect
                aria-label="Default select example"
                label="Contrato"
                value={user.userContract}
                id="userContract"
                onChange={(e) => {
                  onChangeData(e)
                }}
              >
                <option>Seleccione</option>
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
                value={user.userPassword || ''}
                label="Contraseña"
                placeholder="Contraseña"
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CCol>
            <CCol sm={6}>
              <CFormCheck
                id="isActive"
                label="Activo"
                // checked={user.isActive}
                defaultChecked={user.isActive}
                onChange={(e) => {
                  setUser({ ...user, [e.target.id]: !user.isActive })
                }}
                // value={user.isActive}
                // onChange={(e) => {
                //   onChangeData(e)
                // }}
              />

              {/* <CFormCheck
                id="active"
                label="Activo"
                
                // checked={user.isActive ? 'on' : 'off'}
                onChange={(e) => {
                  onChangeData(e)
                }}
              /> */}
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

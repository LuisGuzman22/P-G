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
import useRegisterGeneralData from 'src/hooks/useRegisterGeneralData'
import useDirectPersonal from 'src/hooks/useDirectPersonal'

const ModalAddDirectPersonal = (props) => {
  const { getProject, getContract } = useRegisterGeneralData()
  const projectLS = JSON.parse(getProject())
  const contractLS = JSON.parse(getContract())

  const handleClick = () => {
    props.sendDataToParent(false)
  }

  const [directPersonalName, setDirectPersonalName] = useState(
    props?.selectedDirectPersonal?.name || undefined,
  )
  const [directPersonalError, setDirectPersonalError] = useState(false)
  const [errorForm, setErrorForm] = useState(0)

  const {
    register,
    errorDirectPersonal: error,
    isError,
    updateDirectPersonal,
  } = useDirectPersonal()

  const onChangeData = (e) => {
    setDirectPersonalName(e.target.value)
  }

  const handleRegisterDirectPersonal = () => {
    if (!directPersonalName || directPersonalName === '') {
      setDirectPersonalError(true)
    } else {
      setDirectPersonalError(false)
    }

    if (!directPersonalName || directPersonalName === '') {
      setErrorForm(1)
    } else {
      setErrorForm(3)
    }
  }

  useEffect(() => {
    if (errorForm === 3) {
      if (props?.selectedDirectPersonal?.name) {
        updateDirectPersonal({
          id: props.selectedDirectPersonal.id,
          name: directPersonalName,
        })
        props.sendDataToParent(false)
      } else {
        register({
          name: directPersonalName,
        })
        props.sendDataToParent(false)
      }
    }
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
        <CModalTitle id="ScrollingLongContentExampleLabel2">
          {props?.selectedDirectPersonal?.name
            ? 'Editar Personal Directo'
            : 'Registrar Personal Directo'}
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
            <CToastBody>Debe completar todos los datos para registrar el personal</CToastBody>
          </div>
        </CToast>
        <CForm>
          <CRow>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="directPersonalName"
                label="Nombre Personal directo"
                placeholder="Nombre Personal directo"
                invalid={directPersonalError}
                value={directPersonalName || ''}
                text=""
                onBlur={(e) => {
                  if (e.target.value !== '') {
                    setDirectPersonalError(false)
                  } else {
                    setDirectPersonalError(true)
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
        <CButton className="btn-add" onClick={() => handleRegisterDirectPersonal()}>
          {props?.selectedDirectPersonal?.name ? 'Editar' : 'Registrar'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalAddDirectPersonal

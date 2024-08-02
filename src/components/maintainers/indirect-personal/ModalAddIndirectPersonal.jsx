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
import useIndirectPersonal from 'src/hooks/useIndirectPersonal'

const ModalAddIndirectPersonal = (props) => {
  const { getProject, getContract } = useRegisterGeneralData()
  const projectLS = JSON.parse(getProject())
  const contractLS = JSON.parse(getContract())

  const handleClick = () => {
    props.sendDataToParent(false)
  }

  const [indirectPersonalName, setIndirectPersonalName] = useState(
    props?.selectedIndirectPersonal?.name || undefined,
  )
  const [indirectPersonalError, setIndirectPersonalError] = useState(false)
  const [errorForm, setErrorForm] = useState(0)

  const {
    register,
    errorIndirectPersonal: error,
    isError,
    updateIndirectPersonal,
  } = useIndirectPersonal()

  const onChangeData = (e) => {
    setIndirectPersonalName(e.target.value)
  }

  const handleRegisterIndirectPersonal = () => {
    if (!indirectPersonalName || indirectPersonalName === '') {
      setIndirectPersonalError(true)
    } else {
      setIndirectPersonalError(false)
    }

    if (!indirectPersonalName || indirectPersonalName === '') {
      setErrorForm(1)
    } else {
      setErrorForm(3)
    }
  }

  useEffect(() => {
    if (errorForm === 3) {
      if (props?.selectedIndirectPersonal?.name) {
        updateIndirectPersonal({
          id: props.selectedIndirectPersonal.id,
          name: indirectPersonalName,
        })
        props.sendDataToParent(false)
      } else {
        register({
          name: indirectPersonalName,
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
          {props?.selectedIndirectPersonal?.name
            ? 'Editar Personal Indirecto'
            : 'Registrar Personal Indirecto'}
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
                id="indirectPersonalName"
                label="Nombre Personal indirecto"
                placeholder="Nombre Personal indirecto"
                invalid={indirectPersonalError}
                value={indirectPersonalName || ''}
                text=""
                onBlur={(e) => {
                  if (e.target.value !== '') {
                    setIndirectPersonalError(false)
                  } else {
                    setIndirectPersonalError(true)
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
        <CButton className="btn-add" onClick={() => handleRegisterIndirectPersonal()}>
          {props?.selectedIndirectPersonal?.name ? 'Editar' : 'Registrar'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalAddIndirectPersonal

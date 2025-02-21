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
  CToast,
  CToastBody,
  CFormCheck,
} from '@coreui/react'
import { v4 as uuidv4 } from 'uuid'
import useRegisterGeneralData from 'src/hooks/useRegisterGeneralData'
import './css.scss'
import useWorkFront from 'src/hooks/useWorkFront'

const ModalAddWorkFront = (props) => {
  const { getProject, getContract } = useRegisterGeneralData()
  const projectLS = JSON.parse(getProject())
  const contractLS = JSON.parse(getContract())

  const handleClick = () => {
    props.sendDataToParent(false)
  }

  const [workFrontName, setWorkFrontName] = useState(props?.selectedWorkFront?.name || undefined)
  const [workFrontHasSubWorkFront, setWorkFrontHasSubWorkFront] = useState(
    props?.selectedWorkFront?.hasSubWorkFront || undefined,
  )
  const [workFrontError, setWorkFrontError] = useState(false)
  const [errorForm, setErrorForm] = useState(0)

  const { register, errorShift: error, isError, updateWorkFront, errorMessage } = useWorkFront()

  const onChangeData = (e) => {
    setWorkFrontName(e.target.value)
  }

  const onChangeHasSubWorkFront = (e) => {
    setWorkFrontHasSubWorkFront(e.target.checked)
  }

  const handleRegisterWorkFront = () => {
    if (!workFrontName || workFrontName === '') {
      setWorkFrontError(true)
    } else {
      setWorkFrontError(false)
    }

    if (!workFrontName || workFrontName === '') {
      setErrorForm(1)
    } else {
      setErrorForm(3)
    }
  }

  useEffect(() => {
    if (errorForm === 3) {
      if (props?.selectedWorkFront?.name) {
        updateWorkFront({
          id: props.selectedWorkFront.id,
          name: workFrontName,
          hasSubFront: workFrontHasSubWorkFront,
        })
        // props.sendDataToParent(false)
      } else {
        register({
          name: workFrontName,
          hasSubFront: workFrontHasSubWorkFront,
        })
        // props.sendDataToParent(false)
      }
    }
  }, [errorForm])

  useEffect(() => {
    if (errorForm === 3) {
      // console.log('1')
      if (errorMessage) {
        // console.log('2')
        if (errorMessage.length === 0) {
          // console.log('se cierra')
          props.sendDataToParent(false)
        } else {
          // console.log('3')
        }
      } else {
        // console.log('4')
      }
    } else {
      // console.log('5')
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
          {props?.selectedWorkFront?.name
            ? 'Editar Frente de trabajo'
            : 'Registrar Frente de trabajo'}
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
            <CToastBody>
              Debe completar todos los datos para registrar el frente de trabajo
            </CToastBody>
          </div>
        </CToast>
        <CForm>
          <CRow>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="workFrontName"
                label="Nombre del frente de trabajo"
                placeholder="Nombre del frente de trabajo"
                invalid={workFrontError}
                value={workFrontName || ''}
                text=""
                onBlur={(e) => {
                  if (e.target.value !== '') {
                    setWorkFrontError(false)
                  } else {
                    setWorkFrontError(true)
                  }
                }}
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CCol>
            <CCol>
              <div>
                <CFormCheck
                  id="hasSubFront"
                  label="¿Posee Sub frente de trabajo?"
                  checked={workFrontHasSubWorkFront}
                  onChange={(e) => onChangeHasSubWorkFront(e)}
                />
              </div>
            </CCol>
          </CRow>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => handleClick()}>
          Cerrar
        </CButton>
        <CButton className="btn-add" onClick={() => handleRegisterWorkFront()}>
          Guardar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalAddWorkFront

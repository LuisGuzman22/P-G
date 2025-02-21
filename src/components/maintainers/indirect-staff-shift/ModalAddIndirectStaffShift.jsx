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
} from '@coreui/react'
import { v4 as uuidv4 } from 'uuid'
import useRegisterGeneralData from 'src/hooks/useRegisterGeneralData'
import './css.scss'
import useShift from 'src/hooks/useShift'
import useIndirectStaffShift from 'src/hooks/useIndirectStaffShift'

const ModalAddIndirectStaffShift = (props) => {
  const { getProject, getContract } = useRegisterGeneralData()
  const projectLS = JSON.parse(getProject())
  const contractLS = JSON.parse(getContract())

  const handleClick = () => {
    props.sendDataToParent(false)
  }

  const [indirectStaffShiftName, setIndirectStaffShiftName] = useState(
    props?.selectedIndirectStaffShift?.name || undefined,
  )
  const [indirectStaffShiftError, setIndirectStaffShiftError] = useState(false)
  const [errorForm, setErrorForm] = useState(0)

  const {
    register,
    errorShift: error,
    isError,
    updateIndirectStaffShift,
    errorMessage,
  } = useIndirectStaffShift()

  const onChangeData = (e) => {
    setIndirectStaffShiftName(e.target.value)
  }

  const handleRegisterIndirectStaffShift = () => {
    if (!indirectStaffShiftName || indirectStaffShiftName === '') {
      setIndirectStaffShiftError(true)
    } else {
      setIndirectStaffShiftError(false)
    }

    if (!indirectStaffShiftName || indirectStaffShiftName === '') {
      setErrorForm(1)
    } else {
      setErrorForm(3)
    }
  }

  useEffect(() => {
    if (errorForm === 3) {
      if (props?.selectedIndirectStaffShift?.name) {
        updateIndirectStaffShift({
          id: props.selectedIndirectStaffShift.id,
          name: indirectStaffShiftName,
        })
        // props.sendDataToParent(false)
      } else {
        register({
          name: indirectStaffShiftName,
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
          {props?.selectedIndirectStaffShif?.name ? 'Editar Turno' : 'Registrar Turno'}
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
            <CToastBody>Debe completar todos los datos para registrar el turno</CToastBody>
          </div>
        </CToast>
        <CForm>
          <CRow>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="indirectStaffShiftName"
                label="Nombre jornada"
                placeholder="Nombre jornada"
                invalid={indirectStaffShiftError}
                value={indirectStaffShiftName || ''}
                text=""
                onBlur={(e) => {
                  if (e.target.value !== '') {
                    setIndirectStaffShiftError(false)
                  } else {
                    setIndirectStaffShiftError(true)
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
        <CButton className="btn-add" onClick={() => handleRegisterIndirectStaffShift()}>
          Guardar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalAddIndirectStaffShift

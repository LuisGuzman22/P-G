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
import useRegisterGeneralData from 'src/hooks/useRegisterGeneralData'
import './css.scss'
import useRestriction from 'src/hooks/useRestriction'

const ModalAddRestriction = (props) => {
  const { getContract } = useRegisterGeneralData()
  const contractLS = JSON.parse(getContract())

  const handleClick = () => {
    props.sendDataToParent(false)
  }

  const [restrictionName, setRestrictionName] = useState(
    props?.selectedRestriction?.name || undefined,
  )
  const [restrictionError, setRestrictionError] = useState(false)
  const [errorForm, setErrorForm] = useState(0)

  const {
    register,
    errorRestriction: error,
    isError,
    updateRestriction,
    errorMessage,
  } = useRestriction()

  const onChangeData = (e) => {
    setRestrictionName(e.target.value)
  }

  const handleRegisterRestriction = () => {
    if (!restrictionName || restrictionName === '') {
      errorForm(true)
    } else {
      setRestrictionError(false)
    }

    if (!restrictionName || restrictionName === '') {
      setErrorForm(1)
    } else {
      setErrorForm(3)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (errorForm === 3) {
      if (props?.selectedRestriction?.name) {
        updateRestriction({
          id: props.selectedRestriction.id,
          name: restrictionName,
          contract_id: contractLS.id,
        })
        // props.sendDataToParent(false)
      } else {
        register({
          name: restrictionName,
          contract_id: contractLS.id,
        })
        // props.sendDataToParent(false)
      }
    }
  }, [errorForm])

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {props?.selectedRestriction?.name ? 'Editar Motivo' : 'Registrar Motivo'}
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
            <CToastBody>Debe completar todos los datos para registrar el motivo</CToastBody>
          </div>
        </CToast>
        <CForm>
          <CRow>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="restrictionName"
                label="Motivo"
                placeholder="Motivo"
                invalid={restrictionError}
                value={restrictionName || ''}
                text=""
                onBlur={(e) => {
                  if (e.target.value !== '') {
                    setRestrictionError(false)
                  } else {
                    setRestrictionError(true)
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
        <CButton className="btn-add" onClick={() => handleRegisterRestriction()}>
          Guardar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalAddRestriction

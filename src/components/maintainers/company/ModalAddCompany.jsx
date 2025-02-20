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
import useEquipment from 'src/hooks/useEquipment'
import './css.scss'
import useCompany from 'src/hooks/useCompany'

const ModalAddCompany = (props) => {
  const { getProject, getContract } = useRegisterGeneralData()
  const projectLS = JSON.parse(getProject())
  const contractLS = JSON.parse(getContract())

  const handleClick = () => {
    props.sendDataToParent(false)
  }

  const [companyName, setCompanyName] = useState(props?.selectedCompany?.name || undefined)
  const [companyError, setCompanyError] = useState(false)
  const [errorForm, setErrorForm] = useState(0)

  const { register, errorCompany: error, isError, updateCompany, errorMessage } = useCompany()

  const onChangeData = (e) => {
    setCompanyName(e.target.value)
  }

  const handleRegisterCompany = () => {
    if (!companyName || companyName === '') {
      setCompanyError(true)
    } else {
      setCompanyError(false)
    }

    if (!companyName || companyName === '') {
      setErrorForm(1)
    } else {
      setErrorForm(3)
    }
  }

  useEffect(() => {
    if (errorForm === 3) {
      if (props?.selectedCompany?.name) {
        updateCompany({
          id: props.selectedCompany.id,
          name: companyName,
        })
        // props.sendDataToParent(false)
      } else {
        register({
          name: companyName,
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
          {props?.selectedCompany?.name ? 'Editar Empresa' : 'Registrar Empresa'}
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
            <CToastBody>Debe completar todos los datos para registrar la empresa</CToastBody>
          </div>
        </CToast>
        <CForm>
          <CRow>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="companyName"
                label="Nombre empresa"
                placeholder="Nombre empresa"
                invalid={companyError}
                value={companyName || ''}
                text=""
                onBlur={(e) => {
                  if (e.target.value !== '') {
                    setCompanyError(false)
                  } else {
                    setCompanyError(true)
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
        <CButton className="btn-add" onClick={() => handleRegisterCompany()}>
          Guardar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalAddCompany

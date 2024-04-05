/* eslint-disable react/prop-types */
import { React, useState } from 'react'
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
} from '@coreui/react'
const ModalAddContract = (props) => {
  const handleClick = () => {
    props.sendDataToParent(false)
  }

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
        <CModalTitle id="ScrollingLongContentExampleLabel2">Añadir Contrato</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CRow>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="contractName"
                label="Nombre"
                placeholder="Nombre"
                text=""
                // aria-describedby="exampleFormControlInputHelpInline"
                onChange={(e) => {}}
              />
            </CCol>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="contractDetail"
                label="Detalle"
                placeholder="Detalle"
                text=""
                // aria-describedby="exampleFormControlInputHelpInline"
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="contractUrl"
                label="URL"
                placeholder="URL"
                text=""
                // aria-describedby="exampleFormControlInputHelpInline"
              />
            </CCol>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="contractPhone"
                label="Teléfono"
                placeholder="Teléfono"
                text=""
                // aria-describedby="exampleFormControlInputHelpInline"
              />{' '}
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="contractMail"
                label="Email"
                placeholder="Email"
                text=""
                // aria-describedby="exampleFormControlInputHelpInline"
              />
            </CCol>
          </CRow>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => handleClick()}>
          Cerrar
        </CButton>
        <CButton className="btn-add">Añadir contrato</CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalAddContract

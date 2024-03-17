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
const ModalAddProject = (props) => {
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
        <CModalTitle id="ScrollingLongContentExampleLabel2">Añadir Proyecto</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CRow>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="projectName"
                label="Nombre de proyecto"
                placeholder="Nombre de proyecto"
                text=""
                // aria-describedby="exampleFormControlInputHelpInline"
                onChange={(e) => {
                  console.log(e.target.value)
                }}
              />
            </CCol>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="contract"
                label="Contrato"
                placeholder="Contrato"
                text=""
                // aria-describedby="exampleFormControlInputHelpInline"
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="manager"
                label="Encargado"
                placeholder="Encargado"
                text=""
                // aria-describedby="exampleFormControlInputHelpInline"
              />
            </CCol>
            <CCol sm={6}>
              <CFormInput type="file" id="formFile" label="Elegir archivo" />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={12}>
              <CFormTextarea id="description" label="Descripción" rows={3} text=""></CFormTextarea>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={6}>
              <CFormInput
                type="color"
                id="color"
                defaultValue="#FFFFFF"
                label="Color de fondo"
                title="Color de fondo"
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={6}>
              <CFormCheck id="active" label="Activo" />
            </CCol>
          </CRow>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => handleClick()}>
          Cerrar
        </CButton>
        <CButton className="btn-add">Añadir proyecto</CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalAddProject

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
  CTable,
  CTableHeaderCell,
  CTableHead,
  CTableRow,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
const ModalAddCategories = (props) => {
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
        <CModalTitle id="ScrollingLongContentExampleLabel2">Categorías</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CRow>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="categoryName"
                label="Categoría"
                placeholder="Categoría"
                text=""
                // aria-describedby="exampleFormControlInputHelpInline"
                onChange={(e) => {}}
              />
            </CCol>
            <CCol sm={6}>
              <CButton className="btn-add">Categoría</CButton>
            </CCol>
          </CRow>
        </CForm>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Categoría</CTableHeaderCell>
              <CTableHeaderCell scope="col">Acción</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableDataCell>Documentación de calidad</CTableDataCell>
              <CTableDataCell>
                <CButton className="btn-edit">Editar</CButton>
                <CButton className="btn-del">Eliminar</CButton>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>Documentación P&C - Contacto</CTableDataCell>
              <CTableDataCell>
                <CButton className="btn-edit">Editar</CButton>
                <CButton className="btn-del">Eliminar</CButton>
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => handleClick()}>
          Close
        </CButton>
        <CButton color="primary">Save changes</CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalAddCategories

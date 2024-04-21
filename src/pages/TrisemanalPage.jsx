import React from 'react'
import { CCard, CCardHeader, CCardBody, CCardText, CRow, CCol } from '@coreui/react'

const TrisemanalPage = () => {
  return (
    <>
      <CCard>
        <CCardHeader>Trisemanal</CCardHeader>
        <CCardBody>
          <CCardText>
            <CRow>
              <CCol sm={1}>ID</CCol>
              <CCol sm={3}>Actividad</CCol>
              <CCol sm={2}>Inicio</CCol>
              <CCol sm={2}>Termino</CCol>
              <CCol sm={1}>Suministro</CCol>
              <CCol sm={1}>Avance</CCol>
              <CCol sm={1}>Protocolo</CCol>
              <CCol sm={1}>Detalle</CCol>
            </CRow>
            <CRow>
              <CCol sm={12}>###</CCol>
            </CRow>
            <CRow>
              <CCol sm={1}>1</CCol>
              <CCol sm={3}>Cumplimiento Normati</CCol>
            </CRow>
            <CRow>
              <CCol sm={1}>2</CCol>
              <CCol sm={3}>Hitos</CCol>
            </CRow>
            <CRow>
              <CCol sm={1}></CCol>
              <CCol sm={3}>Hitos muro sur</CCol>
            </CRow>
            <CRow>
              <CCol sm={1}></CCol>
              <CCol sm={3}>Inicio Excavación Zona 1 (P1-22)</CCol>
              <CCol sm={2}>05-01-2024 08:00:00</CCol>
              <CCol sm={2}>05-01-2024 08:00:00</CCol>
            </CRow>
          </CCardText>
        </CCardBody>
      </CCard>
    </>
  )
}

export default TrisemanalPage

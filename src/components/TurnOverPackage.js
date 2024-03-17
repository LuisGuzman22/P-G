import React from 'react'
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CButton,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
} from '@coreui/react'

const TurnOverPackage = () => {
  return (
    <div className="turnOverPackage">
      <h2>Turn Over Package</h2>

      <CRow>
        <CCol sm={8}>
          <CCard>
            <CCardBody>
              <CCardText>
                <CAccordion activeItemKey={1}>
                  <CAccordionItem itemKey={1}>
                    <CAccordionHeader>Ingeniería</CAccordionHeader>
                    <CAccordionBody>
                      - Protocolo de Comunicación EB-01.jpeg (Documentación SSO)
                    </CAccordionBody>
                  </CAccordionItem>
                  <CAccordionItem itemKey={2}>
                    <CAccordionHeader>Planificación y control</CAccordionHeader>
                    <CAccordionBody>
                      - Protocolo de Comunicación EB-01.jpeg (Documentación SSO)
                    </CAccordionBody>
                  </CAccordionItem>
                  <CAccordionItem itemKey={3}>
                    <CAccordionHeader>Contratos</CAccordionHeader>
                    <CAccordionBody>
                      - Protocolo de Comunicación EB-01.jpeg (Documentación SSO)
                    </CAccordionBody>
                  </CAccordionItem>
                </CAccordion>
              </CCardText>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm={4}>
          <CCard className="actions-card">
            <CCardBody>
              <CCardTitle>Acciones</CCardTitle>
              <CCardText>
                <CRow>
                  <CButton>Cargar adjunto</CButton>
                </CRow>
                <CRow>
                  <CButton>Exportar adjunto</CButton>
                </CRow>
              </CCardText>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default TurnOverPackage

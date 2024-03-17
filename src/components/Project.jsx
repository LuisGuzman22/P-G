import React, { useState } from 'react'
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CRow,
  CCol,
} from '@coreui/react'
import InformativePanel from 'src/components/InformativePanel'
import ProjectCollapse from 'src/components/ProjectCollapse'
import DailyReportCollapse from 'src/components/DailyReportCollapse'

const Project = () => {
  return (
    <CAccordion className="project-accordion" activeItemKey={1}>
      <CAccordionItem itemKey={1}>
        <CAccordionHeader>Panel Informativo</CAccordionHeader>
        <CAccordionBody className="informative-panel-accordion">
          <InformativePanel />
        </CAccordionBody>
      </CAccordionItem>
      <CAccordionItem itemKey={2} onClick={console.log('click accordion')}>
        <CAccordionHeader className="nav-accordion">Proyecto</CAccordionHeader>
        <CAccordionBody>
          <ProjectCollapse />
        </CAccordionBody>
      </CAccordionItem>
      <CAccordionItem itemKey={3}>
        <CAccordionHeader>Informe Diario</CAccordionHeader>
        <CAccordionBody>
          <DailyReportCollapse />
        </CAccordionBody>
      </CAccordionItem>
      <CAccordionItem itemKey={4}>
        <CAccordionHeader>Actividades Trisemanal</CAccordionHeader>
        <CAccordionBody>
          <>
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
          </>
        </CAccordionBody>
      </CAccordionItem>
      <CAccordionItem itemKey={5}>
        <CAccordionHeader>Carta Gantt</CAccordionHeader>
        <CAccordionBody>
          <></>
        </CAccordionBody>
      </CAccordionItem>
      <CAccordionItem itemKey={6}>
        <CAccordionHeader>Detalles de avance</CAccordionHeader>
        <CAccordionBody>
          <></>
        </CAccordionBody>
      </CAccordionItem>
    </CAccordion>
  )
}

export default Project

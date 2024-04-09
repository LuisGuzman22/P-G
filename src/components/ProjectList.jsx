import React, { useEffect } from 'react'
import {
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CRow,
  CCol,
  CButton,
} from '@coreui/react'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'

const ProjectList = () => {
  const { getData } = useGetCachedQueryData()
  const cachedProjects = getData('projects')

  return (
    <>
      {/* <CRow>
        <CCol>ID</CCol>
        <CCol>Proyecto</CCol>
        <CCol>Encargado</CCol>
        <CCol>Creado por</CCol>
      </CRow> */}

      <CAccordion className="project-list">
        {cachedProjects &&
          cachedProjects.map((project, index) => {
            return (
              <CAccordionItem itemKey={project.id} key={project.id}>
                <CAccordionHeader>
                  <CRow>
                    <CCol>{project.id}</CCol>
                    <CCol>{project.name}</CCol>
                    <CCol>{project.manager}</CCol>
                    <CCol>{project.created_by}</CCol>
                  </CRow>
                </CAccordionHeader>
                <CAccordionBody>
                  <CButton className="btn-project-action">Subir Trisemanal</CButton>
                  <CButton className="btn-project-action">Ver Trisemanales</CButton>
                  <CButton className="btn-project-action">Documentos</CButton>
                  <CButton className="btn-project-action">Archivos</CButton>
                  <CButton className="btn-project-action">Editar</CButton>
                  <CButton className="btn-project-action">Curva S</CButton>
                </CAccordionBody>
              </CAccordionItem>
            )
          })}
      </CAccordion>
    </>
  )
}

export default ProjectList

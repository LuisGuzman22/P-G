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
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const ProjectList = () => {
  const fetchProducts = async () => {
    const res = await axios.get('https://701c573ff182421aa80bd97b52e34a3f.api.mockbin.io/')
    return res.data.data
  }

  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      return fetchProducts()
    },
  })

  return (
    <>
      <CRow>
        <CCol>ID</CCol>
        <CCol>Proyecto</CCol>
        <CCol>Contrato</CCol>
        <CCol>Encargado</CCol>
        <CCol>Creado por</CCol>
      </CRow>

      <CAccordion className="project-list">
        {!isLoading &&
          data &&
          data.map((project, index) => {
            return (
              <CAccordionItem itemKey={project.id} key={project.id}>
                <CAccordionHeader>
                  <CRow>
                    <CCol>{project.id}</CCol>
                    <CCol>{project.projectName}</CCol>
                    <CCol>{project.contract}</CCol>
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

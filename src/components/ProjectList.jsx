import React, { useEffect, useState } from 'react'
import {
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CRow,
  CCol,
  CButton,
  CContainer,
} from '@coreui/react'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import ModalAddProject from './ModalAddProject'
import useGetProjects from 'src/hooks/useGetProjects'

const ProjectList = () => {
  const { data: projectData, isLoading, error, refetch, isRefetching } = useGetProjects(1)

  const [visibleProject, setVisibleProject] = useState(false)
  const [selectedProject, setSelectedProject] = useState()

  const handleEditProject = (project) => {
    setSelectedProject(project)
    setVisibleProject(!visibleProject)
  }

  return (
    <>
      {visibleProject && (
        <ModalAddProject
          visible={true}
          selectedProject={selectedProject}
          sendDataToParent={async (data) => {
            await refetch()
            setVisibleProject(data)
          }}
        />
      )}

      <CAccordion className="project-list">
        {!isRefetching &&
          projectData &&
          projectData.map((project, index) => {
            return (
              <CAccordionItem itemKey={project.id} key={project.id}>
                <CAccordionHeader>
                  <CContainer className="px-4">
                    <CRow>
                      <CCol sm={12}>Proyecto: {project.name}</CCol>
                    </CRow>
                    <CRow>
                      <CCol sm={12}>Administrado por: {project.manager}</CCol>
                    </CRow>
                  </CContainer>
                </CAccordionHeader>
                <CAccordionBody>
                  <CButton className="btn-project-action">Subir Trisemanal</CButton>
                  <CButton className="btn-project-action">Ver Trisemanales</CButton>
                  <CButton className="btn-project-action">Documentos</CButton>
                  <CButton className="btn-project-action">Archivos</CButton>
                  <CButton
                    className="btn-project-action"
                    onClick={(e) => {
                      handleEditProject({
                        projectId: project.id,
                        projectName: project.name,
                        projectManager: project.manager,
                        projectDescription: project.description,
                        isActive: project.isActive,
                      })
                    }}
                  >
                    Editar
                  </CButton>
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

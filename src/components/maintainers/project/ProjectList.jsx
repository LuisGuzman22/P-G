import React, { useState } from 'react'
import {
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import useVehicle from 'src/hooks/useVehicle'
import ModalAddProject from 'src/components/maintainers/project/ModalAddProject'
import useProjects from 'src/hooks/useProjects'

const ProjectList = () => {
  const { getData } = useGetCachedQueryData()
  const projectsQuery = getData('projects')

  const { deleteProject } = useProjects()

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
          selectedProject={{
            id: selectedProject.id,
            projectName: selectedProject.name,
            projectManager: selectedProject.manager,
            projectDescription: selectedProject.description,
            isActive: selectedProject.isActive,
          }}
          sendDataToParent={async (data) => {
            // await refetch()
            setVisibleProject(data)
          }}
        />
      )}
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
            <CTableHeaderCell scope="col">Encargado</CTableHeaderCell>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {projectsQuery.map((project, index) => {
            return (
              <CTableRow key={project.id}>
                <CTableDataCell>{project.name}</CTableDataCell>
                <CTableDataCell>{project.manager}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    className="btn-action-edit"
                    onClick={() => {
                      handleEditProject(project)
                    }}
                  >
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <CButton
                    className="btn-action-delete"
                    onClick={() => {
                      deleteProject(project.id)
                    }}
                  >
                    <CIcon icon={cilTrash} />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
    </>
  )
}

export default ProjectList

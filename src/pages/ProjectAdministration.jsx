import { React, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import ProjectList from 'src/components/ProjectList'
import ModalAddProject from 'src/components/ModalAddProject'
import ModalAddCategories from 'src/components/ModalAddCategories'
import useGetProjects from 'src/hooks/useGetProjects'

const ProjectAdministration = () => {
  const [visibleCategories, setVisibleCategories] = useState(false)
  const [visibleProject, setVisibleProject] = useState(false)

  const { refetch } = useGetProjects(1)

  return (
    <div className="proyect-administration">
      <h2>Administrar proyecto</h2>

      {visibleProject && (
        <ModalAddProject
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleProject(data)
            await refetch()
          }}
        />
      )}

      {visibleCategories && (
        <ModalAddCategories
          visible={true}
          sendDataToParent={(data) => {
            setVisibleCategories(data)
          }}
        />
      )}

      <CCard className="action-buttons">
        <CCardBody>
          <CButton onClick={() => setVisibleProject(!visibleProject)}>Añadir proyecto</CButton>
          <CButton onClick={() => setVisibleCategories(!visibleCategories)}>Categorias</CButton>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          <ProjectList />
        </CCardBody>
      </CCard>
    </div>
  )
}

export default ProjectAdministration

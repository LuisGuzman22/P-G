import { React, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import ProjectList from 'src/components/ProjectList'
import ModalAddProject from 'src/components/ModalAddProject'
import ModalAddCategories from 'src/components/ModalAddCategories'

const ProjectAdministration = () => {
  const [visibleCategories, setVisibleCategories] = useState(false)
  const [visibleProject, setVisibleProject] = useState(false)

  return (
    <div className="proyect-administration">
      <h2>Administrar proyecto</h2>

      {visibleProject && (
        <ModalAddProject
          visible={true}
          sendDataToParent={(data) => {
            setVisibleProject(data)
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

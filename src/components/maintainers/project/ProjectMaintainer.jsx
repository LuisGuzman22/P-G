import { React, useEffect, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import './css.scss'
import useProjects from 'src/hooks/useProjects'
import ProjectList from './ProjectList'
import ModalAddProject from 'src/components/maintainers/project/ModalAddProject'
import { useNavigate } from 'react-router-dom'
import { usePermissions } from 'src/providers/PermissionsProvider'

const ProjectMaintainer = () => {
  const { isLoading, refetch, isRefetching } = useProjects()
  let navigate = useNavigate()

  const [visibleProject, setVisibleProject] = useState(false)

  const { hasPermission } = usePermissions()

  const redirectTo = (url) => {
    navigate(url)
  }

  useEffect(() => {
    if (!hasPermission('project_create')) {
      redirectTo('/inicio')
    }
  }, [])

  return (
    <div className="project-maintainer">
      <h2 className="title">Administrar Proyectos</h2>
      {visibleProject && (
        <ModalAddProject
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleProject(data)
            await refetch()
          }}
        />
      )}

      {hasPermission('project_create') && (
        <CCard className="action-buttons">
          <CCardBody>
            <CButton className="btn-modal" onClick={() => setVisibleProject(!visibleProject)}>
              Añadir Proyecto
            </CButton>
          </CCardBody>
        </CCard>
      )}

      <CCard>
        <CCardBody>
          {isLoading || isRefetching ? <Skeleton count={5} /> : <ProjectList />}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default ProjectMaintainer

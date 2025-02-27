import React from 'react'
import { CCallout, CImage } from '@coreui/react'
import useProjects from 'src/hooks/useProjects'
import Skeleton from 'react-loading-skeleton'
const ProjectDescription = () => {
  const { projectData, projectLoading } = useProjects()
  return (
    <div className="project-description">
      <CCallout color="danger" style={{ textAlign: 'justify' }}>
        <>
          {projectLoading ? (
            <>
              <Skeleton />
            </>
          ) : (
            <>{projectData?.description}</>
          )}
        </>
      </CCallout>
    </div>
  )
}

export default ProjectDescription

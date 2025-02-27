import React from 'react'
import { CCallout, CImage } from '@coreui/react'
import useProjects from 'src/hooks/useProjects'
const ProjectDescription = () => {
  const { projectData } = useProjects()
  return (
    <div className="project-description">
      <CCallout color="danger" style={{ textAlign: 'justify' }}>
        {projectData?.description}
      </CCallout>
    </div>
  )
}

export default ProjectDescription

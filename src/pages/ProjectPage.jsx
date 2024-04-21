import React from 'react'
import ProjectCollapse from 'src/components/ProjectCollapse'
import { CCard, CCardHeader, CCardBody, CCardText } from '@coreui/react'

const ProjectPage = () => {
  return (
    <>
      <CCard>
        <CCardHeader>Proyecto</CCardHeader>
        <CCardBody>
          <CCardText>
            <ProjectCollapse />
          </CCardText>
        </CCardBody>
      </CCard>
    </>
  )
}

export default ProjectPage

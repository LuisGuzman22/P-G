import React from 'react'
import InformativePanel from 'src/components/InformativePanel'
import { CCard, CCardHeader, CCardBody, CCardText } from '@coreui/react'

const InformativePanelPage = () => {
  return (
    <>
      <CCard>
        <CCardHeader>Panel Informativo</CCardHeader>
        <CCardBody>
          <CCardText>
            <InformativePanel />
          </CCardText>
        </CCardBody>
      </CCard>
    </>
  )
}

export default InformativePanelPage

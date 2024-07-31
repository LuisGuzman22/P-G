import React from 'react'
import { CCard, CCardHeader, CCardBody, CCardText, CRow, CCol } from '@coreui/react'
import BaseTrisemanal from 'src/components/trisemanal/BaseTrisemanal'

const TrisemanalPage = () => {
  return (
    <>
      <CCard>
        <CCardHeader>Trisemanal</CCardHeader>
        <CCardBody>
          <CCardText>
            <BaseTrisemanal />
          </CCardText>
        </CCardBody>
      </CCard>
    </>
  )
}

export default TrisemanalPage

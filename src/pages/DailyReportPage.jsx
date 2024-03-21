import React from 'react'
import DailyReportCollapse from 'src/components/DailyReportCollapse'
import { CCard, CCardHeader, CButton, CCardBody, CCardText, CRow, CCol } from '@coreui/react'

const DailyReportPage = () => {
  return (
    <>
      <CCard>
        <CCardHeader>Informe diario</CCardHeader>
        <CCardBody>
          <CCardText>
            <DailyReportCollapse />
          </CCardText>
        </CCardBody>
      </CCard>
    </>
  )
}

export default DailyReportPage

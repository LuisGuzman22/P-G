import React from 'react'
import DailyReportCollapse from 'src/components/DailyReportCollapse'
import { CCard, CCardHeader, CButton, CCardBody, CCardText, CRow, CCol } from '@coreui/react'

const DailyReportPage = () => {
  return (
    <div className="daily-report">
      <CCard>
        <CCardBody>
          <CCardText>
            <DailyReportCollapse />
          </CCardText>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default DailyReportPage

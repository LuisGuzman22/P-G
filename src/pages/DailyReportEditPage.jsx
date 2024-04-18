import React, { useEffect } from 'react'
import DailyReportEditCollapse from 'src/components/DailyReportEditCollapse'
import { CCard, CCardBody, CCardText } from '@coreui/react'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import { useNavigate } from 'react-router-dom'

const DailyReportPage = () => {
  let navigate = useNavigate()

  const { getData } = useGetCachedQueryData()
  const basicQuery = getData('basics')

  useEffect(() => {
    if (!basicQuery) {
      navigate(`/dashboard`)
    }
  }, [basicQuery])

  return (
    <div className="daily-report">
      <CCard>
        <CCardBody>
          <CCardText>
            <DailyReportEditCollapse />
          </CCardText>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default DailyReportPage

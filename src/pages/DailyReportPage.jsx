import React, { useEffect } from 'react'
import DailyReportCollapse from 'src/components/DailyReportCollapse'
import { CCard, CCardBody, CCardText } from '@coreui/react'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import { useNavigate } from 'react-router-dom'
import useGetBasicData from 'src/hooks/useGetBasicData'
import useRegisterGeneralData from 'src/hooks/useRegisterGeneralData'
import useRegisterDailyReport from 'src/hooks/useRegisterDailyReport'

const DailyReportPage = () => {
  let navigate = useNavigate()

  const { getProject, getContract } = useRegisterGeneralData()

  const contractLS = JSON.parse(getContract())

  useGetBasicData(contractLS.id)

  const { getData } = useGetCachedQueryData()
  const basicQuery = getData('basics')

  useEffect(() => {
    if (!basicQuery) {
      navigate(`/inicio`)
    }
  }, [basicQuery, navigate])

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

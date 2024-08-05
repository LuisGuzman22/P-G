import { React, useState } from 'react'
import {
  CCard,
  CCardBody,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import { useNavigate } from 'react-router-dom'

const DashboardReport = () => {
  const { getData } = useGetCachedQueryData()
  const reportsQuery = getData('reports')
  let navigate = useNavigate()

  const redirectTo = (url) => {
    navigate(url)
  }

  const handleSelectReport = (report) => {
    localStorage.setItem('daily_report', report.id)
    redirectTo('/informe-diario/view')
  }

  return (
    <div className="proyect-administration">
      <CCard className="action-buttons">
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Fecha</CTableHeaderCell>
                <CTableHeaderCell scope="col">Número</CTableHeaderCell>
                {/* <CTableHeaderCell scope="col">N de firmas</CTableHeaderCell> */}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {reportsQuery?.map((report, index) => {
                return (
                  <CTableRow
                    key={index}
                    onClick={() => {
                      handleSelectReport(report)
                    }}
                  >
                    <CTableDataCell>{report.company.dailyReportDate}</CTableDataCell>
                    <CTableDataCell>{report.company.dailyReportNumber}</CTableDataCell>
                    {/* <CTableDataCell>{report.signatures}</CTableDataCell> */}
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default DashboardReport

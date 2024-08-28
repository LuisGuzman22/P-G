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
import CIcon from '@coreui/icons-react'
import { cilClipboard } from '@coreui/icons'
import './css.scss'

const DashboardReport = () => {
  const { getData } = useGetCachedQueryData()
  const reportsQuery = getData('reports')
  let navigate = useNavigate()

  const redirectTo = (url) => {
    navigate(url)
  }

  const handleSelectReport = (report, action) => {
    localStorage.setItem('daily_report', report.id)
    redirectTo(`/informe-diario/${action}`)
  }

  return (
    <div className="report-dashboard">
      <CCard className="action-buttons">
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Fecha</CTableHeaderCell>
                <CTableHeaderCell scope="col">Número</CTableHeaderCell>
                <CTableHeaderCell scope="col">Acción</CTableHeaderCell>
                {/* <CTableHeaderCell scope="col">N de firmas</CTableHeaderCell> */}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {reportsQuery?.map((report, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell className="cell-row">
                      {report.company.dailyReportDate}
                    </CTableDataCell>
                    <CTableDataCell className="cell-row">
                      {report.company.dailyReportNumber}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        className="btn-project-action"
                        onClick={() => {
                          handleSelectReport(report, 'view')
                        }}
                      >
                        Ver
                      </CButton>
                      <CButton
                        className="btn-project-action"
                        onClick={() => {
                          handleSelectReport(report, 'edit')
                        }}
                      >
                        Editar
                      </CButton>
                    </CTableDataCell>
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

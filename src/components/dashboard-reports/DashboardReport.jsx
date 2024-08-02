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

const DashboardReport = () => {
  return (
    <div className="proyect-administration">
      <CCard className="action-buttons">
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Fecha</CTableHeaderCell>
                <CTableHeaderCell scope="col">Número</CTableHeaderCell>
                <CTableHeaderCell scope="col">N de firmas</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableDataCell>27/07/2024</CTableDataCell>
                <CTableDataCell>102</CTableDataCell>
                <CTableDataCell>3/5</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell>26/07/2024</CTableDataCell>
                <CTableDataCell>101</CTableDataCell>
                <CTableDataCell>5/5</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default DashboardReport

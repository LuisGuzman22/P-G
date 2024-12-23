import { React, useEffect, useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CBadge,
} from '@coreui/react'

import Skeleton from 'react-loading-skeleton'

const HitosTable = () => {
  const milestonesData = [
    {
      item: 1,
      milestone: 'Hito N° 1: KOM',
      progRev: '24-06-2024',
      real: '24-06-2024',
      forecast: '-',
      variance: '-',
      color: 'success',
    },
    {
      item: 2,
      milestone: 'Hito N° 2: TÉRMINO DE ACREDITACIÓN',
      progRev: '22-08-2024',
      real: '15-10-2024',
      forecast: '54',
      variance: '54',
      color: 'danger',
    },
    {
      item: 3,
      milestone: 'Hito N° 3: TÉRMINO DE PERMISOS',
      progRev: '21-09-2024',
      real: '06-11-2024',
      forecast: '46',
      variance: '46',
      color: 'danger',
    },
    {
      item: 4,
      milestone: 'Hito N° 4: TÉRMINO CRUCE N°6',
      progRev: '20-11-2024',
      real: '-',
      forecast: '26-12-2024',
      variance: '36',
      color: 'danger',
    },
    {
      item: 14,
      milestone: 'Hito N° 14: TÉRMINO DE CAMBIO',
      progRev: '18-06-2025',
      real: '-',
      forecast: '11-09-2025',
      variance: '85',
      color: 'danger',
    },
  ]

  return (
    <CTable bordered responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Item</CTableHeaderCell>
          <CTableHeaderCell>Hitos Contractuales</CTableHeaderCell>
          <CTableHeaderCell>Prog. Rev 0</CTableHeaderCell>
          <CTableHeaderCell>Real</CTableHeaderCell>
          <CTableHeaderCell>Forecast</CTableHeaderCell>
          <CTableHeaderCell>Variación</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {milestonesData.map((row, index) => (
          <CTableRow key={index}>
            <CTableDataCell>{row.item}</CTableDataCell>
            <CTableDataCell>{row.milestone}</CTableDataCell>
            <CTableDataCell>{row.progRev}</CTableDataCell>
            <CTableDataCell>{row.real}</CTableDataCell>
            <CTableDataCell>{row.forecast}</CTableDataCell>
            <CTableDataCell>
              <CBadge color={row.color}>{row.variance}</CBadge>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}

export default HitosTable

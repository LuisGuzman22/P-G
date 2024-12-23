import { React, useEffect, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import { Chart } from 'react-google-charts'

import Skeleton from 'react-loading-skeleton'

const SCurveChart = () => {
  const data = [
    ['Fecha', 'Avance Programado (%)', 'Avance Real (%)', 'Retraso Acumulado (%)'],
    ['01-10-2023', 5, 3, 1],
    ['15-10-2023', 10, 7, 2],
    ['01-11-2023', 20, 15, 5],
    ['15-11-2023', 30, 26.5, 9.7],
    ['01-12-2023', 40, 36, 12],
    ['15-12-2023', 50, 45, 14],
    ['01-01-2024', 60, 55, 15],
    ['15-01-2024', 70, 65, 15],
    ['01-02-2024', 80, 75, 14],
    ['15-02-2024', 90, 85, 10],
    ['01-03-2024', 100, 95, 5],
  ]

  const options = {
    title: 'Avance General',
    curveType: 'function',
    legend: { position: 'bottom' },
    vAxis: {
      title: 'Porcentaje (%)',
      minValue: 0,
      maxValue: 100,
    },
    hAxis: {
      title: 'Fecha',
    },
    series: {
      0: { color: '#00b050' }, // Verde
      1: { color: '#0070c0' }, // Azul
      2: { color: '#ed7d31' }, // Naranja
    },
  }

  return <Chart chartType="LineChart" width="100%" height="100%" data={data} options={options} />
}

export default SCurveChart

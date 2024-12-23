import { React, useEffect, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import { Chart } from 'react-google-charts'

import Skeleton from 'react-loading-skeleton'

const GeneralProgressChart = () => {
  const dataTest = [
    [
      'Fecha',
      'Parcial Real',
      'Promedio Exc.',
      'Cumulativo Real',
      'Cumulativo Plan',
      'Promedio Rend. Plan',
    ],
    ['30-08-2024', 1000, 500, 1000, 1200, 700],
    ['06-09-2024', 1500, 600, 2500, 2400, 800],
    ['13-09-2024', 2000, 700, 4500, 3600, 900],
    ['20-09-2024', 2500, 800, 6000, 4800, 1000],
    ['27-09-2024', 3000, 900, 7500, 5400, 1100],
    ['28-09-2024', 4000, 1000, 7500, 5400, 1100],
    ['29-09-2024', 5000, 1100, 7500, 5400, 1100],
    ['30-09-2024', 6000, 1200, 7500, 5400, 1100],
    ['01-10-2024', 7000, 1300, 7500, 5400, 1100],
    ['02-10-2024', 8000, 1400, 7500, 5400, 1100],
    ['03-10-2024', 9000, 1500, 7500, 5400, 1100],
    ['04-10-2024', 10000, 1600, 7500, 5400, 1100],
    ['05-10-2024', 11000, 1700, 7500, 5400, 1100],
    ['06-10-2024', 12000, 1800, 7500, 5400, 1100],
    ['07-10-2024', 13000, 1900, 7500, 5400, 1100],
  ]

  const options = {
    title: 'Avance general de excavado y rendimiento (m3)',
    vAxes: {
      0: { title: 'Volumen (m3)' },
      1: { title: 'Rendimiento' },
    },
    hAxis: {
      title: 'Fecha',
    },
    seriesType: 'bars', // Barras por defecto
    series: {
      1: { type: 'line', lineDashStyle: [4, 4], color: 'purple' }, // Línea punteada
      2: { type: 'line', color: 'blue' }, // Línea continua azul
      3: { type: 'line', color: 'red' }, // Línea continua roja
      4: { type: 'line', lineDashStyle: [2, 2], color: 'green' }, // Línea punteada verde
    },
    colors: ['green'], // Color de las barras
  }

  return (
    <Chart chartType="ComboChart" width="100%" height="100%" data={dataTest} options={options} />
  )
}

export default GeneralProgressChart

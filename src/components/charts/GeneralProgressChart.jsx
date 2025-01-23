import { React, useEffect, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import { Chart } from 'react-google-charts'

import Skeleton from 'react-loading-skeleton'
import useGeneralProgressChart from 'src/hooks/useGeneralProgressChart'

const GeneralProgressChart = () => {
  // const { data, isLoading, error, refetch, isRefetching } = useGeneralProgressChart()

  // const options = {
  //   title: 'Avance general de excavado y rendimiento (m3)',
  //   vAxes: {
  //     0: { title: 'Volumen (m3)' },
  //     1: { title: 'Rendimiento' },
  //   },
  //   hAxis: {
  //     title: 'Fecha',
  //   },
  //   seriesType: 'bars', // Barras por defecto
  //   series: {
  //     1: { type: 'line', lineDashStyle: [4, 4], color: 'purple' }, // Línea punteada
  //     // 2: { type: 'line', color: 'blue' }, // Línea continua azul
  //     // 3: { type: 'line', color: 'red' }, // Línea continua roja
  //     // 4: { type: 'line', lineDashStyle: [2, 2], color: 'green' }, // Línea punteada verde
  //   },
  //   colors: ['green'], // Color de las barras
  // }

  const options = {
    title: 'Monthly Coffee Production by Country',
    vAxis: { title: 'Cups' },
    hAxis: { title: 'Month' },
    seriesType: 'bars',
    series: { 5: { type: 'line' } },
  }

  const data = [
    ['date', 'baseLineValue', 'realValue'],
    ['2024-06-27', 122.25, 0],
    ['2024-06-28', 244.5, 0],
    ['2024-06-29', 366.75, 0],
    ['2024-06-30', 489, 0],
    ['2024-07-01', 611.25, 0],
    ['2024-07-02', 733.5, 0],
    ['2024-07-03', 855.75, 0],
    ['2024-07-04', 978, 0],
    ['2024-07-05', 1100.25, 0],
    ['2024-07-06', 1222.5, 0],
    ['2024-07-07', 1344.75, 0],
    ['2024-07-08', 1467, 0],
  ]

  return (
    <>
      {/* {isLoading ? (
        <Skeleton />
      ) : ( */}
      <Chart chartType="ComboChart" width="100%" height="100%" data={data} options={options} />
      {/* )} */}
    </>
  )
}

export default GeneralProgressChart

import { React, useEffect, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import { Chart } from 'react-google-charts'

import Skeleton from 'react-loading-skeleton'
import useGeneralProgressChart from 'src/hooks/useGeneralProgressChart'

const GeneralProgressChart = () => {
  const { data, isLoading, error, refetch, isRefetching } = useGeneralProgressChart()

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
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <Chart
          chartType="ComboChart"
          width="100%"
          height="100%"
          data={data?.data}
          options={options}
        />
      )}
    </>
  )
}

export default GeneralProgressChart

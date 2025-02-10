import { React, useEffect, useState } from 'react'
import { Chart } from 'react-google-charts'

import Skeleton from 'react-loading-skeleton'
import useSCurveChart from 'src/hooks/useSCurveChart'

const SCurveChart = () => {
  const { data, isLoading, error, refetch, isRefetching } = useSCurveChart()

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

  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <Chart
          chartType="LineChart"
          width="100%"
          height="100%"
          data={data?.data?.data}
          options={options}
        />
      )}
    </>
  )
}

export default SCurveChart

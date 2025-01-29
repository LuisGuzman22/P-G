/* eslint-disable react/prop-types */

import { React, useEffect, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import { Chart } from 'react-google-charts'

const GeneralProgressChartItem = (props) => {
  // console.log('props', props?.data)
  // const options = {
  //   title: 'Monthly Coffee Production by Country',
  //   vAxis: { title: 'Cups' },
  //   hAxis: { title: 'Month' },
  //   seriesType: 'bars',
  //   series: { 5: { type: 'line' } },
  // }

  // const data2 = [
  //   ['date', 'baseLineValue', 'realValue'],
  //   ['2024-06-27', 122.25, 0],
  //   ['2024-06-28', 244.5, 0],
  //   ['2024-06-29', 366.75, 0],
  //   ['2024-06-30', 489, 0],
  //   ['2024-07-01', 611.25, 0],
  //   ['2024-07-02', 733.5, 0],
  //   ['2024-07-03', 855.75, 0],
  //   ['2024-07-04', 978, 0],
  //   ['2024-07-05', 1100.25, 0],
  //   ['2024-07-06', 1222.5, 0],
  //   ['2024-07-07', 1344.75, 0],
  //   ['2024-07-08', 1467, 0],
  // ]

  const replaceNullWithZero = (data) => {
    return data.map((row) => row.map((value) => (value === null ? 0 : value)))
  }

  const replaceNullWithZeroAndFormatDate = (data) => {
    return data.map((row, index) =>
      row.map((value, colIndex) => {
        if (value === null) return 0
        if (index > 0 && colIndex === 0 && typeof value === 'string') {
          return new Date(value) // Convierte la primera columna de cada fila en Date
        }
        return value
      }),
    )
  }

  return (
    <>
      {props?.data ? (
        <>
          {
            <Chart
              chartType="Line"
              width="100%"
              height="100%"
              data={replaceNullWithZero(props.data.data)}
              options={{
                // title: props.data.activityCode,
                chart: {
                  title: props.data.activityCode,
                  // subtitle: 'Sales and Expenses over the Years',
                },
                vAxis: { title: 'Cantidad' },
                hAxis: {
                  title: 'Meses',
                  slantedText: true,
                  slantedTextAngle: 90, // O el ángulo que prefieras
                  showTextEvery: 1, // Asegura que se muestre cada etiqueta
                  textStyle: { fontSize: 10 }, // Reducir tamaño de fuente para que entren más
                },
                // seriesType: 'bars',
                // series: { 5: { type: 'line' } },
              }}
            />
          }
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default GeneralProgressChartItem

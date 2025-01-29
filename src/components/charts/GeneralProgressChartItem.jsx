/* eslint-disable react/prop-types */

import { React, useEffect, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import { Chart } from 'react-google-charts'

const GeneralProgressChartItem = (props) => {
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
              // data={replaceNullWithZero(props.data.data)}
              data={props.data.data}
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

                series: {
                  1: { visibleInLegend: false }, // Oculta la serie vacía
                },
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

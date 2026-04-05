/* eslint-disable react/prop-types */

import { React } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import { Chart } from 'react-google-charts'

const GeneralProgressChartItem = (props) => {
  const replaceNullWithZero = (data) => {
    return data.map((row) => row.map((value) => (value === null ? 0 : value)))
  }

  return (
    <>
      {props?.data ? (
        <>
          {
            <Chart
              chartType="LineChart"
              width="100%"
              height="130%"
              data={replaceNullWithZero(props.data.data)}
              options={{
                title: props.data.activityCode,
                vAxis: {
                  title: 'Cantidad',
                  titleTextStyle: { fontSize: 14, bold: true }, // Asegura que el título sea visible
                },
                hAxis: {
                  slantedText: true,
                  slantedTextAngle: 45, // Mantiene el texto en diagonal para mayor legibilidad
                  // showTextEvery: 1,
                  // maxAlternation: 1, // Obliga a mostrar todas las fechas sin recortar
                  textStyle: { fontSize: 7 },
                },
                series: {
                  0: { color: '#00778B' },
                  1: { visibleInLegend: true, color: '#EAAA00' },
                },
                annotations: {
                  0: {
                    // Para la primera línea (Line 1)
                    style: 'line', // O puede ser 'point' si prefieres marcar un solo punto
                    alwaysOutside: true,
                    textStyle: { color: '#FF0000', fontSize: 14 },
                    stem: { length: 5 },
                    xValue: 3, // El índice del último valor en 'X'
                    yValue: 40, // El valor final de la línea
                  },
                  1: {
                    // Para la segunda línea (Line 2)
                    style: 'line',
                    alwaysOutside: true,
                    textStyle: { color: '#00FF00', fontSize: 14 },
                    stem: { length: 5 },
                    xValue: 3, // El índice del último valor en 'X'
                    yValue: 50, // El valor final de la línea
                  },
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

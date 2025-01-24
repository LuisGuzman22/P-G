/* eslint-disable react/prop-types */

import { React, useEffect, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import { Chart } from 'react-google-charts'

const GeneralProgressChartItem = (props) => {
  console.log('props', props)
  // const options = {
  //   title: 'Monthly Coffee Production by Country',
  //   vAxis: { title: 'Cups' },
  //   hAxis: { title: 'Month' },
  //   seriesType: 'bars',
  //   series: { 5: { type: 'line' } },
  // }

  const data2 = [
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

  console.log('props.data.activities', props.data.activities.length)
  console.log('props.data.activities', props.data.activities)
  return (
    <>
      {props?.data ? (
        <>
          {props.data.activities.slice(0, 3).map((item, index) => {
            // console.log('item', item)

            const options = {
              title: item.activityName,
              vAxis: { title: 'Cups' },
              hAxis: { title: 'Month' },
              seriesType: 'bars',
              series: { 5: { type: 'line' } },
            }

            const data = []

            for (let position of item.data) {
            }

            return (
              <Chart
                chartType="ComboChart"
                width="100%"
                height="100%"
                data={data2}
                options={options}
                key={index}
              />
            )
          })}
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default GeneralProgressChartItem

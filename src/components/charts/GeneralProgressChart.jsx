import { React, useEffect, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import { Chart } from 'react-google-charts'

import Skeleton from 'react-loading-skeleton'
import useGeneralProgressChart from 'src/hooks/useGeneralProgressChart'
import GeneralProgressChartItem from './GeneralProgressChartItem'

const GeneralProgressChart = () => {
  const { data, isLoading, error, refetch, isRefetching } = useGeneralProgressChart()

  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        data.length > 0 &&
        data.slice(0, 5).map((item, index) => {
          return <GeneralProgressChartItem data={item} key={index} />
        })
      )}
    </>
  )
}

export default GeneralProgressChart

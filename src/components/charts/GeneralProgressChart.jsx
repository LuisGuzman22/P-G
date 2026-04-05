import { React } from 'react'

import Skeleton from 'react-loading-skeleton'
import useGeneralProgressChart from 'src/hooks/useGeneralProgressChart'
import GeneralProgressChartItem from './GeneralProgressChartItem'

const GeneralProgressChart = () => {
  const { data, isLoading } = useGeneralProgressChart()
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
  //   ['2024-06-30', 489, null],
  //   ['2024-07-01', 611.25, null],
  //   ['2024-07-02', 733.5, null],
  //   ['2024-07-03', 855.75, null],
  //   ['2024-07-04', 978, null],
  //   ['2024-07-05', 1100.25, null],
  //   ['2024-07-06', 1222.5, null],
  //   ['2024-07-07', 1344.75, null],
  //   ['2024-07-08', 1467, null],
  // ]

  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        // <Chart chartType="Line" width="100%" height="100%" data={data2} options={options} />

        data.length > 0 &&
        data.map((item, index) => {
          return <GeneralProgressChartItem data={item} key={index} />
        })
      )}
    </>
  )
}

export default GeneralProgressChart

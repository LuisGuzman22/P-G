import { React, useEffect, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import { Chart } from 'react-google-charts'

import Skeleton from 'react-loading-skeleton'
import { datamock } from './data'
import useGantt from 'src/hooks/useGantt'

const GanttChart = () => {
  const options = {
    height: 400,
    gantt: {
      trackHeight: 30,
    },
    legend: { position: 'none', fontSize: 13, italic: false },
    annotations: {
      textStyle: {
        fontName: 'Times-Roman',
        fontSize: 13,
        bold: true,
        italic: false,
      },
    },
    tooltip: { isHtml: true },
  }

  const { data, isLoading, error, refetch, isRefetching } = useGantt()

  return (
    <div className="proyect-administration">
      <h2>Carta Gantt</h2>

      <CCard className="action-buttons">
        <CCardBody>
          {!isLoading && !isRefetching && data.rows.length > 0 ? (
            <Chart
              chartType="Gantt"
              width="100%"
              height="50%"
              data={[data.columns, ...data.rows]}
              options={options}
              chartLanguage="es-419"
              tooltip={{
                trigger: 'selection',
                showColorCode: true,
                isHtml: true,
              }}
            />
          ) : (
            <>
              <Skeleton />
            </>
          )}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default GanttChart

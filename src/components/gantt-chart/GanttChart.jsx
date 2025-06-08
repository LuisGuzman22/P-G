import { React, useEffect, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import useGantt from 'src/hooks/useGantt'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'

const GanttChart = () => {
  const { isLoading, refetch, isRefetching } = useGantt()
  const { getData } = useGetCachedQueryData()
  const ganttQuery = getData('gantt')

  return (
    <div className="proyect-administration">
      <h2>Carta Gantt</h2>

      <CCard className="action-buttons">
        <CCardBody>
          {ganttQuery && ganttQuery.length > 0 ? (
            <>
              <object data={ganttQuery[0].url} type="application/pdf" width="100%" height="500px">
                <iframe
                  src={ganttQuery[0].url}
                  width="100%"
                  height="100%"
                  // style="border: none;"
                >
                  <p>
                    Si no logras ver el archivo puedes descargarlo desde acá.
                    <a href={ganttQuery[0].url}>Download the PDF</a>.
                  </p>
                </iframe>
              </object>
            </>
          ) : (
            <>No hay documentos cargados</>
          )}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default GanttChart

// https://cdn.simplepdf.com/simple-pdf/assets/sample.pdf

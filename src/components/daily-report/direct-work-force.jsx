import React, { useEffect, useRef, useState } from 'react'
import {
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableBody,
  CTableDataCell,
  CToast,
  CToastBody,
} from '@coreui/react'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'
import { v4 as uuidv4 } from 'uuid'
import { validate } from 'src/utils/validate'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import { useLocation } from 'react-router-dom'
import { Chart } from 'react-google-charts'
import { toPng } from 'html-to-image'

const DirectWorkForce = () => {
  const currentLocation = useLocation().pathname
  const isViewMode = currentLocation.includes('/view')
  const columnChartElement = useRef(null)

  const initialStatee = {
    directWorkForce: undefined,
    directWorkForceOfferedNumber: undefined,
    directWorkForceContractedNumber: undefined,
    directWorkForceCertifiedNumber: undefined,
    directWorkForceBreakNumber: undefined,
    directWorkForceWorkNumber: undefined,
    directWorkForceHHNumber: undefined,
  }

  const { getData } = useGetCachedQueryData()
  const basicQuery = getData('basics')

  const [directWorkForce, setDirectWorkForce] = useState(initialStatee)
  const [directWorkForceList, setDirectWorkForceList] = useState([])
  const [error, setError] = useState(false)
  const [totalPlanedDotation, setTotalPlanedDotation] = useState(0)
  const [totalWorkDotation, setTotalWorkDotation] = useState(0)
  const [imagenColumnChart, setImagenColumnChart] = useState()
  const [barGraphData, setBarGraphData] = useState([
    ['Dotación', 'Dotación', { role: 'style' }],
    ['Dotación Planeada Directos Total', 0, '#b87333'], // RGB value
    ['Dotación Directos Obra Total', 0, 'silver'], // English color name
  ])

  const {
    storeDirectWorkForce,
    removeDirectWorkForce,
    directWorkForceList: directWorkForceListContext,
    storeGraphs,
  } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    setError(false)

    if (e.target.id === 'directWorkForce') {
      setDirectWorkForce(initialStatee) // Clear the object
      setDirectWorkForce({ [e.target.id]: e.target.value })
    }
    if (validate(e.target.value)) {
      setDirectWorkForce({ ...directWorkForce, [e.target.id]: e.target.value })
    }
  }

  const registerDirectWorkForce = () => {
    if (!directWorkForce.directWorkForce) {
      setError(true)
    } else {
      const directWorkForceInitialState = {
        id: uuidv4(),
        directWorkForce: directWorkForce.directWorkForce,
        offeredNumber: directWorkForce.directWorkForceOfferedNumber,
        contractedNumber: directWorkForce.directWorkForceContractedNumber,
        certified: directWorkForce.directWorkForceCertifiedNumber,
        breakNumber: directWorkForce.directWorkForceBreakNumber,
        workNumber: directWorkForce.directWorkForceWorkNumber,
        hh: directWorkForce.directWorkForceHHNumber,
      }
      setDirectWorkForce(initialStatee) // Clear the object
      setDirectWorkForceList([...directWorkForceList, directWorkForceInitialState])
    }
  }

  const deleteDirectWorkForce = (id) => {
    const newData = directWorkForceList.filter((item) => item.id !== id)
    setDirectWorkForceList(newData)

    removeDirectWorkForce(id)
  }

  useEffect(() => {
    if (!isViewMode) storeDirectWorkForce(directWorkForceList)
  }, [directWorkForceList])

  useEffect(() => {
    let offered = 0
    let worked = 0
    directWorkForceListContext.map((data) => {
      offered = offered + Number(data.offeredNumber)
      worked = worked + Number(data.workNumber)
    })
    setTotalPlanedDotation(offered)
    setTotalWorkDotation(worked)
    // convertDotationChart()
  }, [directWorkForceListContext])

  const convertDotationChart = () => {
    toPng(columnChartElement.current, { cacheBust: false })
      .then((dataUrl) => {
        if (dataUrl !== 'data:,') {
          setImagenColumnChart(dataUrl)
        }
        // storeGraphs({ dotationChart: dataUrl })
      })
      .catch((err) => {})
  }

  useEffect(() => {
    setBarGraphData([
      ['Dotación', 'Dotación', { role: 'style' }],
      ['Dotación Planeada Directos Total', totalPlanedDotation, '#b87333'], // RGB value
      ['Dotación Directos Obra Total', totalWorkDotation, 'silver'], // English color name
    ])
  }, [totalPlanedDotation, totalWorkDotation])

  useEffect(() => {
    convertDotationChart()
  }, [barGraphData])

  useEffect(() => {
    if (!isViewMode) storeGraphs({ name: 'dotationChart', value: imagenColumnChart })
  }, [imagenColumnChart])

  return (
    <div className="work-force-report">
      {!isViewMode && (
        <>
          {error && (
            <CToast
              autohide={true}
              visible={error}
              color="danger"
              onClose={() => {
                setError(false)
              }}
              className="text-white align-items-center"
            >
              <div className="d-flex">
                <CToastBody>Debe seleccionar el cargo para generar el registro</CToastBody>
              </div>
            </CToast>
          )}
          <CFormSelect
            aria-label="Default select example"
            id="directWorkForce"
            value={directWorkForce.directWorkForce || ''}
            label="Cargo"
            onChange={(e) => {
              onChangeData(e)
            }}
          >
            <option value={0}>Seleccione</option>
            {basicQuery.directPersonal.map((directPersonalCached) => {
              return (
                <option key={directPersonalCached.id} value={directPersonalCached.id}>
                  {directPersonalCached.name}
                </option>
              )
            })}
          </CFormSelect>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">N° Ofertado</CTableHeaderCell>
                <CTableHeaderCell scope="col">N° Contratados</CTableHeaderCell>
                <CTableHeaderCell scope="col">N° Acreditados</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    id="directWorkForceOfferedNumber"
                    placeholder="N° Ofertado"
                    value={directWorkForce.directWorkForceOfferedNumber || ''}
                    onChange={(e) => {
                      onChangeData(e)
                    }}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    id="directWorkForceContractedNumber"
                    placeholder="N° Contratados"
                    value={directWorkForce.directWorkForceContractedNumber || ''}
                    onChange={(e) => {
                      onChangeData(e)
                    }}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    id="directWorkForceCertifiedNumber"
                    placeholder="N° Acreditados"
                    value={directWorkForce.directWorkForceCertifiedNumber || ''}
                    onChange={(e) => {
                      onChangeData(e)
                    }}
                  />
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="col">N° Descanso</CTableHeaderCell>
                <CTableHeaderCell scope="col">N° Obra</CTableHeaderCell>
                <CTableHeaderCell scope="col">HH (Turno)</CTableHeaderCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    id="directWorkForceBreakNumber"
                    placeholder="N° Descanso"
                    value={directWorkForce.directWorkForceBreakNumber || ''}
                    onChange={(e) => {
                      onChangeData(e)
                    }}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    id="directWorkForceWorkNumber"
                    placeholder="N° Obra"
                    value={directWorkForce.directWorkForceWorkNumber || ''}
                    onChange={(e) => {
                      onChangeData(e)
                    }}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    id="directWorkForceHHNumber"
                    placeholder="HH (Turno)"
                    value={directWorkForce.directWorkForceHHNumber || ''}
                    onChange={(e) => {
                      onChangeData(e)
                    }}
                  />
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </>
      )}
      {!isViewMode && (
        <CButton
          className="btn-project-action"
          onClick={() => {
            registerDirectWorkForce()
          }}
        >
          Registrar
        </CButton>
      )}
      {directWorkForceListContext.length > 0 && directWorkForceListContext[0].directWorkForce && (
        <CTable className="resume-table">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Cargo</CTableHeaderCell>
              <CTableHeaderCell scope="col">N° Ofertado</CTableHeaderCell>
              <CTableHeaderCell scope="col">N° Contratados</CTableHeaderCell>
              <CTableHeaderCell scope="col">Acreditados</CTableHeaderCell>
              <CTableHeaderCell scope="col">N° Descanso</CTableHeaderCell>
              <CTableHeaderCell scope="col">N° Obra</CTableHeaderCell>
              <CTableHeaderCell scope="col">HH (Turno)</CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {directWorkForceListContext.map((item, index) => {
              const charge = basicQuery.directPersonal.find((personal) => {
                return personal.id == item.directWorkForce
              })
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{charge.name}</CTableDataCell>
                  <CTableDataCell>{item.offeredNumber}</CTableDataCell>
                  <CTableDataCell>{item.contractedNumber}</CTableDataCell>
                  <CTableDataCell>{item.certified}</CTableDataCell>
                  <CTableDataCell>{item.breakNumber}</CTableDataCell>
                  <CTableDataCell>{item.workNumber}</CTableDataCell>
                  <CTableDataCell>{item.hh}</CTableDataCell>
                  <CTableDataCell>
                    {!isViewMode && (
                      <CButton
                        className="btn-project-action"
                        onClick={() => {
                          deleteDirectWorkForce(item.id)
                        }}
                      >
                        eliminar
                      </CButton>
                    )}
                  </CTableDataCell>
                </CTableRow>
              )
            })}
          </CTableBody>
        </CTable>
      )}

      <div ref={columnChartElement} style={{ width: '100%' }}>
        <Chart chartType="ColumnChart" width="100%" height="400px" data={barGraphData} />
      </div>
    </div>
  )
}

export default DirectWorkForce

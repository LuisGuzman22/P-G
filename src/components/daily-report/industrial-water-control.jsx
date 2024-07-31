import { React, useState, useEffect } from 'react'
import {
  CForm,
  CFormInput,
  CButton,
  CFormSelect,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableBody,
  CTableDataCell,
  CToast,
  CToastBody,
  CTooltip,
} from '@coreui/react'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'
import { v4 as uuidv4 } from 'uuid'
import { validate } from 'src/utils/validate'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import { useLocation } from 'react-router-dom'

const IndustrialWaterControl = () => {
  const currentLocation = useLocation().pathname
  const isViewMode = currentLocation.includes('/view')
  const isCreatingMode = currentLocation === '/informe-diario'

  const initialState = {
    aljibe: undefined,
    aljibeCachimbaName: undefined,
    aljibeQuantityTurns: undefined,
    aljibeM3: undefined,
    aljibePlate: undefined,
    aljibeM3Accumulated: undefined,
  }

  const aljibeTotalsInitialState = {
    aljibeCachimbaName: 0,
    aljibeQuantityTurns: 0,
    aljibeM3: 0,
    aljibePlate: 0,
    aljibeM3Accumulated: 0,
  }

  const { getData } = useGetCachedQueryData()
  const basicQuery = getData('basics')

  const [aljibe, setAlgibe] = useState(initialState)
  const [aljibeList, setAlgibeList] = useState([])
  const [aljibeTotals, setAlgibeTotals] = useState(aljibeTotalsInitialState)
  const [plates, setPlates] = useState()
  const [error, setError] = useState(false)
  const [accumulatedM3, setAccumulatedM3] = useState(0)

  const {
    storealjibe,
    removealjibe,
    aljibeList: aljibeListContext,
    storeAccumulatedM3,
    accumulatedM3: accumulatedM3Context,
  } = useRegisterDailyReportCompany()

  const selectedReport = getData('selectedReport')

  const onChangeData = (e) => {
    setError(false)
    if (e.target.id === 'aljibe') {
      setAlgibe(initialState) // Clear the object
      setAlgibe({ [e.target.id]: e.target.value })
      if (e.target.value !== '0') {
        const selectedAljibe = basicQuery.aljibe.find((alj) => {
          return alj.id.toString() === e.target.value.toString()
        })
        setPlates(selectedAljibe.plate)
      } else {
        setPlates()
      }
    } else if (e.target.id === 'aljibePlate') {
      if (e.target.value !== '0') {
        setAlgibe({ ...aljibe, [e.target.id]: e.target.value })
      } else {
        setAlgibe({ ...aljibe, [e.target.id]: '0' })
      }
    } else {
      if (e.target.id === 'aljibeCachimbaName') {
        setAlgibe({ ...aljibe, aljibeCachimbaName: e.target.value })
      }
      if (validate(e.target.value)) {
        setAlgibe({ ...aljibe, [e.target.id]: e.target.value })
      }
    }
  }

  const registeraljibe = () => {
    if (
      !aljibe.aljibe ||
      aljibe.aljibe === '0' ||
      !aljibe.aljibePlate ||
      aljibe.aljibePlate === '0'
    ) {
      setError(true)
    } else {
      setPlates()
      const aljibeInitialState = {
        id: uuidv4(),
        aljibe: aljibe.aljibe,
        aljibeCachimbaName: aljibe.aljibeCachimbaName,
        aljibeQuantityTurns: aljibe.aljibeQuantityTurns,
        aljibeM3: aljibe.aljibeM3,
        aljibePlate: aljibe.aljibePlate,
        aljibeM3Accumulated: accumulatedM3,
      }
      setAlgibe(initialState) // Clear the object
      setAlgibeList([...aljibeListContext, aljibeInitialState])
    }
  }

  const deletealjibe = (id) => {
    const newData = aljibeListContext.filter((item) => item.id !== id)
    setAlgibeList(newData)
    removealjibe(id)
  }

  const editAljibe = (id) => {
    const selectedAljibe = aljibeListContext.find((item) => item.id === id)

    const selectedAljibeData = basicQuery.aljibe.find((alj) => {
      return alj.id.toString() === selectedAljibe.aljibe.toString()
    })
    setPlates(selectedAljibeData.plate)

    setAlgibe({
      aljibe: selectedAljibe.aljibe,
      aljibeCachimbaName: selectedAljibe.aljibeCachimbaName,
      aljibeQuantityTurns: selectedAljibe.aljibeQuantityTurns,
      aljibeM3: selectedAljibe.aljibeM3,
      aljibePlate: selectedAljibe.aljibePlate,
    })

    deletealjibe(id)
  }

  useEffect(() => {
    let tempAcumulated = selectedReport?.aljibeList[0]?.aljibeM3Accumulated || 0
    aljibeList.map((aljibe) => {
      tempAcumulated = Number(tempAcumulated) + Number(aljibe?.aljibeM3 || 0)
    })
    // setAccumulatedM3(tempAcumulated)

    if (!isViewMode) {
      storealjibe(aljibeList)
    }
  }, [aljibeList])

  useEffect(() => {
    storeAccumulatedM3(accumulatedM3)
    let aljData = {}
    let algDataList = []
    if (aljibeList.length > 0) {
      aljibeList.map((aljibe) => {
        aljData = {
          id: aljibe.id,
          aljibe: aljibe.aljibe,
          aljibeCachimbaName: aljibe.aljibeCachimbaName,
          aljibeQuantityTurns: aljibe.aljibeQuantityTurns,
          aljibeM3: aljibe.aljibeM3,
          aljibePlate: aljibe.aljibePlate,
          aljibeM3Accumulated: accumulatedM3,
        }
        algDataList.push(aljData)
      })
      setAlgibeList(algDataList)
    }
  }, [accumulatedM3])

  useEffect(() => {
    let aljibeTotalsCounter = {
      aljibeM3: 0,
      aljibeQuantityTurns: 0,
    }
    for (let data of aljibeListContext) {
      aljibeTotalsCounter = {
        aljibeM3: Number(aljibeTotalsCounter.aljibeM3) + Number(data.aljibeM3 ?? 0),
        aljibeQuantityTurns:
          Number(aljibeTotalsCounter.aljibeQuantityTurns) + Number(data.aljibeQuantityTurns ?? 0),
      }
    }

    setAlgibeTotals(aljibeTotalsCounter)
  }, [aljibeListContext])

  useEffect(() => {
    if (isCreatingMode) {
      if (selectedReport && selectedReport.aljibeList.length > 0) {
        setAccumulatedM3(
          selectedReport.aljibeList[0].aljibeM3Accumulated || 0 + Number(aljibeTotals.aljibeM3),
        )
      } else {
        setAccumulatedM3(Number(aljibeTotals.aljibeM3))
      }
    } else {
      setAccumulatedM3(selectedReport.aljibeList[0]?.aljibeM3Accumulated || 0)
      // setAccumulatedM3(
      //   selectedReport.aljibeList[0].aljibeM3Accumulated + Number(aljibeTotals.aljibeM3),
      // )
    }
  }, [aljibeTotals])

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
                <CToastBody>
                  Debe seleccionar el aljibe y su patente para generar el registro
                </CToastBody>
              </div>
            </CToast>
          )}
          <CFormSelect
            aria-label="Default select example"
            label="Aljibe"
            id="aljibe"
            value={aljibe.aljibe || ''}
            onChange={(e) => {
              onChangeData(e)
            }}
          >
            <option value={0}>Seleccione</option>
            {basicQuery.aljibe.map((aljibeCached) => {
              return (
                <option key={aljibeCached.id} value={aljibeCached.id}>
                  {aljibeCached.name}
                </option>
              )
            })}
          </CFormSelect>
          {plates && (
            <>
              <br />
              <CFormSelect
                aria-label="Default select example"
                label="Patente"
                id="aljibePlate"
                value={aljibe.aljibePlate ?? 0}
                onChange={(e) => {
                  onChangeData(e)
                }}
              >
                <option value={0}>Seleccione</option>
                {plates.map((plate) => {
                  return (
                    <option key={plate.id} value={plate.id}>
                      {plate.label}
                    </option>
                  )
                })}
              </CFormSelect>
            </>
          )}
          <CTable>
            <CTableHead></CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableHeaderCell scope="col">Nombre Cachimba</CTableHeaderCell>
                <CTableHeaderCell scope="col">Cantidad de vueltas</CTableHeaderCell>
                <CTableHeaderCell scope="col">Cantidad de m3</CTableHeaderCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    id="aljibeCachimbaName"
                    value={aljibe.aljibeCachimbaName || ''}
                    text=""
                    onChange={(e) => {
                      onChangeData(e)
                    }}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    id="aljibeQuantityTurns"
                    value={aljibe.aljibeQuantityTurns || ''}
                    text=""
                    onChange={(e) => {
                      onChangeData(e)
                    }}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    id="aljibeM3"
                    value={aljibe.aljibeM3 || ''}
                    text=""
                    onChange={(e) => {
                      onChangeData(e)
                    }}
                  />
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>

          <CButton
            className="btn-project-action"
            onClick={() => {
              registeraljibe()
            }}
          >
            Registrar
          </CButton>
        </>
      )}
      <CTooltip
        content="Total de m3 acumulados a la Fecha."
        placement="top"
        // style={customTooltipStyle}
      >
        <CTableHeaderCell scope="col">Cantidad de m3 acumulada: {accumulatedM3}</CTableHeaderCell>
      </CTooltip>

      {aljibeListContext.length > 0 && aljibeListContext[0].aljibe && (
        <CTable className="resume-table">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Aljibe</CTableHeaderCell>
              <CTableHeaderCell scope="col">Patente</CTableHeaderCell>
              <CTableHeaderCell scope="col">Nombre Cachimba</CTableHeaderCell>
              <CTableHeaderCell scope="col">Cantidad de vueltas</CTableHeaderCell>
              <CTableHeaderCell scope="col">Cantidad de m3</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {aljibeListContext.map((item, index) => {
              const aljibe = basicQuery.aljibe.find((alj) => {
                return alj.id == item.aljibe
              })
              const plate = aljibe.plate.find((pl) => {
                return pl.id.toString() === item.aljibePlate.toString()
              })
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{aljibe.name ?? ''}</CTableDataCell>
                  <CTableDataCell>{plate.label ?? ''}</CTableDataCell>
                  <CTableDataCell>{item.aljibeCachimbaName ?? 0}</CTableDataCell>
                  <CTableDataCell>{item.aljibeQuantityTurns ?? 0}</CTableDataCell>
                  <CTableDataCell>{item.aljibeM3 ?? 0}</CTableDataCell>
                  <CTableDataCell>
                    {isCreatingMode && (
                      <CButton
                        className="btn-project-action"
                        onClick={() => {
                          deletealjibe(item.id)
                        }}
                      >
                        eliminar
                      </CButton>
                    )}
                  </CTableDataCell>
                  <CTableDataCell>
                    {isCreatingMode && (
                      <CButton
                        className="btn-project-action"
                        onClick={() => {
                          editAljibe(item.id)
                        }}
                      >
                        editar
                      </CButton>
                    )}
                  </CTableDataCell>
                </CTableRow>
              )
            })}
            <CTableRow key={'total'}>
              <CTableDataCell>Total</CTableDataCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>{aljibeTotals.aljibeQuantityTurns ?? 0}</CTableDataCell>
              <CTableDataCell>{aljibeTotals.aljibeM3 ?? 0}</CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      )}
    </div>
  )
}

export default IndustrialWaterControl

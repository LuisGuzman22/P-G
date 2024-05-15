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
    aljibeOfferedNumber: undefined,
    aljibeCertifiedNumber: undefined,
    aljibeWorkNumber: undefined,
  }

  const aljibeTotalsInitialState = {
    aljibeCachimbaName: 0,
    aljibeQuantityTurns: 0,
    aljibeM3: 0,
    aljibePlate: 0,
    aljibeOfferedNumber: 0,
    aljibeCertifiedNumber: 0,
    aljibeWorkNumber: 0,
  }

  const { getData } = useGetCachedQueryData()
  const basicQuery = getData('basics')

  const [aljibe, setAlgibe] = useState(initialState)
  const [aljibeList, setAlgibeList] = useState([])
  const [aljibeTotals, setAlgibeTotals] = useState(aljibeTotalsInitialState)
  const [plates, setPlates] = useState()
  const [error, setError] = useState(false)

  const {
    storealjibe,
    removealjibe,
    aljibeList: aljibeListContext,
  } = useRegisterDailyReportCompany()

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
        aljibeOfferedNumber: aljibe.aljibeOfferedNumber,
        aljibeCertifiedNumber: aljibe.aljibeCertifiedNumber,
        aljibeWorkNumber: aljibe.aljibeWorkNumber,
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
      aljibeOfferedNumber: selectedAljibe.aljibeOfferedNumber,
      aljibeCertifiedNumber: selectedAljibe.aljibeCertifiedNumber,
      aljibeWorkNumber: selectedAljibe.aljibeWorkNumber,
    })

    deletealjibe(id)
  }

  useEffect(() => {
    if (!isViewMode) storealjibe(aljibeList)
  }, [aljibeList])

  useEffect(() => {
    let aljibeTotalsCounter = {
      aljibeOfferedNumber: 0,
      aljibeCertifiedNumber: 0,
      aljibeM3: 0,
      aljibeWorkNumber: 0,
      aljibeQuantityTurns: 0,
    }

    for (let data of aljibeListContext) {
      aljibeTotalsCounter = {
        aljibeOfferedNumber:
          Number(aljibeTotalsCounter.aljibeOfferedNumber) + Number(data.aljibeOfferedNumber ?? 0),
        aljibeCertifiedNumber:
          Number(aljibeTotalsCounter.aljibeCertifiedNumber) +
          Number(data.aljibeCertifiedNumber ?? 0),
        aljibeM3: Number(aljibeTotalsCounter.aljibeM3) + Number(data.aljibeM3 ?? 0),
        aljibeWorkNumber:
          Number(aljibeTotalsCounter.aljibeWorkNumber) + Number(data.aljibeWorkNumber ?? 0),
        aljibeQuantityTurns:
          Number(aljibeTotalsCounter.aljibeQuantityTurns) + Number(data.aljibeQuantityTurns ?? 0),
      }
    }
    setAlgibeTotals(aljibeTotalsCounter)
  }, [aljibeListContext])

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
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">N° Vehículo oferta</CTableHeaderCell>
                <CTableHeaderCell scope="col">N° Vehículo Acreditado</CTableHeaderCell>
                <CTableHeaderCell scope="col">N° Vehículo en Obra</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    id="aljibeOfferedNumber"
                    value={aljibe.aljibeOfferedNumber || ''}
                    text=""
                    onChange={(e) => {
                      onChangeData(e)
                    }}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    id="aljibeCertifiedNumber"
                    value={aljibe.aljibeCertifiedNumber || ''}
                    text=""
                    onChange={(e) => {
                      onChangeData(e)
                    }}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    id="aljibeWorkNumber"
                    value={aljibe.aljibeWorkNumber || ''}
                    text=""
                    onChange={(e) => {
                      onChangeData(e)
                    }}
                  />
                </CTableDataCell>
              </CTableRow>
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

      {aljibeListContext.length > 0 && aljibeListContext[0].aljibe && (
        <CTable className="resume-table">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Aljibe</CTableHeaderCell>
              <CTableHeaderCell scope="col">Patente</CTableHeaderCell>
              <CTableHeaderCell scope="col">Nombre Cachimba</CTableHeaderCell>
              <CTableHeaderCell scope="col">Cantidad de vueltas</CTableHeaderCell>
              <CTableHeaderCell scope="col">Cantidad de m3</CTableHeaderCell>
              <CTableHeaderCell scope="col">N° Vehículos oferta</CTableHeaderCell>
              <CTableHeaderCell scope="col">N° Vehículos Acreditado</CTableHeaderCell>
              <CTableHeaderCell scope="col">N° Vehículos en Obra</CTableHeaderCell>
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
                  <CTableDataCell>{item.aljibeOfferedNumber ?? 0}</CTableDataCell>
                  <CTableDataCell>{item.aljibeCertifiedNumber ?? 0}</CTableDataCell>
                  <CTableDataCell>{item.aljibeWorkNumber ?? 0}</CTableDataCell>
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
              <CTableDataCell>{aljibeTotals.aljibeOfferedNumber ?? 0}</CTableDataCell>
              <CTableDataCell>{aljibeTotals.aljibeCertifiedNumber ?? 0}</CTableDataCell>
              <CTableDataCell>{aljibeTotals.aljibeWorkNumber ?? 0}</CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      )}
    </div>
  )
}

export default IndustrialWaterControl

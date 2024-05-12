import { React, useState, useEffect } from 'react'
import {
  CButton,
  CFormInput,
  CFormSelect,
  CFormTextarea,
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

const DirectDotationWorkForce = () => {
  const currentLocation = useLocation().pathname
  const isViewMode = currentLocation.includes('/view')
  const isCreatingMode = currentLocation === '/informe-diario'

  const initialState = {
    directWorkFront: undefined,
    directDotationWorkForceObservation: undefined,
    directSubWorkFront: undefined,
    directWorkFrontCharge: undefined,
    directWorkFrontQuantity: undefined,
    directDotationWorkForceObservation: undefined,
  }

  const { getData } = useGetCachedQueryData()
  const basicQuery = getData('basics')

  const [directDotationWorkForce, setDirectDotationWorkForce] = useState(initialState)
  const [directDotationWorkForceList, setDirectDotationWorkForceList] = useState([])
  const [enableSubFrontWork, setEnableSubFrontWork] = useState(false)
  const [error, setError] = useState(false)

  const {
    storeDirectDotationWorkForceData,
    removeDirectDotationWorkForce,
    directDotationWorkForceList: directDotationWorkForceListContext,
  } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    setError(false)
    if (e.target.id === 'directWorkFront') {
      const selectedWorkFront = basicQuery.workFront.find((workFront) => {
        return workFront.id.toString() === e.target.value.toString()
      })
      setEnableSubFrontWork(selectedWorkFront.hasSubFront)
    }
    if (e.target.id === 'directSubWorkFront' || e.target.id === 'directWorkFrontQuantity') {
      if (validate(e.target.value)) {
        setDirectDotationWorkForce({
          ...directDotationWorkForce,
          [e.target.id]: e.target.value,
        })
      }
    } else {
      setDirectDotationWorkForce({
        ...directDotationWorkForce,
        [e.target.id]: e.target.value,
      })
    }
  }

  useEffect(() => {
    setDirectDotationWorkForce({
      ...directDotationWorkForce,
      directSubWorkFront: enableSubFrontWork
        ? directDotationWorkForce.directSubWorkFront
        : undefined,
    })
  }, [enableSubFrontWork])

  const registerDirectDotationWorkForce = () => {
    if (
      !directDotationWorkForce.directWorkFront ||
      !directDotationWorkForce.directWorkFrontCharge ||
      !directDotationWorkForce.directWorkFrontQuantity
    ) {
      setError(true)
    } else {
      setEnableSubFrontWork(false)
      const directDotationWorkForceInitialState = {
        id: uuidv4(),
        directDotationWorkForceObservation:
          directDotationWorkForce.directDotationWorkForceObservation,
        directWorkFront: directDotationWorkForce.directWorkFront,
        directSubWorkFront: directDotationWorkForce.directSubWorkFront,
        directWorkFrontCharge: directDotationWorkForce.directWorkFrontCharge,
        directWorkFrontQuantity: directDotationWorkForce.directWorkFrontQuantity,
      }
      setDirectDotationWorkForce(initialState) // Clear the object
      setDirectDotationWorkForceList([
        ...directDotationWorkForceList,
        directDotationWorkForceInitialState,
      ])
    }
  }

  const deletedirectDotationWorkForce = (id) => {
    const newData = directDotationWorkForceList.filter((item) => item.id !== id)
    setDirectDotationWorkForceList(newData)
    removeDirectDotationWorkForce(id)
  }

  const editDirectDotationWorkForce = (id) => {
    const selectDirectDotationWorkForce = directDotationWorkForceListContext.find(
      (item) => item.id === id,
    )
    if (selectDirectDotationWorkForce.directSubWorkFront) {
      setEnableSubFrontWork(true)
    }
    setDirectDotationWorkForce({
      directWorkFront: selectDirectDotationWorkForce.directWorkFront,
      directDotationWorkForceObservation:
        selectDirectDotationWorkForce.directDotationWorkForceObservation,
      directSubWorkFront: selectDirectDotationWorkForce.directSubWorkFront,
      directWorkFrontCharge: selectDirectDotationWorkForce.directWorkFrontCharge,
      directWorkFrontQuantity: selectDirectDotationWorkForce.directWorkFrontQuantity,
    })
    deletedirectDotationWorkForce(id)
  }

  useEffect(() => {
    if (!isViewMode) storeDirectDotationWorkForceData(directDotationWorkForceList)
  }, [directDotationWorkForceList])

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
                  Debe completar los datos de frente de trabajo, cargo y cantidad para registrar el
                  personal
                </CToastBody>
              </div>
            </CToast>
          )}
          <CFormSelect
            aria-label="Default select example"
            id="directWorkFront"
            label="Frente de trabajo"
            value={directDotationWorkForce.directWorkFront || ''}
            onChange={(e) => {
              onChangeData(e)
            }}
          >
            <option value={'0'}>Seleccione</option>
            {basicQuery.workFront.map((workfrontCached) => {
              return (
                <option key={workfrontCached.id} value={workfrontCached.id}>
                  {workfrontCached.name}
                </option>
              )
            })}
          </CFormSelect>
          {enableSubFrontWork && (
            <>
              <br />
              <CFormInput
                type="text"
                id="directSubWorkFront"
                label="SubFrente de trabajo"
                value={directDotationWorkForce.directSubWorkFront || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </>
          )}

          <br />

          <CFormSelect
            aria-label="Default select example"
            id="directWorkFrontCharge"
            value={directDotationWorkForce.directWorkFrontCharge || ''}
            label="Cargo"
            onChange={(e) => {
              onChangeData(e)
            }}
          >
            <option value={'0'}>Seleccione</option>
            {basicQuery.directPersonal.map((directPersonalCached) => {
              return (
                <option key={directPersonalCached.id} value={directPersonalCached.id}>
                  {directPersonalCached.name}
                </option>
              )
            })}
          </CFormSelect>
          <br />
          <CFormInput
            type="text"
            id="directWorkFrontQuantity"
            label="Cantidad"
            value={directDotationWorkForce.directWorkFrontQuantity || ''}
            text=""
            onChange={(e) => {
              onChangeData(e)
            }}
          />
          <br />
          <CFormTextarea
            id="directDotationWorkForceObservation"
            placeholder="Deja un comentario / observación"
            value={directDotationWorkForce.directDotationWorkForceObservation || ''}
            onChange={(e) => {
              onChangeData(e)
            }}
          ></CFormTextarea>
          <br />

          <CButton
            className="btn-project-action"
            onClick={() => {
              registerDirectDotationWorkForce()
            }}
          >
            Registrar
          </CButton>
        </>
      )}
      {directDotationWorkForceListContext.length > 0 &&
        directDotationWorkForceListContext[0].id && (
          <>
            <CTable className="resume-table">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Frente de trabajo</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Sub frente de trabajo</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Personal</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Cantidad</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Comentario</CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {directDotationWorkForceListContext.map((item, index) => {
                  const selectedWorkFront = basicQuery.workFront.find((workF) => {
                    return workF.id == item.directWorkFront
                  })
                  const selectedCharge = basicQuery.directPersonal.find((charge) => {
                    return charge.id == item.directWorkFrontCharge
                  })
                  return (
                    <CTableRow key={item.id}>
                      <CTableDataCell>
                        <span key={item.id}>{selectedWorkFront.name}</span>
                      </CTableDataCell>
                      <CTableDataCell>
                        <span key={item.id}>{item.directSubWorkFront ?? 'N/A'}</span>
                      </CTableDataCell>
                      <CTableDataCell>
                        <span key={item.id}>{selectedCharge.name}</span>
                      </CTableDataCell>
                      <CTableDataCell>
                        <span key={item.id}>{item.directWorkFrontQuantity}</span>
                      </CTableDataCell>
                      <CTableDataCell>
                        <span key={item.id}>{item.directDotationWorkForceObservation}</span>
                      </CTableDataCell>
                      <CTableDataCell>
                        {isCreatingMode && (
                          <CButton
                            className="btn-project-action"
                            onClick={() => {
                              deletedirectDotationWorkForce(item.id)
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
                              editDirectDotationWorkForce(item.id)
                            }}
                          >
                            Editar
                          </CButton>
                        )}
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>
          </>
        )}
    </div>
  )
}

export default DirectDotationWorkForce

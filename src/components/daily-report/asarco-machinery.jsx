import { React, useEffect, useState } from 'react'
import {
  CButton,
  CFormInput,
  CRow,
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

const AsarcoMachinery = () => {
  const currentLocation = useLocation().pathname
  const isEditMode = currentLocation.includes('/edit')

  const initialState = {
    machinery: undefined,
    asarcoMachineryEffectiveTime: undefined,
    asarcoMachineryUnscheduleMaintenance: undefined,
    asarcoMachineryScheduleMaintenance: undefined,
    asarcoMachineryUnscheduleDelay: undefined,
    asarcoMachineryReserves: undefined,
    asarcoMachineryHorometer: undefined,
    asarcoMachineryOpperationalLoss: undefined,
    asarcoMachineryScheduleDelay: undefined,
    machineryPlate: undefined,
  }

  const asarcoMachineryTotalsInitialState = {
    asarcoMachineryEffectiveTime: 0,
    asarcoMachineryUnscheduleMaintenance: 0,
    asarcoMachineryScheduleMaintenance: 0,
    asarcoMachineryUnscheduleDelay: 0,
    asarcoMachineryReserves: 0,
    asarcoMachineryHorometer: 0,
    asarcoMachineryOpperationalLoss: 0,
    asarcoMachineryScheduleDelay: 0,
    machineryPlate: 0,
  }

  const { getData } = useGetCachedQueryData()
  const basicQuery = getData('basics')

  const [asarcoMachinery, setAsarcoMachinery] = useState(initialState)
  const [asarcoMachineryList, setAsarcoMachineryList] = useState([])
  const [asarcoMachineryTotals, setAsarcoMachineryTotals] = useState(
    asarcoMachineryTotalsInitialState,
  )
  const [plates, setPlates] = useState()
  const [error, setError] = useState(false)

  const {
    storeAsarcoMachinery,
    removeAsarcoMachinery,
    asarcoMachineryList: asarcoMachineryListContext,
  } = useRegisterDailyReportCompany()

  useEffect(() => {
    console.log('asarcoMachineryListContext', asarcoMachineryListContext)
  }, [asarcoMachineryListContext])

  const onChangeData = (e) => {
    setError(false)

    if (e.target.id === 'machinery') {
      setAsarcoMachinery(initialState) // Clear the object
      setAsarcoMachinery({ [e.target.id]: e.target.value })
      if (e.target.value !== '0') {
        const selectedMachinery = basicQuery.machinery.find((mac) => {
          return mac.id.toString() === e.target.value.toString()
        })
        setPlates(selectedMachinery.plate)
      } else {
        setPlates()
      }
    } else if (e.target.id === 'machineryPlate') {
      if (e.target.value !== '0') {
        setAsarcoMachinery({ ...asarcoMachinery, [e.target.id]: e.target.value })
      } else {
        setAsarcoMachinery({ ...asarcoMachinery, [e.target.id]: '0' })
      }
    } else {
      if (validate(e.target.value)) {
        setAsarcoMachinery({ ...asarcoMachinery, [e.target.id]: e.target.value })
      }
    }
  }

  const registerAsarcoMachinery = () => {
    if (!asarcoMachinery.machinery || !asarcoMachinery.machineryPlate) {
      setError(true)
    } else {
      setPlates()
      const asarcoMachineryInitialState = {
        id: uuidv4(),
        machinery: asarcoMachinery.machinery,
        asarcoMachineryEffectiveTime: asarcoMachinery.asarcoMachineryEffectiveTime,
        asarcoMachineryUnscheduleMaintenance: asarcoMachinery.asarcoMachineryUnscheduleMaintenance,
        asarcoMachineryScheduleMaintenance: asarcoMachinery.asarcoMachineryScheduleMaintenance,
        asarcoMachineryUnscheduleDelay: asarcoMachinery.asarcoMachineryUnscheduleDelay,
        asarcoMachineryReserves: asarcoMachinery.asarcoMachineryReserves,
        asarcoMachineryHorometer: asarcoMachinery.asarcoMachineryHorometer,
        asarcoMachineryOpperationalLoss: asarcoMachinery.asarcoMachineryOpperationalLoss,
        asarcoMachineryScheduleDelay: asarcoMachinery.asarcoMachineryScheduleDelay,
        machineryPlate: asarcoMachinery.machineryPlate,
      }
      setAsarcoMachinery(initialState) // Clear the object
      setAsarcoMachineryList([...asarcoMachineryList, asarcoMachineryInitialState])
    }
  }

  const deleteAsarcoMachinery = (id) => {
    const newData = asarcoMachineryList.filter((item) => item.id !== id)
    setAsarcoMachineryList(newData)

    removeAsarcoMachinery(id)
  }

  useEffect(() => {
    if (!isEditMode) storeAsarcoMachinery(asarcoMachineryList)
  }, [asarcoMachineryList])

  useEffect(() => {
    let asarcoMachineryTotalsCounter = {
      asarcoMachineryEffectiveTime: 0,
      asarcoMachineryUnscheduleMaintenance: 0,
      asarcoMachineryScheduleMaintenance: 0,
      asarcoMachineryUnscheduleDelay: 0,
      asarcoMachineryReserves: 0,
      asarcoMachineryHorometer: 0,
      asarcoMachineryOpperationalLoss: 0,
      asarcoMachineryScheduleDelay: 0,
    }

    for (let data of asarcoMachineryListContext) {
      asarcoMachineryTotalsCounter = {
        asarcoMachineryEffectiveTime:
          Number(asarcoMachineryTotalsCounter.asarcoMachineryEffectiveTime) +
          Number(data.asarcoMachineryEffectiveTime ?? 0),
        asarcoMachineryUnscheduleMaintenance:
          Number(asarcoMachineryTotalsCounter.asarcoMachineryUnscheduleMaintenance) +
          Number(data.asarcoMachineryUnscheduleMaintenance ?? 0),
        asarcoMachineryScheduleMaintenance:
          Number(asarcoMachineryTotalsCounter.asarcoMachineryScheduleMaintenance) +
          Number(data.asarcoMachineryScheduleMaintenance ?? 0),
        asarcoMachineryUnscheduleDelay:
          Number(asarcoMachineryTotalsCounter.asarcoMachineryUnscheduleDelay) +
          Number(data.asarcoMachineryUnscheduleDelay ?? 0),
        asarcoMachineryReserves:
          Number(asarcoMachineryTotalsCounter.asarcoMachineryReserves) +
          Number(data.asarcoMachineryReserves ?? 0),
        asarcoMachineryHorometer:
          Number(asarcoMachineryTotalsCounter.asarcoMachineryHorometer) +
          Number(data.asarcoMachineryHorometer ?? 0),
        asarcoMachineryOpperationalLoss:
          Number(asarcoMachineryTotalsCounter.asarcoMachineryOpperationalLoss) +
          Number(data.asarcoMachineryOpperationalLoss ?? 0),
        asarcoMachineryScheduleDelay:
          Number(asarcoMachineryTotalsCounter.asarcoMachineryScheduleDelay) +
          Number(data.asarcoMachineryScheduleDelay ?? 0),
      }
    }
    setAsarcoMachineryTotals(asarcoMachineryTotalsCounter)
  }, [asarcoMachineryListContext])

  return (
    <div className="work-force-report">
      {!isEditMode && (
        <>
          {' '}
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
                  Debe seleccionar la máquina y su patente para generar el registro
                </CToastBody>
              </div>
            </CToast>
          )}
          <CFormSelect
            aria-label="Default select example"
            label="Maquinaria"
            id="machinery"
            value={asarcoMachinery.machinery ?? 0}
            onChange={(e) => {
              onChangeData(e)
            }}
          >
            <option value={0}>Seleccione</option>
            {basicQuery.machinery.map((machineryCached) => {
              return (
                <option key={machineryCached.id} value={machineryCached.id}>
                  {machineryCached.name}
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
                id="machineryPlate"
                value={asarcoMachinery.machineryPlate ?? 0}
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
                <CTableHeaderCell scope="col">Tiempo Efectivo (Hrs)</CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  Mantenimiento No Programado (Hrs) (Por alguna falla o alerta)
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">Mantenimiento Programado (Hrs)</CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  Demora No Programada (Hrs) (Interrupción al ciclo de trabajo)
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  Reservas (Hrs) (Sin operador, factores externos)
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    id="asarcoMachineryEffectiveTime"
                    value={asarcoMachinery.asarcoMachineryEffectiveTime || ''}
                    text=""
                    onChange={(e) => {
                      onChangeData(e)
                    }}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    id="asarcoMachineryUnscheduleMaintenance"
                    value={asarcoMachinery.asarcoMachineryUnscheduleMaintenance || ''}
                    text=""
                    onChange={(e) => {
                      onChangeData(e)
                    }}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    id="asarcoMachineryScheduleMaintenance"
                    value={asarcoMachinery.asarcoMachineryScheduleMaintenance || ''}
                    text=""
                    onChange={(e) => {
                      onChangeData(e)
                    }}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    id="asarcoMachineryUnscheduleDelay"
                    value={asarcoMachinery.asarcoMachineryUnscheduleDelay || ''}
                    text=""
                    onChange={(e) => {
                      onChangeData(e)
                    }}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    id="asarcoMachineryReserves"
                    value={asarcoMachinery.asarcoMachineryReserves || ''}
                    text=""
                    onChange={(e) => {
                      onChangeData(e)
                    }}
                  />
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="col">Horometro (Hrs)</CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  Pérdida Operacional (Hrs) (depende de otro equipo)
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  Demoras Programadas (Hrs) (Colación y cambio de turno)
                </CTableHeaderCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    id="asarcoMachineryHorometer"
                    value={asarcoMachinery.asarcoMachineryHorometer || ''}
                    text=""
                    onChange={(e) => {
                      onChangeData(e)
                    }}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    id="asarcoMachineryOpperationalLoss"
                    value={asarcoMachinery.asarcoMachineryOpperationalLoss || ''}
                    text=""
                    onChange={(e) => {
                      onChangeData(e)
                    }}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    id="asarcoMachineryScheduleDelay"
                    value={asarcoMachinery.asarcoMachineryScheduleDelay || ''}
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
              registerAsarcoMachinery()
            }}
          >
            Registrar
          </CButton>
        </>
      )}

      {asarcoMachineryListContext.length > 0 && asarcoMachineryListContext[0].machinery && (
        <CTable className="resume-table">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Maquinaria</CTableHeaderCell>
              <CTableHeaderCell scope="col">Patente</CTableHeaderCell>
              <CTableHeaderCell scope="col">Tiempo Efectivo (Hrs)</CTableHeaderCell>
              <CTableHeaderCell scope="col">
                Mantenimiento No Programado (Hrs) (Por alguna falla o alerta)
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">Mantenimiento Programado (Hrs)</CTableHeaderCell>
              <CTableHeaderCell scope="col">
                Demora No Programada (Hrs) (Interrupción al ciclo de trabajo)
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">
                Reservas (Hrs) (Sin operador, factores externos)
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">Horometro (Hrs)</CTableHeaderCell>
              <CTableHeaderCell scope="col">
                Pérdida Operacional (Hrs) (depende de otro equipo)
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">
                Demoras Programadas (Hrs) (Colación y cambio de turno)
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {asarcoMachineryListContext.map((item, index) => {
              const machinery = basicQuery.machinery.find((machinery) => {
                return machinery.id == item.machinery
              })
              const plate = machinery.plate.find((pl) => {
                return pl.id.toString() === item.machineryPlate.toString()
              })
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{machinery.name}</CTableDataCell>
                  <CTableDataCell>{plate.label}</CTableDataCell>
                  <CTableDataCell>{item.asarcoMachineryEffectiveTime}</CTableDataCell>
                  <CTableDataCell>{item.asarcoMachineryUnscheduleMaintenance}</CTableDataCell>
                  <CTableDataCell>{item.asarcoMachineryScheduleMaintenance}</CTableDataCell>
                  <CTableDataCell>{item.asarcoMachineryUnscheduleDelay}</CTableDataCell>
                  <CTableDataCell>{item.asarcoMachineryReserves}</CTableDataCell>
                  <CTableDataCell>{item.asarcoMachineryHorometer}</CTableDataCell>
                  <CTableDataCell>{item.asarcoMachineryOpperationalLoss}</CTableDataCell>
                  <CTableDataCell>{item.asarcoMachineryScheduleDelay}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      className="btn-project-action"
                      onClick={() => {
                        deleteAsarcoMachinery(item.id)
                      }}
                    >
                      eliminar
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
            <CTableRow key={'total'}>
              <CTableDataCell>Total</CTableDataCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>{asarcoMachineryTotals.asarcoMachineryEffectiveTime}</CTableDataCell>
              <CTableDataCell>
                {asarcoMachineryTotals.asarcoMachineryUnscheduleMaintenance}
              </CTableDataCell>
              <CTableDataCell>
                {asarcoMachineryTotals.asarcoMachineryScheduleMaintenance}
              </CTableDataCell>
              <CTableDataCell>
                {asarcoMachineryTotals.asarcoMachineryUnscheduleDelay}
              </CTableDataCell>
              <CTableDataCell>{asarcoMachineryTotals.asarcoMachineryReserves}</CTableDataCell>
              <CTableDataCell>{asarcoMachineryTotals.asarcoMachineryHorometer}</CTableDataCell>
              <CTableDataCell>
                {asarcoMachineryTotals.asarcoMachineryOpperationalLoss}
              </CTableDataCell>
              <CTableDataCell>{asarcoMachineryTotals.asarcoMachineryScheduleDelay}</CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      )}
    </div>
  )
}

export default AsarcoMachinery

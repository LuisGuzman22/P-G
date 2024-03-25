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
} from '@coreui/react'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'
import { v4 as uuidv4 } from 'uuid'
import { validate } from 'src/utils/validate'

const AsarcoMachinery = () => {
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
  }

  const [asarcoMachinery, setAsarcoMachinery] = useState(initialState)
  const [asarcoMachineryList, setAsarcoMachineryList] = useState([])
  const [asarcoMachineryTotals, setAsarcoMachineryTotals] = useState(
    asarcoMachineryTotalsInitialState,
  )

  const {
    storeAsarcoMachinery,
    removeAsarcoMachinery,
    asarcoMachineryList: asarcoMachineryListContext,
  } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    if (e.target.id === 'machinery') {
      setAsarcoMachinery(initialState) // Clear the object
      setAsarcoMachinery({ [e.target.id]: e.target.value })
    }
    if (validate(e.target.value)) {
      setAsarcoMachinery({ ...asarcoMachinery, [e.target.id]: e.target.value })
    }
  }

  const registerAsarcoMachinery = () => {
    const asarcoMachineryInitialState = {
      id: uuidv4(),
      machinery: asarcoMachinery.machinery,
      actions: {
        asarcoMachineryEffectiveTime: asarcoMachinery.asarcoMachineryEffectiveTime,
        asarcoMachineryUnscheduleMaintenance: asarcoMachinery.asarcoMachineryUnscheduleMaintenance,
        asarcoMachineryScheduleMaintenance: asarcoMachinery.asarcoMachineryScheduleMaintenance,
        asarcoMachineryUnscheduleDelay: asarcoMachinery.asarcoMachineryUnscheduleDelay,
        asarcoMachineryReserves: asarcoMachinery.asarcoMachineryReserves,
        asarcoMachineryHorometer: asarcoMachinery.asarcoMachineryHorometer,
        asarcoMachineryOpperationalLoss: asarcoMachinery.asarcoMachineryOpperationalLoss,
        asarcoMachineryScheduleDelay: asarcoMachinery.asarcoMachineryScheduleDelay,
      },
    }
    setAsarcoMachinery(initialState) // Clear the object
    setAsarcoMachineryList([...asarcoMachineryList, asarcoMachineryInitialState])
  }

  const deleteAsarcoMachinery = (id) => {
    const newData = asarcoMachineryList.filter((item) => item.id !== id)
    setAsarcoMachineryList(newData)

    removeAsarcoMachinery(id)
  }

  useEffect(() => {
    storeAsarcoMachinery(asarcoMachineryList)
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
          Number(data.actions.asarcoMachineryEffectiveTime ?? 0),
        asarcoMachineryUnscheduleMaintenance:
          Number(asarcoMachineryTotalsCounter.asarcoMachineryUnscheduleMaintenance) +
          Number(data.actions.asarcoMachineryUnscheduleMaintenance ?? 0),
        asarcoMachineryScheduleMaintenance:
          Number(asarcoMachineryTotalsCounter.asarcoMachineryScheduleMaintenance) +
          Number(data.actions.asarcoMachineryScheduleMaintenance ?? 0),
        asarcoMachineryUnscheduleDelay:
          Number(asarcoMachineryTotalsCounter.asarcoMachineryUnscheduleDelay) +
          Number(data.actions.asarcoMachineryUnscheduleDelay ?? 0),
        asarcoMachineryReserves:
          Number(asarcoMachineryTotalsCounter.asarcoMachineryReserves) +
          Number(data.actions.asarcoMachineryReserves ?? 0),
        asarcoMachineryHorometer:
          Number(asarcoMachineryTotalsCounter.asarcoMachineryHorometer) +
          Number(data.actions.asarcoMachineryHorometer ?? 0),
        asarcoMachineryOpperationalLoss:
          Number(asarcoMachineryTotalsCounter.asarcoMachineryOpperationalLoss) +
          Number(data.actions.asarcoMachineryOpperationalLoss ?? 0),
        asarcoMachineryScheduleDelay:
          Number(asarcoMachineryTotalsCounter.asarcoMachineryScheduleDelay) +
          Number(data.actions.asarcoMachineryScheduleDelay ?? 0),
      }
    }
    setAsarcoMachineryTotals(asarcoMachineryTotalsCounter)
  }, [asarcoMachineryListContext])

  return (
    <div className="work-force-report">
      <CFormSelect
        aria-label="Default select example"
        id="machinery"
        value={asarcoMachinery.machinery ?? 0}
        onChange={(e) => {
          onChangeData(e)
        }}
      >
        <option value={0}>Seleccione</option>
        <option value="maquina_1">Maquina 1</option>
        <option value="maquina_2">Maquina 2</option>
        <option value="maquina_3">Maquina 3</option>
      </CFormSelect>

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

      {asarcoMachineryListContext.length > 0 && asarcoMachineryListContext[0].machinery && (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
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
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{item.machinery}</CTableDataCell>
                  <CTableDataCell>{item.actions.asarcoMachineryEffectiveTime}</CTableDataCell>
                  <CTableDataCell>
                    {item.actions.asarcoMachineryUnscheduleMaintenance}
                  </CTableDataCell>
                  <CTableDataCell>{item.actions.asarcoMachineryScheduleMaintenance}</CTableDataCell>
                  <CTableDataCell>{item.actions.asarcoMachineryUnscheduleDelay}</CTableDataCell>
                  <CTableDataCell>{item.actions.asarcoMachineryReserves}</CTableDataCell>
                  <CTableDataCell>{item.actions.asarcoMachineryHorometer}</CTableDataCell>
                  <CTableDataCell>{item.actions.asarcoMachineryOpperationalLoss}</CTableDataCell>
                  <CTableDataCell>{item.actions.asarcoMachineryScheduleDelay}</CTableDataCell>
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

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

const Machinery = () => {
  const initialState = {
    machinery: undefined,
    machineryOfferedNumber: undefined,
    machineryCertifiedNumber: undefined,
    machineryWorkNumber: undefined,
    // machineryEffectiveTime: undefined,
    // machineryUnscheduleMaintenance: undefined,
    // machineryScheduleMaintenance: undefined,
    // machineryUnscheduleDelay: undefined,
    // machineryReserves: undefined,
    // machineryHorometer: undefined,
    // machineryOpperationalLoss: undefined,
    // machineryScheduleDelay: undefined,
  }

  const [machinery, setMachinery] = useState(initialState)
  const [machineryList, setMachineryList] = useState([])

  const {
    storeMachinery,
    removeMachinery,
    machineryList: machineryListContext,
  } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    if (e.target.id === 'machinery') {
      setMachinery(initialState) // Clear the object
      setMachinery({ [e.target.id]: e.target.value })
    }
    setMachinery({ ...machinery, [e.target.id]: e.target.value })
  }

  const registerMachinery = () => {
    const machineryInitialState = {
      id: uuidv4(),
      machinery: machinery.machinery,
      actions: {
        machineryOfferedNumber: machinery.machineryOfferedNumber,
        machineryCertifiedNumber: machinery.machineryCertifiedNumber,
        machineryWorkNumber: machinery.machineryWorkNumber,
        machineryEffectiveTime: machinery.machineryEffectiveTime,
        machineryUnscheduleMaintenance: machinery.machineryUnscheduleMaintenance,
        machineryScheduleMaintenance: machinery.machineryScheduleMaintenance,
        machineryUnscheduleDelay: machinery.machineryUnscheduleDelay,
        machineryReserves: machinery.machineryReserves,
        machineryHorometer: machinery.machineryHorometer,
        machineryOpperationalLoss: machinery.machineryOpperationalLoss,
        machineryScheduleDelay: machinery.machineryScheduleDelay,
      },
    }
    setMachinery(initialState) // Clear the object
    setMachineryList([...machineryList, machineryInitialState])
  }

  const deleteMachinery = (id) => {
    const newData = machineryList.filter((item) => item.id !== id)
    setMachineryList(newData)

    removeMachinery(id)
  }

  useEffect(() => {
    storeMachinery(machineryList)
  }, [machineryList])

  return (
    <div className="work-force-report">
      <CFormSelect
        aria-label="Default select example"
        id="machinery"
        onChange={(e) => {
          onChangeData(e)
        }}
      >
        <option>Seleccione</option>
        <option value="maquina_1">Maquina 1</option>
        <option value="maquina_2">Maquina 2</option>
        <option value="maquina_3">Maquina 3</option>
      </CFormSelect>

      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">N° maq oferta</CTableHeaderCell>
            <CTableHeaderCell scope="col">N° maq Acreditado</CTableHeaderCell>
            <CTableHeaderCell scope="col">N° maq en Obra</CTableHeaderCell>
            {/* <CTableHeaderCell scope="col">Tiempo Efectivo (Hrs)</CTableHeaderCell>
            <CTableHeaderCell scope="col">
              Mantenimiento No Programado (Hrs) (Por alguna falla o alerta)
            </CTableHeaderCell> */}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="machineryOfferedNumber"
                value={machinery.machineryOfferedNumber || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="machineryCertifiedNumber"
                value={machinery.machineryCertifiedNumber || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="machineryWorkNumber"
                value={machinery.machineryWorkNumber || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            {/* <CTableDataCell>
              <CFormInput
                type="text"
                id="machineryEffectiveTime"
                value={machinery.machineryEffectiveTime || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="machineryUnscheduleMaintenance"
                value={machinery.machineryUnscheduleMaintenance || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell> */}
          </CTableRow>
          {/* <CTableRow>
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
          </CTableRow>
          <CTableRow>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="machineryScheduleMaintenance"
                value={machinery.machineryScheduleMaintenance || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="machineryUnscheduleDelay"
                value={machinery.machineryUnscheduleDelay || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="machineryReserves"
                value={machinery.machineryReserves || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="machineryHorometer"
                value={machinery.machineryHorometer || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="machineryOpperationalLoss"
                value={machinery.machineryOpperationalLoss || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="col">
              Demoras Programadas (Hrs) (Colación y cambio de turno)
            </CTableHeaderCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="machineryScheduleDelay"
                value={machinery.machineryScheduleDelay || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
          </CTableRow> */}
        </CTableBody>
      </CTable>

      <CButton
        className="btn-project-action"
        onClick={() => {
          registerMachinery()
        }}
      >
        Registrar
      </CButton>

      {machineryListContext.length > 0 && machineryListContext[0].machinery && (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
              <CTableHeaderCell scope="col">N° maq oferta</CTableHeaderCell>
              <CTableHeaderCell scope="col">N° maq Acreditado</CTableHeaderCell>
              <CTableHeaderCell scope="col">N° maq en Obra</CTableHeaderCell>
              {/* <CTableHeaderCell scope="col">Tiempo Efectivo (Hrs)</CTableHeaderCell>
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
              </CTableHeaderCell> */}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {machineryListContext.map((item, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{item.machinery}</CTableDataCell>
                  <CTableDataCell>{item.actions.machineryOfferedNumber}</CTableDataCell>
                  <CTableDataCell>{item.actions.machineryCertifiedNumber}</CTableDataCell>
                  <CTableDataCell>{item.actions.machineryWorkNumber}</CTableDataCell>
                  {/* <CTableDataCell>{item.actions.machineryEffectiveTime}</CTableDataCell>
                  <CTableDataCell>{item.actions.machineryUnscheduleMaintenance}</CTableDataCell>
                  <CTableDataCell>{item.actions.machineryScheduleMaintenance}</CTableDataCell>
                  <CTableDataCell>{item.actions.machineryUnscheduleDelay}</CTableDataCell>
                  <CTableDataCell>{item.actions.machineryReserves}</CTableDataCell>
                  <CTableDataCell>{item.actions.machineryHorometer}</CTableDataCell>
                  <CTableDataCell>{item.actions.machineryOpperationalLoss}</CTableDataCell>
                  <CTableDataCell>{item.actions.machineryScheduleDelay}</CTableDataCell> */}
                  <CTableDataCell>
                    <CButton
                      className="btn-project-action"
                      onClick={() => {
                        deleteMachinery(item.id)
                      }}
                    >
                      eliminar
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
          </CTableBody>
        </CTable>
      )}
    </div>
  )
}

export default Machinery

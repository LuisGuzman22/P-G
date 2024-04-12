import { React, useState, useEffect } from 'react'
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
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
// FALTA VALIDAR
const Activities = () => {
  const initialState = {
    activityFrontWork: undefined,
    primaveraId: undefined,
    activityName: undefined,
    activityDiscipline: undefined,
    activityTotalAmount: undefined,
    activityPreviousAcumulatedAmount: undefined,
    activityActualShiftQuantity: undefined,
    activityAccumulatedAcvancePercent: undefined,
    activityUnit: undefined,
    activityHoursSpendPrevius: undefined,
    activityHoursSpendShift: undefined,
    activityHoursAccumulated: undefined,
  }

  const { getData } = useGetCachedQueryData()
  const basicQuery = getData('basics')

  const [activity, setActivity] = useState(initialState)
  const [activityList, setActivityList] = useState([])

  const {
    storeActivity,
    removeActivity,
    activityList: activityListContext,
  } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    if (e.target.id === 'activityFrontWork') {
      setActivity(initialState) // Clear the object
      setActivity({ [e.target.id]: e.target.value })
    }
    if (
      e.target.id === 'activityTotalAmount' ||
      e.target.id === 'activityPreviousAcumulatedAmount' ||
      e.target.id === 'activityActualShiftQuantity' ||
      e.target.id === 'activityAccumulatedAcvancePercent' ||
      e.target.id === 'activityHoursSpendPrevius' ||
      e.target.id === 'activityHoursSpendShift' ||
      e.target.id === 'activityHoursAccumulated'
    ) {
      if (validate(e.target.value)) {
        setActivity({ ...activity, [e.target.id]: e.target.value })
      }
    } else {
      setActivity({ ...activity, [e.target.id]: e.target.value })
    }
  }

  const registerActivity = () => {
    const activityInitialState = {
      id: uuidv4(),
      activityFrontWork: activity.activityFrontWork,
      primaveraId: activity.primaveraId,
      activityName: activity.activityName,
      activityDiscipline: activity.activityDiscipline,
      activityTotalAmount: activity.activityTotalAmount,
      activityPreviousAcumulatedAmount: activity.activityPreviousAcumulatedAmount,
      activityActualShiftQuantity: activity.activityActualShiftQuantity,
      activityAccumulatedAcvancePercent: activity.activityAccumulatedAcvancePercent,
      activityUnit: activity.activityUnit,
      activityHoursSpendPrevius: activity.activityHoursSpendPrevius,
      activityHoursSpendShift: activity.activityHoursSpendShift,
      activityHoursAccumulated: activity.activityHoursAccumulated,
    }
    setActivity(initialState) // Clear the object
    setActivityList([...activityList, activityInitialState])
  }

  const deleteActivity = (id) => {
    const newData = activityList.filter((item) => item.id !== id)
    setActivity(newData)
    removeActivity(id)
  }

  useEffect(() => {
    storeActivity(activityList)
  }, [activityList])

  return (
    <div className="work-force-report">
      <CFormSelect
        aria-label="Default select example"
        id="activityFrontWork"
        value={activity.activityFrontWork}
        onChange={(e) => {
          onChangeData(e)
        }}
      >
        <option>Seleccione</option>
        {basicQuery.workFront.map((workFrontCached) => {
          return (
            <option key={workFrontCached.id} value={workFrontCached.id}>
              {workFrontCached.name}
            </option>
          )
        })}{' '}
      </CFormSelect>

      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">ID Actividad Primavera</CTableHeaderCell>
            <CTableHeaderCell scope="col">Nombre de Actividad</CTableHeaderCell>
            <CTableHeaderCell scope="col">Disciplina</CTableHeaderCell>
            <CTableHeaderCell scope="col">Cantidad Total</CTableHeaderCell>
            <CTableHeaderCell scope="col">Cantidad Acum Anterior</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="primaveraId"
                value={activity.primaveraId || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="activityName"
                value={activity.activityName || ''}
                text=""
                disabled
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormSelect
                aria-label="Default select example"
                id="activityDiscipline"
                onChange={(e) => {
                  onChangeData(e)
                }}
              >
                <option>Seleccione</option>
                <option value="Obras_civiles">Obras Civiles</option>
                <option value="Movimiento_de_tierra">Movimiento de tierra</option>
              </CFormSelect>
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="activityTotalAmount"
                value={activity.activityTotalAmount || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="activityPreviousAcumulatedAmount"
                value={activity.activityPreviousAcumulatedAmount || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="col">Cantidad Real Turno</CTableHeaderCell>
            <CTableHeaderCell scope="col">% Avance Acumulado</CTableHeaderCell>
            <CTableHeaderCell scope="col">Unidad</CTableHeaderCell>
            <CTableHeaderCell scope="col">HH Gastada Anterior</CTableHeaderCell>
            <CTableHeaderCell scope="col">HH Gastada Real Turno</CTableHeaderCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="activityActualShiftQuantity"
                value={activity.activityActualShiftQuantity || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="activityAccumulatedAcvancePercent"
                value={activity.activityAccumulatedAcvancePercent || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="activityUnit"
                value={activity.activityUnit || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="activityHoursSpendPrevius"
                value={activity.activityHoursSpendPrevius || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="activityHoursSpendShift"
                value={activity.activityHoursSpendShift || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="col">HH Gastada Acumulada</CTableHeaderCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="activityHoursAccumulated"
                value={activity.activityHoursAccumulated || ''}
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
          registerActivity()
        }}
      >
        Registrar
      </CButton>

      {activityListContext.length > 0 && activityListContext[0].activityFrontWork && (
        <CTable className="resume-table">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
              <CTableHeaderCell scope="col">ID Actividad Primavera</CTableHeaderCell>
              <CTableHeaderCell scope="col">Nombre de Actividad</CTableHeaderCell>
              <CTableHeaderCell scope="col">Disciplina</CTableHeaderCell>
              <CTableHeaderCell scope="col">Cantidad Total</CTableHeaderCell>
              <CTableHeaderCell scope="col">Cantidad Acum Anterior</CTableHeaderCell>
              <CTableHeaderCell scope="col">Cantidad Real Turno</CTableHeaderCell>
              <CTableHeaderCell scope="col">% Avance Acumulado</CTableHeaderCell>
              <CTableHeaderCell scope="col">Unidad</CTableHeaderCell>
              <CTableHeaderCell scope="col">HH Gastada Anterior</CTableHeaderCell>
              <CTableHeaderCell scope="col">HH Gastada Real Turno</CTableHeaderCell>
              <CTableHeaderCell scope="col">HH Gastada Acumulada</CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {activityListContext.map((item, index) => {
              const charge = basicQuery.workFront.find((work) => {
                return work.id == item.activityFrontWork
              })
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{charge.name}</CTableDataCell>
                  <CTableDataCell>{item.primaveraId}</CTableDataCell>
                  <CTableDataCell>{item.activityName}</CTableDataCell>
                  <CTableDataCell>{item.activityDiscipline}</CTableDataCell>
                  <CTableDataCell>{item.activityTotalAmount}</CTableDataCell>
                  <CTableDataCell>{item.activityPreviousAcumulatedAmount}</CTableDataCell>
                  <CTableDataCell>{item.activityActualShiftQuantity}</CTableDataCell>
                  <CTableDataCell>{item.activityAccumulatedAcvancePercent}</CTableDataCell>
                  <CTableDataCell>{item.activityUnit}</CTableDataCell>
                  <CTableDataCell>{item.activityHoursSpendPrevius}</CTableDataCell>
                  <CTableDataCell>{item.activityHoursSpendShift}</CTableDataCell>
                  <CTableDataCell>{item.activityHoursAccumulated}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      className="btn-project-action"
                      onClick={() => {
                        deleteActivity(item.id)
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

export default Activities

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
  CToast,
  CToastBody,
  CTooltip,
} from '@coreui/react'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'
import { v4 as uuidv4 } from 'uuid'
import { validate } from 'src/utils/validate'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import { useLocation } from 'react-router-dom'
import Select from 'react-select'
import useGetActivityData from 'src/hooks/useGetActivityData'
import Skeleton from 'react-loading-skeleton'
import useGetActivityDataPerPrimaveraId from 'src/hooks/useGetActivityDataPerPrimaveraId'

const Activities = () => {
  const currentLocation = useLocation().pathname
  const isViewMode = currentLocation.includes('/view')
  const isCreatingMode = currentLocation === '/informe-diario'
  const isEditMode = currentLocation.includes('/edit')

  const initialState = {
    activityFrontWork: undefined,
    primaveraId: undefined,
    activityName: undefined,
    activityDiscipline: undefined,
    activityTotalAmount: undefined,
    activityPreviousAcumulatedAmount: undefined,
    activityActualShiftQuantity: undefined,
    activityAccumulatedAdvancePercent: undefined,
    activityUnit: undefined,
    activityHoursSpendPrevius: undefined,
    activityHoursSpendShift: undefined,
    activityHoursAccumulated: undefined,
    activityId: undefined,
  }

  const { getData } = useGetCachedQueryData()
  const basicQuery = getData('basics')
  const {
    getActivity,
    isLoading: activityLoading,
    activityData,
  } = useGetActivityDataPerPrimaveraId()

  const [activity, setActivity] = useState(initialState)
  const [activityList, setActivityList] = useState([])
  const [error, setError] = useState(false)
  const [options, setOptions] = useState([])
  const [selectedOption, setSelectedOption] = useState({ value: 0, label: 'Seleccione' })

  const { data, isLoading, error: activityError } = useGetActivityData()

  const {
    storeActivity,
    removeActivity,
    activityList: activityListContext,
  } = useRegisterDailyReportCompany()

  useEffect(() => {
    let mapData = []

    if (activityData && activityData.data.data.length > 0) {
      activityData.data.data.map((item) => {
        mapData.push({ value: item.id_primavera, label: item.name })
      })
    }

    setOptions(mapData)
  }, [activityData, activityLoading])

  useEffect(() => {
    getActivity()
  }, [])

  const onChangeActivity = (e) => {
    const selectedActivity = activityData.data.data.find((item) => item.id_primavera === e.value)

    const quantityWork = selectedActivity.material_quantity || 0

    setSelectedOption(e)
    setOptions([])

    setActivity({
      ...activity,
      activityId: selectedActivity.id,
      primaveraId: e.value,
      activityName: e.label,
      activityTotalAmount: quantityWork,
    })
  }

  const onChangeInputActivity = (e) => {
    getActivity(e)
    // 205-1-PTL3-F1-1.2
  }

  const onChangeData = (e) => {
    setError(false)
    if (e.target.id === 'activityFrontWork') {
      setActivity(initialState) // Clear the object
      setActivity({ [e.target.id]: e.target.value })
    }
    if (
      e.target.id === 'activityTotalAmount' ||
      e.target.id === 'activityPreviousAcumulatedAmount' ||
      e.target.id === 'activityActualShiftQuantity' ||
      e.target.id === 'activityAccumulatedAdvancePercent' ||
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

  useEffect(() => {
    const realHpurs = activity.activityHoursSpendShift
      ? Number(activity.activityHoursSpendShift)
      : 0
    const prevHours = activity.activityHoursSpendPrevius
      ? Number(activity.activityHoursSpendPrevius)
      : 0
    setActivity({
      ...activity,
      activityHoursAccumulated: prevHours + realHpurs,
    })
  }, [activity.activityHoursSpendShift, activity.activityHoursSpendPrevius])

  useEffect(() => {
    if (
      activity.activityPreviousAcumulatedAmount &&
      activity.activityActualShiftQuantity &&
      activity.activityTotalAmount
    ) {
      const previousHh = activity.activityPreviousAcumulatedAmount
        ? Number(activity.activityPreviousAcumulatedAmount)
        : 0

      const actualHours = activity.activityActualShiftQuantity
        ? Number(activity.activityActualShiftQuantity)
        : 0

      const totalHours = activity.activityTotalAmount ? Number(activity.activityTotalAmount) : 0

      const calc = ((actualHours + previousHh) * 100) / totalHours

      setActivity({ ...activity, activityAccumulatedAdvancePercent: calc.toFixed(2) || 0 })
    }
    if (activity.activityTotalAmount === 0) {
      setActivity({ ...activity, activityAccumulatedAdvancePercent: 0 })
    }
  }, [
    activity.activityPreviousAcumulatedAmount,
    activity.activityActualShiftQuantity,
    activity.activityTotalAmount,
  ])

  const registerActivity = () => {
    if (
      !activity.activityFrontWork ||
      activity.activityFrontWork === '0' ||
      !activity.activityDiscipline ||
      activity.activityDiscipline === '0'
    ) {
      setError(true)
    } else {
      // const activityId = data.find(
      //   (item) => item.id_primavera.trim() === activity.primaveraId.trim(),
      // ).id
      const activityInitialState = {
        id: uuidv4(),
        activityFrontWork: activity.activityFrontWork,
        primaveraId: activity.primaveraId,
        activityName: activity.activityName,
        activityDiscipline: activity.activityDiscipline,
        activityTotalAmount: activity.activityTotalAmount,
        activityPreviousAcumulatedAmount: activity.activityPreviousAcumulatedAmount,
        activityActualShiftQuantity: activity.activityActualShiftQuantity,
        activityAccumulatedAdvancePercent: activity.activityAccumulatedAdvancePercent,
        activityUnit: activity.activityUnit,
        activityHoursSpendPrevius: activity.activityHoursSpendPrevius,
        activityHoursSpendShift: activity.activityHoursSpendShift,
        activityHoursAccumulated: activity.activityHoursAccumulated,
        activityId: activity.activityId,
      }
      setActivity(initialState) // Clear the object
      setSelectedOption({ value: 0, label: 'Seleccione' })
      setActivityList([...activityListContext, activityInitialState])
    }
  }

  const deleteActivity = (id) => {
    const newData = activityListContext.filter((item) => item.id !== id)
    setActivityList(newData)
    removeActivity(id)
  }

  const editActivity = (id) => {
    const selectedActivity = activityListContext.find((item) => item.id === id)
    setActivity({
      activityFrontWork: selectedActivity.activityFrontWork,
      primaveraId: selectedActivity.primaveraId,
      activityName: selectedActivity.activityName,
      activityDiscipline: selectedActivity.activityDiscipline,
      activityTotalAmount: selectedActivity.activityTotalAmount,
      activityPreviousAcumulatedAmount: selectedActivity.activityPreviousAcumulatedAmount,
      activityActualShiftQuantity: selectedActivity.activityActualShiftQuantity,
      activityAccumulatedAdvancePercent: selectedActivity.activityAccumulatedAdvancePercent,
      activityUnit: selectedActivity.activityUnit,
      activityHoursSpendPrevius: selectedActivity.activityHoursSpendPrevius,
      activityHoursSpendShift: selectedActivity.activityHoursSpendShift,
      activityHoursAccumulated: selectedActivity.activityHoursAccumulated,
    })
    setSelectedOption({ value: selectedActivity.primaveraId, label: selectedActivity.activityName })

    deleteActivity(id)
  }

  useEffect(() => {
    if (!isViewMode) storeActivity(activityList)
  }, [activityList])

  return (
    <div className="work-force-report">
      {!isViewMode && (
        <div className="form-group">
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
                  Debe seleccionar el frente de trabajo y la disciplina para generar el registro
                </CToastBody>
              </div>
            </CToast>
          )}
          <CFormSelect
            aria-label="Default select example"
            id="activityFrontWork"
            label="Frente de trabajo"
            value={activity.activityFrontWork ?? 0}
            onChange={(e) => {
              onChangeData(e)
            }}
          >
            <option value={0}>Seleccione</option>
            {basicQuery.workFront.map((workFrontCached) => {
              return (
                <option key={workFrontCached.id} value={workFrontCached.id}>
                  {workFrontCached.name}
                </option>
              )
            })}
          </CFormSelect>
          {isLoading ? (
            <Skeleton />
          ) : (
            <>
              <CTooltip
                content="Comience a escribir el ID Primavera o el nombre de la actividad. Las opciones se mostrarán automáticamente para seleccionarlas."
                placement="top"
                style={{ width: '100%' }}
              >
                <label className="form-label">Actividad primavera</label>
              </CTooltip>
              <Select
                id="primaveraId"
                className="primaveraId"
                label="Actividad primavera"
                placeholder="Actividad primavera"
                value={selectedOption}
                onChange={(e) => {
                  onChangeActivity(e)
                }}
                onInputChange={(e) => {
                  onChangeInputActivity(e)
                }}
                options={options}
                styles={{
                  option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
                    ...styles,
                    color: '#000000',
                  }),
                }}
              />
            </>
          )}
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Disciplina</CTableHeaderCell>
                <CTableHeaderCell scope="col">Cantidad Total</CTableHeaderCell>
                <CTableHeaderCell scope="col">Cantidad Acum Anterior</CTableHeaderCell>
                <CTableHeaderCell scope="col">Cantidad Real Turno</CTableHeaderCell>
                <CTableHeaderCell scope="col">% Avance Acumulado</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableDataCell>
                  <CFormSelect
                    aria-label="Default select example"
                    id="activityDiscipline"
                    value={activity.activityDiscipline ?? '0'}
                    onChange={(e) => {
                      onChangeData(e)
                    }}
                  >
                    <option value={'0'}>Seleccione</option>
                    {basicQuery.diciplines.map((dicipline) => {
                      return (
                        <option key={dicipline.id} value={dicipline.id}>
                          {dicipline.name}
                        </option>
                      )
                    })}
                  </CFormSelect>
                </CTableDataCell>
                <CTableDataCell>
                  {activityLoading ? (
                    <Skeleton />
                  ) : (
                    <CFormInput
                      type="text"
                      id="activityTotalAmount"
                      value={activity.activityTotalAmount || '0'}
                      disabled
                      text=""
                      onChange={(e) => {
                        onChangeData(e)
                      }}
                    />
                  )}
                </CTableDataCell>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    id="activityPreviousAcumulatedAmount"
                    value={activity.activityPreviousAcumulatedAmount || ''}
                    // disabled
                    text=""
                    onChange={(e) => {
                      onChangeData(e)
                    }}
                  />
                </CTableDataCell>
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
                    id="activityAccumulatedAdvancePercent"
                    value={activity.activityAccumulatedAdvancePercent || '0'}
                    disabled
                    text=""
                    onChange={(e) => {
                      onChangeData(e)
                    }}
                  />
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="col">Unidad</CTableHeaderCell>
                <CTableHeaderCell scope="col">HH Gastada Acumulada Anterior</CTableHeaderCell>
                <CTableHeaderCell scope="col">HH Gastada Real Turno</CTableHeaderCell>
                <CTableHeaderCell scope="col">HH Gastada Acumulada</CTableHeaderCell>
              </CTableRow>
              <CTableRow>
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
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    id="activityHoursAccumulated"
                    value={activity.activityHoursAccumulated || ''}
                    disabled
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
        </div>
      )}

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
              <CTableHeaderCell scope="col">HH Gastada Acumulada Anterior</CTableHeaderCell>
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

              const selectedDicipline = basicQuery.diciplines.find((dicipline) => {
                return dicipline.id.toString() === item.activityDiscipline.toString()
              })
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{charge.name}</CTableDataCell>
                  <CTableDataCell>{item.primaveraId}</CTableDataCell>
                  <CTableDataCell>{item.activityName}</CTableDataCell>
                  <CTableDataCell>{selectedDicipline.name}</CTableDataCell>
                  <CTableDataCell>{item.activityTotalAmount}</CTableDataCell>
                  <CTableDataCell>{item.activityPreviousAcumulatedAmount}</CTableDataCell>
                  <CTableDataCell>{item.activityActualShiftQuantity}</CTableDataCell>
                  <CTableDataCell>{item.activityAccumulatedAdvancePercent}</CTableDataCell>
                  <CTableDataCell>{item.activityUnit}</CTableDataCell>
                  <CTableDataCell>{item.activityHoursSpendPrevius}</CTableDataCell>
                  <CTableDataCell>{item.activityHoursSpendShift}</CTableDataCell>
                  <CTableDataCell>{item.activityHoursAccumulated}</CTableDataCell>
                  <CTableDataCell>
                    {(isCreatingMode || isEditMode) && (
                      <CButton
                        className="btn-project-action"
                        onClick={() => {
                          deleteActivity(item.id)
                        }}
                      >
                        eliminar
                      </CButton>
                    )}
                  </CTableDataCell>
                  <CTableDataCell>
                    {(isCreatingMode || isEditMode) && (
                      <CButton
                        className="btn-project-action"
                        onClick={() => {
                          editActivity(item.id)
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
      )}
    </div>
  )
}

export default Activities

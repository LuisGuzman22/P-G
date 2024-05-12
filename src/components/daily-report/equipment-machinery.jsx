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

const EquipmentMachinery = () => {
  const currentLocation = useLocation().pathname
  const isViewMode = currentLocation.includes('/view')
  const isCreatingMode = currentLocation === '/informe-diario'

  const initialState = {
    equipment: undefined,
    equipmentOfferedNumber: undefined,
    equipmentCertifiedNumber: undefined,
    equipmentWorkNumber: undefined,
  }

  const equipmentTotalsInitialState = {
    equipmentOfferedNumber: 0,
    equipmentCertifiedNumber: 0,
    equipmentWorkNumber: 0,
  }

  const { getData } = useGetCachedQueryData()
  const basicQuery = getData('basics')

  const [equipment, setEquipment] = useState(initialState)
  const [equipmentList, setEquipmentList] = useState([])
  const [equipmentTotals, setEquipmentTotals] = useState(equipmentTotalsInitialState)
  const [error, setError] = useState(false)

  const {
    storeEquipment,
    removeEquipment,
    equipmentList: equipmentListContext,
  } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    setError(false)

    if (e.target.id === 'equipment') {
      setEquipment(initialState) // Clear the object
      setEquipment({ [e.target.id]: e.target.value })
    }
    if (validate(e.target.value)) {
      setEquipment({ ...equipment, [e.target.id]: e.target.value })
    }
  }

  const registerEquipment = () => {
    if (!equipment.equipment || equipment.equipment === '0') {
      setError(true)
    } else {
      const equipmentInitialState = {
        id: uuidv4(),
        equipment: equipment.equipment,
        actions: {
          equipmentOfferedNumber: equipment.equipmentOfferedNumber,
          equipmentCertifiedNumber: equipment.equipmentCertifiedNumber,
          equipmentWorkNumber: equipment.equipmentWorkNumber,
        },
      }
      setEquipment(initialState) // Clear the object
      setEquipmentList([...equipmentList, equipmentInitialState])
    }
  }

  const deleteEquipment = (id) => {
    const newData = equipmentList.filter((item) => item.id !== id)
    setEquipmentList(newData)
    removeEquipment(id)
  }

  const editEquipment = (id) => {
    const selectedEquipment = equipmentListContext.find((item) => item.id === id)
    setEquipment({
      equipment: selectedEquipment.equipment,
      equipmentOfferedNumber: selectedEquipment.actions.equipmentOfferedNumber,
      equipmentCertifiedNumber: selectedEquipment.actions.equipmentCertifiedNumber,
      equipmentWorkNumber: selectedEquipment.actions.equipmentWorkNumber,
    })
    deleteEquipment(id)
  }

  useEffect(() => {
    if (!isViewMode) storeEquipment(equipmentList)
  }, [equipmentList])

  useEffect(() => {
    let equipmentTotalsInitialStateCounter = {
      equipmentOfferedNumber: 0,
      equipmentCertifiedNumber: 0,
      equipmentWorkNumber: 0,
    }

    for (let data of equipmentListContext) {
      equipmentTotalsInitialStateCounter = {
        equipmentOfferedNumber:
          Number(equipmentTotalsInitialStateCounter.equipmentOfferedNumber) +
          Number(data.actions.equipmentOfferedNumber ?? 0),
        equipmentCertifiedNumber:
          Number(equipmentTotalsInitialStateCounter.equipmentCertifiedNumber) +
          Number(data.actions.equipmentCertifiedNumber ?? 0),
        equipmentWorkNumber:
          Number(equipmentTotalsInitialStateCounter.equipmentWorkNumber) +
          Number(data.actions.equipmentWorkNumber ?? 0),
      }
    }
    setEquipmentTotals(equipmentTotalsInitialStateCounter)
  }, [equipmentListContext])

  return (
    <div className="work-force-report">
      {!isViewMode && (
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
                <CToastBody>Debe seleccionar el equipo para generar el registro</CToastBody>
              </div>
            </CToast>
          )}
          <CFormSelect
            aria-label="Default select example"
            id="equipment"
            value={equipment.equipment ?? 0}
            onChange={(e) => {
              onChangeData(e)
            }}
          >
            <option value="0">Seleccione</option>
            {basicQuery.equipment.map((equipmentCached) => {
              return (
                <option key={equipmentCached.id} value={equipmentCached.id}>
                  {equipmentCached.name}
                </option>
              )
            })}
          </CFormSelect>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">N° Equipos oferta</CTableHeaderCell>
                <CTableHeaderCell scope="col">N° Equipos Acreditado</CTableHeaderCell>
                <CTableHeaderCell scope="col">N° Equipos en Obra</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    id="equipmentOfferedNumber"
                    value={equipment.equipmentOfferedNumber || ''}
                    text=""
                    onChange={(e) => {
                      onChangeData(e)
                    }}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    id="equipmentCertifiedNumber"
                    value={equipment.equipmentCertifiedNumber || ''}
                    text=""
                    onChange={(e) => {
                      onChangeData(e)
                    }}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    id="equipmentWorkNumber"
                    value={equipment.equipmentWorkNumber || ''}
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
              registerEquipment()
            }}
          >
            Registrar
          </CButton>
        </>
      )}

      {equipmentListContext.length > 0 && equipmentListContext[0].equipment && (
        <CTable className="resume-table">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
              <CTableHeaderCell scope="col">N° Equipos oferta</CTableHeaderCell>
              <CTableHeaderCell scope="col">N° Equipos Acreditado</CTableHeaderCell>
              <CTableHeaderCell scope="col">N° Equipos en Obra</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {equipmentListContext.map((item, index) => {
              const charge = basicQuery.equipment.find((personal) => {
                return personal.id == item.equipment
              })
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{charge.name}</CTableDataCell>
                  <CTableDataCell>{item.actions.equipmentOfferedNumber ?? 0}</CTableDataCell>
                  <CTableDataCell>{item.actions.equipmentCertifiedNumber ?? 0}</CTableDataCell>
                  <CTableDataCell>{item.actions.equipmentWorkNumber ?? 0}</CTableDataCell>
                  <CTableDataCell>
                    {isCreatingMode && (
                      <CButton
                        className="btn-project-action"
                        onClick={() => {
                          deleteEquipment(item.id)
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
                          editEquipment(item.id)
                        }}
                      >
                        Editar
                      </CButton>
                    )}
                  </CTableDataCell>
                </CTableRow>
              )
            })}
            <CTableRow key={'total'}>
              <CTableDataCell>Total</CTableDataCell>
              <CTableDataCell>{equipmentTotals.equipmentOfferedNumber ?? 0}</CTableDataCell>
              <CTableDataCell>{equipmentTotals.equipmentCertifiedNumber ?? 0}</CTableDataCell>
              <CTableDataCell>{equipmentTotals.equipmentWorkNumber ?? 0}</CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      )}
    </div>
  )
}

export default EquipmentMachinery

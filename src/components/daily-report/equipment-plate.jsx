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
} from '@coreui/react'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'
import { v4 as uuidv4 } from 'uuid'
import { validate } from 'src/utils/validate'

const EquipmentPlate = () => {
  const initialState = {
    equipment: undefined,
    equipmentEffectiveTime: undefined,
    equipmentCorrectiveMaintenance: undefined,
    equipmentPreventiveMaintenance: undefined,
    equipmentOutOfService: undefined,
    equipmentWaiting: undefined,
    equipmentNoOperator: undefined,
    equipmentInitialHorometer: undefined,
    equipmentFinalHorometer: undefined,
  }

  const [equipmentPlate, setEquipmentPlate] = useState(initialState)
  const [equipmentPlateList, setEquipmenPlatetList] = useState([])

  const {
    storeEquipmentPlate,
    removeEquipmentPlate,
    equipmentPlateList: equipmentPlateListContext,
  } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    if (e.target.id === 'equipment') {
      setEquipmentPlate(initialState) // Clear the object
      setEquipmentPlate({ [e.target.id]: e.target.value })
    }
    if (validate(e.target.value)) {
      setEquipmentPlate({ ...equipmentPlate, [e.target.id]: e.target.value })
    }
  }

  const registerEquipment = () => {
    const equipmentInitialState = {
      id: uuidv4(),
      equipment: equipmentPlate.equipment,
      actions: {
        equipmentEffectiveTime: equipmentPlate.equipmentEffectiveTime,
        equipmentCorrectiveMaintenance: equipmentPlate.equipmentCorrectiveMaintenance,
        equipmentPreventiveMaintenance: equipmentPlate.equipmentPreventiveMaintenance,
        equipmentOutOfService: equipmentPlate.equipmentOutOfService,
        equipmentWaiting: equipmentPlate.equipmentWaiting,
        equipmentNoOperator: equipmentPlate.equipmentNoOperator,
        equipmentInitialHorometer: equipmentPlate.equipmentInitialHorometer,
        equipmentFinalHorometer: equipmentPlate.equipmentFinalHorometer,
      },
    }
    setEquipmentPlate(initialState) // Clear the object
    setEquipmenPlatetList([...equipmentPlateList, equipmentInitialState])
  }

  const deleteEquipment = (id) => {
    const newData = equipmentPlateList.filter((item) => item.id !== id)
    setEquipmenPlatetList(newData)
    removeEquipmentPlate(id)
  }

  useEffect(() => {
    storeEquipmentPlate(equipmentPlateList)
  }, [equipmentPlateList])

  return (
    <div className="work-force-report">
      <CFormSelect
        aria-label="Default select example"
        id="equipment"
        value={equipmentPlate.equipment ?? 0}
        onChange={(e) => {
          onChangeData(e)
        }}
      >
        <option>Seleccione</option>
        <option value="equipo_1">Equipo 1 + Patente</option>
        <option value="equipo_2">Equipo 2 + Patente</option>
        <option value="equipo_3">Equipo 3 + Patente</option>
      </CFormSelect>

      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Operativos (Hrs)</CTableHeaderCell>
            <CTableHeaderCell scope="col">Mantención Correctiva (Hrs)</CTableHeaderCell>
            <CTableHeaderCell scope="col">Mantención preventiva (Hrs)</CTableHeaderCell>
            <CTableHeaderCell scope="col">Fuera de Servicio (Hrs)</CTableHeaderCell>
            <CTableHeaderCell scope="col">En Espera (Hrs) </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="equipmentEffectiveTime"
                value={equipmentPlate.equipmentEffectiveTime || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="equipmentCorrectiveMaintenance"
                value={equipmentPlate.equipmentCorrectiveMaintenance || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="equipmentPreventiveMaintenance"
                value={equipmentPlate.equipmentPreventiveMaintenance || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="equipmentOutOfService"
                value={equipmentPlate.equipmentOutOfService || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="equipmentWaiting"
                value={equipmentPlate.equipmentWaiting || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="col">Sin Operador (Hrs)</CTableHeaderCell>
            <CTableHeaderCell scope="col">Horometro Inicial </CTableHeaderCell>
            <CTableHeaderCell scope="col">Horometro Final </CTableHeaderCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="equipmentNoOperator"
                value={equipmentPlate.equipmentNoOperator || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="equipmentInitialHorometer"
                value={equipmentPlate.equipmentInitialHorometer || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="equipmentFinalHorometer"
                value={equipmentPlate.equipmentFinalHorometer || ''}
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

      {equipmentPlateListContext.length > 0 && equipmentPlateListContext[0].equipment && (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
              <CTableHeaderCell scope="col">Operativos (Hrs)</CTableHeaderCell>
              <CTableHeaderCell scope="col">Mantención Correctiva (Hrs)</CTableHeaderCell>
              <CTableHeaderCell scope="col">Mantenimiento Programado (Hrs)</CTableHeaderCell>
              <CTableHeaderCell scope="col">Mantención preventiva (Hrs)</CTableHeaderCell>
              <CTableHeaderCell scope="col">Fuera de Servicio (Hrs)</CTableHeaderCell>
              <CTableHeaderCell scope="col">En Espera (Hrs) </CTableHeaderCell>
              <CTableHeaderCell scope="col">Sin Operador (Hrs)</CTableHeaderCell>
              <CTableHeaderCell scope="col">Horometro Inicial </CTableHeaderCell>
              <CTableHeaderCell scope="col">Horometro Final </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {equipmentPlateListContext.map((item, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{item.equipment}</CTableDataCell>
                  <CTableDataCell>{item.actions.equipmentEffectiveTime}</CTableDataCell>
                  <CTableDataCell>{item.actions.equipmentCorrectiveMaintenance}</CTableDataCell>
                  <CTableDataCell>{item.actions.equipmentPreventiveMaintenance}</CTableDataCell>
                  <CTableDataCell>{item.actions.equipmentOutOfService}</CTableDataCell>
                  <CTableDataCell>{item.actions.equipmentWaiting}</CTableDataCell>
                  <CTableDataCell>{item.actions.equipmentNoOperator}</CTableDataCell>
                  <CTableDataCell>{item.actions.equipmentInitialHorometer}</CTableDataCell>
                  <CTableDataCell>{item.actions.equipmentFinalHorometer}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      className="btn-project-action"
                      onClick={() => {
                        deleteEquipment(item.id)
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

export default EquipmentPlate

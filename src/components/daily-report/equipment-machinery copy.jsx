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

const Equipmentequipment = () => {
  const initialState = {
    equipment: undefined,
    equipmentOfferedNumber: undefined,
    equipmentCertifiedNumber: undefined,
    equipmentWorkNumber: undefined,
    equipmentEffectiveTime: undefined,
    equipmentCorrectiveMaintenance: undefined,
    equipmentPreventiveMaintenance: undefined,
    equipmentOutOfService: undefined,
    equipmentWaiting: undefined,
    equipmentNoOperator: undefined,
    equipmentInitialHorometer: undefined,
    equipmentFinalHorometer: undefined,
  }

  const [equipment, setEquipment] = useState(initialState)
  const [equipmentList, setEquipmentList] = useState([])

  const {
    storeEquipment,
    removeEquipment,
    equipmentList: equipmentListContext,
  } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    if (e.target.id === 'equipment') {
      setEquipment(initialState) // Clear the object
      setEquipment({ [e.target.id]: e.target.value })
    }
    setEquipment({ ...equipment, [e.target.id]: e.target.value })
  }

  const registerEquipment = () => {
    const equipmentInitialState = {
      id: uuidv4(),
      equipment: equipment.equipment,
      actions: {
        equipmentOfferedNumber: equipment.equipmentOfferedNumber,
        equipmentCertifiedNumber: equipment.equipmentCertifiedNumber,
        equipmentWorkNumber: equipment.equipmentWorkNumber,
        equipmentEffectiveTime: equipment.equipmentEffectiveTime,
        equipmentCorrectiveMaintenance: equipment.equipmentCorrectiveMaintenance,
        equipmentPreventiveMaintenance: equipment.equipmentPreventiveMaintenance,
        equipmentOutOfService: equipment.equipmentOutOfService,
        equipmentWaiting: equipment.equipmentWaiting,
        equipmentNoOperator: equipment.equipmentNoOperator,
        equipmentInitialHorometer: equipment.equipmentInitialHorometer,
        equipmentFinalHorometer: equipment.equipmentFinalHorometer,
      },
    }
    setEquipment(initialState) // Clear the object
    setEquipmentList([...equipmentList, equipmentInitialState])
  }

  const deleteEquipment = (id) => {
    const newData = equipmentList.filter((item) => item.id !== id)
    setEquipmentList(newData)
    removeEquipment(id)
  }

  useEffect(() => {
    storeEquipment(equipmentList)
  }, [equipmentList])

  return (
    <div className="work-force-report">
      <CFormSelect
        aria-label="Default select example"
        id="equipment"
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
            <CTableHeaderCell scope="col">N° Equipos oferta</CTableHeaderCell>
            <CTableHeaderCell scope="col">N° Equipos Acreditado</CTableHeaderCell>
            <CTableHeaderCell scope="col">N° Equipos en Obra</CTableHeaderCell>
            <CTableHeaderCell scope="col">Operativos (Hrs)</CTableHeaderCell>
            <CTableHeaderCell scope="col">Mantención Correctiva (Hrs)</CTableHeaderCell>
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
            <CTableDataCell>
              <CFormInput
                type="text"
                id="equipmentEffectiveTime"
                value={equipment.equipmentEffectiveTime || ''}
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
                value={equipment.equipmentCorrectiveMaintenance || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="col">Mantención preventiva (Hrs)</CTableHeaderCell>
            <CTableHeaderCell scope="col">Fuera de Servicio (Hrs)</CTableHeaderCell>
            <CTableHeaderCell scope="col">En Espera (Hrs) </CTableHeaderCell>
            <CTableHeaderCell scope="col">Sin Operador (Hrs)</CTableHeaderCell>
            <CTableHeaderCell scope="col">Horometro Inicial </CTableHeaderCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="equipmentPreventiveMaintenance"
                value={equipment.equipmentPreventiveMaintenance || ''}
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
                value={equipment.equipmentOutOfService || ''}
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
                value={equipment.equipmentWaiting || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="equipmentNoOperator"
                value={equipment.equipmentNoOperator || ''}
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
                value={equipment.equipmentInitialHorometer || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="col">Horometro Final </CTableHeaderCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="equipmentFinalHorometer"
                value={equipment.equipmentFinalHorometer || ''}
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

      {equipmentListContext.length > 0 && equipmentListContext[0].equipment && (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
              <CTableHeaderCell scope="col">N° Equipos oferta</CTableHeaderCell>
              <CTableHeaderCell scope="col">N° Equipos Acreditado</CTableHeaderCell>
              <CTableHeaderCell scope="col">N° Equipos en Obra</CTableHeaderCell>
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
            {equipmentListContext.map((item, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{item.equipment}</CTableDataCell>
                  <CTableDataCell>{item.actions.equipmentOfferedNumber}</CTableDataCell>
                  <CTableDataCell>{item.actions.equipmentCertifiedNumber}</CTableDataCell>
                  <CTableDataCell>{item.actions.equipmentWorkNumber}</CTableDataCell>
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

export default Equipmentequipment

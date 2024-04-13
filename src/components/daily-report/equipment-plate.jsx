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
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'

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
    equipmentPlate: undefined,
  }

  const { getData } = useGetCachedQueryData()
  const basicQuery = getData('basics')

  const [equipmentPlate, setEquipmentPlate] = useState(initialState)
  const [equipmentPlateList, setEquipmenPlatetList] = useState([])
  const [plates, setPlates] = useState()

  const {
    storeEquipmentPlate,
    removeEquipmentPlate,
    equipmentPlateList: equipmentPlateListContext,
  } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    if (e.target.id === 'equipment') {
      setEquipmentPlate(initialState) // Clear the object
      setEquipmentPlate({ [e.target.id]: e.target.value })
      const selectedEquipment = basicQuery.equipment.find((equip) => {
        return equip.id.toString() === e.target.value.toString()
      })
      setPlates(selectedEquipment.plate)
    }
    if (validate(e.target.value)) {
      setEquipmentPlate({ ...equipmentPlate, [e.target.id]: e.target.value })
    }
  }

  const registerEquipment = () => {
    setPlates()
    const equipmentInitialState = {
      id: uuidv4(),
      equipment: equipmentPlate.equipment,
      equipmentEffectiveTime: equipmentPlate.equipmentEffectiveTime,
      equipmentCorrectiveMaintenance: equipmentPlate.equipmentCorrectiveMaintenance,
      equipmentPreventiveMaintenance: equipmentPlate.equipmentPreventiveMaintenance,
      equipmentOutOfService: equipmentPlate.equipmentOutOfService,
      equipmentWaiting: equipmentPlate.equipmentWaiting,
      equipmentNoOperator: equipmentPlate.equipmentNoOperator,
      equipmentInitialHorometer: equipmentPlate.equipmentInitialHorometer,
      equipmentFinalHorometer: equipmentPlate.equipmentFinalHorometer,
      equipmentPlate: equipmentPlate.equipmentPlate,
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
        {basicQuery.equipment.map((equipmentCached) => {
          return (
            <option key={equipmentCached.id} value={equipmentCached.id}>
              {equipmentCached.name}
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
            id="equipmentPlate"
            value={equipmentPlate.equipmentPlate ?? 0}
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
        <CTable className="resume-table">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Equipo</CTableHeaderCell>
              <CTableHeaderCell scope="col">Patente</CTableHeaderCell>
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
              const equipment = basicQuery.equipment.find((equip) => {
                return equip.id == item.equipment
              })
              const plate = equipment.plate.find((pl) => {
                return pl.id.toString() === item.equipmentPlate.toString()
              })
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{equipment.name}</CTableDataCell>
                  <CTableDataCell>{plate.label}</CTableDataCell>
                  <CTableDataCell>{item.equipmentEffectiveTime}</CTableDataCell>
                  <CTableDataCell>{item.equipmentCorrectiveMaintenance}</CTableDataCell>
                  <CTableDataCell>{item.equipmentPreventiveMaintenance}</CTableDataCell>
                  <CTableDataCell>{item.equipmentOutOfService}</CTableDataCell>
                  <CTableDataCell>{item.equipmentWaiting}</CTableDataCell>
                  <CTableDataCell>{item.equipmentNoOperator}</CTableDataCell>
                  <CTableDataCell>{item.equipmentInitialHorometer}</CTableDataCell>
                  <CTableDataCell>{item.equipmentFinalHorometer}</CTableDataCell>
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

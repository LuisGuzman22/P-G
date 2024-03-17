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

const EquipmentWorkForce = () => {
  const initialState = {
    equipmentWorkForce: undefined,
    equipmentWorkForceObservation: undefined,
    equipmentWorkForceFront1: undefined,
    equipmentWorkForceFront2: undefined,
    equipmentWorkForceFront3: undefined,
    equipmentWorkForceFront4: undefined,
    equipmentWorkForceFront5: undefined,
    equipmentWorkForceFront6: undefined,
    equipmentWorkForceFront7: undefined,
  }

  const [equipmentWorkForce, setEquipmentWorkForce] = useState(initialState)
  const [equipmentWorkForceList, setEquipmentWorkForceList] = useState([])

  const {
    storeEquipmentWorkForce,
    removeEquipmentWorkForce,
    equipmentWorkForceList: equipmentWorkForceListContext,
  } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    switch (e.target.id) {
      case 'equipmentWorkForce':
        setEquipmentWorkForce({ ...equipmentWorkForce, equipmentWorkForce: e.target.value })
        break
      case 'equipmentWorkForceObservation':
        setEquipmentWorkForce({
          ...equipmentWorkForce,
          equipmentWorkForceObservation: e.target.value,
        })
        break
      case 'equipmentWorkForceFront1':
        setEquipmentWorkForce({ ...equipmentWorkForce, equipmentWorkForceFront1: e.target.value })
        break
      case 'equipmentWorkForceFront2':
        setEquipmentWorkForce({ ...equipmentWorkForce, equipmentWorkForceFront2: e.target.value })
        break
      case 'equipmentWorkForceFront3':
        setEquipmentWorkForce({ ...equipmentWorkForce, equipmentWorkForceFront3: e.target.value })
        break
      case 'equipmentWorkForceFront4':
        setEquipmentWorkForce({ ...equipmentWorkForce, equipmentWorkForceFront4: e.target.value })
        break
      case 'equipmentWorkForceFront5':
        setEquipmentWorkForce({ ...equipmentWorkForce, equipmentWorkForceFront5: e.target.value })
        break
      case 'equipmentWorkForceFront6':
        setEquipmentWorkForce({ ...equipmentWorkForce, equipmentWorkForceFront6: e.target.value })
        break
      case 'equipmentWorkForceFront7':
        setEquipmentWorkForce({ ...equipmentWorkForce, equipmentWorkForceFront7: e.target.value })
        break
      default:
        break
    }
  }

  const registerEquipmentnWorkForce = () => {
    const equipmentWorkForceInitialState = {
      id: uuidv4(),
      equipmentWorkForce: equipmentWorkForce.equipmentWorkForce,
      actions: {
        equipmentWorkForceFront1: equipmentWorkForce.equipmentWorkForceFront1,
        equipmentWorkForceFront2: equipmentWorkForce.equipmentWorkForceFront2,
        equipmentWorkForceFront3: equipmentWorkForce.equipmentWorkForceFront3,
        equipmentWorkForceFront4: equipmentWorkForce.equipmentWorkForceFront4,
        equipmentWorkForceFront5: equipmentWorkForce.equipmentWorkForceFront5,
        equipmentWorkForceFront6: equipmentWorkForce.equipmentWorkForceFront6,
        equipmentWorkForceFront7: equipmentWorkForce.equipmentWorkForceFront7,
      },
    }
    setEquipmentWorkForce(initialState) // Clear the object
    setEquipmentWorkForceList([...equipmentWorkForceList, equipmentWorkForceInitialState])
  }

  const deleteEquipmentWorkForce = (id) => {
    const newData = equipmentWorkForceList.filter((item) => item.id !== id)
    setEquipmentWorkForceList(newData)

    removeEquipmentWorkForce(id)
  }

  useEffect(() => {
    storeEquipmentWorkForce(equipmentWorkForceList)
  }, [equipmentWorkForceList])

  return (
    <div className="work-force-report">
      <CFormSelect
        aria-label="Default select example"
        id="equipmentWorkForce"
        onChange={(e) => {
          onChangeData(e)
        }}
      >
        <option>Seleccione</option>
        <option value="equipo_1">Equipo 1</option>
        <option value="equipo_2">Equipo 2</option>
        <option value="equipo_3">Equipo 3</option>
      </CFormSelect>

      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Frente de trabajo 1</CTableHeaderCell>
            <CTableHeaderCell scope="col">Frente de trabajo 2</CTableHeaderCell>
            <CTableHeaderCell scope="col">Frente de trabajo 3</CTableHeaderCell>
            <CTableHeaderCell scope="col">Frente de trabajo 4</CTableHeaderCell>
            <CTableHeaderCell scope="col">Frente de trabajo 5</CTableHeaderCell>
            <CTableHeaderCell scope="col">Frente de trabajo 6</CTableHeaderCell>
            <CTableHeaderCell scope="col">Frente de trabajo 7</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="equipmentWorkForceFront1"
                value={equipmentWorkForce.equipmentWorkForceFront1 || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="equipmentWorkForceFront2"
                value={equipmentWorkForce.equipmentWorkForceFront2 || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="equipmentWorkForceFront3"
                value={equipmentWorkForce.equipmentWorkForceFront3 || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="equipmentWorkForceFront4"
                value={equipmentWorkForce.equipmentWorkForceFront4 || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="equipmentWorkForceFront5"
                value={equipmentWorkForce.equipmentWorkForceFront5 || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="equipmentWorkForceFront6"
                value={equipmentWorkForce.equipmentWorkForceFront6 || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="equipmentWorkForceFront7"
                value={equipmentWorkForce.equipmentWorkForceFront7 || ''}
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
          registerEquipmentnWorkForce()
        }}
      >
        Registrar
      </CButton>

      {equipmentWorkForceListContext.length > 0 &&
        equipmentWorkForceListContext[0].equipmentWorkForce && (
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
                <CTableHeaderCell scope="col">Frente de trabajo 1</CTableHeaderCell>
                <CTableHeaderCell scope="col">Frente de trabajo 2</CTableHeaderCell>
                <CTableHeaderCell scope="col">Frente de trabajo 3</CTableHeaderCell>
                <CTableHeaderCell scope="col">Frente de trabajo 4</CTableHeaderCell>
                <CTableHeaderCell scope="col">Frente de trabajo 5</CTableHeaderCell>
                <CTableHeaderCell scope="col">Frente de trabajo 6</CTableHeaderCell>
                <CTableHeaderCell scope="col">Frente de trabajo 7</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {equipmentWorkForceListContext.map((item, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{item.equipmentWorkForce}</CTableDataCell>
                    <CTableDataCell>{item.actions.equipmentWorkForceFront1}</CTableDataCell>
                    <CTableDataCell>{item.actions.equipmentWorkForceFront2}</CTableDataCell>
                    <CTableDataCell>{item.actions.equipmentWorkForceFront3}</CTableDataCell>
                    <CTableDataCell>{item.actions.equipmentWorkForceFront4}</CTableDataCell>
                    <CTableDataCell>{item.actions.equipmentWorkForceFront5}</CTableDataCell>
                    <CTableDataCell>{item.actions.equipmentWorkForceFront6}</CTableDataCell>
                    <CTableDataCell>{item.actions.equipmentWorkForceFront7}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        className="btn-project-action"
                        onClick={() => {
                          deleteEquipmentWorkForce(item.id)
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

export default EquipmentWorkForce

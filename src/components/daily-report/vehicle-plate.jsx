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

const VehiclePlate = () => {
  const initialState = {
    vehicle: undefined,
    vehicleEffectiveTime: undefined,
    vehicleCorrectiveMaintenance: undefined,
    vehiclePreventiveMaintenance: undefined,
    vehicleOutOfService: undefined,
    vehicleWaiting: undefined,
    vehicleNoOperator: undefined,
    vehicleInitialHorometer: undefined,
    vehicleFinalHorometer: undefined,
  }

  const [vehiclePlate, setVehiclePlate] = useState(initialState)
  const [vehiclePlateList, setVehiclePlateList] = useState([])

  const {
    storeVehiclePlate,
    removeVehiclePlate,
    vehiclePlateList: vehiclePlateListContext,
  } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    if (e.target.id === 'vehicle') {
      setVehiclePlate(initialState) // Clear the object
      setVehiclePlate({ [e.target.id]: e.target.value })
    }
    if (validate(e.target.value)) {
      setVehiclePlate({ ...vehiclePlate, [e.target.id]: e.target.value })
    }
  }

  const registerVehiclePlate = () => {
    const vehiclePlateInitialState = {
      id: uuidv4(),
      vehicle: vehiclePlate.vehicle,
      actions: {
        vehicleEffectiveTime: vehiclePlate.vehicleEffectiveTime,
        vehicleCorrectiveMaintenance: vehiclePlate.vehicleCorrectiveMaintenance,
        vehiclePreventiveMaintenance: vehiclePlate.vehiclePreventiveMaintenance,
        vehicleOutOfService: vehiclePlate.vehicleOutOfService,
        vehicleWaiting: vehiclePlate.vehicleWaiting,
        vehicleNoOperator: vehiclePlate.vehicleNoOperator,
        vehicleInitialHorometer: vehiclePlate.vehicleInitialHorometer,
        vehicleFinalHorometer: vehiclePlate.vehicleFinalHorometer,
      },
    }
    setVehiclePlate(initialState) // Clear the object
    setVehiclePlateList([...vehiclePlateList, vehiclePlateInitialState])
  }

  const deletevehiclePlate = (id) => {
    const newData = vehiclePlateList.filter((item) => item.id !== id)
    setVehiclePlateList(newData)
    removeVehiclePlate(id)
  }

  useEffect(() => {
    storeVehiclePlate(vehiclePlateList)
  }, [vehiclePlateList])

  return (
    <div className="work-force-report">
      <CFormSelect
        aria-label="Default select example"
        id="vehicle"
        value={vehiclePlate.vehicle || 0}
        onChange={(e) => {
          onChangeData(e)
        }}
      >
        <option value={0}>Seleccione</option>
        <option value="vehiculo_1">Vehículo 1 + Patente</option>
        <option value="vehiculo_2">Vehículo 2 + Patente</option>
        <option value="vehiculo_3">Vehículo 3 + Patente</option>
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
                id="vehicleEffectiveTime"
                value={vehiclePlate.vehicleEffectiveTime || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="vehicleCorrectiveMaintenance"
                value={vehiclePlate.vehicleCorrectiveMaintenance || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="vehiclePreventiveMaintenance"
                value={vehiclePlate.vehiclePreventiveMaintenance || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="vehicleOutOfService"
                value={vehiclePlate.vehicleOutOfService || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="vehicleWaiting"
                value={vehiclePlate.vehicleWaiting || ''}
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
                id="vehicleNoOperator"
                value={vehiclePlate.vehicleNoOperator || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="vehicleInitialHorometer"
                value={vehiclePlate.vehicleInitialHorometer || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="vehicleFinalHorometer"
                value={vehiclePlate.vehicleFinalHorometer || ''}
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
          registerVehiclePlate()
        }}
      >
        Registrar
      </CButton>

      {vehiclePlateListContext.length > 0 && vehiclePlateListContext[0].vehicle && (
        <CTable>
          <CTableHead>
            <CTableRow>
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
            {vehiclePlateListContext.map((item, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{item.vehicle}</CTableDataCell>
                  <CTableDataCell>{item.actions.vehicleEffectiveTime ?? 0}</CTableDataCell>
                  <CTableDataCell>{item.actions.vehicleCorrectiveMaintenance ?? 0}</CTableDataCell>
                  <CTableDataCell>{item.actions.vehiclePreventiveMaintenance ?? 0}</CTableDataCell>
                  <CTableDataCell>{item.actions.vehicleOutOfService ?? 0}</CTableDataCell>
                  <CTableDataCell>{item.actions.vehicleWaiting ?? 0}</CTableDataCell>
                  <CTableDataCell>{item.actions.vehicleNoOperator ?? 0}</CTableDataCell>
                  <CTableDataCell>{item.actions.vehicleInitialHorometer ?? 0}</CTableDataCell>
                  <CTableDataCell>{item.actions.vehicleFinalHorometer ?? 0}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      className="btn-project-action"
                      onClick={() => {
                        deletevehiclePlate(item.id)
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

export default VehiclePlate

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

const Vehicle = () => {
  const initialState = {
    vehicle: undefined,
    vehicleOfferedNumber: undefined,
    vehicleCertifiedNumber: undefined,
    vehicleWorkNumber: undefined,
    vehicleEffectiveTime: undefined,
    vehicleCorrectiveMaintenance: undefined,
    vehiclePreventiveMaintenance: undefined,
    vehicleOutOfService: undefined,
    vehicleWaiting: undefined,
    vehicleNoOperator: undefined,
    vehicleInitialHorometer: undefined,
    vehicleFinalHorometer: undefined,
  }

  const [vehicle, setVehicle] = useState(initialState)
  const [vehicleList, setVehicleList] = useState([])

  const {
    storeVehicle,
    removeVehicle,
    vehicleList: vehicleListContext,
  } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    if (e.target.id === 'vehicle') {
      setVehicle(initialState) // Clear the object
      setVehicle({ [e.target.id]: e.target.value })
    }
    setVehicle({ ...vehicle, [e.target.id]: e.target.value })
  }

  const registerVehicle = () => {
    const vehicleInitialState = {
      id: uuidv4(),
      vehicle: vehicle.vehicle,
      actions: {
        vehicleOfferedNumber: vehicle.vehicleOfferedNumber,
        vehicleCertifiedNumber: vehicle.vehicleCertifiedNumber,
        vehicleWorkNumber: vehicle.vehicleWorkNumber,
        vehicleEffectiveTime: vehicle.vehicleEffectiveTime,
        vehicleCorrectiveMaintenance: vehicle.vehicleCorrectiveMaintenance,
        vehiclePreventiveMaintenance: vehicle.vehiclePreventiveMaintenance,
        vehicleOutOfService: vehicle.vehicleOutOfService,
        vehicleWaiting: vehicle.vehicleWaiting,
        vehicleNoOperator: vehicle.vehicleNoOperator,
        vehicleInitialHorometer: vehicle.vehicleInitialHorometer,
        vehicleFinalHorometer: vehicle.vehicleFinalHorometer,
      },
    }
    setVehicle(initialState) // Clear the object
    setVehicleList([...vehicleList, vehicleInitialState])
  }

  const deletevehicle = (id) => {
    const newData = vehicleList.filter((item) => item.id !== id)
    setVehicleList(newData)
    removeVehicle(id)
  }

  useEffect(() => {
    storeVehicle(vehicleList)
  }, [vehicleList])

  return (
    <div className="work-force-report">
      <CFormSelect
        aria-label="Default select example"
        id="vehicle"
        onChange={(e) => {
          onChangeData(e)
        }}
      >
        <option>Seleccione</option>
        <option value="vehiculo_1">Vehículo 1 + Patente</option>
        <option value="vehiculo_2">Vehículo 2 + Patente</option>
        <option value="vehiculo_3">Vehículo 3 + Patente</option>
      </CFormSelect>

      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">N° Vehículo oferta</CTableHeaderCell>
            <CTableHeaderCell scope="col">N° Vehículo Acreditado</CTableHeaderCell>
            <CTableHeaderCell scope="col">N° Vehículo en Obra</CTableHeaderCell>
            <CTableHeaderCell scope="col">Operativos (Hrs)</CTableHeaderCell>
            <CTableHeaderCell scope="col">Mantención Correctiva (Hrs)</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="vehicleOfferedNumber"
                value={vehicle.vehicleOfferedNumber || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="vehicleCertifiedNumber"
                value={vehicle.vehicleCertifiedNumber || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="vehicleWorkNumber"
                value={vehicle.vehicleWorkNumber || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="vehicleEffectiveTime"
                value={vehicle.vehicleEffectiveTime || ''}
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
                value={vehicle.vehicleCorrectiveMaintenance || ''}
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
                id="vehiclePreventiveMaintenance"
                value={vehicle.vehiclePreventiveMaintenance || ''}
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
                value={vehicle.vehicleOutOfService || ''}
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
                value={vehicle.vehicleWaiting || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="vehicleNoOperator"
                value={vehicle.vehicleNoOperator || ''}
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
                value={vehicle.vehicleInitialHorometer || ''}
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
                id="vehicleFinalHorometer"
                value={vehicle.vehicleFinalHorometer || ''}
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
          registerVehicle()
        }}
      >
        Registrar
      </CButton>

      {vehicleListContext.length > 0 && vehicleListContext[0].vehicle && (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">N° Vehículos oferta</CTableHeaderCell>
              <CTableHeaderCell scope="col">N° Vehículos Acreditado</CTableHeaderCell>
              <CTableHeaderCell scope="col">N° Vehículos en Obra</CTableHeaderCell>
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
            {vehicleListContext.map((item, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{item.vehicle}</CTableDataCell>
                  <CTableDataCell>{item.actions.vehicleOfferedNumber}</CTableDataCell>
                  <CTableDataCell>{item.actions.vehicleCertifiedNumber}</CTableDataCell>
                  <CTableDataCell>{item.actions.vehicleWorkNumber}</CTableDataCell>
                  <CTableDataCell>{item.actions.vehicleEffectiveTime}</CTableDataCell>
                  <CTableDataCell>{item.actions.vehicleCorrectiveMaintenance}</CTableDataCell>
                  <CTableDataCell>{item.actions.vehiclePreventiveMaintenance}</CTableDataCell>
                  <CTableDataCell>{item.actions.vehicleOutOfService}</CTableDataCell>
                  <CTableDataCell>{item.actions.vehicleWaiting}</CTableDataCell>
                  <CTableDataCell>{item.actions.vehicleNoOperator}</CTableDataCell>
                  <CTableDataCell>{item.actions.vehicleInitialHorometer}</CTableDataCell>
                  <CTableDataCell>{item.actions.vehicleFinalHorometer}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      className="btn-project-action"
                      onClick={() => {
                        deletevehicle(item.id)
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

export default Vehicle

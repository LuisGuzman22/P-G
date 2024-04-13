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
    vehiclePlate: undefined,
  }

  const { getData } = useGetCachedQueryData()
  const basicQuery = getData('basics')

  const [vehiclePlate, setVehiclePlate] = useState(initialState)
  const [vehiclePlateList, setVehiclePlateList] = useState([])
  const [plates, setPlates] = useState()

  const {
    storeVehiclePlate,
    removeVehiclePlate,
    vehiclePlateList: vehiclePlateListContext,
  } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    if (e.target.id === 'vehicle') {
      setVehiclePlate(initialState) // Clear the object
      setVehiclePlate({ [e.target.id]: e.target.value })
      const selectedVehicle = basicQuery.vehicles.find((vehic) => {
        return vehic.id.toString() === e.target.value.toString()
      })
      setPlates(selectedVehicle.plate)
    }
    if (validate(e.target.value)) {
      setVehiclePlate({ ...vehiclePlate, [e.target.id]: e.target.value })
    }
  }

  const registerVehiclePlate = () => {
    setPlates()
    const vehiclePlateInitialState = {
      id: uuidv4(),
      vehicle: vehiclePlate.vehicle,
      vehicleEffectiveTime: vehiclePlate.vehicleEffectiveTime,
      vehicleCorrectiveMaintenance: vehiclePlate.vehicleCorrectiveMaintenance,
      vehiclePreventiveMaintenance: vehiclePlate.vehiclePreventiveMaintenance,
      vehicleOutOfService: vehiclePlate.vehicleOutOfService,
      vehicleWaiting: vehiclePlate.vehicleWaiting,
      vehicleNoOperator: vehiclePlate.vehicleNoOperator,
      vehicleInitialHorometer: vehiclePlate.vehicleInitialHorometer,
      vehicleFinalHorometer: vehiclePlate.vehicleFinalHorometer,
      vehiclePlate: vehiclePlate.vehiclePlate,
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
        {basicQuery.vehicles.map((vehicleCached) => {
          return (
            <option key={vehicleCached.id} value={vehicleCached.id}>
              {vehicleCached.name}
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
            id="vehiclePlate"
            value={vehiclePlate.vehiclePlate ?? 0}
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
        <CTable className="resume-table">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Vehículo</CTableHeaderCell>
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
            {vehiclePlateListContext.map((item, index) => {
              const vehicle = basicQuery.vehicles.find((vehic) => {
                return vehic.id == item.vehicle
              })
              const plate = vehicle.plate.find((pl) => {
                return pl.id.toString() === item.vehiclePlate.toString()
              })
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{vehicle.name}</CTableDataCell>
                  <CTableDataCell>{plate.label}</CTableDataCell>
                  <CTableDataCell>{item.vehicleEffectiveTime ?? 0}</CTableDataCell>
                  <CTableDataCell>{item.vehicleCorrectiveMaintenance ?? 0}</CTableDataCell>
                  <CTableDataCell>{item.vehiclePreventiveMaintenance ?? 0}</CTableDataCell>
                  <CTableDataCell>{item.vehicleOutOfService ?? 0}</CTableDataCell>
                  <CTableDataCell>{item.vehicleWaiting ?? 0}</CTableDataCell>
                  <CTableDataCell>{item.vehicleNoOperator ?? 0}</CTableDataCell>
                  <CTableDataCell>{item.vehicleInitialHorometer ?? 0}</CTableDataCell>
                  <CTableDataCell>{item.vehicleFinalHorometer ?? 0}</CTableDataCell>
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

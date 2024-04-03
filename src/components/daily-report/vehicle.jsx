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

const Vehicle = () => {
  const initialState = {
    vehicle: undefined,
    vehicleOfferedNumber: undefined,
    vehicleCertifiedNumber: undefined,
    vehicleWorkNumber: undefined,
  }

  const vehicleTotalsInitialState = {
    vehicleOfferedNumber: 0,
    vehicleCertifiedNumber: 0,
    vehicleWorkNumber: 0,
  }

  const [vehicle, setVehicle] = useState(initialState)
  const [vehicleList, setVehicleList] = useState([])
  const [vehicleTotals, setVehicleTotals] = useState(vehicleTotalsInitialState)
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
    if (validate(e.target.value)) {
      setVehicle({ ...vehicle, [e.target.id]: e.target.value })
    }
  }

  const registerVehicle = () => {
    const vehicleInitialState = {
      id: uuidv4(),
      vehicle: vehicle.vehicle,
      actions: {
        vehicleOfferedNumber: vehicle.vehicleOfferedNumber,
        vehicleCertifiedNumber: vehicle.vehicleCertifiedNumber,
        vehicleWorkNumber: vehicle.vehicleWorkNumber,
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

  useEffect(() => {
    let vehicleTotalsCounter = {
      vehicleOfferedNumber: 0,
      vehicleCertifiedNumber: 0,
      vehicleWorkNumber: 0,
    }

    for (let data of vehicleListContext) {
      vehicleTotalsCounter = {
        vehicleOfferedNumber:
          Number(vehicleTotalsCounter.vehicleOfferedNumber) +
          Number(data.actions.vehicleOfferedNumber ?? 0),
        vehicleCertifiedNumber:
          Number(vehicleTotalsCounter.vehicleCertifiedNumber) +
          Number(data.actions.vehicleCertifiedNumber ?? 0),
        vehicleWorkNumber:
          Number(vehicleTotalsCounter.vehicleWorkNumber) +
          Number(data.actions.vehicleWorkNumber ?? 0),
      }
    }
    setVehicleTotals(vehicleTotalsCounter)
  }, [vehicleListContext])

  return (
    <div className="work-force-report">
      <CFormSelect
        aria-label="Default select example"
        id="vehicle"
        value={vehicle.vehicle || ''}
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
        <CTable className="resume-table">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
              <CTableHeaderCell scope="col">N° Vehículos oferta</CTableHeaderCell>
              <CTableHeaderCell scope="col">N° Vehículos Acreditado</CTableHeaderCell>
              <CTableHeaderCell scope="col">N° Vehículos en Obra</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {vehicleListContext.map((item, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{item.vehicle}</CTableDataCell>
                  <CTableDataCell>{item.actions.vehicleOfferedNumber ?? 0}</CTableDataCell>
                  <CTableDataCell>{item.actions.vehicleCertifiedNumber ?? 0}</CTableDataCell>
                  <CTableDataCell>{item.actions.vehicleWorkNumber ?? 0}</CTableDataCell>
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
            <CTableRow key={'total'}>
              <CTableDataCell>Total</CTableDataCell>
              <CTableDataCell>{vehicleTotals.vehicleOfferedNumber ?? 0}</CTableDataCell>
              <CTableDataCell>{vehicleTotals.vehicleCertifiedNumber ?? 0}</CTableDataCell>
              <CTableDataCell>{vehicleTotals.vehicleWorkNumber ?? 0}</CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      )}
    </div>
  )
}

export default Vehicle
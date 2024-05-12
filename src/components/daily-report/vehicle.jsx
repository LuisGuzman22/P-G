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

const Vehicle = () => {
  const currentLocation = useLocation().pathname
  const isViewMode = currentLocation.includes('/view')
  const isCreatingMode = currentLocation === '/informe-diario'

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

  const { getData } = useGetCachedQueryData()
  const basicQuery = getData('basics')

  const [vehicle, setVehicle] = useState(initialState)
  const [vehicleList, setVehicleList] = useState([])
  const [vehicleTotals, setVehicleTotals] = useState(vehicleTotalsInitialState)
  const [error, setError] = useState(false)

  const {
    storeVehicle,
    removeVehicle,
    vehicleList: vehicleListContext,
  } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    setError(false)
    if (e.target.id === 'vehicle') {
      setVehicle(initialState) // Clear the object
      setVehicle({ [e.target.id]: e.target.value })
    }
    if (validate(e.target.value)) {
      setVehicle({ ...vehicle, [e.target.id]: e.target.value })
    }
  }

  const registerVehicle = () => {
    if (!vehicle.vehicle || vehicle.vehicle === '0') {
      setError(true)
    } else {
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
  }

  const deletevehicle = (id) => {
    const newData = vehicleList.filter((item) => item.id !== id)
    setVehicleList(newData)
    removeVehicle(id)
  }

  const editVehicle = (id) => {
    const selectedVehicle = vehicleListContext.find((item) => item.id === id)
    setVehicle({
      vehicle: selectedVehicle.vehicle,
      vehicleOfferedNumber: selectedVehicle.actions.vehicleOfferedNumber,
      vehicleCertifiedNumber: selectedVehicle.actions.vehicleCertifiedNumber,
      vehicleWorkNumber: selectedVehicle.actions.vehicleWorkNumber,
    })
    deletevehicle(id)
  }

  useEffect(() => {
    if (!isViewMode) storeVehicle(vehicleList)
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
      {!isViewMode && (
        <>
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
            id="vehicle"
            label="Vehículo"
            value={vehicle.vehicle || ''}
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
        </>
      )}

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
              const charge = basicQuery.vehicles.find((vehic) => {
                return vehic.id == item.vehicle
              })
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{charge.name}</CTableDataCell>
                  <CTableDataCell>{item.actions.vehicleOfferedNumber ?? 0}</CTableDataCell>
                  <CTableDataCell>{item.actions.vehicleCertifiedNumber ?? 0}</CTableDataCell>
                  <CTableDataCell>{item.actions.vehicleWorkNumber ?? 0}</CTableDataCell>
                  <CTableDataCell>
                    {isCreatingMode && (
                      <CButton
                        className="btn-project-action"
                        onClick={() => {
                          deletevehicle(item.id)
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
                          editVehicle(item.id)
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

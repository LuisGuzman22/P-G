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

const VehicleWorkForce = () => {
  const initialState = {
    vehicleWorkForce: undefined,
    vehicleWorkForceFront1: undefined,
    vehicleWorkForceFront2: undefined,
    vehicleWorkForceFront3: undefined,
    vehicleWorkForceFront4: undefined,
    vehicleWorkForceFront5: undefined,
    vehicleWorkForceFront6: undefined,
    vehicleWorkForceFront7: undefined,
  }

  const [vehicleWorkForce, setVehicleWorkForce] = useState(initialState)
  const [vehicleWorkForceList, setVehicleWorkForceList] = useState([])

  const {
    storeVehicleWorkForce,
    removeVehicleWorkForce,
    vehicleWorkForceList: vehicleWorkForceListContext,
  } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    if (e.target.id === 'vehicleWorkForce') {
      setVehicleWorkForce(initialState) // Clear the object
      setVehicleWorkForce({ [e.target.id]: e.target.value })
    }
    if (validate(e.target.value)) {
      setVehicleWorkForce({ ...vehicleWorkForce, [e.target.id]: e.target.value })
    }
  }

  const registerVehiclenWorkForce = () => {
    const vehicleWorkForceInitialState = {
      id: uuidv4(),
      vehicleWorkForce: vehicleWorkForce.vehicleWorkForce,
      actions: {
        vehicleWorkForceFront1: vehicleWorkForce.vehicleWorkForceFront1,
        vehicleWorkForceFront2: vehicleWorkForce.vehicleWorkForceFront2,
        vehicleWorkForceFront3: vehicleWorkForce.vehicleWorkForceFront3,
        vehicleWorkForceFront4: vehicleWorkForce.vehicleWorkForceFront4,
        vehicleWorkForceFront5: vehicleWorkForce.vehicleWorkForceFront5,
        vehicleWorkForceFront6: vehicleWorkForce.vehicleWorkForceFront6,
        vehicleWorkForceFront7: vehicleWorkForce.vehicleWorkForceFront7,
      },
    }
    setVehicleWorkForce(initialState) // Clear the object
    setVehicleWorkForceList([...vehicleWorkForceList, vehicleWorkForceInitialState])
  }

  const deleteVehicleWorkForce = (id) => {
    const newData = vehicleWorkForceList.filter((item) => item.id !== id)
    setVehicleWorkForceList(newData)

    removeVehicleWorkForce(id)
  }

  useEffect(() => {
    storeVehicleWorkForce(vehicleWorkForceList)
  }, [vehicleWorkForceList])

  return (
    <div className="work-force-report">
      <CFormSelect
        aria-label="Default select example"
        id="vehicleWorkForce"
        onChange={(e) => {
          onChangeData(e)
        }}
      >
        <option>Seleccione</option>
        <option value="vehiculo_1">Vehículo 1</option>
        <option value="vehiculo_2">Vehículo 2</option>
        <option value="vehiculo_3">Vehículo 3</option>
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
                id="vehicleWorkForceFront1"
                value={vehicleWorkForce.vehicleWorkForceFront1 || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="vehicleWorkForceFront2"
                value={vehicleWorkForce.vehicleWorkForceFront2 || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="vehicleWorkForceFront3"
                value={vehicleWorkForce.vehicleWorkForceFront3 || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="vehicleWorkForceFront4"
                value={vehicleWorkForce.vehicleWorkForceFront4 || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="vehicleWorkForceFront5"
                value={vehicleWorkForce.vehicleWorkForceFront5 || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="vehicleWorkForceFront6"
                value={vehicleWorkForce.vehicleWorkForceFront6 || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="vehicleWorkForceFront7"
                value={vehicleWorkForce.vehicleWorkForceFront7 || ''}
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
          registerVehiclenWorkForce()
        }}
      >
        Registrar
      </CButton>

      {vehicleWorkForceListContext.length > 0 &&
        vehicleWorkForceListContext[0].vehicleWorkForce && (
          <CTable className="resume-table">
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
              {vehicleWorkForceListContext.map((item, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{item.vehicleWorkForce}</CTableDataCell>
                    <CTableDataCell>{item.actions.vehicleWorkForceFront1}</CTableDataCell>
                    <CTableDataCell>{item.actions.vehicleWorkForceFront2}</CTableDataCell>
                    <CTableDataCell>{item.actions.vehicleWorkForceFront3}</CTableDataCell>
                    <CTableDataCell>{item.actions.vehicleWorkForceFront4}</CTableDataCell>
                    <CTableDataCell>{item.actions.vehicleWorkForceFront5}</CTableDataCell>
                    <CTableDataCell>{item.actions.vehicleWorkForceFront6}</CTableDataCell>
                    <CTableDataCell>{item.actions.vehicleWorkForceFront7}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        className="btn-project-action"
                        onClick={() => {
                          deleteVehicleWorkForce(item.id)
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

export default VehicleWorkForce

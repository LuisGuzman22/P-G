import { React, useState, useEffect } from 'react'
import {
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
  CFormTextarea,
} from '@coreui/react'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'
import { v4 as uuidv4 } from 'uuid'
import { validate } from 'src/utils/validate'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'

const EquipmentWorkForce = () => {
  const initialState = {
    equipmentWorkForce: undefined,
    equipmentWorkForceObservation: undefined,
    equipmentSubWorkFront: undefined,
    equipmentWorkFrontCharge: undefined,
    equipmentWorkFrontQuantity: undefined,
  }

  const { getData } = useGetCachedQueryData()
  const basicQuery = getData('basics')

  const [equipmentWorkForce, setEquipmentWorkForce] = useState(initialState)
  const [equipmentWorkForceList, setEquipmentWorkForceList] = useState([])
  const [enableSubFrontWork, setEnableSubFrontWork] = useState(false)
  const [error, setError] = useState(false)

  const {
    storeEquipmentWorkForce,
    removeEquipmentWorkForce,
    equipmentWorkForceList: equipmentWorkForceListContext,
  } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    setError(false)

    if (e.target.id === 'equipmentWorkForce') {
      const selectedWorkFront = basicQuery.workFront.find((workFront) => {
        return workFront.id.toString() === e.target.value.toString()
      })
      setEnableSubFrontWork(selectedWorkFront.hasSubFront)

      // setEquipmentWorkForce(initialState) // Clear the object
      // setEquipmentWorkForce({ ...equipmentWorkForce, equipmentWorkForce: e.target.value })
    }
    if (e.target.id === 'equipmentSubWorkFront' || e.target.id === 'equipmentWorkFrontQuantity') {
      if (validate(e.target.value)) {
        setEquipmentWorkForce({
          ...equipmentWorkForce,
          [e.target.id]: e.target.value,
        })
      }
    } else {
      setEquipmentWorkForce({
        ...equipmentWorkForce,
        [e.target.id]: e.target.value,
      })
    }
  }

  const registerEquipmentnWorkForce = () => {
    if (
      !equipmentWorkForce.equipmentWorkForce ||
      !equipmentWorkForce.equipmentWorkFrontCharge ||
      !equipmentWorkForce.equipmentWorkFrontQuantity
    ) {
      setError(true)
    } else {
      setEnableSubFrontWork(false)
      const equipmentWorkForceInitialState = {
        id: uuidv4(),
        equipmentWorkForce: equipmentWorkForce.equipmentWorkForce,
        equipmentWorkForceObservation: equipmentWorkForce.equipmentWorkForceObservation,
        equipmentSubWorkFront: equipmentWorkForce.equipmentSubWorkFront,
        equipmentWorkFrontCharge: equipmentWorkForce.equipmentWorkFrontCharge,
        equipmentWorkFrontQuantity: equipmentWorkForce.equipmentWorkFrontQuantity,
      }
      setEquipmentWorkForce(initialState) // Clear the object
      setEquipmentWorkForceList([...equipmentWorkForceList, equipmentWorkForceInitialState])
    }
  }
  const deleteEquipmentWorkForce = (id) => {
    const newData = equipmentWorkForceList.filter((item) => item.id !== id)
    setEquipmentWorkForceList(newData)

    removeEquipmentWorkForce(id)
  }

  useEffect(() => {
    storeEquipmentWorkForce(equipmentWorkForceList)
  }, [equipmentWorkForceList])

  // useEffect(() => {
  //   let equipmentWorkForceTotalsCounter = {
  //     equipmentWorkForceFront1: 0,
  //     equipmentWorkForceFront2: 0,
  //     equipmentWorkForceFront3: 0,
  //     equipmentWorkForceFront4: 0,
  //     equipmentWorkForceFront5: 0,
  //     equipmentWorkForceFront6: 0,
  //     equipmentWorkForceFront7: 0,
  //   }

  //   for (let data of equipmentWorkForceListContext) {
  //     equipmentWorkForceTotalsCounter = {
  //       equipmentWorkForceFront1:
  //         Number(equipmentWorkForceTotalsCounter.equipmentWorkForceFront1) +
  //         Number(data.equipmentWorkForceFront1 ?? 0),
  //       equipmentWorkForceFront2:
  //         Number(equipmentWorkForceTotalsCounter.equipmentWorkForceFront2) +
  //         Number(data.equipmentWorkForceFront2 ?? 0),
  //       equipmentWorkForceFront3:
  //         Number(equipmentWorkForceTotalsCounter.equipmentWorkForceFront3) +
  //         Number(data.equipmentWorkForceFront3 ?? 0),
  //       equipmentWorkForceFront4:
  //         Number(equipmentWorkForceTotalsCounter.equipmentWorkForceFront4) +
  //         Number(data.equipmentWorkForceFront4 ?? 0),
  //       equipmentWorkForceFront5:
  //         Number(equipmentWorkForceTotalsCounter.equipmentWorkForceFront5) +
  //         Number(data.equipmentWorkForceFront5 ?? 0),
  //       equipmentWorkForceFront6:
  //         Number(equipmentWorkForceTotalsCounter.equipmentWorkForceFront6) +
  //         Number(data.equipmentWorkForceFront6 ?? 0),
  //       equipmentWorkForceFront7:
  //         Number(equipmentWorkForceTotalsCounter.equipmentWorkForceFront7) +
  //         Number(data.equipmentWorkForceFront7 ?? 0),
  //     }
  //   }
  //   setEquipmentWorkForceTotals(equipmentWorkForceTotalsCounter)
  // }, [equipmentWorkForceListContext])

  return (
    <div className="work-force-report">
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
            <CToastBody>
              Debe completar los datos de frente de trabajo, equipo y cantidad para registrar el
              personal
            </CToastBody>
          </div>
        </CToast>
      )}
      <CFormSelect
        aria-label="Default select example"
        label="Frente de trabajo"
        id="equipmentWorkForce"
        value={equipmentWorkForce.equipmentWorkForce || ''}
        onChange={(e) => {
          onChangeData(e)
        }}
      >
        <option>Seleccione</option>
        {basicQuery.workFront.map((equipmentCached) => {
          return (
            <option key={equipmentCached.id} value={equipmentCached.id}>
              {equipmentCached.name}
            </option>
          )
        })}
      </CFormSelect>

      {enableSubFrontWork && (
        <>
          <br />
          <CFormInput
            type="text"
            id="equipmentSubWorkFront"
            label="SubFrente de trabajo"
            value={equipmentWorkForce.equipmentSubWorkFront || ''}
            text=""
            onChange={(e) => {
              onChangeData(e)
            }}
          />
        </>
      )}

      <br />

      <CFormSelect
        aria-label="Default select example"
        id="equipmentWorkFrontCharge"
        value={equipmentWorkForce.equipmentWorkFrontCharge || ''}
        label="Equipo"
        onChange={(e) => {
          onChangeData(e)
        }}
      >
        <option value={'0'}>Seleccione</option>
        {basicQuery.equipment.map((equipmentCached) => {
          return (
            <option key={equipmentCached.id} value={equipmentCached.id}>
              {equipmentCached.name}
            </option>
          )
        })}
      </CFormSelect>
      <br />

      <CFormInput
        type="text"
        id="equipmentWorkFrontQuantity"
        label="Cantidad"
        value={equipmentWorkForce.equipmentWorkFrontQuantity || ''}
        text=""
        onChange={(e) => {
          onChangeData(e)
        }}
      />
      <br />

      <CFormTextarea
        id="equipmentWorkForceObservation"
        placeholder="Deja un comentario / observación"
        value={equipmentWorkForce.equipmentWorkForceObservation || ''}
        onChange={(e) => {
          onChangeData(e)
        }}
      ></CFormTextarea>
      <br />

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
          <>
            <>
              <CTable className="resume-table">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Frente de trabajo</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Sub frente de trabajo</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Personal</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Cantidad</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Comentario</CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {equipmentWorkForceListContext.map((item, index) => {
                    const selectedWorkFront = basicQuery.workFront.find((workF) => {
                      return workF.id == item.equipmentWorkForce
                    })
                    const selectedCharge = basicQuery.directPersonal.find((charge) => {
                      return charge.id == item.equipmentWorkFrontCharge
                    })
                    return (
                      <CTableRow key={item.id}>
                        <CTableDataCell>
                          <span key={item.id}>{selectedWorkFront.name}</span>
                        </CTableDataCell>
                        <CTableDataCell>
                          <span key={item.id}>{item.equipmentSubWorkFront ?? 'N/A'}</span>
                        </CTableDataCell>
                        <CTableDataCell>
                          <span key={item.id}>{selectedCharge.name}</span>
                        </CTableDataCell>
                        <CTableDataCell>
                          <span key={item.id}>{item.equipmentWorkFrontQuantity}</span>
                        </CTableDataCell>
                        <CTableDataCell>
                          <span key={item.id}>{item.equipmentWorkForceObservation}</span>
                        </CTableDataCell>
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
            </>
          </>
        )}
    </div>
  )
}

export default EquipmentWorkForce

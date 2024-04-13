import { React, useState, useEffect } from 'react'
import {
  CButton,
  CFormInput,
  CFormSelect,
  CFormTextarea,
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

const MachineryWorkForce = () => {
  const initialState = {
    machineryWorkForce: undefined,
    machineryWorkForceObservation: undefined,
    machinerySubWorkFront: undefined,
    machineryWorkFrontCharge: undefined,
    machineryWorkFrontQuantity: undefined,
  }

  const { getData } = useGetCachedQueryData()
  const basicQuery = getData('basics')

  const [machineryWorkForce, setMachineryWorkForce] = useState(initialState)
  const [machineryWorkForceList, setMachineryWorkForceList] = useState([])
  const [enableSubFrontWork, setEnableSubFrontWork] = useState(false)
  const [error, setError] = useState(false)

  const {
    storeMachineryWorkForce,
    removeMachineryWorkForce,
    machineryWorkForceList: machineryWorkForceListContext,
  } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    setError(false)
    if (e.target.id === 'machineryWorkForce') {
      const selectedWorkFront = basicQuery.workFront.find((workFront) => {
        return workFront.id.toString() === e.target.value.toString()
      })
      setEnableSubFrontWork(selectedWorkFront.hasSubFront)
    }
    if (e.target.id === 'machinerySubWorkFront' || e.target.id === 'machineryWorkFrontQuantity') {
      if (validate(e.target.value)) {
        setMachineryWorkForce({
          ...machineryWorkForce,
          [e.target.id]: e.target.value,
        })
      }
    } else {
      setMachineryWorkForce({
        ...machineryWorkForce,
        [e.target.id]: e.target.value,
      })
    }

    // if (e.target.id === 'machineryWorkForce') {
    //   setMachineryWorkForce(initialState) // Clear the object
    //   setMachineryWorkForce({ ...machineryWorkForce, machineryWorkForce: e.target.value })
    // }
    // if (validate(e.target.value)) {
    //   setMachineryWorkForce({ ...machineryWorkForce, [e.target.id]: e.target.value })
    // }
  }

  const registerMachinerynWorkForce = () => {
    if (
      !machineryWorkForce.machineryWorkForce ||
      !machineryWorkForce.machineryWorkFrontCharge ||
      !machineryWorkForce.machineryWorkFrontQuantity
    ) {
      setError(true)
    } else {
      setEnableSubFrontWork(false)
      const machineryWorkForceInitialState = {
        id: uuidv4(),
        machineryWorkForcebservation: machineryWorkForce.machineryWorkForceObservation,
        machineryWorkForce: machineryWorkForce.machineryWorkForce,
        machinerySubWorkFront: machineryWorkForce.machinerySubWorkFront,
        machineryWorkFrontCharge: machineryWorkForce.machineryWorkFrontCharge,
        machineryWorkFrontQuantity: machineryWorkForce.machineryWorkFrontQuantity,
      }
      setMachineryWorkForce(initialState) // Clear the object
      setMachineryWorkForceList([...machineryWorkForceList, machineryWorkForceInitialState])
    }

    // const machineryWorkForceInitialState = {
    //   id: uuidv4(),
    //   machineryWorkForce: machineryWorkForce.machineryWorkForce,
    //   machineryWorkForcebservation: machineryWorkForce.machineryWorkForceObservation,
    //   actions: {
    //     machineryWorkForceFront1: machineryWorkForce.machineryWorkForceFront1,
    //     machineryWorkForceFront2: machineryWorkForce.machineryWorkForceFront2,
    //     machineryWorkForceFront3: machineryWorkForce.machineryWorkForceFront3,
    //     machineryWorkForceFront4: machineryWorkForce.machineryWorkForceFront4,
    //     machineryWorkForceFront5: machineryWorkForce.machineryWorkForceFront5,
    //     machineryWorkForceFront6: machineryWorkForce.machineryWorkForceFront6,
    //     machineryWorkForceFront7: machineryWorkForce.machineryWorkForceFront7,
    //   },
    // }
    // setMachineryWorkForce(initialState) // Clear the object
    // setMachineryWorkForceList([...machineryWorkForceList, machineryWorkForceInitialState])
  }

  const deleteMachineryWorkForce = (id) => {
    const newData = machineryWorkForceList.filter((item) => item.id !== id)
    setMachineryWorkForceList(newData)

    removeMachineryWorkForce(id)
  }

  useEffect(() => {
    storeMachineryWorkForce(machineryWorkForceList)
  }, [machineryWorkForceList])

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
              Debe completar los datos de frente de trabajo, cargo y cantidad para registrar el
              personal
            </CToastBody>
          </div>
        </CToast>
      )}
      <CFormSelect
        aria-label="Default select example"
        label="Frente de trabajo"
        id="machineryWorkForce"
        value={machineryWorkForce.machineryWorkForce || ''}
        onChange={(e) => {
          onChangeData(e)
        }}
      >
        <option>Seleccione</option>
        {basicQuery.workFront.map((workfrontCached) => {
          return (
            <option key={workfrontCached.id} value={workfrontCached.id}>
              {workfrontCached.name}
            </option>
          )
        })}
      </CFormSelect>
      {enableSubFrontWork && (
        <>
          <br />
          <CFormInput
            type="text"
            id="machinerySubWorkFront"
            label="SubFrente de trabajo"
            value={machineryWorkForce.machinerySubWorkFront || ''}
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
        id="machineryWorkFrontCharge"
        value={machineryWorkForce.machineryWorkFrontCharge || ''}
        label="Cargo"
        onChange={(e) => {
          onChangeData(e)
        }}
      >
        <option value={'0'}>Seleccione</option>
        {basicQuery.machinery.map((machineryCached) => {
          return (
            <option key={machineryCached.id} value={machineryCached.id}>
              {machineryCached.name}
            </option>
          )
        })}
      </CFormSelect>
      <br />

      <CFormInput
        type="text"
        id="machineryWorkFrontQuantity"
        label="Cantidad"
        value={machineryWorkForce.machineryWorkFrontQuantity || ''}
        text=""
        onChange={(e) => {
          onChangeData(e)
        }}
      />
      <br />

      <CFormTextarea
        id="machineryWorkForceObservation"
        placeholder="Deja un comentario / observación"
        value={machineryWorkForce.machineryWorkForceObservation || ''}
        onChange={(e) => {
          onChangeData(e)
        }}
      ></CFormTextarea>
      <br />

      <CButton
        className="btn-project-action"
        onClick={() => {
          registerMachinerynWorkForce()
        }}
      >
        Registrar
      </CButton>

      {machineryWorkForceListContext.length > 0 &&
        machineryWorkForceListContext[0].machineryWorkForce && (
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
                {machineryWorkForceListContext.map((item, index) => {
                  console.log('item', item)
                  const selectedWorkFront = basicQuery.workFront.find((workF) => {
                    return workF.id == item.machineryWorkForce
                  })
                  const selectedCharge = basicQuery.directPersonal.find((charge) => {
                    return charge.id == item.machineryWorkFrontCharge
                  })
                  return (
                    <CTableRow key={item.id}>
                      <CTableDataCell>
                        <span key={item.id}>{selectedWorkFront.name}</span>
                      </CTableDataCell>
                      <CTableDataCell>
                        <span key={item.id}>{item.machinerySubWorkFront ?? 'N/A'}</span>
                      </CTableDataCell>
                      <CTableDataCell>
                        <span key={item.id}>{selectedCharge.name}</span>
                      </CTableDataCell>
                      <CTableDataCell>
                        <span key={item.id}>{item.machineryWorkFrontQuantity}</span>
                      </CTableDataCell>
                      <CTableDataCell>
                        <span key={item.id}>{item.machineryWorkForceObservation}</span>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          className="btn-project-action"
                          onClick={() => {
                            deleteMachineryWorkForce(item.id)
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
        )}
    </div>
  )
}

export default MachineryWorkForce

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
} from '@coreui/react'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'
import { v4 as uuidv4 } from 'uuid'
import { validate } from 'src/utils/validate'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'

const DirectDotationWorkForce = () => {
  const initialState = {
    directWorkFront: undefined,
    directDotationWorkForceObservation: undefined,
    directSubWorkFront: undefined,
    directWorkFrontCharge: undefined,
    directWorkFrontQuantity: undefined,
  }

  const directDotationTotalsInitialState = {
    directWorkForceFront1: 0,
    directWorkForceFront2: 0,
    directWorkForceFront3: 0,
    directWorkForceFront4: 0,
    directWorkForceFront5: 0,
    directWorkForceFront6: 0,
    directWorkForceFront7: 0,
  }

  const { getData } = useGetCachedQueryData()
  const basicQuery = getData('basics')

  const [directDotationWorkForce, setDirectDotationWorkForce] = useState(initialState)
  const [directDotationWorkForceList, setDirectDotationWorkForceList] = useState([])
  const [directDotationTotals, setDirectDotationTotals] = useState(directDotationTotalsInitialState)

  const {
    storeDirectDotationWorkForceData,
    removeDirectDotationWorkForce,
    directDotationWorkForceList: directDotationWorkForceListContext,
  } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    if (e.target.id === 'directSubWorkFront' || e.target.id === 'directWorkFrontQuantity') {
      if (validate(e.target.value)) {
        setDirectDotationWorkForce({
          ...directDotationWorkForce,
          [e.target.id]: e.target.value,
        })
      }
    } else {
      setDirectDotationWorkForce({
        ...directDotationWorkForce,
        [e.target.id]: e.target.value,
      })
    }
  }

  const registerDirectDotationWorkForce = () => {
    const directDotationWorkForceInitialState = {
      id: uuidv4(),
      directDotationWorkForceObservation:
        directDotationWorkForce.directDotationWorkForceObservation,
      directWorkFront: directDotationWorkForce.directWorkFront,
      directSubWorkFront: directDotationWorkForce.directSubWorkFront,
      directWorkFrontCharge: directDotationWorkForce.directWorkFrontCharge,
      directWorkFrontQuantity: directDotationWorkForce.directWorkFrontQuantity,
    }
    setDirectDotationWorkForce(initialState) // Clear the object
    setDirectDotationWorkForceList([
      ...directDotationWorkForceList,
      directDotationWorkForceInitialState,
    ])
  }

  const deletedirectDotationWorkForce = (id) => {
    const newData = directDotationWorkForceList.filter((item) => item.id !== id)
    setDirectDotationWorkForceList(newData)

    removeDirectDotationWorkForce(id)
  }

  useEffect(() => {
    storeDirectDotationWorkForceData(directDotationWorkForceList)
  }, [directDotationWorkForceList])

  useEffect(() => {
    //   let directDotationTotalsCounter = {
    //     directWorkForceFront1: 0,
    //     directWorkForceFront2: 0,
    //     directWorkForceFront3: 0,
    //     directWorkForceFront4: 0,
    //     directWorkForceFront5: 0,
    //     directWorkForceFront6: 0,
    //     directWorkForceFront7: 0,
    //   }
    //   for (let data of directDotationWorkForceListContext) {
    //     directDotationTotalsCounter = {
    //       directWorkForceFront1:
    //         Number(directDotationTotalsCounter.directWorkForceFront1) +
    //         Number(data.actions.directWorkForceFront1 ?? 0),
    //       directWorkForceFront2:
    //         Number(directDotationTotalsCounter.directWorkForceFront2) +
    //         Number(data.actions.directWorkForceFront2 ?? 0),
    //       directWorkForceFront3:
    //         Number(directDotationTotalsCounter.directWorkForceFront3) +
    //         Number(data.actions.directWorkForceFront3 ?? 0),
    //       directWorkForceFront4:
    //         Number(directDotationTotalsCounter.directWorkForceFront4) +
    //         Number(data.actions.directWorkForceFront4 ?? 0),
    //       directWorkForceFront5:
    //         Number(directDotationTotalsCounter.directWorkForceFront5) +
    //         Number(data.actions.directWorkForceFront5 ?? 0),
    //       directWorkForceFront6:
    //         Number(directDotationTotalsCounter.directWorkForceFront6) +
    //         Number(data.actions.directWorkForceFront6 ?? 0),
    //       directWorkForceFront7:
    //         Number(directDotationTotalsCounter.directWorkForceFront7) +
    //         Number(data.actions.directWorkForceFront7 ?? 0),
    //     }
    //   }
    //   setDirectDotationTotals(directDotationTotalsCounter)
  }, [directDotationWorkForceListContext])

  return (
    <div className="work-force-report">
      <CFormSelect
        aria-label="Default select example"
        id="directWorkFront"
        label="Frente de trabajo"
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
      <br />
      <CFormInput
        type="text"
        id="directSubWorkFront"
        label="SubFrente de trabajo"
        value={directDotationWorkForce.directSubWorkFront || ''}
        text=""
        onChange={(e) => {
          onChangeData(e)
        }}
      />
      <br />

      <CFormSelect
        aria-label="Default select example"
        id="directWorkFrontCharge"
        label="Cargo"
        onChange={(e) => {
          onChangeData(e)
        }}
      >
        <option>Seleccione</option>
        {basicQuery.directPersonal.map((directPersonalCached) => {
          return (
            <option key={directPersonalCached.id} value={directPersonalCached.id}>
              {directPersonalCached.name}
            </option>
          )
        })}
      </CFormSelect>
      <br />
      <CFormInput
        type="text"
        id="directWorkFrontQuantity"
        label="Cantidad"
        value={directDotationWorkForce.directWorkFrontQuantity || ''}
        text=""
        onChange={(e) => {
          onChangeData(e)
        }}
      />
      <br />
      <CFormTextarea
        id="directDotationWorkForceObservation"
        placeholder="Deja un comentario / observación"
        onChange={(e) => {
          onChangeData(e)
        }}
      ></CFormTextarea>
      <br />

      <CButton
        className="btn-project-action"
        onClick={() => {
          registerDirectDotationWorkForce()
        }}
      >
        Registrar
      </CButton>

      {directDotationWorkForceListContext.length > 0 &&
        directDotationWorkForceListContext[0].id && (
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
                {directDotationWorkForceListContext.map((item, index) => {
                  const selectedWorkFront = basicQuery.workFront.find((workF) => {
                    return workF.id == item.directWorkFront
                  })
                  const selectedCharge = basicQuery.directPersonal.find((charge) => {
                    return charge.id == item.directWorkFrontCharge
                  })
                  return (
                    <CTableRow key={item.id}>
                      <CTableDataCell>
                        <span key={item.id}>{selectedWorkFront.name}</span>
                      </CTableDataCell>
                      <CTableDataCell>
                        <span key={item.id}>{item.directSubWorkFront}</span>
                      </CTableDataCell>
                      <CTableDataCell>
                        <span key={item.id}>{selectedCharge.name}</span>
                      </CTableDataCell>
                      <CTableDataCell>
                        <span key={item.id}>{item.directWorkFrontQuantity}</span>
                      </CTableDataCell>
                      <CTableDataCell>
                        <span key={item.id}>{item.directDotationWorkForceObservation}</span>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>
          </>

          // <CTable className="resume-table">
          //   <CTableHead>
          //     <CTableRow>
          //       <CTableHeaderCell scope="col"></CTableHeaderCell>
          //       <CTableHeaderCell scope="col">Frente de trabajo 1</CTableHeaderCell>
          //       <CTableHeaderCell scope="col">Frente de trabajo 2</CTableHeaderCell>
          //       <CTableHeaderCell scope="col">Frente de trabajo 3</CTableHeaderCell>
          //       <CTableHeaderCell scope="col">Frente de trabajo 4</CTableHeaderCell>
          //       <CTableHeaderCell scope="col">Frente de trabajo 5</CTableHeaderCell>
          //       <CTableHeaderCell scope="col">Frente de trabajo 6</CTableHeaderCell>
          //       <CTableHeaderCell scope="col">Frente de trabajo 7</CTableHeaderCell>
          //       <CTableHeaderCell scope="col"></CTableHeaderCell>
          //     </CTableRow>
          //   </CTableHead>
          //   <CTableBody>
          //     {directDotationWorkForceListContext.map((item, index) => {
          //       const charge = basicQuery.directPersonal.find((personal) => {
          //         return personal.id == item.directWorkForce
          //       })
          //       return (
          //         <CTableRow key={index}>
          //           <CTableDataCell>{charge.name}</CTableDataCell>
          //           <CTableDataCell>{item.actions.directWorkForceFront1 ?? 0}</CTableDataCell>
          //           <CTableDataCell>{item.actions.directWorkForceFront2 ?? 0}</CTableDataCell>
          //           <CTableDataCell>{item.actions.directWorkForceFront3 ?? 0}</CTableDataCell>
          //           <CTableDataCell>{item.actions.directWorkForceFront4 ?? 0}</CTableDataCell>
          //           <CTableDataCell>{item.actions.directWorkForceFront5 ?? 0}</CTableDataCell>
          //           <CTableDataCell>{item.actions.directWorkForceFront6 ?? 0}</CTableDataCell>
          //           <CTableDataCell>{item.actions.directWorkForceFront7 ?? 0}</CTableDataCell>
          //           <CTableDataCell>
          //             <CButton
          //               className="btn-project-action"
          //               onClick={() => {
          //                 deletedirectDotationWorkForce(item.id)
          //               }}
          //             >
          //               eliminar
          //             </CButton>
          //           </CTableDataCell>
          //         </CTableRow>
          //       )
          //     })}
          //     <CTableRow key={'total'}>
          //       <CTableDataCell>Total</CTableDataCell>
          //       <CTableDataCell>{directDotationTotals.directWorkForceFront1}</CTableDataCell>
          //       <CTableDataCell>{directDotationTotals.directWorkForceFront2}</CTableDataCell>
          //       <CTableDataCell>{directDotationTotals.directWorkForceFront3}</CTableDataCell>
          //       <CTableDataCell>{directDotationTotals.directWorkForceFront4}</CTableDataCell>
          //       <CTableDataCell>{directDotationTotals.directWorkForceFront5}</CTableDataCell>
          //       <CTableDataCell>{directDotationTotals.directWorkForceFront6}</CTableDataCell>
          //       <CTableDataCell>{directDotationTotals.directWorkForceFront7}</CTableDataCell>
          //     </CTableRow>
          //   </CTableBody>
          // </CTable>
        )}
    </div>
  )
}

export default DirectDotationWorkForce

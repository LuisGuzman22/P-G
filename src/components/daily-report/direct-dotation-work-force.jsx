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

const DirectDotationWorkForce = () => {
  const initialState = {
    directWorkForce: undefined,
    directDotationWorkForceObservation: undefined,
    directWorkForceFront1: undefined,
    directWorkForceFront2: undefined,
    directWorkForceFront3: undefined,
    directWorkForceFront4: undefined,
    directWorkForceFront5: undefined,
    directWorkForceFront6: undefined,
    directWorkForceFront7: undefined,
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

  const [directDotationWorkForce, setDirectDotationWorkForce] = useState(initialState)
  const [directDotationWorkForceList, setDirectDotationWorkForceList] = useState([])
  const [directDotationTotals, setDirectDotationTotals] = useState(directDotationTotalsInitialState)

  const {
    storeDirectDotationWorkForceData,
    removeDirectDotationWorkForce,
    directDotationWorkForceList: directDotationWorkForceListContext,
  } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    if (e.target.id === 'directWorkForce') {
      setDirectDotationWorkForce(initialState) // Clear the object
      setDirectDotationWorkForce({ ...directDotationWorkForce, directWorkForce: e.target.value })
    }
    if (validate(e.target.value)) {
      setDirectDotationWorkForce({
        ...directDotationWorkForce,
        [e.target.id]: e.target.value,
      })
    }
  }

  const registerDirectDotationWorkForce = () => {
    const directDotationWorkForceInitialState = {
      id: uuidv4(),
      directWorkForce: directDotationWorkForce.directWorkForce,
      directDotationWorkForceObservation:
        directDotationWorkForce.directDotationWorkForceObservation,
      actions: {
        directWorkForceFront1: directDotationWorkForce.directWorkForceFront1,
        directWorkForceFront2: directDotationWorkForce.directWorkForceFront2,
        directWorkForceFront3: directDotationWorkForce.directWorkForceFront3,
        directWorkForceFront4: directDotationWorkForce.directWorkForceFront4,
        directWorkForceFront5: directDotationWorkForce.directWorkForceFront5,
        directWorkForceFront6: directDotationWorkForce.directWorkForceFront6,
        directWorkForceFront7: directDotationWorkForce.directWorkForceFront7,
      },
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
    let directDotationTotalsCounter = {
      directWorkForceFront1: 0,
      directWorkForceFront2: 0,
      directWorkForceFront3: 0,
      directWorkForceFront4: 0,
      directWorkForceFront5: 0,
      directWorkForceFront6: 0,
      directWorkForceFront7: 0,
    }

    for (let data of directDotationWorkForceListContext) {
      directDotationTotalsCounter = {
        directWorkForceFront1:
          Number(directDotationTotalsCounter.directWorkForceFront1) +
          Number(data.actions.directWorkForceFront1 ?? 0),
        directWorkForceFront2:
          Number(directDotationTotalsCounter.directWorkForceFront2) +
          Number(data.actions.directWorkForceFront2 ?? 0),
        directWorkForceFront3:
          Number(directDotationTotalsCounter.directWorkForceFront3) +
          Number(data.actions.directWorkForceFront3 ?? 0),
        directWorkForceFront4:
          Number(directDotationTotalsCounter.directWorkForceFront4) +
          Number(data.actions.directWorkForceFront4 ?? 0),
        directWorkForceFront5:
          Number(directDotationTotalsCounter.directWorkForceFront5) +
          Number(data.actions.directWorkForceFront5 ?? 0),
        directWorkForceFront6:
          Number(directDotationTotalsCounter.directWorkForceFront6) +
          Number(data.actions.directWorkForceFront6 ?? 0),
        directWorkForceFront7:
          Number(directDotationTotalsCounter.directWorkForceFront7) +
          Number(data.actions.directWorkForceFront7 ?? 0),
      }
    }
    setDirectDotationTotals(directDotationTotalsCounter)
  }, [directDotationWorkForceListContext])

  return (
    <div className="work-force-report">
      <CFormSelect
        aria-label="Default select example"
        id="directWorkForce"
        onChange={(e) => {
          onChangeData(e)
        }}
      >
        <option>Seleccione</option>
        <option value="Capataz_Civil_y_Estructuras">Capataz Civil y Estructuras</option>
        <option value="Maestro_Primera_Civil">Maestro Primera Civil</option>
        <option value="Capataz_Mecánico_y_Piping">Capataz Mecánico y Piping</option>
        <option value="Maestro_Mayor_Mecánico">Maestro Mayor Mecánico</option>
        <option value="Maestro_Mayor_Piping">Maestro Mayor Piping</option>
        <option value="Maestro_Primera_Mecánico">Maestro Primera Mecánico</option>
        <option value="Soldador_HDPE">Soldador HDPE</option>
        <option value="Soldador_6G">Soldador 6G</option>
        <option value="Capataz_Eléctrico">Capataz Eléctrico</option>
        <option value="Maestro_Mayor_Eléctrico">Maestro Mayor Eléctrico</option>
        <option value="Maestro_Primera_Eléctrico">Maestro Primera Eléctrico</option>
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
                id="directWorkForceFront1"
                value={directDotationWorkForce.directWorkForceFront1 || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="directWorkForceFront2"
                value={directDotationWorkForce.directWorkForceFront2 || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="directWorkForceFront3"
                value={directDotationWorkForce.directWorkForceFront3 || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="directWorkForceFront4"
                value={directDotationWorkForce.directWorkForceFront4 || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="directWorkForceFront5"
                value={directDotationWorkForce.directWorkForceFront5 || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="directWorkForceFront6"
                value={directDotationWorkForce.directWorkForceFront6 || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="directWorkForceFront7"
                value={directDotationWorkForce.directWorkForceFront7 || ''}
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
          registerDirectDotationWorkForce()
        }}
      >
        Registrar
      </CButton>

      {directDotationWorkForceListContext.length > 0 &&
        directDotationWorkForceListContext[0].directWorkForce && (
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
              {directDotationWorkForceListContext.map((item, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{item.directWorkForce}</CTableDataCell>
                    <CTableDataCell>{item.actions.directWorkForceFront1 ?? 0}</CTableDataCell>
                    <CTableDataCell>{item.actions.directWorkForceFront2 ?? 0}</CTableDataCell>
                    <CTableDataCell>{item.actions.directWorkForceFront3 ?? 0}</CTableDataCell>
                    <CTableDataCell>{item.actions.directWorkForceFront4 ?? 0}</CTableDataCell>
                    <CTableDataCell>{item.actions.directWorkForceFront5 ?? 0}</CTableDataCell>
                    <CTableDataCell>{item.actions.directWorkForceFront6 ?? 0}</CTableDataCell>
                    <CTableDataCell>{item.actions.directWorkForceFront7 ?? 0}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        className="btn-project-action"
                        onClick={() => {
                          deletedirectDotationWorkForce(item.id)
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
                <CTableDataCell>{directDotationTotals.directWorkForceFront1}</CTableDataCell>
                <CTableDataCell>{directDotationTotals.directWorkForceFront2}</CTableDataCell>
                <CTableDataCell>{directDotationTotals.directWorkForceFront3}</CTableDataCell>
                <CTableDataCell>{directDotationTotals.directWorkForceFront4}</CTableDataCell>
                <CTableDataCell>{directDotationTotals.directWorkForceFront5}</CTableDataCell>
                <CTableDataCell>{directDotationTotals.directWorkForceFront6}</CTableDataCell>
                <CTableDataCell>{directDotationTotals.directWorkForceFront7}</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        )}

      <CFormTextarea
        id="directDotationWorkForceObservation"
        placeholder="Deja un comentario / observación"
        onChange={(e) => {
          onChangeData(e)
        }}
      ></CFormTextarea>
    </div>
  )
}

export default DirectDotationWorkForce

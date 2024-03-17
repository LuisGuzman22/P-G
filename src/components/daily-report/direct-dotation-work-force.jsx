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

  const [directDotationWorkForce, setDirectDotationWorkForce] = useState(initialState)
  const [directDotationWorkForceList, setDirectDotationWorkForceList] = useState([])

  const {
    storeDirectDotationWorkForceData,
    removeDirectDotationWorkForce,
    directDotationWorkForceList: directDotationWorkForceListContext,
  } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    switch (e.target.id) {
      case 'directWorkForce':
        setDirectDotationWorkForce({ ...directDotationWorkForce, directWorkForce: e.target.value })
        break
      case 'directWorkForceFront1':
        setDirectDotationWorkForce({
          ...directDotationWorkForce,
          directWorkForceFront1: e.target.value,
        })
        break
      case 'directWorkForceFront2':
        setDirectDotationWorkForce({
          ...directDotationWorkForce,
          directWorkForceFront2: e.target.value,
        })
        break
      case 'directWorkForceFront3':
        setDirectDotationWorkForce({
          ...directDotationWorkForce,
          directWorkForceFront3: e.target.value,
        })
        break
      case 'directWorkForceFront4':
        setDirectDotationWorkForce({
          ...directDotationWorkForce,
          directWorkForceFront4: e.target.value,
        })
        break
      case 'directWorkForceFront5':
        setDirectDotationWorkForce({
          ...directDotationWorkForce,
          directWorkForceFront5: e.target.value,
        })
        break
      case 'directWorkForceFront6':
        setDirectDotationWorkForce({
          ...directDotationWorkForce,
          directWorkForceFront6: e.target.value,
        })
        break
      case 'directWorkForceFront7':
        setDirectDotationWorkForce({
          ...directDotationWorkForce,
          directWorkForceFront7: e.target.value,
        })
        break
      case 'directDotationWorkForceObservation':
        setDirectDotationWorkForce({
          ...directDotationWorkForce,
          directDotationWorkForceObservation: e.target.value,
        })
        break
      default:
        break
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
          <CTable>
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
                    <CTableDataCell>{item.actions.directWorkForceFront1}</CTableDataCell>
                    <CTableDataCell>{item.actions.directWorkForceFront2}</CTableDataCell>
                    <CTableDataCell>{item.actions.directWorkForceFront3}</CTableDataCell>
                    <CTableDataCell>{item.actions.directWorkForceFront4}</CTableDataCell>
                    <CTableDataCell>{item.actions.directWorkForceFront5}</CTableDataCell>
                    <CTableDataCell>{item.actions.directWorkForceFront6}</CTableDataCell>
                    <CTableDataCell>{item.actions.directWorkForceFront7}</CTableDataCell>
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

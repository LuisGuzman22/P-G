import { React, useState, useEffect } from 'react'
import {
  CForm,
  CFormInput,
  CRow,
  CFormSelect,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableBody,
  CTableDataCell,
  CFormTextarea,
  CButton,
} from '@coreui/react'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'
import { v4 as uuidv4 } from 'uuid'

const IndirectDotationWorkForce = () => {
  const initialState = {
    indirectWorkForce: undefined,
    indirectDotationWorkForceObservation: undefined,
    indirectWorkForceFront1: undefined,
    indirectWorkForceFront2: undefined,
    indirectWorkForceFront3: undefined,
    indirectWorkForceFront4: undefined,
    indirectWorkForceFront5: undefined,
    indirectWorkForceFront6: undefined,
    indirectWorkForceFront7: undefined,
  }

  const indirectDotationTotalsInitialState = {
    indirectWorkForceFront1: 0,
    indirectWorkForceFront2: 0,
    indirectWorkForceFront3: 0,
    indirectWorkForceFront4: 0,
    indirectWorkForceFront5: 0,
    indirectWorkForceFront6: 0,
    indirectWorkForceFront7: 0,
  }

  const [indirectDotationWorkForce, setIndirectDotationWorkForce] = useState(initialState)
  const [indirectDotationWorkForceList, setIndirectDotationWorkForceList] = useState([])
  const [indirectDotationTotals, setIndirectDotationTotals] = useState(
    indirectDotationTotalsInitialState,
  )

  const {
    storeIndirectDotationWorkForceData,
    removeIndirectDotationWorkForce,
    indirectDotationWorkForceList: indirectDotationWorkForceListContext,
  } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    switch (e.target.id) {
      case 'indirectWorkForce':
        setIndirectDotationWorkForce({
          ...indirectDotationWorkForce,
          indirectWorkForce: e.target.value,
        })
        break
      case 'indirectWorkForceFront1':
        setIndirectDotationWorkForce({
          ...indirectDotationWorkForce,
          indirectWorkForceFront1: e.target.value,
        })
        break
      case 'indirectWorkForceFront2':
        setIndirectDotationWorkForce({
          ...indirectDotationWorkForce,
          indirectWorkForceFront2: e.target.value,
        })
        break
      case 'indirectWorkForceFront3':
        setIndirectDotationWorkForce({
          ...indirectDotationWorkForce,
          indirectWorkForceFront3: e.target.value,
        })
        break
      case 'indirectWorkForceFront4':
        setIndirectDotationWorkForce({
          ...indirectDotationWorkForce,
          indirectWorkForceFront4: e.target.value,
        })
        break
      case 'indirectWorkForceFront5':
        setIndirectDotationWorkForce({
          ...indirectDotationWorkForce,
          indirectWorkForceFront5: e.target.value,
        })
        break
      case 'indirectWorkForceFront6':
        setIndirectDotationWorkForce({
          ...indirectDotationWorkForce,
          indirectWorkForceFront6: e.target.value,
        })
        break
      case 'indirectWorkForceFront7':
        setIndirectDotationWorkForce({
          ...indirectDotationWorkForce,
          indirectWorkForceFront7: e.target.value,
        })
        break
      case 'indirectDotationWorkForceObservation':
        setIndirectDotationWorkForce({
          ...indirectDotationWorkForce,
          indirectDotationWorkForceObservation: e.target.value,
        })
        break
      default:
        break
    }
  }

  const registerIndirectDotationWorkForce = () => {
    const indirectDotationWorkForceInitialState = {
      id: uuidv4(),
      indirectWorkForce: indirectDotationWorkForce.indirectWorkForce,
      indirectDotationWorkForceObservation:
        indirectDotationWorkForce.indirectDotationWorkForceObservation,
      actions: {
        indirectWorkForceFront1: indirectDotationWorkForce.indirectWorkForceFront1,
        indirectWorkForceFront2: indirectDotationWorkForce.indirectWorkForceFront2,
        indirectWorkForceFront3: indirectDotationWorkForce.indirectWorkForceFront3,
        indirectWorkForceFront4: indirectDotationWorkForce.indirectWorkForceFront4,
        indirectWorkForceFront5: indirectDotationWorkForce.indirectWorkForceFront5,
        indirectWorkForceFront6: indirectDotationWorkForce.indirectWorkForceFront6,
        indirectWorkForceFront7: indirectDotationWorkForce.indirectWorkForceFront7,
      },
    }
    setIndirectDotationWorkForce(initialState) // Clear the object
    setIndirectDotationWorkForceList([
      ...indirectDotationWorkForceList,
      indirectDotationWorkForceInitialState,
    ])
  }

  const deleteIndirectDotationWorkForce = (id) => {
    const newData = indirectDotationWorkForceList.filter((item) => item.id !== id)
    setIndirectDotationWorkForceList(newData)

    removeIndirectDotationWorkForce(id)
  }

  useEffect(() => {
    storeIndirectDotationWorkForceData(indirectDotationWorkForceList)
  }, [indirectDotationWorkForceList])

  useEffect(() => {
    let indirectDotationTotalsCounter = {
      indirectWorkForceFront1: 0,
      indirectWorkForceFront2: 0,
      indirectWorkForceFront3: 0,
      indirectWorkForceFront4: 0,
      indirectWorkForceFront5: 0,
      indirectWorkForceFront6: 0,
      indirectWorkForceFront7: 0,
    }

    for (let data of indirectDotationWorkForceListContext) {
      indirectDotationTotalsCounter = {
        indirectWorkForceFront1:
          Number(indirectDotationTotalsCounter.indirectWorkForceFront1) +
          Number(data.actions.indirectWorkForceFront1 ?? 0),
        indirectWorkForceFront2:
          Number(indirectDotationTotalsCounter.indirectWorkForceFront2) +
          Number(data.actions.indirectWorkForceFront2 ?? 0),
        indirectWorkForceFront3:
          Number(indirectDotationTotalsCounter.indirectWorkForceFront3) +
          Number(data.actions.indirectWorkForceFront3 ?? 0),
        indirectWorkForceFront4:
          Number(indirectDotationTotalsCounter.indirectWorkForceFront4) +
          Number(data.actions.indirectWorkForceFront4 ?? 0),
        indirectWorkForceFront5:
          Number(indirectDotationTotalsCounter.indirectWorkForceFront5) +
          Number(data.actions.indirectWorkForceFront5 ?? 0),
        indirectWorkForceFront6:
          Number(indirectDotationTotalsCounter.indirectWorkForceFront6) +
          Number(data.actions.indirectWorkForceFront6 ?? 0),
        indirectWorkForceFront7:
          Number(indirectDotationTotalsCounter.indirectWorkForceFront7) +
          Number(data.actions.indirectWorkForceFront7 ?? 0),
      }
    }
    setIndirectDotationTotals(indirectDotationTotalsCounter)
  }, [indirectDotationWorkForceListContext])

  return (
    <div className="work-force-report">
      <CFormSelect
        aria-label="Default select example"
        id="indirectWorkForce"
        onChange={(e) => {
          onChangeData(e)
        }}
      >
        <option>Seleccione</option>
        <option value="Administrador_de_contrato">Administrador de contrato</option>
        <option value="Jefe_de_Oficina_Técnica">Jefe de Oficina Técnica</option>
        <option value="Jefe_de_Terreno">Jefe de Terreno</option>
        <option value="Jefe_de_Calidad">Jefe de Calidad</option>
        <option value="Jefe_HSEC">Jefe HSEC</option>
        <option value="Ingeniero_Costos">Ingeniero Costos</option>
        <option value="Ingeniero_Programación_y_Control">Ingeniero Programación y Control</option>
        <option value="Encargado_Control_Documentos">Encargado Control Documentos</option>
        <option value="Asistente_Oficina_Técnica">Asistente Oficina Técnica</option>
        <option value="Asesor_HSEC">Asesor HSEC</option>
        <option value="Topógrafo">Topógrafo</option>
        <option value="Alarife">Alarife</option>
        <option value="Supervisor_Logística">Supervisor Logística</option>
        <option value="Supervisor_Bodega">Supervisor Bodega</option>
        <option value="Bodeguero">Bodeguero</option>
        <option value="Jefe_de_Área">Jefe de Área</option>
        <option value="Supervisor_Civil_v_Estructura">Supervisor Civil v Estructura</option>
        <option value="Supervisor_Mecánico_y_Piping">Supervisor Mecánico y Piping</option>
        <option value="Supervisor_Elétrico">Supervisor Elétrico</option>
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
                id="indirectWorkForceFront1"
                value={indirectDotationWorkForce.indirectWorkForceFront1 || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="indirectWorkForceFront2"
                value={indirectDotationWorkForce.indirectWorkForceFront2 || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="indirectWorkForceFront3"
                value={indirectDotationWorkForce.indirectWorkForceFront3 || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="indirectWorkForceFront4"
                value={indirectDotationWorkForce.indirectWorkForceFront4 || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="indirectWorkForceFront5"
                value={indirectDotationWorkForce.indirectWorkForceFront5 || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="indirectWorkForceFront6"
                value={indirectDotationWorkForce.indirectWorkForceFront6 || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="indirectWorkForceFront7"
                value={indirectDotationWorkForce.indirectWorkForceFront7 || ''}
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
          registerIndirectDotationWorkForce()
        }}
      >
        Registrar
      </CButton>

      {indirectDotationWorkForceListContext.length > 0 &&
        indirectDotationWorkForceListContext[0].indirectWorkForce && (
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
              {indirectDotationWorkForceListContext.map((item, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{item.indirectWorkForce}</CTableDataCell>
                    <CTableDataCell>{item.actions.indirectWorkForceFront1 ?? 0}</CTableDataCell>
                    <CTableDataCell>{item.actions.indirectWorkForceFront2 ?? 0}</CTableDataCell>
                    <CTableDataCell>{item.actions.indirectWorkForceFront3 ?? 0}</CTableDataCell>
                    <CTableDataCell>{item.actions.indirectWorkForceFront4 ?? 0}</CTableDataCell>
                    <CTableDataCell>{item.actions.indirectWorkForceFront5 ?? 0}</CTableDataCell>
                    <CTableDataCell>{item.actions.indirectWorkForceFront6 ?? 0}</CTableDataCell>
                    <CTableDataCell>{item.actions.indirectWorkForceFront7 ?? 0}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        className="btn-project-action"
                        onClick={() => {
                          deleteIndirectDotationWorkForce(item.id)
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
                <CTableDataCell>{indirectDotationTotals.indirectWorkForceFront1}</CTableDataCell>
                <CTableDataCell>{indirectDotationTotals.indirectWorkForceFront2}</CTableDataCell>
                <CTableDataCell>{indirectDotationTotals.indirectWorkForceFront3}</CTableDataCell>
                <CTableDataCell>{indirectDotationTotals.indirectWorkForceFront4}</CTableDataCell>
                <CTableDataCell>{indirectDotationTotals.indirectWorkForceFront5}</CTableDataCell>
                <CTableDataCell>{indirectDotationTotals.indirectWorkForceFront6}</CTableDataCell>
                <CTableDataCell>{indirectDotationTotals.indirectWorkForceFront7}</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        )}

      <CFormTextarea
        id="indirectDotationWorkForceObservation"
        placeholder="Deja un comentario / observación"
        onChange={(e) => {
          onChangeData(e)
        }}
      ></CFormTextarea>
    </div>
  )
}

export default IndirectDotationWorkForce

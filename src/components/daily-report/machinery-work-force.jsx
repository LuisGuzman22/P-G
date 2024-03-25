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

const MachineryWorkForce = () => {
  const initialState = {
    machineryWorkForce: undefined,
    machineryWorkForceObservation: undefined,
    machineryWorkForceFront1: undefined,
    machineryWorkForceFront2: undefined,
    machineryWorkForceFront3: undefined,
    machineryWorkForceFront4: undefined,
    machineryWorkForceFront5: undefined,
    machineryWorkForceFront6: undefined,
    machineryWorkForceFront7: undefined,
  }

  const [machineryWorkForce, setMachineryWorkForce] = useState(initialState)
  const [machineryWorkForceList, setMachineryWorkForceList] = useState([])

  const {
    storeMachineryWorkForce,
    removeMachineryWorkForce,
    machineryWorkForceList: machineryWorkForceListContext,
  } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    if (e.target.id === 'machineryWorkForce') {
      setMachineryWorkForce(initialState) // Clear the object
      setMachineryWorkForce({ ...machineryWorkForce, machineryWorkForce: e.target.value })
    }
    if (validate(e.target.value)) {
      setMachineryWorkForce({ ...machineryWorkForce, [e.target.id]: e.target.value })
    }
  }

  const registerMachinerynWorkForce = () => {
    const machineryWorkForceInitialState = {
      id: uuidv4(),
      machineryWorkForce: machineryWorkForce.machineryWorkForce,
      machineryWorkForcebservation: machineryWorkForce.machineryWorkForceObservation,
      actions: {
        machineryWorkForceFront1: machineryWorkForce.machineryWorkForceFront1,
        machineryWorkForceFront2: machineryWorkForce.machineryWorkForceFront2,
        machineryWorkForceFront3: machineryWorkForce.machineryWorkForceFront3,
        machineryWorkForceFront4: machineryWorkForce.machineryWorkForceFront4,
        machineryWorkForceFront5: machineryWorkForce.machineryWorkForceFront5,
        machineryWorkForceFront6: machineryWorkForce.machineryWorkForceFront6,
        machineryWorkForceFront7: machineryWorkForce.machineryWorkForceFront7,
      },
    }
    setMachineryWorkForce(initialState) // Clear the object
    setMachineryWorkForceList([...machineryWorkForceList, machineryWorkForceInitialState])
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
      <CFormSelect
        aria-label="Default select example"
        id="machineryWorkForce"
        onChange={(e) => {
          onChangeData(e)
        }}
      >
        <option>Seleccione</option>
        <option value="maquina_1">Maquina 1</option>
        <option value="maquina_2">Maquina 2</option>
        <option value="maquina_3">Maquina 3</option>
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
                id="machineryWorkForceFront1"
                value={machineryWorkForce.machineryWorkForceFront1 || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="machineryWorkForceFront2"
                value={machineryWorkForce.machineryWorkForceFront2 || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="machineryWorkForceFront3"
                value={machineryWorkForce.machineryWorkForceFront3 || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="machineryWorkForceFront4"
                value={machineryWorkForce.machineryWorkForceFront4 || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="machineryWorkForceFront5"
                value={machineryWorkForce.machineryWorkForceFront5 || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="machineryWorkForceFront6"
                value={machineryWorkForce.machineryWorkForceFront6 || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="machineryWorkForceFront7"
                value={machineryWorkForce.machineryWorkForceFront7 || ''}
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
          registerMachinerynWorkForce()
        }}
      >
        Registrar
      </CButton>

      {machineryWorkForceListContext.length > 0 &&
        machineryWorkForceListContext[0].machineryWorkForce && (
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
              {machineryWorkForceListContext.map((item, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{item.machineryWorkForce}</CTableDataCell>
                    <CTableDataCell>{item.actions.machineryWorkForceFront1}</CTableDataCell>
                    <CTableDataCell>{item.actions.machineryWorkForceFront2}</CTableDataCell>
                    <CTableDataCell>{item.actions.machineryWorkForceFront3}</CTableDataCell>
                    <CTableDataCell>{item.actions.machineryWorkForceFront4}</CTableDataCell>
                    <CTableDataCell>{item.actions.machineryWorkForceFront5}</CTableDataCell>
                    <CTableDataCell>{item.actions.machineryWorkForceFront6}</CTableDataCell>
                    <CTableDataCell>{item.actions.machineryWorkForceFront7}</CTableDataCell>
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
        )}

      <CFormTextarea
        id="machineryWorkForceObservation"
        placeholder="Deja un comentario / observación"
      ></CFormTextarea>
    </div>
  )
}

export default MachineryWorkForce

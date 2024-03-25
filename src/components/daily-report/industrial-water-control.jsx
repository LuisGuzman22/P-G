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

const IndustrialWaterControl = () => {
  const initialState = {
    aljibe: undefined,
    aljibeCachimbaName: undefined,
    aljibeQuantityTurns: undefined,
    aljibeM3: undefined,
  }

  const aljibeTotalsInitialState = {
    aljibeCachimbaName: 0,
    aljibeQuantityTurns: 0,
    aljibeM3: 0,
  }

  const [aljibe, setAlgibe] = useState(initialState)
  const [aljibeList, setAlgibeList] = useState([])
  const [aljibeTotals, setAlgibeTotals] = useState(aljibeTotalsInitialState)
  const {
    storealjibe,
    removealjibe,
    aljibeList: aljibeListContext,
  } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    if (e.target.id === 'aljibe') {
      setAlgibe(initialState) // Clear the object
      setAlgibe({ [e.target.id]: e.target.value })
    }
    if (validate(e.target.value)) {
      setAlgibe({ ...aljibe, [e.target.id]: e.target.value })
    }
  }

  const registeraljibe = () => {
    const aljibeInitialState = {
      id: uuidv4(),
      aljibe: aljibe.aljibe,
      actions: {
        aljibeCachimbaName: aljibe.aljibeCachimbaName,
        aljibeQuantityTurns: aljibe.aljibeQuantityTurns,
        aljibeM3: aljibe.aljibeM3,
      },
    }
    setAlgibe(initialState) // Clear the object
    setAlgibeList([...aljibeList, aljibeInitialState])
  }

  const deletealjibe = (id) => {
    const newData = aljibeList.filter((item) => item.id !== id)
    setAlgibeList(newData)
    removealjibe(id)
  }

  useEffect(() => {
    storealjibe(aljibeList)
  }, [aljibeList])

  useEffect(() => {
    let aljibeTotalsCounter = {
      aljibeCachimbaName: 0,
      aljibeQuantityTurns: 0,
      aljibeM3: 0,
    }

    for (let data of aljibeListContext) {
      aljibeTotalsCounter = {
        aljibeCachimbaName:
          Number(aljibeTotalsCounter.aljibeCachimbaName) +
          Number(data.actions.aljibeCachimbaName ?? 0),
        aljibeQuantityTurns:
          Number(aljibeTotalsCounter.aljibeQuantityTurns) +
          Number(data.actions.aljibeQuantityTurns ?? 0),
        aljibeM3: Number(aljibeTotalsCounter.aljibeM3) + Number(data.actions.aljibeM3 ?? 0),
      }
    }
    setAlgibeTotals(aljibeTotalsCounter)
  }, [aljibeListContext])

  return (
    <div className="work-force-report">
      <CFormSelect
        aria-label="Default select example"
        id="aljibe"
        value={aljibe.aljibe || ''}
        onChange={(e) => {
          onChangeData(e)
        }}
      >
        <option value={0}>Seleccione</option>
        <option value="aljibe_1">Aljibe 1 + Patente</option>
        <option value="aljibe_2">Aljibe 2 + Patente</option>
        <option value="aljibe_3">Aljibe 3 + Patente</option>
        <option value="aljibe_4">Aljibe 4 + Patente</option>
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
                id="aljibeCachimbaName"
                value={aljibe.aljibeCachimbaName || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="aljibeQuantityTurns"
                value={aljibe.aljibeQuantityTurns || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="aljibeM3"
                value={aljibe.aljibeM3 || ''}
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
          registeraljibe()
        }}
      >
        Registrar
      </CButton>

      {aljibeListContext.length > 0 && aljibeListContext[0].aljibe && (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
              <CTableHeaderCell scope="col">N° Vehículos oferta</CTableHeaderCell>
              <CTableHeaderCell scope="col">N° Vehículos Acreditado</CTableHeaderCell>
              <CTableHeaderCell scope="col">N° Vehículos en Obra</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {aljibeListContext.map((item, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{item.aljibe}</CTableDataCell>
                  <CTableDataCell>{item.actions.aljibeCachimbaName ?? 0}</CTableDataCell>
                  <CTableDataCell>{item.actions.aljibeQuantityTurns ?? 0}</CTableDataCell>
                  <CTableDataCell>{item.actions.aljibeM3 ?? 0}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      className="btn-project-action"
                      onClick={() => {
                        deletealjibe(item.id)
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
              <CTableDataCell>{aljibeTotals.aljibeCachimbaName ?? 0}</CTableDataCell>
              <CTableDataCell>{aljibeTotals.aljibeQuantityTurns ?? 0}</CTableDataCell>
              <CTableDataCell>{aljibeTotals.aljibeM3 ?? 0}</CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      )}
    </div>
  )
}

export default IndustrialWaterControl

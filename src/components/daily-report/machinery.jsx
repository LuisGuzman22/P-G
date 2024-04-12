import { React, useEffect, useState } from 'react'
import {
  CButton,
  CFormInput,
  CRow,
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
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'

const Machinery = () => {
  const initialState = {
    machinery: undefined,
    machineryOfferedNumber: undefined,
    machineryCertifiedNumber: undefined,
    machineryWorkNumber: undefined,
  }

  const machineryTotalsInitialState = {
    machineryOfferedNumber: 0,
    machineryCertifiedNumber: 0,
    machineryWorkNumber: 0,
  }

  const { getData } = useGetCachedQueryData()
  const basicQuery = getData('basics')

  const [machinery, setMachinery] = useState(initialState)
  const [machineryList, setMachineryList] = useState([])
  const [machineryTotals, setMachineryTotals] = useState(machineryTotalsInitialState)

  const {
    storeMachinery,
    removeMachinery,
    machineryList: machineryListContext,
  } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    if (e.target.id === 'machinery') {
      setMachinery(initialState) // Clear the object
      setMachinery({ [e.target.id]: e.target.value })
    }
    if (validate(e.target.value)) {
      setMachinery({ ...machinery, [e.target.id]: e.target.value })
    }
  }

  const registerMachinery = () => {
    const machineryInitialState = {
      id: uuidv4(),
      machinery: machinery.machinery,
      actions: {
        machineryOfferedNumber: machinery.machineryOfferedNumber,
        machineryCertifiedNumber: machinery.machineryCertifiedNumber,
        machineryWorkNumber: machinery.machineryWorkNumber,
      },
    }
    setMachinery(initialState) // Clear the object
    setMachineryList([...machineryList, machineryInitialState])
  }

  const deleteMachinery = (id) => {
    const newData = machineryList.filter((item) => item.id !== id)
    setMachineryList(newData)

    removeMachinery(id)
  }

  useEffect(() => {
    storeMachinery(machineryList)
  }, [machineryList])

  useEffect(() => {
    let machineryTotalsCounter = {
      machineryOfferedNumber: 0,
      machineryCertifiedNumber: 0,
      machineryWorkNumber: 0,
    }

    for (let data of machineryListContext) {
      machineryTotalsCounter = {
        machineryOfferedNumber:
          Number(machineryTotalsCounter.machineryOfferedNumber) +
          Number(data.actions.machineryOfferedNumber ?? 0),
        machineryCertifiedNumber:
          Number(machineryTotalsCounter.machineryCertifiedNumber) +
          Number(data.actions.machineryCertifiedNumber ?? 0),
        machineryWorkNumber:
          Number(machineryTotalsCounter.machineryWorkNumber) +
          Number(data.actions.machineryWorkNumber ?? 0),
      }
    }
    setMachineryTotals(machineryTotalsCounter)
  }, [machineryListContext])

  return (
    <div className="work-force-report">
      <CFormSelect
        aria-label="Default select example"
        id="machinery"
        value={machinery.machinery ?? 0}
        onChange={(e) => {
          onChangeData(e)
        }}
      >
        <option value={0}>Seleccione</option>
        {basicQuery.machinery.map((machineryCached) => {
          return (
            <option key={machineryCached.id} value={machineryCached.id}>
              {machineryCached.name}
            </option>
          )
        })}
      </CFormSelect>

      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">N° maq oferta</CTableHeaderCell>
            <CTableHeaderCell scope="col">N° maq Acreditado</CTableHeaderCell>
            <CTableHeaderCell scope="col">N° maq en Obra</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="machineryOfferedNumber"
                value={machinery.machineryOfferedNumber || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="machineryCertifiedNumber"
                value={machinery.machineryCertifiedNumber || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="machineryWorkNumber"
                value={machinery.machineryWorkNumber || ''}
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
          registerMachinery()
        }}
      >
        Registrar
      </CButton>

      {machineryListContext.length > 0 && machineryListContext[0].machinery && (
        <CTable className="resume-table">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
              <CTableHeaderCell scope="col">N° maq oferta</CTableHeaderCell>
              <CTableHeaderCell scope="col">N° maq Acreditado</CTableHeaderCell>
              <CTableHeaderCell scope="col">N° maq en Obra</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {machineryListContext.map((item, index) => {
              const charge = basicQuery.machinery.find((machinery) => {
                return machinery.id == item.machinery
              })
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{charge.name}</CTableDataCell>
                  <CTableDataCell>{item.actions.machineryOfferedNumber ?? 0}</CTableDataCell>
                  <CTableDataCell>{item.actions.machineryCertifiedNumber ?? 0}</CTableDataCell>
                  <CTableDataCell>{item.actions.machineryWorkNumber ?? 0}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      className="btn-project-action"
                      onClick={() => {
                        deleteMachinery(item.id)
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
              <CTableDataCell>{machineryTotals.machineryOfferedNumber}</CTableDataCell>
              <CTableDataCell>{machineryTotals.machineryCertifiedNumber}</CTableDataCell>
              <CTableDataCell>{machineryTotals.machineryWorkNumber}</CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      )}
    </div>
  )
}

export default Machinery

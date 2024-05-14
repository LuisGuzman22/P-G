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
  CToast,
  CToastBody,
} from '@coreui/react'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'
import { v4 as uuidv4 } from 'uuid'
import { validate } from 'src/utils/validate'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import { useLocation } from 'react-router-dom'

const Machinery = () => {
  const currentLocation = useLocation().pathname
  const isViewMode = currentLocation.includes('/view')
  const isCreatingMode = currentLocation === '/informe-diario'

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
  const [error, setError] = useState(false)

  const {
    storeMachinery,
    removeMachinery,
    machineryList: machineryListContext,
  } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    setError(false)

    if (e.target.id === 'machinery') {
      setMachinery(initialState) // Clear the object
      setMachinery({ [e.target.id]: e.target.value })
    }
    if (validate(e.target.value)) {
      setMachinery({ ...machinery, [e.target.id]: e.target.value })
    }
  }

  const registerMachinery = () => {
    if (!machinery.machinery) {
      setError(true)
    } else {
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
      setMachineryList([...machineryListContext, machineryInitialState])
    }
  }

  const deleteMachinery = (id) => {
    const newData = machineryListContext.filter((item) => item.id !== id)
    setMachineryList(newData)

    removeMachinery(id)
  }

  const editMachinery = (id) => {
    const selectedMachinery = machineryListContext.find((item) => item.id === id)
    setMachinery({
      machinery: selectedMachinery.machinery,
      machineryOfferedNumber: selectedMachinery.actions.machineryOfferedNumber,
      machineryCertifiedNumber: selectedMachinery.actions.machineryCertifiedNumber,
      machineryWorkNumber: selectedMachinery.actions.machineryWorkNumber,
    })
    deleteMachinery(id)
  }

  useEffect(() => {
    if (!isViewMode) storeMachinery(machineryList)
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
      {!isViewMode && (
        <>
          {' '}
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
                <CToastBody>Debe seleccionar la maquinaria para generar el registro</CToastBody>
              </div>
            </CToast>
          )}
          <CFormSelect
            aria-label="Default select example"
            id="machinery"
            value={machinery.machinery ?? 0}
            label="Maquinaria"
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
        </>
      )}

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
                    {isCreatingMode && (
                      <CButton
                        className="btn-project-action"
                        onClick={() => {
                          deleteMachinery(item.id)
                        }}
                      >
                        eliminar
                      </CButton>
                    )}
                  </CTableDataCell>
                  <CTableDataCell>
                    {isCreatingMode && (
                      <CButton
                        className="btn-project-action"
                        onClick={() => {
                          editMachinery(item.id)
                        }}
                      >
                        Editar
                      </CButton>
                    )}
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

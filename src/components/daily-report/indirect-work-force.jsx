import { React, useState, useEffect } from 'react'
import {
  CFormInput,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableBody,
  CTableDataCell,
  CFormSelect,
  CButton,
  CToast,
  CToastBody,
} from '@coreui/react'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'
import { v4 as uuidv4 } from 'uuid'
import { validate } from 'src/utils/validate'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import { useLocation } from 'react-router-dom'
import Select from 'react-select'

const IndirectWorkForce = () => {
  const currentLocation = useLocation().pathname
  const isViewMode = currentLocation.includes('/view')
  const isCreatingMode = currentLocation === '/informe-diario'
  const isEditMode = currentLocation.includes('/edit')

  const initialState = {
    indirectWorkForce: undefined,
    indirectWorkForceOfferedNumber: undefined,
    indirectWorkForceContractedNumber: undefined,
    indirectWorkForceCertifiedNumber: undefined,
    indirectWorkForceBreakNumber: undefined,
    indirectWorkForceWorkNumber: undefined,
    indirectWorkForceHHNumber: undefined,
  }
  const { getData } = useGetCachedQueryData()
  const basicQuery = getData('basics')

  const [indirectWorkForce, setIndirectWorkForce] = useState(initialState)
  const [indirectWorkForceList, setIndirectWorkForceList] = useState([])
  const [error, setError] = useState(false)
  const [selectedOption, setSelectedOption] = useState({ value: 0, label: 'Seleccione' })

  const [options, setOptions] = useState([])

  // const options = [
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' },
  // ]

  const {
    storeIndirectWorkForceData,
    removeIndirectWorkForce,
    indirectWorkForceList: indirectWorkForceListContext,
  } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    setError(false)
    // if (e.target.id === 'indirectWorkForce') {
    //   setIndirectWorkForce(initialState) // Clear the object
    //   setIndirectWorkForce({ [e.target.id]: e.target.value })
    // }
    if (validate(e.target.value)) {
      setIndirectWorkForce({ ...indirectWorkForce, [e.target.id]: e.target.value })
    }
  }

  const onChangeIndirectWorkForceCharge = (e) => {
    setSelectedOption(e)
    setIndirectWorkForce(initialState) // Clear the object
    setIndirectWorkForce({ indirectWorkForce: e.value })
  }

  // useEffect(() => {
  //   if (isCreatingMode) setIndirectWorkForceList(indirectWorkForceListContext)
  // }, [indirectWorkForceListContext])

  useEffect(() => {
    const data = []
    if (basicQuery && basicQuery.indirectPersonal) {
      basicQuery.indirectPersonal.map((indirectPersonalCached) => {
        //  return (
        //  <option key={indirectPersonalCached.id} value={indirectPersonalCached.id}>
        //    {indirectPersonalCached.name}
        //  </option>
        //  )
        data.push({ value: indirectPersonalCached.id, label: indirectPersonalCached.name })
      })
      setOptions(data)
    }
  }, [basicQuery.indirectPersonal])

  const registerIndirectWorkForce = () => {
    if (!indirectWorkForce.indirectWorkForce) {
      setError(true)
    } else {
      const indirectWorkForceInitialState = {
        id: uuidv4(),
        indirectWorkForce: indirectWorkForce.indirectWorkForce,
        offeredNumber: indirectWorkForce.contractAdministratorOfferedNumber,
        contractedNumber: indirectWorkForce.contractAdministratorContractedNumber,
        certified: indirectWorkForce.contractAdministratorCertified,
        breakNumber: indirectWorkForce.contractAdministratorBreakNumber,
        workNumber: indirectWorkForce.contractAdministratorWorkNumber,
        hh: indirectWorkForce.contractAdministratorHHNumber,
      }
      setIndirectWorkForce(initialState) // Clear the object
      setSelectedOption({ value: 0, label: 'Seleccione' })
      setIndirectWorkForceList([
        // ...indirectWorkForceList,
        ...indirectWorkForceListContext,
        indirectWorkForceInitialState,
      ])
    }
  }

  useEffect(() => {
    if (!isViewMode) storeIndirectWorkForceData(indirectWorkForceList)
  }, [indirectWorkForceList])

  const deleteIndirectWorkForce = (id) => {
    const newData = indirectWorkForceListContext.filter((item) => item.id !== id)
    setIndirectWorkForceList(newData)

    removeIndirectWorkForce(id)
  }

  const editIndirectWorkForce = (id) => {
    const selectedIndirectWorkForce = indirectWorkForceListContext.find((item) => item.id === id)
    const charge = basicQuery.indirectPersonal.find((personal) => {
      return personal.id == selectedIndirectWorkForce.indirectWorkForce
    })
    setIndirectWorkForce({
      indirectWorkForce: selectedIndirectWorkForce.indirectWorkForce,
      contractAdministratorOfferedNumber: selectedIndirectWorkForce.offeredNumber,
      contractAdministratorContractedNumber: selectedIndirectWorkForce.contractedNumber,
      contractAdministratorCertified: selectedIndirectWorkForce.certified,
      contractAdministratorBreakNumber: selectedIndirectWorkForce.breakNumber,
      contractAdministratorWorkNumber: selectedIndirectWorkForce.workNumber,
      contractAdministratorHHNumber: selectedIndirectWorkForce.hh,
    })

    setSelectedOption({
      value: charge.id,
      label: charge.name,
    })
    deleteIndirectWorkForce(id)
  }

  return (
    <div className="work-force-report">
      {!isViewMode && (
        <div className="form-group">
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
                <CToastBody>Debe seleccionar el cargo para generar el registro</CToastBody>
              </div>
            </CToast>
          )}
          {/* <CFormSelect
            aria-label="Default select example"
            id="indirectWorkForce"
            label="Cargo"
            value={indirectWorkForce.indirectWorkForce || ''}
            onChange={(e) => {
              onChangeData(e)
            }}
          >
            <option value={0}>Seleccione</option>
            {basicQuery.indirectPersonal.map((indirectPersonalCached) => {
              return (
                <option key={indirectPersonalCached.id} value={indirectPersonalCached.id}>
                  {indirectPersonalCached.name}
                </option>
              )
            })}
          </CFormSelect> */}
          <Select
            id="indirectWorkForce"
            label="Cargo"
            value={selectedOption}
            // value={indirectWorkForce.indirectWorkForce || ''}
            onChange={(e) => {
              onChangeIndirectWorkForceCharge(e)
            }}
            options={options}
            styles={{
              option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
                ...styles,
                color: '#000000',
              }),
            }}
          />

          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">N° Ofertado</CTableHeaderCell>
                <CTableHeaderCell scope="col">N° Contratados</CTableHeaderCell>
                <CTableHeaderCell scope="col">N° Acreditados</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    id="contractAdministratorOfferedNumber"
                    placeholder="N° Ofertado"
                    value={indirectWorkForce.contractAdministratorOfferedNumber || ''}
                    text=""
                    onChange={(e) => {
                      onChangeData(e)
                    }}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    id="contractAdministratorContractedNumber"
                    placeholder="N° Contratados"
                    value={indirectWorkForce.contractAdministratorContractedNumber || ''}
                    text=""
                    onChange={(e) => {
                      onChangeData(e)
                    }}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    id="contractAdministratorCertified"
                    placeholder="Acreditados"
                    value={indirectWorkForce.contractAdministratorCertified || ''}
                    text=""
                    onChange={(e) => {
                      onChangeData(e)
                    }}
                  />
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="col">N° Descanso</CTableHeaderCell>
                <CTableHeaderCell scope="col">N° Obra</CTableHeaderCell>
                <CTableHeaderCell scope="col">HH (Turno)</CTableHeaderCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    id="contractAdministratorBreakNumber"
                    placeholder="N° Descanso"
                    value={indirectWorkForce.contractAdministratorBreakNumber || ''}
                    text=""
                    onChange={(e) => {
                      onChangeData(e)
                    }}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    id="contractAdministratorWorkNumber"
                    placeholder="N° Obra"
                    value={indirectWorkForce.contractAdministratorWorkNumber || ''}
                    text=""
                    onChange={(e) => {
                      onChangeData(e)
                    }}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    id="contractAdministratorHHNumber"
                    placeholder="HH (Turno)"
                    value={indirectWorkForce.contractAdministratorHHNumber || ''}
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
              registerIndirectWorkForce()
            }}
          >
            Registrar
          </CButton>
        </div>
      )}
      {indirectWorkForceListContext.length > 0 &&
        indirectWorkForceListContext[0].indirectWorkForce && (
          <CTable className="resume-table">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Cargo</CTableHeaderCell>
                <CTableHeaderCell scope="col">N° Ofertado</CTableHeaderCell>
                <CTableHeaderCell scope="col">N° Contratados</CTableHeaderCell>
                <CTableHeaderCell scope="col">Acreditados</CTableHeaderCell>
                <CTableHeaderCell scope="col">N° Descanso</CTableHeaderCell>
                <CTableHeaderCell scope="col">N° Obra</CTableHeaderCell>
                <CTableHeaderCell scope="col">HH (Turno)</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {indirectWorkForceListContext.map((item, index) => {
                const charge = basicQuery.indirectPersonal.find((personal) => {
                  return personal.id == item.indirectWorkForce
                })
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{charge.name}</CTableDataCell>
                    <CTableDataCell>{item.offeredNumber}</CTableDataCell>
                    <CTableDataCell>{item.contractedNumber}</CTableDataCell>
                    <CTableDataCell>{item.certified}</CTableDataCell>
                    <CTableDataCell>{item.breakNumber}</CTableDataCell>
                    <CTableDataCell>{item.workNumber}</CTableDataCell>
                    <CTableDataCell>{item.hh}</CTableDataCell>
                    <CTableDataCell>
                      {(isCreatingMode || isEditMode) && (
                        <CButton
                          className="btn-project-action"
                          onClick={() => {
                            deleteIndirectWorkForce(item.id)
                          }}
                        >
                          eliminar
                        </CButton>
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      {(isCreatingMode || isEditMode) && (
                        <CButton
                          className="btn-project-action"
                          onClick={() => {
                            editIndirectWorkForce(item.id)
                          }}
                        >
                          Editar
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
        )}
    </div>
  )
}

export default IndirectWorkForce

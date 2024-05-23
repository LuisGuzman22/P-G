import React, { useEffect, useState, useContext } from 'react'
import {
  CForm,
  CFormInput,
  CRow,
  CCol,
  CFormSelect,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'
import useRegisterDailyReport from 'src/hooks/useRegisterDailyReport'
import useRegisterGeneralData from 'src/hooks/useRegisterGeneralData'
import { useLocation } from 'react-router-dom'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import { Button } from '@coreui/coreui'
import { validate } from 'src/utils/validate'
import { v4 as uuidv4 } from 'uuid'

const CompanyReport = () => {
  const currentLocation = useLocation().pathname
  const isViewMode = currentLocation.includes('/view')
  const isCreatingMode = currentLocation === '/informe-diario'

  const {
    storeCompanyData,
    storeIndirectCompanyTurn,
    company,
    removeIndirectCompanyTurn,
    indirectCompanyTurnList: indirectCompanyTurnListContext,
  } = useRegisterDailyReportCompany()
  const { registerData } = useRegisterDailyReport()
  const { getProject, getContract } = useRegisterGeneralData()

  const projectLS = JSON.parse(getProject())
  const contractLS = JSON.parse(getContract())

  const { getData } = useGetCachedQueryData()
  const basicQuery = getData('basics')

  const initialState = {
    dailyReportIndirectPersonalShift: undefined,
    dailyReportIndirectPersonalHours: undefined,
    dailyReportIndirectPersonalJourney: undefined,
  }

  const [indirectPersonalList, setIndirectPersonalList] = useState([])
  const [indirectPersonal, setIndirectPersonal] = useState(initialState)
  const [error, setError] = useState(false)

  const onChangeData = (e) => {
    storeCompanyData(e)
  }

  const onChangeIndirectPersonal = (e) => {
    if (validate(e.target.value)) {
      setIndirectPersonal({ ...indirectPersonal, [e.target.id]: e.target.value })
    }
  }

  const registerIndirectTurn = () => {
    if (
      !indirectPersonal.dailyReportIndirectPersonalShift ||
      !indirectPersonal.dailyReportIndirectPersonalHours ||
      !indirectPersonal.dailyReportIndirectPersonalJourney
    ) {
      setError(true)
    } else {
      const indirectPersonalInitialState = {
        id: uuidv4(),
        dailyReportIndirectPersonalShift: indirectPersonal.dailyReportIndirectPersonalShift,
        dailyReportIndirectPersonalHours: indirectPersonal.dailyReportIndirectPersonalHours,
        dailyReportIndirectPersonalJourney: indirectPersonal.dailyReportIndirectPersonalJourney,
      }
      setIndirectPersonal(initialState) // Clear the object
      setIndirectPersonalList([...indirectCompanyTurnListContext, indirectPersonalInitialState])
    }
  }

  useEffect(() => {
    if (!isViewMode) storeIndirectCompanyTurn(indirectPersonalList)
  }, [indirectPersonalList])

  const deleteIndirectCompanyTurn = (id) => {
    const newData = indirectCompanyTurnListContext.filter((item) => item.id !== id)
    setIndirectPersonalList(newData)
    removeIndirectCompanyTurn(id)
  }

  const editIndirectCompanyTurn = (id) => {
    const newData = indirectCompanyTurnListContext.find((item) => item.id === id)
    setIndirectPersonal({
      dailyReportIndirectPersonalShift: newData.dailyReportIndirectPersonalShift,
      dailyReportIndirectPersonalHours: newData.dailyReportIndirectPersonalHours,
      dailyReportIndirectPersonalJourney: newData.dailyReportIndirectPersonalJourney,
    })
    deleteIndirectCompanyTurn(id)
  }

  return (
    <div className="company-report">
      <CForm>
        <CRow>
          <CCol sm={4}>
            <CFormInput
              type="date"
              id="dailyReportDate"
              label="Fecha"
              value={company.dailyReportDate || ''}
              disabled={isViewMode}
              placeholder="Fecha"
              text=""
              onChange={(e) => {
                onChangeData(e)
              }}
            />
          </CCol>
          <CCol sm={4}>
            <CFormInput
              type="text"
              id="dailyReportNumber"
              label="Informe diario N°"
              placeholder="Informe diario N°"
              text=""
              disabled={isViewMode}
              value={company.dailyReportNumber || ''}
              onChange={(e) => {
                onChangeData(e)
              }}
            />
          </CCol>
          <CCol sm={4}>
            <CFormInput
              type="text"
              id="dailyReportContratistName"
              label="Nombre de contratista"
              placeholder="Detalle"
              value={company.dailyReportContratistName || ''}
              text=""
              disabled={isViewMode}
              onChange={(e) => {
                onChangeData(e)
              }}
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={4}>
            <CFormInput
              type="text"
              id="dailyReportContratistNumber"
              label="N° de contrato"
              placeholder="N° de contrato"
              disabled
              value={company.dailyReportContratistNumber || contractLS.code}
              text=""
              onChange={(e) => {
                onChangeData(e)
              }}
            />
          </CCol>
          <CCol sm={4}>
            <CFormInput
              type="text"
              id="dailyReportContractName"
              label="Nombre de contrato"
              placeholder="Nombre de contrato"
              value={company.dailyReportContractName || contractLS.name}
              disabled
              text=""
              onChange={(e) => {
                onChangeData(e)
              }}
            />
          </CCol>
          <CCol sm={4}>
            <CFormInput
              type="text"
              id="dailyReportContractManagerName"
              label="Administrador de contrato"
              placeholder="Administrador de contrato"
              value={company.dailyReportContractManagerName || projectLS.manager}
              text=""
              disabled
              onChange={(e) => {
                onChangeData(e)
              }}
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={4}>
            <CFormSelect
              aria-label="Clima"
              id="dailyReportWeather"
              value={company.dailyReportWeather || '0'}
              label="Clima"
              disabled={isViewMode}
              onChange={(e) => {
                onChangeData(e)
              }}
            >
              <option value={'0'}>Seleccione</option>
              {basicQuery?.weather.map((weather) => (
                <option key={weather.id} value={weather.id}>
                  {weather.name}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={4}>
            <CFormSelect
              aria-label="Turno (Personal directo)"
              id="dailyReportDirectPersonalShift"
              label="Turno (Personal directo)"
              value={company.dailyReportDirectPersonalShift || '0'}
              disabled={isViewMode}
              onChange={(e) => {
                onChangeData(e)
              }}
            >
              <option value={'0'}>Seleccione</option>
              {basicQuery?.direct_staff_shift.map((direct_staf) => (
                <option key={direct_staf.id} value={direct_staf.id}>
                  {direct_staf.name}
                </option>
              ))}
            </CFormSelect>
          </CCol>
          <CCol sm={4}>
            <CFormInput
              type="text"
              id="dailyReportDirectPersonalHours"
              label="Horas turno (Personal directo)"
              placeholder="Horas turno (Personal directo)"
              value={company.dailyReportDirectPersonalHours || ''}
              text=""
              disabled={isViewMode}
              onChange={(e) => {
                onChangeData(e)
              }}
            />
          </CCol>
          <CCol sm={4}>
            <CFormSelect
              aria-label="Jornada (Personal directo)"
              id="dailyReportDirectPersonalJourney"
              label="Jornada (Personal directo)"
              value={company.dailyReportDirectPersonalJourney || '0'}
              disabled={isViewMode}
              onChange={(e) => {
                onChangeData(e)
              }}
            >
              <option value={'0'}>Seleccione</option>
              {basicQuery?.shifts.map((shift) => (
                <option key={shift.id} value={shift.id}>
                  {shift.name}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={4}>
            <CFormSelect
              aria-label="Turno (Personal indirecto)"
              id="dailyReportIndirectPersonalShift"
              label="Turno (Personal indirecto)"
              value={indirectPersonal.dailyReportIndirectPersonalShift || '0'}
              disabled={isViewMode}
              onChange={(e) => {
                onChangeIndirectPersonal(e)
              }}
            >
              <option value={'0'}>Seleccione</option>
              {basicQuery?.indirect_staff_shift.map((indirect_staf) => (
                <option key={indirect_staf.id} value={indirect_staf.id}>
                  {indirect_staf.name}
                </option>
              ))}
            </CFormSelect>
          </CCol>
          <CCol sm={4}>
            <CFormInput
              type="text"
              id="dailyReportIndirectPersonalHours"
              label="Horas turno (Personal indirecto)"
              placeholder="Horas turno (Personal indirecto)"
              value={indirectPersonal.dailyReportIndirectPersonalHours || ''}
              text=""
              disabled={isViewMode}
              onChange={(e) => {
                onChangeIndirectPersonal(e)
              }}
            />
          </CCol>
          <CCol sm={4}>
            <CFormSelect
              aria-label="Jornada (Personal indirecto)"
              id="dailyReportIndirectPersonalJourney"
              label="Jornada (Personal indirecto)"
              value={indirectPersonal.dailyReportIndirectPersonalJourney || '0'}
              disabled={isViewMode}
              onChange={(e) => {
                onChangeIndirectPersonal(e)
              }}
            >
              <option value={'0'}>Seleccione</option>
              {basicQuery?.shifts.map((shift) => (
                <option key={shift.id} value={shift.id}>
                  {shift.name}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CButton
              onClick={() => {
                registerIndirectTurn()
              }}
            >
              Registrar turno personal indirecto
            </CButton>
          </CCol>
        </CRow>
        {indirectCompanyTurnListContext &&
          indirectCompanyTurnListContext.length > 0 &&
          indirectCompanyTurnListContext[0].dailyReportIndirectPersonalShift && (
            <CTable className="resume-table">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Turno (Personal indirecto)</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Horas turno (Personal indirecto)</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Jornada (Personal indirecto)</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {indirectCompanyTurnListContext.map((item, index) => {
                  const selectedShift = basicQuery?.shifts.find(
                    (shift) => shift.id == item.dailyReportIndirectPersonalShift,
                  )

                  const selectedTurn = basicQuery?.indirect_staff_shift.find(
                    (turn) => turn.id == item.dailyReportIndirectPersonalShift,
                  )

                  return (
                    <CTableRow key={index}>
                      <CTableDataCell>{selectedTurn?.name ?? ''}</CTableDataCell>
                      <CTableDataCell>{item.dailyReportIndirectPersonalHours ?? 0}</CTableDataCell>
                      <CTableDataCell>{selectedShift?.name ?? ''}</CTableDataCell>
                      <CTableDataCell>
                        {isCreatingMode && (
                          <CButton
                            className="btn-project-action"
                            onClick={() => {
                              deleteIndirectCompanyTurn(item.id)
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
                              editIndirectCompanyTurn(item.id)
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
      </CForm>
    </div>
  )
}

export default CompanyReport

import React, { useEffect, useState, useContext } from 'react'
import { CForm, CFormInput, CRow, CCol, CFormSelect } from '@coreui/react'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'
import useRegisterDailyReport from 'src/hooks/useRegisterDailyReport'
import useRegisterGeneralData from 'src/hooks/useRegisterGeneralData'
import { useLocation } from 'react-router-dom'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'

const CompanyReport = () => {
  const currentLocation = useLocation().pathname
  const isViewMode = currentLocation.includes('/view')

  const { storeCompanyData, company } = useRegisterDailyReportCompany()
  const { registerData } = useRegisterDailyReport()
  const { getProject, getContract } = useRegisterGeneralData()

  const projectLS = JSON.parse(getProject())
  const contractLS = JSON.parse(getContract())

  const { getData } = useGetCachedQueryData()
  const basicQuery = getData('basics')

  const onChangeData = (e) => {
    storeCompanyData(e)
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
              value={company.dailyReportContractManagerName || ''}
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
              value={company.dailyReportIndirectPersonalShift || '0'}
              disabled={isViewMode}
              onChange={(e) => {
                onChangeData(e)
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
              value={company.dailyReportIndirectPersonalHours || ''}
              text=""
              disabled={isViewMode}
              onChange={(e) => {
                onChangeData(e)
              }}
            />
          </CCol>
          <CCol sm={4}>
            <CFormSelect
              aria-label="Jornada (Personal indirecto)"
              id="dailyReportIndirectPersonalJourney"
              label="Jornada (Personal indirecto)"
              value={company.dailyReportIndirectPersonalJourney || '0'}
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
      </CForm>
    </div>
  )
}

export default CompanyReport

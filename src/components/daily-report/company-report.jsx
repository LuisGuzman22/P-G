import React, { useEffect, useState, useContext } from 'react'
import { CForm, CFormInput, CRow, CCol, CFormSelect } from '@coreui/react'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'
import useRegisterDailyReport from 'src/hooks/useRegisterDailyReport'
import useRegisterGeneralData from 'src/hooks/useRegisterGeneralData'
import { useLocation } from 'react-router-dom'

const CompanyReport = () => {
  const currentLocation = useLocation().pathname
  const { storeCompanyData, company } = useRegisterDailyReportCompany()
  const { registerData } = useRegisterDailyReport()
  const { getProject, getContract } = useRegisterGeneralData()

  const projectLS = JSON.parse(getProject())
  const contractLS = JSON.parse(getContract())

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
              disabled={currentLocation.includes('/edit')}
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
              disabled={currentLocation.includes('/edit')}
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
              disabled={currentLocation.includes('/edit')}
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
              value={company.dailyReportContratistNumber || contractLS.id}
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
              disabled={currentLocation.includes('/edit')}
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
              disabled={currentLocation.includes('/edit')}
              onChange={(e) => {
                onChangeData(e)
              }}
            >
              <option value={'0'}>Seleccione</option>
              <option value="1">Calor moderado</option>
              <option value="2">Calor intenso</option>
              <option value="3">Frío moderado</option>
              <option value="4">Frío intenso</option>
              <option value="5">Lluvia débil</option>
              <option value="6">Lluvia moderada</option>
              <option value="7">Lluvia intensa</option>
              <option value="8">Viento débil</option>
              <option value="9">Viento moderado</option>
              <option value="10">Viento intenso</option>
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
              disabled={currentLocation.includes('/edit')}
              onChange={(e) => {
                onChangeData(e)
              }}
            >
              <option value={'0'}>Seleccione</option>
              <option value="14x14">14x14</option>
              <option value="7x7">7x7</option>
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
              disabled={currentLocation.includes('/edit')}
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
              disabled={currentLocation.includes('/edit')}
              onChange={(e) => {
                onChangeData(e)
              }}
            >
              <option value={'0'}>Seleccione</option>
              <option value="dia">Día</option>
              <option value="noche">Noche</option>
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
              disabled={currentLocation.includes('/edit')}
              onChange={(e) => {
                onChangeData(e)
              }}
            >
              <option value={'0'}>Seleccione</option>
              <option value="4x3">4x3</option>
              <option value="5x2">5x2</option>
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
              disabled={currentLocation.includes('/edit')}
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
              disabled={currentLocation.includes('/edit')}
              onChange={(e) => {
                onChangeData(e)
              }}
            >
              <option value={'0'}>Seleccione</option>
              <option value="dia">Día</option>
              <option value="noche">Noche</option>
            </CFormSelect>
          </CCol>
        </CRow>
      </CForm>
    </div>
  )
}

export default CompanyReport

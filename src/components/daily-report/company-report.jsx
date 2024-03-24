import React, { useEffect, useState, useContext } from 'react'
import { CForm, CFormInput, CRow, CCol, CFormSelect } from '@coreui/react'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'
import useRegisterDailyReport from 'src/hooks/useRegisterDailyReport'

const CompanyReport = () => {
  const { storeCompanyData } = useRegisterDailyReportCompany()
  const { registerData } = useRegisterDailyReport()

  const onChangeData = (e) => {
    storeCompanyData(e)
  }

  return (
    <div className="company-report">
      <h4>Empresa</h4>
      <CForm>
        <CRow>
          <CCol sm={4}>
            <CFormInput
              type="date"
              id="dailyReportDate"
              label="Fecha"
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
              text=""
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
              text=""
              onChange={(e) => {
                onChangeData(e)
              }}
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={4}>
            <CFormSelect
              aria-label="Turno (Personal directo)"
              id="dailyReportDirectPersonalShift"
              label="Turno (Personal directo)"
              onChange={(e) => {
                onChangeData(e)
              }}
            >
              <option>Seleccione</option>
              <option value="4x4">4x4</option>
              <option value="7x7">7x7</option>
            </CFormSelect>
          </CCol>
          <CCol sm={4}>
            <CFormInput
              type="text"
              id="dailyReportDirectPersonalHours"
              label="Horas turno (Personal directo)"
              placeholder="Horas turno (Personal directo)"
              text=""
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
              onChange={(e) => {
                onChangeData(e)
              }}
            >
              <option>Seleccione</option>
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
              onChange={(e) => {
                onChangeData(e)
              }}
            >
              <option>Seleccione</option>
              <option value="4x4">4x4</option>
              <option value="7x7">7x7</option>
            </CFormSelect>
          </CCol>
          <CCol sm={4}>
            <CFormInput
              type="text"
              id="dailyReportIndirectPersonalHours"
              label="Horas turno (Personal indirecto)"
              placeholder="Horas turno (Personal indirecto)"
              text=""
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
              onChange={(e) => {
                onChangeData(e)
              }}
            >
              <option>Seleccione</option>
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

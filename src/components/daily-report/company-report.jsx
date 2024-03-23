import React, { useEffect, useState, useContext } from 'react'
import { CForm, CFormInput, CRow, CCol, CButton } from '@coreui/react'
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
            <CFormInput
              type="text"
              id="dailyReportDirectPersonalShift"
              label="Turno (Personal directo)"
              placeholder="Turno (Personal directo)"
              text=""
              onChange={(e) => {
                onChangeData(e)
              }}
            />
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
            <CFormInput
              type="text"
              id="dailyReportDirectPersonalJourney"
              label="Jornada (Personal directo)"
              placeholder="Jornada (Personal directo)"
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
              id="dailyReportIndirectPersonalShift"
              label="Turno (Personal indirecto)"
              placeholder="Turno (Personal indirecto)"
              text=""
              onChange={(e) => {
                onChangeData(e)
              }}
            />
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
            <CFormInput
              type="text"
              id="dailyReportIndirectPersonalJourney"
              label="Jornada (Personal indirecto)"
              placeholder="Jornada (Personal indirecto)"
              text=""
              onChange={(e) => {
                onChangeData(e)
              }}
            />
          </CCol>
        </CRow>
      </CForm>
    </div>
  )
}

export default CompanyReport

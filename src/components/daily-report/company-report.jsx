import React, { useEffect, useState, useContext } from 'react'
import { CForm, CFormInput, CRow, CCol, CFormSelect } from '@coreui/react'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'
import useRegisterDailyReport from 'src/hooks/useRegisterDailyReport'
import useRegisterGeneralData from 'src/hooks/useRegisterGeneralData'

const CompanyReport = () => {
  const { storeCompanyData } = useRegisterDailyReportCompany()
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
              disabled
              value={contractLS.id}
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
              value={contractLS.name}
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
              aria-label="Clima"
              id="dailyReportWeather"
              label="Clima"
              onChange={(e) => {
                onChangeData(e)
              }}
            >
              <option>Seleccione</option>
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
              onChange={(e) => {
                onChangeData(e)
              }}
            >
              <option>Seleccione</option>
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

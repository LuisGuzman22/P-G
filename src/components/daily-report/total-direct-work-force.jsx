import React from 'react'
import {
  CForm,
  CFormInput,
  CRow,
  CCol,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'

const TotalDirectWorkForce = () => {
  const { storeTotalDirectWorkForce } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    storeTotalDirectWorkForce(e)
  }

  return (
    <div className="work-force-report">
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
            <CTableHeaderCell scope="col">N° Ofertado</CTableHeaderCell>
            <CTableHeaderCell scope="col">N° Contratados</CTableHeaderCell>
            <CTableHeaderCell scope="col">N° Acreditados</CTableHeaderCell>
            <CTableHeaderCell scope="col">N° Descanso</CTableHeaderCell>
            <CTableHeaderCell scope="col">N° Obra</CTableHeaderCell>
            <CTableHeaderCell scope="col">HH (Turno)</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableHeaderCell scope="row">Subtotal Directos</CTableHeaderCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="directSubtotalOfferedNumber"
                placeholder="N° Ofertado"
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="directSubtotalContractedNumber"
                placeholder="N° Contratados"
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="directSubtotalCertifiedNumber"
                placeholder="Acreditados"
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="directSubtotalBreakNumber"
                placeholder="N° Descanso"
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="directSubtotalWorkNumber"
                placeholder="N° Obra"
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="DirectSubtotalHHNumber"
                placeholder="HH (Turno)"
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">Total HH directos Acumulado Anterior</CTableHeaderCell>
            <CTableDataCell colSpan={6}>
              <CFormInput
                type="text"
                id="directPreviusAccumulated"
                placeholder="Total"
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">Total HH directos Acumulado Actual</CTableHeaderCell>
            <CTableDataCell colSpan={6}>
              <CFormInput
                type="text"
                id="directCurrentAccumulated"
                placeholder="Total"
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </div>
  )
}

export default TotalDirectWorkForce

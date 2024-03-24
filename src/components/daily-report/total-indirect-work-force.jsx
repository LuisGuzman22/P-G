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

const TotalIndirectWorkForce = () => {
  const { storeTotalIndirectWorkForce } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    storeTotalIndirectWorkForce(e)
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
            <CTableHeaderCell scope="row">Subtotal indirectos</CTableHeaderCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="indirectSubtotalOfferedNumber"
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
                id="indirectSubtotalContractedNumber"
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
                id="indirectSubtotalCertifiedNumber"
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
                id="indirectSubtotalBreakNumber"
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
                id="indirectSubtotalWorkNumber"
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
                id="indirectSubtotalHHNumber"
                placeholder="HH (Turno)"
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">Total HH Indirectos Acumulado Anterior</CTableHeaderCell>
            <CTableDataCell colSpan={6}>
              <CFormInput
                type="text"
                id="indirectPreviusAccumulated"
                placeholder="Total"
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">Total HH Indirectos Acumulado Actual</CTableHeaderCell>
            <CTableDataCell colSpan={6}>
              <CFormInput
                type="text"
                id="indirectCurrentAccumulated"
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

export default TotalIndirectWorkForce

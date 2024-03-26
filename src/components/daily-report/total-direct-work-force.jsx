import { React, useEffect, useState } from 'react'
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
import { validate } from 'src/utils/validate'

const TotalDirectWorkForce = () => {
  const initialState = {
    directSubtotalOfferedNumber: undefined,
    directSubtotalContractedNumber: undefined,
    directSubtotalCertifiedNumber: undefined,
    directSubtotalBreakNumber: undefined,
    directSubtotalWorkNumber: undefined,
    directSubtotalHHNumber: undefined,
    directPreviusAccumulated: undefined,
    directCurrentAccumulated: undefined,
  }
  const { storeTotalDirectWorkForce } = useRegisterDailyReportCompany()
  const [totalDirectWorkForce, setTotalDirectWorkForce] = useState(initialState)

  const onChangeData = (e) => {
    if (validate(e.target.value)) {
      setTotalDirectWorkForce({ ...totalDirectWorkForce, [e.target.id]: e.target.value })
    }
  }

  useEffect(() => {
    storeTotalDirectWorkForce(totalDirectWorkForce)
  }, [totalDirectWorkForce])

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
                value={totalDirectWorkForce.directSubtotalOfferedNumber || ''}
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
                value={totalDirectWorkForce.directSubtotalContractedNumber || ''}
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
                value={totalDirectWorkForce.directSubtotalCertifiedNumber || ''}
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
                value={totalDirectWorkForce.directSubtotalBreakNumber || ''}
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
                value={totalDirectWorkForce.directSubtotalWorkNumber || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="directSubtotalHHNumber"
                placeholder="HH (Turno)"
                value={totalDirectWorkForce.directSubtotalHHNumber || ''}
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
                value={totalDirectWorkForce.directPreviusAccumulated || ''}
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
                value={totalDirectWorkForce.directCurrentAccumulated || ''}
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

import { React, useState, useEffect } from 'react'
import {
  CFormInput,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'
import { validate } from 'src/utils/validate'

const TotalIndirectWorkForce = () => {
  const initialState = {
    indirectSubtotalOfferedNumber: undefined,
    indirectSubtotalContractedNumber: undefined,
    indirectSubtotalCertifiedNumber: undefined,
    indirectSubtotalBreakNumber: undefined,
    indirectSubtotalWorkNumber: undefined,
    indirectSubtotalHHNumber: undefined,
    indirectPreviusAccumulated: undefined,
    indirectCurrentAccumulated: undefined,
  }
  const { storeTotalIndirectWorkForce, indirectWorkForceList: indirectWorkForceListContext } =
    useRegisterDailyReportCompany()

  const [totalIndirectWorkForce, setTotalIndirectWorkForce] = useState(initialState)
  const [indirectAccumulatedHours, setIndirectAccumulatedHours] = useState(0)

  const onChangeData = (e) => {
    if (validate(e.target.value)) {
      setTotalIndirectWorkForce({ ...totalIndirectWorkForce, [e.target.id]: e.target.value })
    }
  }

  useEffect(() => {
    let hours = 0
    for (let indirectData of indirectWorkForceListContext) {
      hours = hours + Number(indirectData.actions.hh)
    }
    setIndirectAccumulatedHours(hours)
    setTotalIndirectWorkForce({
      ...totalIndirectWorkForce,
      indirectCurrentAccumulated: hours,
    })
  }, [indirectWorkForceListContext])

  useEffect(() => {
    storeTotalIndirectWorkForce(totalIndirectWorkForce)
  }, [totalIndirectWorkForce])

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
                value={totalIndirectWorkForce.indirectSubtotalOfferedNumber || ''}
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
                value={totalIndirectWorkForce.indirectSubtotalContractedNumber || ''}
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
                value={totalIndirectWorkForce.indirectSubtotalCertifiedNumber || ''}
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
                value={totalIndirectWorkForce.indirectSubtotalBreakNumber || ''}
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
                value={totalIndirectWorkForce.indirectSubtotalWorkNumber || ''}
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
                value={totalIndirectWorkForce.indirectSubtotalHHNumber || ''}
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
                value={totalIndirectWorkForce.indirectPreviusAccumulated || ''}
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
                value={indirectAccumulatedHours || ''}
                placeholder="Total"
                disabled
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

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
import { useLocation } from 'react-router-dom'

const TotalIndirectWorkForce = () => {
  const currentLocation = useLocation().pathname

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
  const {
    storeTotalIndirectWorkForce,
    indirectWorkForceList: indirectWorkForceListContext,
    totalIndirectWorkForce: totalIndirectWorkForceContext,
  } = useRegisterDailyReportCompany()

  const [totalIndirectWorkForce, setTotalIndirectWorkForce] = useState(initialState)
  const [indirectAccumulatedHours, setIndirectAccumulatedHours] = useState(0)
  const [indirectAccumulatedOffered, setIndirectAccumulatedOffered] = useState(0)
  const [indirectAccumulatedContracted, setIndirectAccumulatedContracted] = useState(0)
  const [indirectAccumulatedCertified, setIndirectAccumulatedCertified] = useState(0)
  const [indirectAccumulatedBreaked, setIndirectAccumulatedBreaked] = useState(0)
  const [indirectAccumulatedWorked, setIndirectAccumulatedWorked] = useState(0)
  const [indirectAccumulatedPrevious, setIndirectAccumulatedPrevious] = useState(0)
  const [indirectAccumulatedActual, setIndirectAccumulatedActual] = useState(0)
  const onChangeData = (e) => {
    if (validate(e.target.value)) {
      setTotalIndirectWorkForce({
        // Después debe cambiar por el state unico
        ...totalIndirectWorkForce,
        indirectPreviusAccumulated: e.target.value,
      })
      setIndirectAccumulatedActual(Number(e.target.value) + Number(indirectAccumulatedHours))
    }
  }

  useEffect(() => {
    setTotalIndirectWorkForce({
      ...totalIndirectWorkForce,
      indirectCurrentAccumulated: indirectAccumulatedActual,
    })
  }, [indirectAccumulatedActual])

  useEffect(() => {
    if (!currentLocation.includes('/edit')) {
      let hours = 0
      let offered = 0
      let contracted = 0
      let certified = 0
      let breaked = 0
      let workekd = 0
      for (let indirectData of indirectWorkForceListContext) {
        hours = hours + Number(indirectData.hh)
        offered = offered + Number(indirectData.offeredNumber)
        contracted = contracted + Number(indirectData.contractedNumber)
        certified = certified + Number(indirectData.certified)
        breaked = breaked + Number(indirectData.breakNumber)
        workekd = workekd + Number(indirectData.workNumber)
      }
      setIndirectAccumulatedHours(hours)
      setIndirectAccumulatedOffered(offered)
      setIndirectAccumulatedContracted(contracted)
      setIndirectAccumulatedCertified(certified)
      setIndirectAccumulatedBreaked(breaked)
      setIndirectAccumulatedWorked(workekd)
      setIndirectAccumulatedActual(
        Number(totalIndirectWorkForce.indirectPreviusAccumulated) + Number(hours),
      )

      const data = {
        indirectSubtotalOfferedNumber: offered,
        indirectSubtotalContractedNumber: contracted,
        indirectSubtotalCertifiedNumber: certified,
        indirectSubtotalBreakNumber: breaked,
        indirectSubtotalWorkNumber: workekd,
        indirectSubstotalHHNumber: hours,
        indirectPreviusAccumulated: totalIndirectWorkForce.indirectPreviusAccumulated || 0,
        indirectCurrentAccumulated:
          Number(totalIndirectWorkForce.indirectPreviusAccumulated) + Number(hours),
      }

      setTotalIndirectWorkForce(data)
    } else {
      setIndirectAccumulatedHours(totalIndirectWorkForceContext.indirectSubstotalHHNumber)
      setIndirectAccumulatedOffered(totalIndirectWorkForceContext.indirectSubtotalOfferedNumber)
      setIndirectAccumulatedContracted(
        totalIndirectWorkForceContext.indirectSubtotalContractedNumber,
      )
      setIndirectAccumulatedCertified(totalIndirectWorkForceContext.indirectSubtotalCertifiedNumber)
      setIndirectAccumulatedBreaked(totalIndirectWorkForceContext.indirectSubtotalBreakNumber)
      setIndirectAccumulatedWorked(totalIndirectWorkForceContext.indirectSubtotalWorkNumber)
      setIndirectAccumulatedActual(totalIndirectWorkForceContext.indirectCurrentAccumulated)

      setIndirectAccumulatedPrevious(totalIndirectWorkForceContext.indirectPreviusAccumulated)
    }
  }, [totalIndirectWorkForceContext])

  useEffect(() => {
    if (!currentLocation.includes('/edit')) {
      storeTotalIndirectWorkForce(totalIndirectWorkForce)
    }
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
                value={indirectAccumulatedOffered || '0'}
                disabled
                placeholder="N° Ofertado"
                text=""
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="indirectSubtotalContractedNumber"
                value={indirectAccumulatedContracted || '0'}
                disabled
                placeholder="N° Contratados"
                text=""
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="indirectSubtotalCertifiedNumber"
                value={indirectAccumulatedCertified || '0'}
                placeholder="Acreditados"
                disabled
                text=""
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="indirectSubtotalBreakNumber"
                value={indirectAccumulatedBreaked || '0'}
                disabled
                placeholder="N° Descanso"
                text=""
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="indirectSubtotalWorkNumber"
                value={indirectAccumulatedWorked || '0'}
                disabled
                placeholder="N° Obra"
                text=""
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="indirectSubtotalHHNumber"
                value={indirectAccumulatedHours || '0'}
                disabled
                placeholder="HH (Turno)"
                text=""
              />
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">Total HH Indirectos Acumulado Anterior</CTableHeaderCell>
            <CTableDataCell colSpan={6}>
              <CFormInput
                type="text"
                id="indirectPreviusAccumulated"
                value={
                  !currentLocation.includes('/edit')
                    ? totalIndirectWorkForce.indirectPreviusAccumulated || ''
                    : indirectAccumulatedPrevious
                }
                // indirectAccumulatedPrevious
                disabled={currentLocation.includes('/edit')}
                onChange={(e) => {
                  onChangeData(e)
                }}
                text=""
              />
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">Total HH Indirectos Acumulado Actual</CTableHeaderCell>
            <CTableDataCell colSpan={6}>
              <CFormInput
                type="text"
                id="indirectCurrentAccumulated"
                value={indirectAccumulatedActual || '0'}
                disabled
                placeholder="Total"
                text=""
              />
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </div>
  )
}

export default TotalIndirectWorkForce
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
import { useLocation } from 'react-router-dom'

const TotalDirectWorkForce = () => {
  const currentLocation = useLocation().pathname
  const isViewMode = currentLocation.includes('/view')

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
  const {
    storeTotalDirectWorkForce,
    directWorkForceList: directWorkForceListContext,
    totalDirectWorkForce: totalDirectWorkForceContext,
  } = useRegisterDailyReportCompany()

  const [totalDirectWorkForce, setTotalDirectWorkForce] = useState(initialState)
  const [directAccumulatedHours, setDirectAccumulatedHours] = useState(0)
  const [directAccumulatedOffered, setDirectAccumulatedOffered] = useState(0)
  const [directAccumulatedContracted, setDirectAccumulatedContracted] = useState(0)
  const [directAccumulatedCertified, setDirectAccumulatedCertified] = useState(0)
  const [directAccumulatedBreaked, setDirectAccumulatedBreaked] = useState(0)
  const [directAccumulatedWorked, setDirectAccumulatedWorked] = useState(0)
  const [directAccumulatedPrevious, setDirectAccumulatedPrevious] = useState(0)
  const [directAccumulatedActual, setDirectAccumulatedActual] = useState(0)
  const [total, setTotal] = useState(0)

  const onChangeData = (e) => {
    if (validate(e.target.value)) {
      setTotalDirectWorkForce({ ...totalDirectWorkForce, directPreviusAccumulated: e.target.value })
      setDirectAccumulatedActual(Number(e.target.value) + Number(directAccumulatedHours))
    }
  }

  useEffect(() => {
    setTotalDirectWorkForce({
      ...totalDirectWorkForce,
      directCurrentAccumulated: directAccumulatedActual,
    })
  }, [directAccumulatedActual])

  useEffect(() => {
    if (!isViewMode) {
      let hours = 0
      let offered = 0
      let contracted = 0
      let certified = 0
      let breaked = 0
      let workekd = 0
      let index = 0
      for (let directData of directWorkForceListContext) {
        index++
        setTotal(index)
        hours = hours + Number(directData.hh)
        offered = offered + Number(directData.offeredNumber)
        contracted = contracted + Number(directData.contractedNumber)
        certified = certified + Number(directData.certified)
        breaked = breaked + Number(directData.breakNumber)
        workekd = workekd + Number(directData.workNumber)
      }
      setDirectAccumulatedHours(hours)
      setDirectAccumulatedOffered(offered)
      setDirectAccumulatedContracted(contracted)
      setDirectAccumulatedCertified(certified)
      setDirectAccumulatedBreaked(breaked)
      setDirectAccumulatedWorked(workekd)
      setDirectAccumulatedActual(
        Number(totalDirectWorkForce.directPreviusAccumulated) + Number(hours),
      )
      const data = {
        directSubtotalOfferedNumber: offered,
        directSubtotalContractedNumber: contracted,
        directSubtotalCertifiedNumber: certified,
        directSubtotalBreakNumber: breaked,
        directSubtotalWorkNumber: workekd,
        directSubstotalHHNumber: hours,
        directPreviusAccumulated: totalDirectWorkForce.directPreviusAccumulated || 0,
        directCurrentAccumulated:
          Number(totalDirectWorkForce.directPreviusAccumulated) + Number(hours),
      }

      setTotalDirectWorkForce(data)
    } else {
      setDirectAccumulatedHours(totalDirectWorkForceContext.directSubstotalHHNumber)
      setDirectAccumulatedOffered(totalDirectWorkForceContext.directSubtotalOfferedNumber)
      setDirectAccumulatedContracted(totalDirectWorkForceContext.directSubtotalContractedNumber)
      setDirectAccumulatedCertified(totalDirectWorkForceContext.directSubtotalCertifiedNumber)
      setDirectAccumulatedBreaked(totalDirectWorkForceContext.directSubtotalBreakNumber)
      setDirectAccumulatedWorked(totalDirectWorkForceContext.directSubtotalWorkNumber)
      setDirectAccumulatedActual(totalDirectWorkForceContext.directCurrentAccumulated)
      setDirectAccumulatedPrevious(totalDirectWorkForceContext.directPreviusAccumulated)
    }
  }, [directWorkForceListContext])

  useEffect(() => {
    if (!isViewMode && total > 0) storeTotalDirectWorkForce(totalDirectWorkForce)
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
                value={directAccumulatedOffered || '0'}
                placeholder="N° Ofertado"
                text=""
                disabled
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="directSubtotalContractedNumber"
                placeholder="N° Contratados"
                value={directAccumulatedContracted || '0'}
                text=""
                disabled
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="directSubtotalCertifiedNumber"
                placeholder="Acreditados"
                value={directAccumulatedCertified || '0'}
                text=""
                disabled
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="directSubtotalBreakNumber"
                placeholder="N° Descanso"
                value={directAccumulatedBreaked || '0'}
                text=""
                disabled
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="directSubtotalWorkNumber"
                placeholder="N° Obra"
                value={directAccumulatedWorked || '0'}
                text=""
                disabled
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="directSubtotalHHNumber"
                placeholder="HH (Turno)"
                value={directAccumulatedHours || '0'}
                text=""
                disabled
              />
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">Total HH directos Acumulado Anterior</CTableHeaderCell>
            <CTableDataCell colSpan={6}>
              <CFormInput
                type="text"
                id="directPreviusAccumulated"
                // value={totalDirectWorkForce.directPreviusAccumulated || ''}
                value={
                  !isViewMode
                    ? totalDirectWorkForce.directPreviusAccumulated || ''
                    : directAccumulatedPrevious
                }
                // indirectAccumulatedPrevious
                disabled={isViewMode}
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
                value={directAccumulatedActual || '0'}
                placeholder="Total"
                text=""
                disabled
              />
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </div>
  )
}

export default TotalDirectWorkForce

import { React, useEffect, useState } from 'react'
import {
  CForm,
  CFormInput,
  CRow,
  CFormTextarea,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'
const DotationWorkForce = () => {
  const initialState = {
    workforceDotationPersonalFront1: undefined,
    workforceDotationPersonalFront2: undefined,
    workforceDotationPersonalFront3: undefined,
    workforceDotationPersonalFront4: undefined,
    workforceDotationPersonalFront5: undefined,
    workforceDotationPersonalFront6: undefined,
    workforceDotationPersonalFront7: undefined,
    workforceDotationObservation: undefined,
  }

  const [workforceDotation, setWorkforceDotation] = useState(initialState)

  const { storeDotationWorkfoce } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    switch (e.target.id) {
      case 'workforceDotationPersonalFront1':
        setWorkforceDotation({
          ...workforceDotation,
          workforceDotationPersonalFront1: e.target.value,
        })
        break
      case 'workforceDotationPersonalFront2':
        setWorkforceDotation({
          ...workforceDotation,
          workforceDotationPersonalFront2: e.target.value,
        })
        break
      case 'workforceDotationPersonalFront3':
        setWorkforceDotation({
          ...workforceDotation,
          workforceDotationPersonalFront3: e.target.value,
        })
        break
      case 'workforceDotationPersonalFront4':
        setWorkforceDotation({
          ...workforceDotation,
          workforceDotationPersonalFront4: e.target.value,
        })
        break
      case 'workforceDotationPersonalFront5':
        setWorkforceDotation({
          ...workforceDotation,
          workforceDotationPersonalFront5: e.target.value,
        })
        break
      case 'workforceDotationPersonalFront6':
        setWorkforceDotation({
          ...workforceDotation,
          workforceDotationPersonalFront6: e.target.value,
        })
        break
      case 'workforceDotationPersonalFront7':
        setWorkforceDotation({
          ...workforceDotation,
          workforceDotationPersonalFront7: e.target.value,
        })
        break
      case 'workforceDotationObservation':
        setWorkforceDotation({
          ...workforceDotation,
          workforceDotationObservation: e.target.value,
        })
        break
      default:
        break
    }
  }

  useEffect(() => {
    storeDotationWorkfoce(workforceDotation)
  }, [workforceDotation])

  return (
    <div className="work-force-report">
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
            <CTableHeaderCell scope="col">Frente de trabajo 1</CTableHeaderCell>
            <CTableHeaderCell scope="col">Frente de trabajo 2</CTableHeaderCell>
            <CTableHeaderCell scope="col">Frente de trabajo 3</CTableHeaderCell>
            <CTableHeaderCell scope="col">Frente de trabajo 4</CTableHeaderCell>
            <CTableHeaderCell scope="col">Frente de trabajo 5</CTableHeaderCell>
            <CTableHeaderCell scope="col">Frente de trabajo 6</CTableHeaderCell>
            <CTableHeaderCell scope="col">Frente de trabajo 7</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableHeaderCell scope="row">N° de personal</CTableHeaderCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="workforceDotationPersonalFront1"
                // placeholder="N° Ofertado"
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="workforceDotationPersonalFront2"
                // placeholder="N° Contratados"
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="workforceDotationPersonalFront3"
                // placeholder="Acreditados"
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="workforceDotationPersonalFront4"
                // placeholder="N° Descanso"
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="workforceDotationPersonalFront5"
                // placeholder="N° Obra"
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="workforceDotationPersonalFront6"
                // placeholder="HH (Turno)"
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="workforceDotationPersonalFront7"
                // placeholder="N° Ofertado"
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>

      <CFormTextarea
        id="workforceDotationObservation"
        placeholder="Deja un comentario / observación"
        onChange={(e) => {
          onChangeData(e)
        }}
      ></CFormTextarea>
    </div>
  )
}

export default DotationWorkForce

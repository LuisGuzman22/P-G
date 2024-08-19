import { React } from 'react'
import { CCard, CCardBody, CButton, CFormInput } from '@coreui/react'

const ExportDataComponent = () => {
  return (
    <div className="proyect-administration">
      <h2>Exportar data</h2>

      <CCard className="action-buttons">
        <CCardBody>
          <div className="row">
            <div className="col-sm-6 mb-3 mb-sm-0">
              <CFormInput
                type="date"
                size="lg"
                label="Desde"
                placeholder="Desde"
                aria-label="Desde"
              />
            </div>
            <div className="col-sm-6">
              <CFormInput
                type="date"
                size="lg"
                label="Hasta"
                placeholder="Hasta"
                aria-label="Hasta"
              />
            </div>
            <div className="col-sm-12">
              <CButton className="cancel-btn" onClick={() => {}}>
                Exportar
              </CButton>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default ExportDataComponent

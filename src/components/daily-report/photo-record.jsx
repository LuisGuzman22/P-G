import { React, useEffect, useState } from 'react'
import { CFormInput, CFormTextarea, CRow, CCol } from '@coreui/react'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'

const PhotoRecord = () => {
  const MAX_IMAGES = 10

  return (
    <div className="work-force-report">
      <section>
        {Array.from({ length: MAX_IMAGES }, (_, i) => (
          <CRow key={i}>
            <CCol>
              <CFormInput
                type="text"
                id="equipmentCorrectiveMaintenance"
                label={'Descripción'}
                // value={equipmentPlate.equipmentCorrectiveMaintenance || ''}
                text=""
                // onChange={(e) => {
                //   onChangeData(e)
                // }}
              />
            </CCol>
            <CCol>
              <CFormInput
                type="file"
                id="inputGroupFile03"
                aria-describedby="inputGroupFileAddon03"
                label="Fotografía"
                aria-label="Upload"
              />
            </CCol>
          </CRow>
        ))}
      </section>
    </div>
  )
}

export default PhotoRecord

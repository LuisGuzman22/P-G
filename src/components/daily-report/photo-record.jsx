import { React, useEffect, useState } from 'react'
import { CFormInput, CFormTextarea, CRow, CCol } from '@coreui/react'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'
import { useLocation } from 'react-router-dom'

const PhotoRecord = () => {
  const MAX_IMAGES = 10
  const currentLocation = useLocation().pathname
  const isViewMode = currentLocation.includes('/view')
  const isCreatingMode = currentLocation === '/informe-diario'

  const [file, setFile] = useState([])

  const { photoList: photoListContext, storePhoto, removePhoto } = useRegisterDailyReportCompany()

  const onChangeFile = (e) => {
    setFile([...file, e.target.files[0]])
  }

  useEffect(() => {
    if (!isViewMode) storePhoto(file)
  }, [file])

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
                onChange={onChangeFile}
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

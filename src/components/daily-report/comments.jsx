import { React, useEffect, useState } from 'react'
import { CFormInput, CFormTextarea, CRow, CCol } from '@coreui/react'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'

const Comments = () => {
  const initialState = {
    comments: '',
  }

  const MAX_IMAGES = 10

  const [comments, setComments] = useState(initialState)

  const onChangeData = (e) => {
    setComments({ ...comments, [e.target.id]: e.target.value })
  }

  const { storeComment } = useRegisterDailyReportCompany()

  useEffect(() => {
    storeComment(comments)
  }, [comments])

  return (
    <div className="work-force-report">
      <CFormTextarea
        id="comments"
        label="Comentarios y alertas en genenral"
        onChange={(e) => {
          onChangeData(e)
        }}
        rows={3}
        text=""
      ></CFormTextarea>
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
                onChange={(e) => {
                  onChangeData(e)
                }}
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

export default Comments

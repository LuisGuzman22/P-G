import { React, useEffect, useState } from 'react'
import { CFormInput, CFormTextarea, CRow, CCol } from '@coreui/react'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'

const Comments = () => {
  const initialState = {
    comment: '',
  }

  const [comment, setComment] = useState(initialState)

  const onChangeData = (e) => {
    setComment({ ...comment, [e.target.id]: e.target.value })
  }

  const { storeComment } = useRegisterDailyReportCompany()

  useEffect(() => {
    storeComment(comment)
  }, [comment])

  return (
    <div className="work-force-report">
      <CFormTextarea
        id="comment"
        label="Comentarios y alertas en genenral"
        onChange={(e) => {
          onChangeData(e)
        }}
        rows={3}
        text=""
      ></CFormTextarea>
    </div>
  )
}

export default Comments

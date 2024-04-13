import { React, useEffect, useState } from 'react'
import { CFormInput, CFormTextarea, CRow, CCol } from '@coreui/react'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'

const Comments = () => {
  const initialState = {
    comments: '',
  }

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
    </div>
  )
}

export default Comments

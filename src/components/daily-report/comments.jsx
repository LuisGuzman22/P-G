import { React, useEffect, useState } from 'react'
import { CFormInput, CFormTextarea, CRow, CCol } from '@coreui/react'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'
import { useLocation } from 'react-router-dom'

const Comments = () => {
  const currentLocation = useLocation().pathname
  const isViewMode = currentLocation.includes('/view')

  const initialState = {
    comment: '',
  }

  const [comment, setComment] = useState(initialState)

  const onChangeData = (e) => {
    setComment({ ...comment, [e.target.id]: e.target.value })
  }

  const { storeComment, comment: commentContext } = useRegisterDailyReportCompany()

  useEffect(() => {
    if (!isViewMode) storeComment(comment)
  }, [comment])

  return (
    <div className="work-force-report">
      <CFormTextarea
        id="comment"
        label="Comentarios y alertas en general"
        disabled={isViewMode}
        value={isViewMode ? commentContext.comment : comment.comment}
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

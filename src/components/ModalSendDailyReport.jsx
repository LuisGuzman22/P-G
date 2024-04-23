/* eslint-disable react/prop-types */
import { React, useEffect, useState } from 'react'
import {
  CButton,
  CModalHeader,
  CModalFooter,
  CModal,
  CModalBody,
  CForm,
  CRow,
  CCol,
  CFormTextarea,
} from '@coreui/react'
const ModalSendDailyReport = (props) => {
  const [rejectCommentary, setRejectCommentary] = useState('')
  const [error, setError] = useState(false)

  const handleClickReject = () => {
    setError(false)
    if (rejectCommentary !== '') {
      props.sendDataToParent(false)
    } else {
      setError(true)
    }
  }

  const handleClickApprove = () => {
    props.sendDataToParent(false)
  }

  const onChangeData = (e) => {
    setRejectCommentary(e.target.value)
  }

  useEffect(() => {
    console.log('error', error)
  }, [error])

  return (
    <CModal
      scrollable
      visible={props.visible}
      onClose={() => props.sendDataToParent(false)}
      aria-labelledby="ScrollingLongContentExampleLabel2"
      size="xl"
      className="project-creation-modal"
    >
      <CModalHeader>
        {/* <CModalTitle id="ScrollingLongContentExampleLabel2">Categorías</CModalTitle> */}
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CRow>
            <CCol sm={12}>
              <CFormTextarea
                id="rejectCommentary"
                label="Comentario"
                value={rejectCommentary || ''}
                rows={3}
                invalid={error}
                text={error && 'Debe agregar un comentario para rechazar el informe diario.'}
                onChange={(e) => {
                  onChangeData(e)
                }}
              ></CFormTextarea>
            </CCol>
          </CRow>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="danger" onClick={() => handleClickReject()}>
          Rechazar
        </CButton>
        <CButton color="primary" onClick={() => handleClickApprove()}>
          Aprobar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalSendDailyReport

/* eslint-disable react/prop-types */
import { React, useState } from 'react'
import {
  CButton,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CModal,
  CModalBody,
  CForm,
  CFormInput,
  CRow,
  CCol,
} from '@coreui/react'
import useGantt from 'src/hooks/useGantt'

const ModalAddGantt = (props) => {

  const { register } = useGantt()
  const [documentError, setDocumentError] = useState(false)

  const [docs, setDocs] = useState([])

  const handleClick = () => {
    props.sendDataToParent(false)
  }

  const handleUploadTechicalDoc = () => {
    register({ docs: docs })
    props.sendDataToParent(false)
  }

  const handleUploadFile = (e) => {
    const file = e.target.files
    setDocs(file)
  }

  return (
    <CModal
      scrollable
      visible={props.visible}
      onClose={() => handleClick()}
      aria-labelledby="ScrollingLongContentExampleLabel2"
      size="xl"
      className="project-creation-modal"
    >
      <CModalHeader>
        <CModalTitle id="ScrollingLongContentExampleLabel2">Subir Gantt</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CRow>
            <CCol sm={12}>
              <CFormInput
                type="file"
                id={`doc`}
                invalid={documentError}
                accept="application/pdf"
                text={documentError && 'Debe seleccionar un documento'}
                aria-describedby="inputGroupFileAddon03"
                onChange={(e) => {
                  handleUploadFile(e)
                  setDocumentError(false)
                }}
                label="Documentación"
                aria-label="Upload"
              />
            </CCol>
          </CRow>
          <CRow></CRow>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => handleClick()}>
          Cerrar
        </CButton>
        <CButton className="btn-add" onClick={() => handleUploadTechicalDoc()}>
          Registrar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalAddGantt

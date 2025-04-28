/* eslint-disable react/prop-types */
import { React, useEffect, useState } from 'react'
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
  CFormTextarea,
  CFormCheck,
  CToast,
  CToastBody,
  CFormSelect,
} from '@coreui/react'
import useRegisterGeneralData from 'src/hooks/useRegisterGeneralData'
import useTechnicalDoc from 'src/hooks/useTechnicalDoc'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import useCarousel from 'src/hooks/useCarousel'

const ModalAddImage = (props) => {
  const { getProject, getContract } = useRegisterGeneralData()
  const { getData } = useGetCachedQueryData()

  const { register } = useCarousel()
  const [documentError, setDocumentError] = useState(false)

  const [docs, setDocs] = useState([])

  const handleClick = () => {
    props.sendDataToParent(false)
  }

  const handleUploadTechicalDoc = () => {
    console.log('file', docs)
    register({ images: docs })
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
        <CModalTitle id="ScrollingLongContentExampleLabel2">Subir imagen</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CRow>
            <CCol sm={12}>
              <CFormInput
                type="file"
                id={`doc`}
                invalid={documentError}
                accept="image/png, image/jpeg"
                text={documentError && 'Debe seleccionar un documento'}
                aria-describedby="inputGroupFileAddon03"
                onChange={(e) => {
                  handleUploadFile(e)
                  setDocumentError(false)
                }}
                label="Documentación"
                aria-label="Upload"
                accept="image/png, image/jpeg"
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

export default ModalAddImage

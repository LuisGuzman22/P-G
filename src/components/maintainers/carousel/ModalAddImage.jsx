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

const ModalAddImage = (props) => {
  const { getProject, getContract } = useRegisterGeneralData()
  const { getData } = useGetCachedQueryData()
  const techDocCatQuery = getData('technical-documentation-categories')

  const { register } = useTechnicalDoc()
  const [categoryError, setCategoryError] = useState(false)
  const [documentError, setDocumentError] = useState(false)

  const [category, setCategory] = useState('')
  const [docs, setDocs] = useState([])

  const handleClick = () => {
    props.sendDataToParent(false)
  }

  const handleUploadTechicalDoc = () => {
    if (category === '' || category === '-1') {
      setCategoryError(true)
    } else if (docs.length === 0) {
      setDocumentError(true)
    } else {
      if (!categoryError) {
        register({ category, docs })
        props.sendDataToParent(false)
      }
    }
  }

  const handleRegisterCategory = (id) => {
    setCategory(id)
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
                text={documentError && 'Debe seleccionar un documento'}
                aria-describedby="inputGroupFileAddon03"
                onChange={(e) => {
                  handleUploadFile(e)
                  setDocumentError(false)
                }}
                label="Documentación"
                aria-label="Upload"
                //   accept="image/png, image/jpeg"
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

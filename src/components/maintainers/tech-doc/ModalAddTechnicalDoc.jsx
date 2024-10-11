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

const ModalAddTechnicalDoc = (props) => {
  const { getProject, getContract } = useRegisterGeneralData()
  const { register } = useTechnicalDoc()
  const [categoryError, setCategoryError] = useState(false)

  const [category, setCategory] = useState('')
  const [docs, setDocs] = useState([])

  const handleClick = () => {
    props.sendDataToParent(false)
  }

  const handleUploadTechicalDoc = () => {
    register({ category, docs })
  }

  const handleRegisterCategory = (id) => {
    console.log('handleRegisterCategory', id)
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
        <CModalTitle id="ScrollingLongContentExampleLabel2">Subir documentación</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CRow>
            <CCol sm={12}>
              <CFormSelect
                aria-label="Default select example"
                label="Categoría"
                id="category"
                invalid={categoryError}
                onChange={(e) => {
                  if (e.target.value !== '-1') {
                    setCategoryError(false)
                    handleRegisterCategory(e.target.value)
                  } else {
                    setCategoryError(true)
                  }
                }}
              >
                <option value={'-1'}>Seleccione</option>
                <option value={'Ingeniería'}>Ingeniería</option>
                <option value={'Planificación y control'}>Planificación y control</option>
                <option value={'Contratos'}>Contratos</option>
                <option value={'Calidad QAQC'}>Calidad QAQC</option>
                <option value={'Seguridad SSO'}>Seguridad SSO</option>
                <option value={'Información Importante'}>Información Importante</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={12}>
              <CFormInput
                type="file"
                id={`doc`}
                aria-describedby="inputGroupFileAddon03"
                onChange={(e) => {
                  handleUploadFile(e)
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

export default ModalAddTechnicalDoc

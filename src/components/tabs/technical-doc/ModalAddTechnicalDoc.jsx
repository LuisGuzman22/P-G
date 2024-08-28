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
import useRegisterProject from 'src/hooks/useRegisterProject'
import { v4 as uuidv4 } from 'uuid'
import useRegisterGeneralData from 'src/hooks/useRegisterGeneralData'
import useVehicle from 'src/hooks/useVehicle'
import useEquipment from 'src/hooks/useEquipment'
import useAljibe from 'src/hooks/useAljibe'
import useTechnicalDoc from 'src/hooks/useTechnicalDoc'

const ModalAddTechnicalDoc = (props) => {
  const { getProject, getContract } = useRegisterGeneralData()
  const projectLS = JSON.parse(getProject())
  const contractLS = JSON.parse(getContract())
  const { register } = useTechnicalDoc()
  const [categoryError, setCategoryError] = useState(false)
  const [techDoc, setTechDoc] = useState({
    category: '',
    file: [],
  })
  const [category, setCategory] = useState('')
  const [docs, setDocs] = useState([])

  const handleClick = () => {
    props.sendDataToParent(false)
  }

  const handleUploadTechicalDoc = () => {
    // setTechDoc({ category, docs })
    register({ category, docs })
  }

  const handleRegisterCategory = (id) => {
    console.log('handleRegisterCategory', id)
    setCategory(id)
  }

  const handleUploadFile = (e) => {
    // if (pos >= 0 && pos < items.length) {
    const file = e.target.files[0]
    console.log('file', file)
    setDocs([...docs, file])
    // const description = items[pos].description // Retain the current description
    // setFileAndDescription(pos, file, description)
    // }
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
                <option value={'Ingeniría'}>Ingeniría</option>
                <option value={'Planificación y control'}>Planificación y control</option>
                <option value={'Contratos'}>Contratos</option>
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
          <CRow>
            {docs.map((doc, pos) => (
              <div key={pos}>
                <p>{doc.name}</p>
                {/* <img src={URL.createObjectURL(doc)} style={{ width: '70%' }} /> */}
              </div>
            ))}
          </CRow>
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

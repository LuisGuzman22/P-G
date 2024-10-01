/* eslint-disable react/prop-types */
import { React, useEffect, useState } from 'react'
import {
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
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
import useRegisterGeneralData from 'src/hooks/useRegisterGeneralData'
import useTechnicalDoc from 'src/hooks/useTechnicalDoc'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'

const ModalAddCategory = (props) => {
  const { getData } = useGetCachedQueryData()
  const techDocQuery = getData('technical-documentation')

  const { registerCategory, editCategory, deleteCategory } = useTechnicalDoc()
  const [categoryError, setCategoryError] = useState(false)

  const [category, setCategory] = useState('')

  const handleClick = () => {
    props.sendDataToParent(false)
  }

  const onChangeCategory = (e) => {
    setCategory(e.target.value)
  }

  const handleEdit = (categoryName) => {
    setCategory(categoryName)
  }

  const handleRegisterCategory = () => {
    console.log('category', category)
    registerCategory(category)
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
        <CModalTitle id="ScrollingLongContentExampleLabel2">Agregar categoría</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CRow>
            <CCol sm={12}>
              <CFormInput
                type="text"
                id="category"
                label="Categoría"
                placeholder="Categoría"
                invalid={categoryError}
                value={category}
                text={''}
                onBlur={(e) => {
                  if (e.target.value !== '') {
                    setCategoryError(false)
                  } else {
                    setCategoryError(true)
                  }
                }}
                onChange={(e) => {
                  onChangeCategory(e)
                }}
              />
            </CCol>
          </CRow>
        </CForm>
        <div>
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {techDocQuery.map((doc, index) => {
                return (
                  <CTableRow key={doc.id}>
                    <CTableDataCell>{doc.category}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        className="btn-action-delete"
                        onClick={() => {
                          // deleteVehicle(doc.id)
                        }}
                      >
                        <CIcon icon={cilTrash} />
                      </CButton>
                      <CButton
                        className="btn-action-edit"
                        onClick={() => {
                          handleEdit(doc.category)
                        }}
                      >
                        <CIcon icon={cilPencil} />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => handleClick()}>
          Cerrar
        </CButton>
        <CButton className="btn-add" onClick={() => handleRegisterCategory()}>
          Registrar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalAddCategory

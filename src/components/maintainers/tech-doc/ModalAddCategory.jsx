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
  const techDocCatQuery = getData('technical-documentation-categories')
  const initialStateCategory = {
    name: undefined,
  }

  const { registerCategory, editCategory, deleteCategory } = useTechnicalDoc()
  const [categoryError, setCategoryError] = useState(false)
  const [editCategoryId, setEditCategoryId] = useState()
  const [editCategoryName, setEditCategoryName] = useState()

  const [category, setCategory] = useState(initialStateCategory)

  const handleClick = () => {
    props.sendDataToParent(false)
  }

  const onChangeCategory = (e) => {
    setCategory({ ...category, [e.target.id]: e.target.value })
  }

  const handleEdit = (category) => {
    setCategory({ name: category.name })
    setEditCategoryId(category.id)
    setEditCategoryName(category.name)
  }

  const handleRegisterCategory = () => {
    if (category.name || !category.name === '') {
      if (editCategoryId) {
        editCategory({
          id: editCategoryId,
          name: category.name,
        })
      } else {
        registerCategory(category)
      }
      props.sendDataToParent(false)
    } else {
      setCategoryError(true)
    }
  }

  const handleExitEditMode = () => {
    setCategory({ name: undefined })
    setEditCategoryId()
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
            {editCategoryId && (
              <CCol sm={12}>
                Editando categoría: {editCategoryId} - {editCategoryName} <br />
                <CButton className="btn-add" onClick={() => handleExitEditMode()}>
                  Salir modo edición
                </CButton>
              </CCol>
            )}

            <CCol sm={12}>
              <CFormInput
                type="text"
                id="name"
                label="Categoría"
                placeholder="Categoría"
                invalid={categoryError}
                value={category.name}
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
              {techDocCatQuery.map((doc, index) => {
                return (
                  <CTableRow key={doc.id}>
                    <CTableDataCell>{doc.name}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        className="btn-action-delete"
                        onClick={() => {
                          deleteCategory(doc.id)
                        }}
                      >
                        <CIcon icon={cilTrash} />
                      </CButton>
                      <CButton
                        className="btn-action-edit"
                        onClick={() => {
                          handleEdit(doc)
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

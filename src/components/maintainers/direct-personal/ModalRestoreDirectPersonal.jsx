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
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import { v4 as uuidv4 } from 'uuid'
import useRegisterGeneralData from 'src/hooks/useRegisterGeneralData'
import useDirectPersonal from 'src/hooks/useDirectPersonal'
import useIndirectPersonal from 'src/hooks/useIndirectPersonal'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'

const ModalRestoreDirectPersonal = (props) => {
  const { getProject, getContract } = useRegisterGeneralData()
  const { getData } = useGetCachedQueryData()
  const directPersonalQuery = getData('direct-personal')
  const { restoreDirectPersonal } = useDirectPersonal()

  const projectLS = JSON.parse(getProject())
  const contractLS = JSON.parse(getContract())

  const handleClick = () => {
    props.sendDataToParent(false)
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
        <CModalTitle id="ScrollingLongContentExampleLabel2">Restaurar Personal directo</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {directPersonalQuery?.filter((personal) => personal.deleted_at !== null).length === 0 ? (
          <>No hay personal eliminado</>
        ) : (
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {directPersonalQuery
                ?.filter((personal) => personal.deleted_at !== null)
                .map((idpersonal, index) => {
                  return (
                    <CTableRow key={idpersonal.id}>
                      <CTableDataCell>{idpersonal.name}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="warning"
                          onClick={() => {
                            restoreDirectPersonal(idpersonal.id)
                          }}
                        >
                          Restaurar
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
            </CTableBody>
          </CTable>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => handleClick()}>
          Cerrar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalRestoreDirectPersonal

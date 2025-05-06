/* eslint-disable react/prop-types */
import { React, useEffect, useState } from 'react'
import {
  CButton,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CModal,
  CModalBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import { v4 as uuidv4 } from 'uuid'
import useRegisterGeneralData from 'src/hooks/useRegisterGeneralData'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import useMachinery from 'src/hooks/useMachinery'
import useRole from 'src/hooks/useRole'

const ModalRestoreRole = (props) => {
  const { getProject, getContract } = useRegisterGeneralData()
  const { getData } = useGetCachedQueryData()
  const roleQuery = getData('role')
  const { restoreRole } = useRole()

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
      className="restore-modal"
    >
      <CModalHeader>
        <CModalTitle id="ScrollingLongContentExampleLabel2">Restaurar Rol</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {roleQuery?.filter((role) => role.deleted_at !== null).length === 0 ? (
          <>No hay roles eliminados</>
        ) : (
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {roleQuery
                ?.filter((role) => role.deleted_at !== null)
                .map((role, index) => {
                  return (
                    <CTableRow key={role.id}>
                      <CTableDataCell>{role.name}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          className="btn-action-restore"
                          onClick={() => {
                            restoreRole(role.id)
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

export default ModalRestoreRole

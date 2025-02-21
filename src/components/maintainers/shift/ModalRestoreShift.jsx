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
import useRegisterGeneralData from 'src/hooks/useRegisterGeneralData'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import './css.scss'
import useShift from 'src/hooks/useShift'

const ModalRestoreShift = (props) => {
  const { getProject, getContract } = useRegisterGeneralData()
  const { getData } = useGetCachedQueryData()
  const shiftQuery = getData('shifts')
  const { restoreShift } = useShift()

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
        <CModalTitle id="ScrollingLongContentExampleLabel2">Restaurar Turno</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {shiftQuery?.filter((shift) => shift.deleted_at !== null).length === 0 ? (
          <>No hay turnos eliminados</>
        ) : (
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {shiftQuery
                ?.filter((shift) => shift.deleted_at !== null)
                .map((shift, index) => {
                  return (
                    <CTableRow key={shift.id}>
                      <CTableDataCell>{shift.name}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          className="btn-action-restore"
                          onClick={() => {
                            restoreShift(shift.id)
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

export default ModalRestoreShift

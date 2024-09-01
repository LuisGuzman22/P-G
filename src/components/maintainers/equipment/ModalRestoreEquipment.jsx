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
import useEquipment from 'src/hooks/useEquipment'
import './css.scss'

const ModalRestoreEquipment = (props) => {
  const { getProject, getContract } = useRegisterGeneralData()
  const { getData } = useGetCachedQueryData()
  const equipmentQuery = getData('equipment')
  const { restoreEquipment } = useEquipment()

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
        <CModalTitle id="ScrollingLongContentExampleLabel2">Restaurar Equipos</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {equipmentQuery?.filter((equipment) => equipment.deleted_at !== null).length === 0 ? (
          <>No hay equipos eliminado</>
        ) : (
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {equipmentQuery
                ?.filter((equipment) => equipment.deleted_at !== null)
                .map((equipment, index) => {
                  return (
                    <CTableRow key={equipment.id}>
                      <CTableDataCell>{equipment.name}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          className="btn-action-restore"
                          onClick={() => {
                            restoreEquipment(equipment.id)
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

export default ModalRestoreEquipment

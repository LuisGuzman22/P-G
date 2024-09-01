import React, { useState } from 'react'
import {
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import useEquipment from 'src/hooks/useEquipment'
import ModalAddEquipment from './ModalAddEquipment'
import './css.scss'

const EquipmentList = () => {
  const { getData } = useGetCachedQueryData()
  const equipmentQuery = getData('equipment')
  const { deleteEquipment } = useEquipment()

  const [visibleEquipment, setVisibleEquipment] = useState(false)
  const [selectedEquipment, setSelectedEquipment] = useState()

  const getPlates = (plates) => {
    const platesJoin = []

    plates.forEach((plate) => {
      platesJoin.push(plate.label)
    })
    return platesJoin.join(' - ')
  }

  const handleEditEquipmennt = (equipment) => {
    setSelectedEquipment(equipment)
    setVisibleEquipment(!visibleEquipment)
  }

  return (
    <>
      {visibleEquipment && (
        <ModalAddEquipment
          visible={true}
          selectedEquipment={selectedEquipment}
          sendDataToParent={async (data) => {
            // await refetch()
            setVisibleEquipment(data)
          }}
        />
      )}
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">ID</CTableHeaderCell>
            <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
            <CTableHeaderCell scope="col">Patentes</CTableHeaderCell>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {equipmentQuery
            ?.filter((equipment) => equipment.deleted_at === null)
            .map((equipment, index) => {
              const plates = getPlates(equipment.plate)
              return (
                <CTableRow key={equipment.id}>
                  <CTableDataCell scope="row">{equipment.id}</CTableDataCell>
                  <CTableDataCell>{equipment.name}</CTableDataCell>
                  <CTableDataCell>{plates}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      className="btn-action-edit"
                      onClick={() => {
                        handleEditEquipmennt(equipment)
                      }}
                    >
                      <CIcon icon={cilPencil} />
                    </CButton>
                    <CButton
                      className="btn-action-delete"
                      onClick={() => {
                        deleteEquipment(equipment.id)
                      }}
                    >
                      <CIcon icon={cilTrash} />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
    </>
  )
}

export default EquipmentList

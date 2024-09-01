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
import ModalAddEquipment from './ModalAddAljibe'
import useAljibe from 'src/hooks/useAljibe'
import ModalAddAljibe from './ModalAddAljibe'
// import ModalAddMachinery from './ModalAddMachinery'

const AljibeList = () => {
  const { getData } = useGetCachedQueryData()
  const aljibeQuery = getData('aljibe')
  const { deleteAljibe } = useAljibe()

  const [visibleAljibe, setVisibleAljibe] = useState(false)
  const [selectedAljibe, setSelectedAljibe] = useState()

  const getPlates = (plates) => {
    const platesJoin = []

    plates?.forEach((plate) => {
      platesJoin.push(plate.label)
    })
    return platesJoin.join(' - ')
  }

  const handleEditAljibe = (aljibe) => {
    setSelectedAljibe(aljibe)
    setVisibleAljibe(!visibleAljibe)
  }

  return (
    <>
      {visibleAljibe && (
        <ModalAddAljibe
          visible={true}
          selectedAljibe={selectedAljibe}
          sendDataToParent={async (data) => {
            // await refetch()
            setVisibleAljibe(data)
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
          {aljibeQuery
            ?.filter((aljibe) => aljibe.deleted_at === null)
            .map((aljibe, index) => {
              const plates = getPlates(aljibe.plate)
              return (
                <CTableRow key={aljibe.id}>
                  <CTableDataCell scope="row">{aljibe.id}</CTableDataCell>
                  <CTableDataCell>{aljibe.name}</CTableDataCell>
                  <CTableDataCell>{plates}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="warning"
                      onClick={() => {
                        handleEditAljibe(aljibe)
                      }}
                    >
                      <CIcon icon={cilPencil} />
                    </CButton>
                    <CButton
                      color="danger"
                      onClick={() => {
                        deleteAljibe(aljibe.id)
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

export default AljibeList

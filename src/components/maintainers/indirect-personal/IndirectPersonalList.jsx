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
import ModalAddIndirectPersonal from './ModalAddIndirectPersonal'
import useIndirectPersonal from 'src/hooks/useIndirectPersonal'

const IndirectPersonalList = () => {
  const { getData } = useGetCachedQueryData()
  const indirectPersonalQuery = getData('indirect-personal')
  const { deleteIndirectPersonal } = useIndirectPersonal()

  const [visibleIndirectPersonal, setVisibleIndirectPersonal] = useState(false)
  const [selectedIndirectPersonal, setSelectedIndirectPersonal] = useState()

  const handleEditIndirectPersonal = (indirectPersonal) => {
    setSelectedIndirectPersonal(indirectPersonal)
    setVisibleIndirectPersonal(!visibleIndirectPersonal)
  }

  return (
    <>
      {visibleIndirectPersonal && (
        <ModalAddIndirectPersonal
          visible={true}
          selectedIndirectPersonal={selectedIndirectPersonal}
          sendDataToParent={async (data) => {
            // await refetch()
            setVisibleIndirectPersonal(data)
          }}
        />
      )}
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">ID</CTableHeaderCell>
            <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {indirectPersonalQuery?.map((idpersonal, index) => {
            return (
              <CTableRow key={idpersonal.id}>
                <CTableDataCell scope="row">{idpersonal.id}</CTableDataCell>
                <CTableDataCell>{idpersonal.name}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="warning"
                    onClick={() => {
                      handleEditIndirectPersonal(idpersonal)
                    }}
                  >
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <CButton
                    color="danger"
                    onClick={() => {
                      deleteIndirectPersonal(idpersonal.id)
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

export default IndirectPersonalList

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
import useDirectPersonal from 'src/hooks/useDirectPersonal'
import ModalAddDirectPersonal from './ModalAddDirectPersonal'

const DirectPersonalList = () => {
  const { getData } = useGetCachedQueryData()
  const directPersonalQuery = getData('direct-personal')
  const { deleteDirectPersonal } = useDirectPersonal()

  const [visibleDirectPersonal, setVisibleDirectPersonal] = useState(false)
  const [selectedDirectPersonal, setSelectedDirectPersonal] = useState()

  const handleEditDirectPersonal = (directPersonal) => {
    setSelectedDirectPersonal(directPersonal)
    setVisibleDirectPersonal(!visibleDirectPersonal)
  }

  return (
    <>
      {visibleDirectPersonal && (
        <ModalAddDirectPersonal
          visible={true}
          selectedDirectPersonal={selectedDirectPersonal}
          sendDataToParent={async (data) => {
            // await refetch()
            setVisibleDirectPersonal(data)
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
          {directPersonalQuery?.map((dpersonal, index) => {
            return (
              <CTableRow key={dpersonal.id}>
                <CTableDataCell scope="row">{dpersonal.id}</CTableDataCell>
                <CTableDataCell>{dpersonal.name}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="warning"
                    onClick={() => {
                      handleEditDirectPersonal(dpersonal)
                    }}
                  >
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <CButton
                    color="danger"
                    onClick={() => {
                      deleteDirectPersonal(dpersonal.id)
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

export default DirectPersonalList

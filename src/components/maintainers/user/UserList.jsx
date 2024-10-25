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
import './css.scss'
import useUser from 'src/hooks/useUser'
import ModalAddUser from './ModalAddUser'

const UserList = () => {
  const { getData } = useGetCachedQueryData()
  const userQuery = getData('user')
  const { deleteUser } = useUser()

  const [visibleUser, setVisibleUser] = useState(false)
  const [selectedUser, setSelectedUser] = useState()

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setVisibleUser(!visibleUser)
  }

  return (
    <>
      {visibleUser && (
        <ModalAddUser
          visible={true}
          selectedUser={selectedUser}
          sendDataToParent={async (data) => {
            // await refetch()
            setVisibleUser(data)
          }}
        />
      )}
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">ID</CTableHeaderCell>
            <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
            <CTableHeaderCell scope="col">Correo</CTableHeaderCell>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {userQuery
            // ?.filter((user) => user.deleted_at === null)
            .map((user, index) => {
              return (
                <CTableRow key={user.id}>
                  <CTableDataCell scope="row">{user.id}</CTableDataCell>
                  <CTableDataCell>{user.name}</CTableDataCell>
                  <CTableDataCell>{user.email}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      className="btn-action-edit"
                      onClick={() => {
                        handleEditUser(user)
                      }}
                    >
                      <CIcon icon={cilPencil} />
                    </CButton>
                    <CButton
                      className="btn-action-delete"
                      onClick={() => {
                        deleteUser(user.id)
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

export default UserList

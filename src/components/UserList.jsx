import React, { useEffect, useState } from 'react'
import {
  CTable,
  CTableHead,
  CButton,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import useGetUserList from 'src/hooks/useGetUserList'
import Loading from './loading'
import ModalAddUser from './ModalAddUser'

const ProjectList = () => {
  const { data, isLoading, error } = useGetUserList()
  const [visibleAddUser, setVisibleAddUser] = useState(false)
  const [selectedUser, setSelectedUser] = useState()

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setVisibleAddUser(!visibleAddUser)
  }

  return (
    <>
      {isLoading && <Loading />}
      {visibleAddUser && (
        <ModalAddUser
          visible={true}
          selectedUser={selectedUser}
          sendDataToParent={(data) => {
            setVisibleAddUser(data)
          }}
        />
      )}
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">ID</CTableHeaderCell>
            <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
            <CTableHeaderCell scope="col">Correo</CTableHeaderCell>
            <CTableHeaderCell scope="col">Proyecto</CTableHeaderCell>
            <CTableHeaderCell scope="col">Contrato</CTableHeaderCell>
            <CTableHeaderCell scope="col">Acción</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data &&
            data.users.map((user) => {
              return (
                <CTableRow key={user.id}>
                  <CTableDataCell>{user.id}</CTableDataCell>
                  <CTableDataCell>{user.userName}</CTableDataCell>
                  <CTableDataCell>{user.userMail}</CTableDataCell>
                  <CTableDataCell>{user.userProject}</CTableDataCell>
                  <CTableDataCell>{user.userContract}</CTableDataCell>
                  <CTableDataCell>
                    <CButton className="btn-edit" onClick={(e) => handleEditUser(user)}>
                      Editar
                    </CButton>
                    <CButton className="btn-del">Eliminar</CButton>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
    </>
  )
}

export default ProjectList

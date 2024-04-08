import React, { useState } from 'react'
import { CCard, CButton, CCardBody, CCardText } from '@coreui/react'
import ModalAddUser from 'src/components/ModalAddUser'
import UserList from 'src/components/UserList'

const User = () => {
  const [visibleAddUser, setVisibleAddUser] = useState(false)

  return (
    <div className="user">
      {visibleAddUser && (
        <ModalAddUser
          visible={true}
          sendDataToParent={(data) => {
            setVisibleAddUser(data)
          }}
        />
      )}

      <CCard>
        <CCardBody>
          <CButton onClick={() => setVisibleAddUser(!visibleAddUser)}>Añadir usuario</CButton>
          <CCardText>
            <UserList />
          </CCardText>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default User

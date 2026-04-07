import { React, useEffect, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import './css.scss'
import useUser from 'src/hooks/useUser'
import ModalAddUser from './ModalAddUser'
import UserList from './UserList'
import useCompany from 'src/hooks/useCompany'
import { usePermissions } from 'src/providers/PermissionsProvider'
import { useNavigate } from 'react-router-dom'
import useRole from 'src/hooks/useRole'
import { PERMISSIONS } from 'src/utils/contant'

const UserMaintainer = () => {
  const { isLoading, refetch, isRefetching } = useUser()
  useRole()
  useCompany()
  let navigate = useNavigate()

  const [visibleUser, setVisibleUser] = useState(false)
  // const [visibleRestoreUser, setVisibleRestoreUser] = useState(false)

  const { hasPermission } = usePermissions()

  useEffect(() => {
    if (!hasPermission(PERMISSIONS.USER.VIEW)) {
      navigate('/inicio')
    }
  }, [hasPermission, navigate])

  return (
    <div className="user-maintainer">
      <h2 className="title">Administrar Usuarios</h2>

      {visibleUser && (
        <ModalAddUser
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleUser(data)
            await refetch()
          }}
        />
      )}

      {/* {visibleRestoreMachinery && (
        <ModalRestoreMachinery
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleRestoreMachinery(data)
            await refetch()
          }}
        />
      )} */}

      {hasPermission(PERMISSIONS.USER.CREATE) && (
        <CCard className="action-buttons">
          <CCardBody>
            <CButton className="btn-modal" onClick={() => setVisibleUser(!visibleUser)}>
              Añadir usuario
            </CButton>
            {/* <CButton
            className="btn-modal"
            onClick={() => setVisibleRestoreMachinery(!visibleRestoreMachinery)}
          >
            Ver eliminados
          </CButton> */}
          </CCardBody>
        </CCard>
      )}

      <CCard>
        <CCardBody>{isLoading || isRefetching ? <Skeleton count={5} /> : <UserList />}</CCardBody>
      </CCard>
    </div>
  )
}

export default UserMaintainer

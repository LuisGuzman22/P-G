import { React, useEffect, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import './css.scss'
import { useNavigate } from 'react-router-dom'
import { usePermissions } from 'src/providers/PermissionsProvider'
import RoleList from './RoleList'
import ModalAddRole from './ModalAddRole'
import ModalRestoreRole from './ModalRestoreRole'
import useRole from 'src/hooks/useRole'
import { PERMISSIONS } from 'src/utils/contant'

const RoleMaintainer = () => {
  const { isLoading, refetch, isRefetching } = useRole()
  let navigate = useNavigate()

  const [visibleRole, setVisibleRole] = useState(false)
  const [visibleRestoreRole, setVisibleRestoreRole] = useState(false)

  const { hasPermission } = usePermissions()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!hasPermission(PERMISSIONS.ROLES.VIEW)) {
      navigate('/inicio')
    }
  }, [])

  return (
    <div className="role-maintainer">
      <h2 className="title">Administrar Roles</h2>

      {visibleRole && (
        <ModalAddRole
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleRole(data)
            await refetch()
          }}
        />
      )}

      {visibleRestoreRole && (
        <ModalRestoreRole
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleRestoreRole(data)
            await refetch()
          }}
        />
      )}
      {hasPermission(PERMISSIONS.ROLES.CREATE) && (
        <CCard className="action-buttons">
          <CCardBody>
            <CButton className="btn-modal" onClick={() => setVisibleRole(!visibleRole)}>
              Añadir rol
            </CButton>
            <CButton
              className="btn-modal"
              onClick={() => setVisibleRestoreRole(!visibleRestoreRole)}
            >
              Ver eliminados
            </CButton>
          </CCardBody>
        </CCard>
      )}

      <CCard>
        <CCardBody>{isLoading || isRefetching ? <Skeleton count={5} /> : <RoleList />}</CCardBody>
      </CCard>
    </div>
  )
}

export default RoleMaintainer

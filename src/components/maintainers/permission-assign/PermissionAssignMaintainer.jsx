import { React, useEffect, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import './css.scss'
import { useNavigate } from 'react-router-dom'
import ModalAddRole from './ModalAssignPermission'
import usePermission from 'src/hooks/usePermission'
import useUser from 'src/hooks/useUser'
import { usePermissions } from 'src/providers/PermissionsProvider'
import PermissionAssignList from './PermissionAssignList'

const PermissionAssignMaintainer = () => {
  const { isLoading, refetch, isRefetching } = usePermission()
  const { isLoading: userLoading, refetch: userRefetch, isRefetching: userIsRefetching } = useUser()
  let navigate = useNavigate()

  const { hasPermission } = usePermissions()

  const redirectTo = (url) => {
    navigate(url)
  }

  useEffect(() => {
    // if (!hasPermission('role_create')) {
    // redirectTo('/inicio')
    // }
  }, [])

  return (
    <div className="role-maintainer">
      <h2 className="title">Asignar permisos a usuarios</h2>

      <CCard>
        <CCardBody>
          {isLoading || isRefetching ? <Skeleton count={5} /> : <PermissionAssignList />}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default PermissionAssignMaintainer

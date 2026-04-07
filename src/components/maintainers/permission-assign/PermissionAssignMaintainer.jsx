import { React, useEffect } from 'react'
import { CCard, CCardBody } from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import './css.scss'
import { useNavigate } from 'react-router-dom'
import usePermission from 'src/hooks/usePermission'
import useUser from 'src/hooks/useUser'
import { usePermissions } from 'src/providers/PermissionsProvider'
import PermissionAssignList from './PermissionAssignList'
import { PERMISSIONS } from 'src/utils/contant'

const PermissionAssignMaintainer = () => {
  const { isLoading, isRefetching } = usePermission()
  useUser()
  let navigate = useNavigate()

  const { hasPermission } = usePermissions()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!hasPermission(PERMISSIONS.USER.VIEW)) {
      navigate('/inicio')
    }
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

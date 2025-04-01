import { React, useEffect, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import './css.scss'
import useRestriction from 'src/hooks/useRestriction'
import ModalAddRestriction from './ModalAddRestriction'
import RestrictionList from './RestrictionList'
import { useNavigate } from 'react-router-dom'
import { usePermissions } from 'src/providers/PermissionsProvider'

const RestrictionMaintainer = () => {
  const { isLoading, refetch, isRefetching } = useRestriction()
  let navigate = useNavigate()

  const [visibleRestriction, setVisibleRestriction] = useState(false)

  const { hasPermission } = usePermissions()

  const redirectTo = (url) => {
    navigate(url)
  }

  useEffect(() => {
    if (!hasPermission('restriction_create')) {
      redirectTo('/inicio')
    }
  }, [])

  return (
    <div className="equipment-maintainer">
      <h2 className="title">Administrar Motivos</h2>
      {visibleRestriction && (
        <ModalAddRestriction
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleRestriction(data)
            await refetch()
          }}
        />
      )}

      {hasPermission('restriction_create') && (
        <CCard className="action-buttons">
          <CCardBody>
            <CButton
              className="btn-modal"
              onClick={() => setVisibleRestriction(!visibleRestriction)}
            >
              Añadir Motivo
            </CButton>
          </CCardBody>
        </CCard>
      )}
      <CCard>
        <CCardBody>
          {isLoading || isRefetching ? <Skeleton count={5} /> : <RestrictionList />}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default RestrictionMaintainer

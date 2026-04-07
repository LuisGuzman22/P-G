import { React, useEffect, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import ModalAddDirectPersonal from './ModalAddDirectPersonal'
import DirectPersonalList from './DirectPersonalList'
import useDirectPersonal from 'src/hooks/useDirectPersonal'
import ModalRestoreDirectPersonal from './ModalRestoreDirectPersonal'
import './css.scss'
import { usePermissions } from 'src/providers/PermissionsProvider'
import { useNavigate } from 'react-router-dom'
import { PERMISSIONS } from 'src/utils/contant'

const DirectPersonalMaintainer = () => {
  const { isLoading, refetch, isRefetching } = useDirectPersonal()
  let navigate = useNavigate()

  const [visibleDirectPersonal, setVisibleDirectPersonal] = useState(false)
  const [visibleRestoreDirectPersonal, setVisibleRestoreDirectPersonal] = useState(false)

  const { hasPermission } = usePermissions()

  useEffect(() => {
    if (!hasPermission(PERMISSIONS.DIRECT_PERSONAL.VIEW)) {
      navigate('/inicio')
    }
  }, [hasPermission, navigate])

  return (
    <div className="direct-staff-maintainer">
      <h2>Administrar Personal Directo</h2>
      {visibleDirectPersonal && (
        <ModalAddDirectPersonal
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleDirectPersonal(data)
            await refetch()
          }}
        />
      )}

      {visibleRestoreDirectPersonal && (
        <ModalRestoreDirectPersonal
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleRestoreDirectPersonal(data)
            await refetch()
          }}
        />
      )}
      {hasPermission(PERMISSIONS.DIRECT_PERSONAL.CREATE) && (
        <CCard className="action-buttons">
          <CCardBody>
            <CButton
              className="btn-modal"
              onClick={() => setVisibleDirectPersonal(!visibleDirectPersonal)}
            >
              Añadir personal directo
            </CButton>
            <CButton
              className="btn-modal"
              onClick={() => setVisibleRestoreDirectPersonal(!visibleRestoreDirectPersonal)}
            >
              Ver eliminados
            </CButton>
          </CCardBody>
        </CCard>
      )}

      <CCard>
        <CCardBody>
          {isLoading || isRefetching ? <Skeleton count={5} /> : <DirectPersonalList />}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default DirectPersonalMaintainer

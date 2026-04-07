import { React, useEffect, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import IndirectPersonalList from './IndirectPersonalList'
import useIndirectPersonal from 'src/hooks/useIndirectPersonal'
import ModalAddIndirectPersonal from './ModalAddIndirectPersonal'
import ModalRestoreIndirectPersonal from './ModalRestoreIndirectPersonal'
import './css.scss'
import { useNavigate } from 'react-router-dom'
import { usePermissions } from 'src/providers/PermissionsProvider'
import { PERMISSIONS } from 'src/utils/contant'

const IndirectPersonalMaintainer = () => {
  const { isLoading, refetch, isRefetching } = useIndirectPersonal()
  let navigate = useNavigate()

  const [visibleIndirectPersonal, setVisibleIndirectPersonal] = useState(false)
  const [visibleRestoreIndirectPersonal, setVisibleRestoreIndirectPersonal] = useState(false)

  const { hasPermission } = usePermissions()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!hasPermission(PERMISSIONS.INDIRECT_PERSONAL.VIEW)) {
      navigate('/inicio')
    }
  }, [])

  return (
    <div className="indirect-staff-maintainer">
      <h2>Administrar Personal Indirecto</h2>
      {visibleIndirectPersonal && (
        <ModalAddIndirectPersonal
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleIndirectPersonal(data)
            await refetch()
          }}
        />
      )}
      {visibleRestoreIndirectPersonal && (
        <ModalRestoreIndirectPersonal
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleRestoreIndirectPersonal(data)
            await refetch()
          }}
        />
      )}

      {hasPermission(PERMISSIONS.INDIRECT_PERSONAL.CREATE) && (
        <CCard className="action-buttons">
          <CCardBody>
            <CButton
              className="btn-modal"
              onClick={() => setVisibleIndirectPersonal(!visibleIndirectPersonal)}
            >
              Añadir personal indirecto
            </CButton>
            <CButton
              className="btn-modal"
              onClick={() => setVisibleRestoreIndirectPersonal(!visibleRestoreIndirectPersonal)}
            >
              Ver eliminados
            </CButton>
          </CCardBody>
        </CCard>
      )}

      <CCard>
        <CCardBody>
          {isLoading || isRefetching ? <Skeleton count={5} /> : <IndirectPersonalList />}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default IndirectPersonalMaintainer

import { React, useEffect, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import './css.scss'
import useWorkFront from 'src/hooks/useWorkFront'
import WorkFrontList from './WorkFrontList'
import ModalAddWorkFront from './ModalAddWorkFront'
import ModalRestoreWorkFront from './ModalRestoreWorkFront'
import { useNavigate } from 'react-router-dom'
import { usePermissions } from 'src/providers/PermissionsProvider'
import { PERMISSIONS } from 'src/utils/contant'

const WorkFrontMaintainer = () => {
  const { isLoading, refetch, isRefetching } = useWorkFront()
  let navigate = useNavigate()

  const [visibleWorkFront, setVisibleWorkFront] = useState(false)
  const [visibleRestoreWorkFront, setVisibleRestoreWorkFront] = useState(false)

  const { hasPermission } = usePermissions()

  const redirectTo = (url) => {
    navigate(url)
  }

  useEffect(() => {
    if (!hasPermission(PERMISSIONS.WORK_FRONT.VIEW)) {
      redirectTo('/inicio')
    }
  }, [])
  return (
    <div className="work-front-maintainer">
      <h2 className="title">Administrar Frentes de trabajo</h2>
      {visibleWorkFront && (
        <ModalAddWorkFront
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleWorkFront(data)
            await refetch()
          }}
        />
      )}

      {visibleRestoreWorkFront && (
        <ModalRestoreWorkFront
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleRestoreWorkFront(data)
            await refetch()
          }}
        />
      )}
      {hasPermission(PERMISSIONS.WORK_FRONT.CREATE) && (
        <CCard className="action-buttons">
          <CCardBody>
            <CButton className="btn-modal" onClick={() => setVisibleWorkFront(!visibleWorkFront)}>
              Añadir Frende de trabajo
            </CButton>
            <CButton
              className="btn-modal"
              onClick={() => setVisibleRestoreWorkFront(!visibleRestoreWorkFront)}
            >
              Ver eliminados
            </CButton>
          </CCardBody>
        </CCard>
      )}
      <CCard>
        <CCardBody>
          {isLoading || isRefetching ? <Skeleton count={5} /> : <WorkFrontList />}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default WorkFrontMaintainer

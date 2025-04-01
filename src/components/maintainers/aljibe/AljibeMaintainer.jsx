import { React, useEffect, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import ModalAddAljibe from './ModalAddAljibe'
import AljibeList from './AljibeList'
import useAljibe from 'src/hooks/useAljibe'
import ModalRestoreAljibe from './ModalRestoreAljibe'
import './css.scss'
import { useNavigate } from 'react-router-dom'
import { usePermissions } from 'src/providers/PermissionsProvider'

const AljibeMaintainer = () => {
  const { isLoading, refetch, isRefetching } = useAljibe()
  let navigate = useNavigate()

  const [visibleAljibe, setVisibleAljibe] = useState(false)
  const [visibleRestoreAljibe, setVisibleRestoreAljibe] = useState(false)

  const { hasPermission } = usePermissions()

  const redirectTo = (url) => {
    navigate(url)
  }

  useEffect(() => {
    if (!hasPermission('aljibe_create')) {
      redirectTo('/inicio')
    }
  }, [])

  return (
    <div className="aljibe-maintainer">
      <h2 className="title">Administrar Aljibes</h2>
      {visibleAljibe && (
        <ModalAddAljibe
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleAljibe(data)
            await refetch()
          }}
        />
      )}

      {visibleRestoreAljibe && (
        <ModalRestoreAljibe
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleRestoreAljibe(data)
            await refetch()
          }}
        />
      )}
      {hasPermission('directPersonal_create') && (
        <CCard className="action-buttons">
          <CCardBody>
            <CButton className="btn-modal" onClick={() => setVisibleAljibe(!visibleAljibe)}>
              Añadir Aljibe
            </CButton>
            <CButton
              className="btn-modal"
              onClick={() => setVisibleRestoreAljibe(!visibleRestoreAljibe)}
            >
              Ver eliminados
            </CButton>
          </CCardBody>
        </CCard>
      )}

      <CCard>
        <CCardBody>{isLoading || isRefetching ? <Skeleton count={5} /> : <AljibeList />}</CCardBody>
      </CCard>
    </div>
  )
}

export default AljibeMaintainer

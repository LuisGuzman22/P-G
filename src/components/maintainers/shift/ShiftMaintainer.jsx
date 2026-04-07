import { React, useEffect, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import './css.scss'
import useShift from 'src/hooks/useShift'
import ShiftList from './ShiftList'
import ModalAddShift from './ModalAddShift'
import ModalRestoreShift from './ModalRestoreShift'
import { useNavigate } from 'react-router-dom'
import { usePermissions } from 'src/providers/PermissionsProvider'
import { PERMISSIONS } from 'src/utils/contant'

const ShiftMaintainer = () => {
  const { isLoading, refetch, isRefetching } = useShift()
  let navigate = useNavigate()

  const [visibleShift, setVisibleShift] = useState(false)
  const [visibleRestoreShift, setVisibleRestoreShift] = useState(false)

  const { hasPermission } = usePermissions()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!hasPermission(PERMISSIONS.SHIFT.VIEW)) {
      navigate('/inicio')
    }
  }, [])

  return (
    <div className="shift-maintainer">
      <h2 className="title">Administrar Jornada</h2>
      {visibleShift && (
        <ModalAddShift
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleShift(data)
            await refetch()
          }}
        />
      )}

      {visibleRestoreShift && (
        <ModalRestoreShift
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleRestoreShift(data)
            await refetch()
          }}
        />
      )}

      {hasPermission(PERMISSIONS.SHIFT.CREATE) && (
        <CCard className="action-buttons">
          <CCardBody>
            <CButton className="btn-modal" onClick={() => setVisibleShift(!visibleShift)}>
              Añadir Jornada
            </CButton>
            <CButton
              className="btn-modal"
              onClick={() => setVisibleRestoreShift(!visibleRestoreShift)}
            >
              Ver eliminados
            </CButton>
          </CCardBody>
        </CCard>
      )}
      <CCard>
        <CCardBody>{isLoading || isRefetching ? <Skeleton count={5} /> : <ShiftList />}</CCardBody>
      </CCard>
    </div>
  )
}

export default ShiftMaintainer

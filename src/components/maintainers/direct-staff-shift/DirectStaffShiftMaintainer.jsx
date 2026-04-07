import { React, useEffect, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import './css.scss'
import useDirectStaffShift from 'src/hooks/useDirectStaffShift'
import DirectStaffShiftList from './DirectStaffShiftList'
import ModalAddDirectStaffShift from './ModalAddDirectStaffShift'
import ModalRestoreDirectStaffShift from './ModalRestoreDirectStaffShift'
import { usePermissions } from 'src/providers/PermissionsProvider'
import { useNavigate } from 'react-router-dom'
import { PERMISSIONS } from 'src/utils/contant'

const DirectStaffShiftMaintainer = () => {
  const { isLoading, refetch, isRefetching } = useDirectStaffShift()
  let navigate = useNavigate()

  const [visibleDirectStaffShift, setVisibleDirectStaffShift] = useState(false)
  const [visibleRestoreDirectStaffShift, setVisibleRestoreDirectStaffShift] = useState(false)

  const { hasPermission } = usePermissions()

  useEffect(() => {
    if (!hasPermission(PERMISSIONS.DIRECT_STAFF_SHIFT.VIEW)) {
      navigate('/inicio')
    }
  }, [hasPermission, navigate])

  return (
    <div className="direct-staff-shift-maintainer">
      <h2 className="title">Administrar Turnos personal directo</h2>
      {visibleDirectStaffShift && (
        <ModalAddDirectStaffShift
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleDirectStaffShift(data)
            await refetch()
          }}
        />
      )}

      {visibleRestoreDirectStaffShift && (
        <ModalRestoreDirectStaffShift
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleRestoreDirectStaffShift(data)
            await refetch()
          }}
        />
      )}
      {hasPermission(PERMISSIONS.DIRECT_STAFF_SHIFT.CREATE) && (
        <CCard className="action-buttons">
          <CCardBody>
            <CButton
              className="btn-modal"
              onClick={() => setVisibleDirectStaffShift(!visibleDirectStaffShift)}
            >
              Añadir Turno
            </CButton>
            <CButton
              className="btn-modal"
              onClick={() => setVisibleRestoreDirectStaffShift(!visibleRestoreDirectStaffShift)}
            >
              Ver eliminados
            </CButton>
          </CCardBody>
        </CCard>
      )}

      <CCard>
        <CCardBody>
          {isLoading || isRefetching ? <Skeleton count={5} /> : <DirectStaffShiftList />}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default DirectStaffShiftMaintainer

import { React, useEffect, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import './css.scss'
import useIndirectStaffShift from 'src/hooks/useIndirectStaffShift'
import IndirectStaffShiftList from './IndirectStaffShiftList'
import ModalAddIndirectStaffShift from './ModalAddIndirectStaffShift'
import ModalRestoreIndirectStaffShift from './ModalRestoreIndirectStaffShift'
import { useNavigate } from 'react-router-dom'
import { usePermissions } from 'src/providers/PermissionsProvider'

const IndirectStaffShiftMaintainer = () => {
  const { isLoading, refetch, isRefetching } = useIndirectStaffShift()

  let navigate = useNavigate()

  const [visibleIndirectStaffShift, setVisibleIndirectStaffShift] = useState(false)
  const [visibleRestoreIndirectStaffShift, setVisibleRestoreIndirectStaffShift] = useState(false)

  const { hasPermission } = usePermissions()

  const redirectTo = (url) => {
    navigate(url)
  }

  useEffect(() => {
    if (!hasPermission('indirectStaffShift_create')) {
      redirectTo('/inicio')
    }
  }, [])

  return (
    <div className="indirect-staff-shift-maintainer">
      <h2 className="title">Administrar Turnos personal indirecto</h2>
      {visibleIndirectStaffShift && (
        <ModalAddIndirectStaffShift
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleIndirectStaffShift(data)
            await refetch()
          }}
        />
      )}

      {visibleRestoreIndirectStaffShift && (
        <ModalRestoreIndirectStaffShift
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleRestoreIndirectStaffShift(data)
            await refetch()
          }}
        />
      )}

      {hasPermission('indirectStaffShift_create') && (
        <CCard className="action-buttons">
          <CCardBody>
            <CButton
              className="btn-modal"
              onClick={() => setVisibleIndirectStaffShift(!visibleIndirectStaffShift)}
            >
              Añadir Turno
            </CButton>
            <CButton
              className="btn-modal"
              onClick={() => setVisibleRestoreIndirectStaffShift(!visibleRestoreIndirectStaffShift)}
            >
              Ver eliminados
            </CButton>
          </CCardBody>
        </CCard>
      )}

      <CCard>
        <CCardBody>
          {isLoading || isRefetching ? <Skeleton count={5} /> : <IndirectStaffShiftList />}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default IndirectStaffShiftMaintainer

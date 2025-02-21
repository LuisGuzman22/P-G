import { React, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import './css.scss'
import useIndirectStaffShift from 'src/hooks/useIndirectStaffShift'
import IndirectStaffShiftList from './IndirectStaffShiftList'
import ModalAddIndirectStaffShift from './ModalAddIndirectStaffShift'
import ModalRestoreIndirectStaffShift from './ModalRestoreIndirectStaffShift'

const IndirectStaffShiftMaintainer = () => {
  const { isLoading, refetch, isRefetching } = useIndirectStaffShift()

  const [visibleIndirectStaffShift, setVisibleIndirectStaffShift] = useState(false)
  const [visibleRestoreIndirectStaffShift, setVisibleRestoreIndirectStaffShift] = useState(false)

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
      <CCard>
        <CCardBody>
          {isLoading || isRefetching ? <Skeleton count={5} /> : <IndirectStaffShiftList />}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default IndirectStaffShiftMaintainer

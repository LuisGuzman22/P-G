import { React, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import './css.scss'
import useDirectStaffShift from 'src/hooks/useDirectStaffShift'
import DirectStaffShiftList from './DirectStaffShiftList'
import ModalAddDirectStaffShift from './ModalAddDirectStaffShift'
import ModalRestoreDirectStaffShift from './ModalRestoreDirectStaffShift'

const DirectStaffShiftMaintainer = () => {
  const { isLoading, refetch, isRefetching } = useDirectStaffShift()

  const [visibleDirectStaffShift, setVisibleDirectStaffShift] = useState(false)
  const [visibleRestoreDirectStaffShift, setVisibleRestoreDirectStaffShift] = useState(false)

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
      <CCard>
        <CCardBody>
          {isLoading || isRefetching ? <Skeleton count={5} /> : <DirectStaffShiftList />}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default DirectStaffShiftMaintainer

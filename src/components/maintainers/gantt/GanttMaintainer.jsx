import { React, useEffect, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import './css.scss'
import useTechnicalDoc from 'src/hooks/useTechnicalDoc'
import CarouselList from './GanttList'
import ModalAddGantt from './ModalAddGantt'
import useCarousel from 'src/hooks/useCarousel'
import { usePermissions } from 'src/providers/PermissionsProvider'
import { useNavigate } from 'react-router-dom'
import { PERMISSIONS } from 'src/utils/contant'
import GanttList from './GanttList'
import useGantt from 'src/hooks/useGantt'

const GanttMaintainer = () => {
  const { isLoading, refetch, isRefetching } = useGantt()
  let navigate = useNavigate()

  const [visibleCategory, setVisibleCategory] = useState(false)

  const { hasPermission } = usePermissions()

  const redirectTo = (url) => {
    navigate(url)
  }

  useEffect(() => {
    if (!hasPermission(PERMISSIONS.GANTT.VIEW)) {
      redirectTo('/inicio')
    }
  }, [])

  return (
    <div className="technical-doc-maintainer">
      <h2 className="title">Administrar Gantt</h2>

      {visibleCategory && (
        <ModalAddGantt
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleCategory(data)
            // await categoryRefetch()
          }}
        />
      )}

      <CCard className="action-buttons">
        <CCardBody>
          <CButton className="btn-modal" onClick={() => setVisibleCategory(!visibleCategory)}>
            Añadir Gantt
          </CButton>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>{isLoading || isRefetching ? <Skeleton count={5} /> : <GanttList />}</CCardBody>
      </CCard>
    </div>
  )
}

export default GanttMaintainer

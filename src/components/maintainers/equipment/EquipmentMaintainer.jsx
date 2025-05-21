import { React, useEffect, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import useEquipment from 'src/hooks/useEquipment'
import EquipmentList from './EquipmentList'
import ModalAddEquipment from './ModalAddEquipment'
import ModalRestoreEquipment from './ModalRestoreEquipment'
import './css.scss'
import { usePermissions } from 'src/providers/PermissionsProvider'
import { useNavigate } from 'react-router-dom'
import { PERMISSIONS } from 'src/utils/contant'

const EquipmentMaintainer = () => {
  const { isLoading, refetch, isRefetching, data } = useEquipment()
  let navigate = useNavigate()

  const [visibleEquipment, setVisibleEquipment] = useState(false)
  const [visibleRestoreEquipment, setVisibleRestoreEquipment] = useState(false)

  const { hasPermission } = usePermissions()

  const redirectTo = (url) => {
    navigate(url)
  }

  useEffect(() => {
    if (!hasPermission(PERMISSIONS.EQUIPMENT.VIEW)) {
      redirectTo('/inicio')
    }
  }, [])

  return (
    <div className="equipment-maintainer">
      <h2 className="title">Administrar Equipos</h2>
      {visibleEquipment && (
        <ModalAddEquipment
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleEquipment(data)
            await refetch()
          }}
        />
      )}

      {visibleRestoreEquipment && (
        <ModalRestoreEquipment
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleRestoreEquipment(data)
            await refetch()
          }}
        />
      )}
      {hasPermission(PERMISSIONS.EQUIPMENT.CREATE) === true && (
        <CCard className="action-buttons">
          <CCardBody>
            <CButton className="btn-modal" onClick={() => setVisibleEquipment(!visibleEquipment)}>
              Añadir Equipos
            </CButton>
            <CButton
              className="btn-modal"
              onClick={() => setVisibleRestoreEquipment(!visibleRestoreEquipment)}
            >
              Ver eliminados
            </CButton>
          </CCardBody>
        </CCard>
      )}

      <CCard>
        <CCardBody>
          {isLoading || isRefetching ? <Skeleton count={5} /> : <EquipmentList />}
          {!data && <p>No hay equipos registrados</p>}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default EquipmentMaintainer

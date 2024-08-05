import { React, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
// import ModalAddMachinery from './ModalAddMachinery'
import Skeleton from 'react-loading-skeleton'
import useEquipment from 'src/hooks/useEquipment'
import EquipmentList from './EquipmentList'
import ModalAddEquipment from './ModalAddEquipment'
import ModalRestoreEquipment from './ModalRestoreEquipment'

const EquipmentMaintainer = () => {
  const { isLoading, refetch, isRefetching } = useEquipment()

  const [visibleEquipment, setVisibleEquipment] = useState(false)
  const [visibleRestoreEquipment, setVisibleRestoreEquipment] = useState(false)

  return (
    <div className="proyect-administration">
      <h2>Administrar Equipos</h2>
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
      <CCard className="action-buttons">
        <CCardBody>
          <CButton onClick={() => setVisibleEquipment(!visibleEquipment)}>Añadir Equipos</CButton>
          <CButton onClick={() => setVisibleRestoreEquipment(!visibleRestoreEquipment)}>
            Ver eliminados
          </CButton>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          {isLoading || isRefetching ? <Skeleton count={5} /> : <EquipmentList />}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default EquipmentMaintainer

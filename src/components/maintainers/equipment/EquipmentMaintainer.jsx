import { React, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
// import ModalAddMachinery from './ModalAddMachinery'
import Skeleton from 'react-loading-skeleton'
import useEquipment from 'src/hooks/useEquipment'
import EquipmentList from './EquipmentList'
import ModalAddEquipment from './ModalAddEquipment'

const EquipmentMaintainer = () => {
  const { isLoading, refetch, isRefetching } = useEquipment()

  const [visibleEquipment, setVisibleEquipment] = useState(false)

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
      <CCard className="action-buttons">
        <CCardBody>
          <CButton onClick={() => setVisibleEquipment(!visibleEquipment)}>Añadir Equipos</CButton>
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

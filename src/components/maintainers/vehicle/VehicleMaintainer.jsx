import { React, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
// import ModalAddMachinery from './ModalAddMachinery'
import Skeleton from 'react-loading-skeleton'
import useVehicle from 'src/hooks/useVehicle'
import VehicleList from './VehicleList'
import ModalAddVehicle from './ModalAddVehicle'
import ModalRestoreVehicle from './ModalRestoreVehicle'

const VehicleMaintainer = () => {
  const { isLoading, refetch, isRefetching } = useVehicle()

  const [visibleVehicle, setVisibleVehicle] = useState(false)
  const [visibleRestoreVehicle, setVisibleRestoreVehicle] = useState(false)

  return (
    <div className="proyect-administration">
      <h2>Administrar Vehículos</h2>
      {visibleVehicle && (
        <ModalAddVehicle
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleVehicle(data)
            await refetch()
          }}
        />
      )}

      {visibleRestoreVehicle && (
        <ModalRestoreVehicle
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleRestoreVehicle(data)
            await refetch()
          }}
        />
      )}
      <CCard className="action-buttons">
        <CCardBody>
          <CButton onClick={() => setVisibleVehicle(!visibleVehicle)}>Añadir Vehículo</CButton>
          <CButton onClick={() => setVisibleRestoreVehicle(!visibleRestoreVehicle)}>
            Ver eliminados
          </CButton>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          {isLoading || isRefetching ? <Skeleton count={5} /> : <VehicleList />}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default VehicleMaintainer

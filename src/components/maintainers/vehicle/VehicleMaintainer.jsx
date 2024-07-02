import { React, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
// import ModalAddMachinery from './ModalAddMachinery'
import Skeleton from 'react-loading-skeleton'
import useVehicle from 'src/hooks/useVehicle'
import VehicleList from './VehicleList'
import ModalAddVehicle from './ModalAddVehicle'

const VehicleMaintainer = () => {
  const { isLoading, refetch, isRefetching } = useVehicle()

  const [visibleCategories, setVisibleCategories] = useState(false)
  const [visibleVehicle, setVisibleVehicle] = useState(false)

  return (
    <div className="proyect-administration">
      <h2>Administrar Vehiculos</h2>
      {visibleVehicle && (
        <ModalAddVehicle
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleVehicle(data)
            await refetch()
          }}
        />
      )}
      <CCard className="action-buttons">
        <CCardBody>
          <CButton onClick={() => setVisibleVehicle(!visibleVehicle)}>Añadir Vehículo</CButton>
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

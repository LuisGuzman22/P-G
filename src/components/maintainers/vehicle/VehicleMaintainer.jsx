import { React, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import useVehicle from 'src/hooks/useVehicle'
import VehicleList from './VehicleList'
import ModalAddVehicle from './ModalAddVehicle'
import ModalRestoreVehicle from './ModalRestoreVehicle'
import './css.scss'

const VehicleMaintainer = () => {
  const { isLoading, refetch, isRefetching } = useVehicle()

  const [visibleVehicle, setVisibleVehicle] = useState(false)
  const [visibleRestoreVehicle, setVisibleRestoreVehicle] = useState(false)

  return (
    <div className="vehicle-maintainer">
      <h2 className="title">Administrar Vehículos</h2>
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
          <CButton className="btn-modal" onClick={() => setVisibleVehicle(!visibleVehicle)}>
            Añadir Vehículo
          </CButton>
          <CButton
            className="btn-modal"
            onClick={() => setVisibleRestoreVehicle(!visibleRestoreVehicle)}
          >
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

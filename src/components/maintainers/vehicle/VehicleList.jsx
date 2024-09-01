import React, { useState } from 'react'
import {
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import useMachinery from 'src/hooks/useMachinery'
import useVehicle from 'src/hooks/useVehicle'
import ModalAddVehicle from './ModalAddVehicle'
// import ModalAddMachinery from './ModalAddMachinery'

const VehicleList = () => {
  const { getData } = useGetCachedQueryData()
  const vehicleQuery = getData('vehicle')
  const { deleteVehicle } = useVehicle()

  const [visibleVehicle, setVisibleVehicle] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState()

  const getPlates = (plates) => {
    const platesJoin = []

    plates.forEach((plate) => {
      platesJoin.push(plate.label)
    })
    return platesJoin.join(' - ')
  }

  const handleEditVehicle = (vehicle) => {
    setSelectedVehicle(vehicle)
    setVisibleVehicle(!visibleVehicle)
  }

  return (
    <>
      {visibleVehicle && (
        <ModalAddVehicle
          visible={true}
          selectedVehicle={selectedVehicle}
          sendDataToParent={async (data) => {
            // await refetch()
            setVisibleVehicle(data)
          }}
        />
      )}
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">ID</CTableHeaderCell>
            <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
            <CTableHeaderCell scope="col">Patentes</CTableHeaderCell>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {vehicleQuery
            ?.filter((vehicle) => vehicle.deleted_at === null)
            .map((vehicle, index) => {
              const plates = getPlates(vehicle.plate)
              return (
                <CTableRow key={vehicle.id}>
                  <CTableDataCell scope="row">{vehicle.id}</CTableDataCell>
                  <CTableDataCell>{vehicle.name}</CTableDataCell>
                  <CTableDataCell>{plates}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      className="btn-action-edit"
                      onClick={() => {
                        handleEditVehicle(vehicle)
                      }}
                    >
                      <CIcon icon={cilPencil} />
                    </CButton>
                    <CButton
                      className="btn-action-delete"
                      onClick={() => {
                        deleteVehicle(vehicle.id)
                      }}
                    >
                      <CIcon icon={cilTrash} />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
    </>
  )
}

export default VehicleList

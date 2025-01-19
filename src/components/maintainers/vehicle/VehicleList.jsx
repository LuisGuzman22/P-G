import React, { useEffect, useState } from 'react'
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

import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es'

import { MenuItem } from '@mui/material'

// import ModalAddMachinery from './ModalAddMachinery'

const VehicleList = () => {
  const { getData } = useGetCachedQueryData()
  const vehicleQuery = getData('vehicle')
  const { deleteVehicle } = useVehicle()

  const [visibleVehicle, setVisibleVehicle] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState()
  const [vehicleData, setVehicleData] = useState([])

  useEffect(() => {
    let veh = []
    vehicleQuery
      ?.filter((vehicle) => vehicle.deleted_at === null)
      .map((vehicle) => {
        const plates = getPlates(vehicle.plate)
        veh.push({
          id: vehicle.id,
          name: vehicle.name,
          plates: plates,
          plate: vehicle.plate,
        })
      })
    setVehicleData(veh)
  }, [vehicleQuery])

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

  const columns = [
    {
      accessorKey: 'id', //access nested data with dot notation
      header: 'ID',
      size: 10,
      // enableColumnFilter: false,
    },
    {
      accessorKey: 'name',
      header: 'Nombre',
    },
    {
      accessorKey: 'plates',
      header: 'Patentes',
    },
    {
      header: 'Acciones',
      Cell: (data) => (
        <>
          <CButton
            className="btn-action-edit"
            onClick={() => {
              handleEditVehicle(data.row.original)
            }}
          >
            <CIcon icon={cilPencil} />
          </CButton>
          <CButton
            className="btn-action-delete"
            onClick={() => {
              deleteVehicle(data.row.original.id)
            }}
          >
            <CIcon icon={cilTrash} />
          </CButton>
        </>
      ),
    },
  ]

  const table = useMaterialReactTable({
    columns,
    data: vehicleData ? vehicleData : [],
    enableColumnActions: false,
    enableSorting: true,
    enableColumnFilters: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableHiding: false,
    enableCellActions: false,
    // muiTableHeadCellProps: {
    //   sx: {
    //     backgroundColor: 'red',
    //   },
    // },
    muiPaginationProps: {
      color: 'primary',
      shape: 'rounded',
      showRowsPerPage: false,
      variant: 'outlined',
    },
    initialState: {
      pagination: {
        pageSize: 5,
        pageIndex: 0,
      },
    },
    paginationDisplayMode: 'pages',
    enableRowActions: false,
    positionActionsColumn: 'last',
    renderRowActionMenuItems: ({ row }) => [
      <MenuItem
        key="edit"
        onClick={() => {
          handleEditVehicle(row.original)
        }}
      >
        Editar
      </MenuItem>,
      <MenuItem key="delete" onClick={() => deleteVehicle(row.original.id)}>
        Eliminar
      </MenuItem>,
    ],
    localization: MRT_Localization_ES,
  })

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
      <MaterialReactTable table={table} />
    </>
  )
}

export default VehicleList

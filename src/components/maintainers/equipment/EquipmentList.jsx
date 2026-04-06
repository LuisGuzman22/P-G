import React, { useEffect, useState } from 'react'
import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import useEquipment from 'src/hooks/useEquipment'
import ModalAddEquipment from './ModalAddEquipment'
import './css.scss'

import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es'

import { MenuItem } from '@mui/material'
import { usePermissions } from 'src/providers/PermissionsProvider'
import { PERMISSIONS } from 'src/utils/contant'

const EquipmentList = () => {
  const { getData } = useGetCachedQueryData()
  const equipmentQuery = getData('equipment')
  const { deleteEquipment } = useEquipment()
  const { hasPermission } = usePermissions()

  const [visibleEquipment, setVisibleEquipment] = useState(false)
  const [selectedEquipment, setSelectedEquipment] = useState()
  const [equipmentData, setEquipmentData] = useState([])

  const getPlates = (plates) => {
    const platesJoin = []

    plates.forEach((plate) => {
      platesJoin.push(plate.label)
    })
    return platesJoin.join(' - ')
  }

  const handleEditEquipmennt = (equipment) => {
    setSelectedEquipment(equipment)
    setVisibleEquipment(!visibleEquipment)
  }

  useEffect(() => {
    let equip = []
    equipmentQuery
      ?.filter((equipment) => equipment.deleted_at === null)
      .map((equipment) => {
        const plates = getPlates(equipment.plate)
        equip.push({
          id: equipment.id,
          name: equipment.name,
          plates: plates,
          plate: equipment.plate,
        })
      })
    setEquipmentData(equip)
  }, [equipmentQuery])

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
          {hasPermission(PERMISSIONS.EQUIPMENT.UPDATE) && (
            <CButton
              className="btn-action-edit"
              onClick={() => {
                handleEditEquipmennt(data.row.original)
              }}
            >
              <CIcon icon={cilPencil} />
            </CButton>
          )}

          {hasPermission(PERMISSIONS.EQUIPMENT.DELETE) && (
            <CButton
              className="btn-action-delete"
              onClick={() => {
                deleteEquipment(data.row.original.id)
              }}
            >
              <CIcon icon={cilTrash} />
            </CButton>
          )}
        </>
      ),
    },
  ]

  const table = useMaterialReactTable({
    columns,
    data: equipmentData ? equipmentData : [],
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
          handleEditEquipmennt(row.original)
        }}
      >
        Editar
      </MenuItem>,
      <MenuItem key="delete" onClick={() => deleteEquipment(row.original.id)}>
        Eliminar
      </MenuItem>,
    ],
    localization: MRT_Localization_ES,
  })

  return (
    <>
      {visibleEquipment && (
        <ModalAddEquipment
          visible={true}
          selectedEquipment={selectedEquipment}
          sendDataToParent={async (data) => {
            // await refetch()
            setVisibleEquipment(data)
          }}
        />
      )}
      <MaterialReactTable table={table} />
    </>
  )
}

export default EquipmentList

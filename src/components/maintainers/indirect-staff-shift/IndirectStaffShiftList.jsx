import React, { useEffect, useState } from 'react'
import { CButton, CTable } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import './css.scss'

import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es'

import { MenuItem } from '@mui/material'
import useShift from 'src/hooks/useShift'
import ModalAddIndirectStaffShift from './ModalAddIndirectStaffShift'
import useIndirectStaffShift from 'src/hooks/useIndirectStaffShift'
import { usePermissions } from 'src/providers/PermissionsProvider'
import { PERMISSIONS } from 'src/utils/contant'

const IndirectStaffShiftList = () => {
  const { getData } = useGetCachedQueryData()
  const indirectStaffShiftQuery = getData('indirect_staff_shift')
  const { deleteIndirectStaffShift } = useIndirectStaffShift()

  const { hasPermission } = usePermissions()

  const [visibleIndirectStaffShift, setVisibleIndirectStaffShift] = useState(false)
  const [selectedIndirectStaffShift, setSelectedIndirectStaffShift] = useState()
  const [indirectStaffShiftData, setIndirectStaffShiftData] = useState([])

  const handleEditIndirectStaffShift = (indirectStaffShift) => {
    setSelectedIndirectStaffShift(indirectStaffShift)
    setVisibleIndirectStaffShift(!visibleIndirectStaffShift)
  }

  useEffect(() => {
    const shif = []
    indirectStaffShiftQuery
      ?.filter((shift) => shift.deleted_at === null)
      .forEach((shift) => {
        shif.push({
          id: shift.id,
          name: shift.name,
        })
      })
    setIndirectStaffShiftData(shif)
  }, [indirectStaffShiftQuery])

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
      header: 'Acciones',
      Cell: (data) => (
        <>
          {hasPermission(PERMISSIONS.INDIRECT_STAFF_SHIFT.UPDATE) && (
            <CButton
              className="btn-action-edit"
              onClick={() => {
                handleEditIndirectStaffShift(data.row.original)
              }}
            >
              <CIcon icon={cilPencil} />
            </CButton>
          )}

          {hasPermission(PERMISSIONS.INDIRECT_STAFF_SHIFT.DELETE) && (
            <CButton
              className="btn-action-delete"
              onClick={() => {
                deleteIndirectStaffShift(data.row.original.id)
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
    data: indirectStaffShiftData ? indirectStaffShiftData : [],
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
          handleEditIndirectStaffShift(row.original)
        }}
      >
        Editar
      </MenuItem>,
      <MenuItem key="delete" onClick={() => deleteIndirectStaffShift(row.original.id)}>
        Eliminar
      </MenuItem>,
    ],
    localization: MRT_Localization_ES,
  })

  return (
    <>
      {visibleIndirectStaffShift && (
        <ModalAddIndirectStaffShift
          visible={true}
          selectedIndirectStaffShift={selectedIndirectStaffShift}
          sendDataToParent={async (data) => {
            // await refetch()
            setVisibleIndirectStaffShift(data)
          }}
        />
      )}
      <MaterialReactTable table={table} />
    </>
  )
}

export default IndirectStaffShiftList

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
import ModalAddEquipment from './ModalAddRestriction'
import './css.scss'

import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es'

import { MenuItem } from '@mui/material'
import useRestriction from 'src/hooks/useRestriction'
import ModalAddRestriction from './ModalAddRestriction'
import { usePermissions } from 'src/providers/PermissionsProvider'

const RestrictionList = () => {
  const { getData } = useGetCachedQueryData()
  const restrictionQuery = getData('restriction')
  const { deleteRestriction } = useRestriction()

  const { hasPermission } = usePermissions()

  const [visibleRestriction, setVisibleRestriction] = useState(false)
  const [selectedRestriction, setSelectedRestriction] = useState()
  const [restrictionData, setRestrictionData] = useState([])

  const handleEditRestriction = (restriction) => {
    setSelectedRestriction(restriction)
    setVisibleRestriction(!visibleRestriction)
  }

  useEffect(() => {
    let restrict = []
    restrictionQuery.map((restriction) => {
      restrict.push({
        id: restriction.id,
        name: restriction.name,
      })
    })
    setRestrictionData(restrict)
  }, [restrictionQuery])

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
          {hasPermission('restriction_update') && (
            <CButton
              className="btn-action-edit"
              onClick={() => {
                handleEditRestriction(data.row.original)
              }}
            >
              <CIcon icon={cilPencil} />
            </CButton>
          )}

          {hasPermission('restriction_delete') && (
            <CButton
              className="btn-action-delete"
              onClick={() => {
                deleteRestriction(data.row.original.id)
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
    data: restrictionData ? restrictionData : [],
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
          handleEditRestriction(row.original)
        }}
      >
        Editar
      </MenuItem>,
      <MenuItem key="delete" onClick={() => deleteRestriction(row.original.id)}>
        Eliminar
      </MenuItem>,
    ],
    localization: MRT_Localization_ES,
  })

  return (
    <>
      {visibleRestriction && (
        <ModalAddRestriction
          visible={true}
          selectedRestriction={selectedRestriction}
          sendDataToParent={async (data) => {
            // await refetch()
            setVisibleRestriction(data)
          }}
        />
      )}
      <MaterialReactTable table={table} />
    </>
  )
}

export default RestrictionList

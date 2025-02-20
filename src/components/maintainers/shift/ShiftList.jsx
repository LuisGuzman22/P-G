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
import './css.scss'

import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es'

import { MenuItem } from '@mui/material'
import useShift from 'src/hooks/useShift'
import ModalAddShift from './ModalAddShift'

const ShiftList = () => {
  const { getData } = useGetCachedQueryData()
  const shiftQuery = getData('shifts')
  const { deleteShift } = useShift()

  const [visibleShift, setVisibleShift] = useState(false)
  const [selectedShift, setSelectedShift] = useState()
  const [shiftData, setShiftData] = useState([])

  const handleEditShift = (shift) => {
    setSelectedShift(shift)
    setVisibleShift(!visibleShift)
  }

  useEffect(() => {
    let shif = []
    shiftQuery
      ?.filter((shift) => shift.deleted_at === null)
      .map((shift) => {
        shif.push({
          id: shift.id,
          name: shift.name,
        })
      })
    setShiftData(shif)
  }, [shiftQuery])

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
          <CButton
            className="btn-action-edit"
            onClick={() => {
              handleEditShift(data.row.original)
            }}
          >
            <CIcon icon={cilPencil} />
          </CButton>
          <CButton
            className="btn-action-delete"
            onClick={() => {
              deleteShift(data.row.original.id)
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
    data: shiftData ? shiftData : [],
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
          handleEditShift(row.original)
        }}
      >
        Editar
      </MenuItem>,
      <MenuItem key="delete" onClick={() => deleteShift(row.original.id)}>
        Eliminar
      </MenuItem>,
    ],
    localization: MRT_Localization_ES,
  })

  return (
    <>
      {visibleShift && (
        <ModalAddShift
          visible={true}
          selectedShift={selectedShift}
          sendDataToParent={async (data) => {
            // await refetch()
            setVisibleShift(data)
          }}
        />
      )}
      <MaterialReactTable table={table} />
    </>
  )
}

export default ShiftList

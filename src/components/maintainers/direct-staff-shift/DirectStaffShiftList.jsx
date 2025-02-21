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
import useDirectStaffShift from 'src/hooks/useDirectStaffShift'
import ModalAddDirectStaffShift from './ModalAddDirectStaffShift'

const DirectStaffShiftList = () => {
  const { getData } = useGetCachedQueryData()
  const directStaffShiftQuery = getData('direct_staff_shift')
  const { deleteDirectStaffShift } = useDirectStaffShift()

  const [visibleDirectStaffShift, setVisibleDirectStaffShift] = useState(false)
  const [selectedDirectStaffShift, setSelectedDirectStaffShift] = useState()
  const [directStaffShiftData, setDirectStaffShiftData] = useState([])

  const handleEditDirectStaffShift = (directStaffShift) => {
    setSelectedDirectStaffShift(directStaffShift)
    setVisibleDirectStaffShift(!visibleDirectStaffShift)
  }

  useEffect(() => {
    let shif = []
    directStaffShiftQuery
      ?.filter((shift) => shift.deleted_at === null)
      .map((shift) => {
        shif.push({
          id: shift.id,
          name: shift.name,
        })
      })
    setDirectStaffShiftData(shif)
  }, [directStaffShiftData])

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
              handleEditDirectStaffShift(data.row.original)
            }}
          >
            <CIcon icon={cilPencil} />
          </CButton>
          <CButton
            className="btn-action-delete"
            onClick={() => {
              deleteDirectStaffShift(data.row.original.id)
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
    data: directStaffShiftData ? directStaffShiftData : [],
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
          handleEditDirectStaffShift(row.original)
        }}
      >
        Editar
      </MenuItem>,
      <MenuItem key="delete" onClick={() => deleteDirectStaffShift(row.original.id)}>
        Eliminar
      </MenuItem>,
    ],
    localization: MRT_Localization_ES,
  })

  return (
    <>
      {visibleDirectStaffShift && (
        <ModalAddDirectStaffShift
          visible={true}
          selectedDirectStaffShift={selectedDirectStaffShift}
          sendDataToParent={async (data) => {
            // await refetch()
            setVisibleDirectStaffShift(data)
          }}
        />
      )}
      <MaterialReactTable table={table} />
    </>
  )
}

export default DirectStaffShiftList

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
import useWorkFront from 'src/hooks/useWorkFront'
import ModalAddWorkFront from './ModalAddWorkFront'
import { usePermissions } from 'src/providers/PermissionsProvider'
import { PERMISSIONS } from 'src/utils/contant'

const WorkFrontList = () => {
  const { getData } = useGetCachedQueryData()
  const workFrontQuery = getData('workFront')
  const { deleteWorkFront } = useWorkFront()

  const { hasPermission } = usePermissions()

  const [visibleWorkFront, setVisibleWorkFront] = useState(false)
  const [selectedWorkFront, setSelectedWorkFront] = useState()
  const [workFrontData, setWorkFrontData] = useState([])

  const handleEditWorkFront = (workFront) => {
    console.log('workFront', workFront)
    setSelectedWorkFront(workFront)
    setVisibleWorkFront(!visibleWorkFront)
  }

  useEffect(() => {
    let wf = []
    workFrontQuery
      ?.filter((work) => work.deleted_at === null)
      .map((work) => {
        wf.push({
          id: work.id,
          name: work.name,
          hasSubFront: work.hasSubFront,
        })
      })
    setWorkFrontData(wf)
  }, [workFrontQuery])

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
    // {
    //   accessorKey: 'hasSubFront',
    //   header: 'Sub frente de trabajo',
    // },
    {
      header: 'Acciones',
      Cell: (data) => (
        <>
          {hasPermission(PERMISSIONS.WORK_FRONT.UPDATE) && (
            <CButton
              className="btn-action-edit"
              onClick={() => {
                handleEditWorkFront(data.row.original)
              }}
            >
              <CIcon icon={cilPencil} />
            </CButton>
          )}

          {hasPermission(PERMISSIONS.WORK_FRONT.DELETE) && (
            <CButton
              className="btn-action-delete"
              onClick={() => {
                deleteWorkFront(data.row.original.id)
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
    data: workFrontData ? workFrontData : [],
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
          handleEditWorkFront(row.original)
        }}
      >
        Editar
      </MenuItem>,
      <MenuItem key="delete" onClick={() => deleteWorkFront(row.original.id)}>
        Eliminar
      </MenuItem>,
    ],
    localization: MRT_Localization_ES,
  })

  return (
    <>
      {visibleWorkFront && (
        <ModalAddWorkFront
          visible={true}
          selectedWorkFront={selectedWorkFront}
          sendDataToParent={async (data) => {
            // await refetch()
            setVisibleWorkFront(data)
          }}
        />
      )}
      <MaterialReactTable table={table} />
    </>
  )
}

export default WorkFrontList

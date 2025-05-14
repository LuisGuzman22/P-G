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
import useDirectPersonal from 'src/hooks/useDirectPersonal'
import ModalAddDirectPersonal from './ModalAddDirectPersonal'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MenuItem } from '@mui/material'
import { MRT_Localization_ES } from 'material-react-table/locales/es'
import { usePermissions } from 'src/providers/PermissionsProvider'
import { PERMISSIONS } from 'src/utils/contant'

const DirectPersonalList = () => {
  const { getData } = useGetCachedQueryData()
  const directPersonalQuery = getData('direct-personal')
  const { deleteDirectPersonal } = useDirectPersonal()

  const [visibleDirectPersonal, setVisibleDirectPersonal] = useState(false)
  const [selectedDirectPersonal, setSelectedDirectPersonal] = useState()
  const [directPersonalData, setDirectPersonalData] = useState([])

  const { hasPermission } = usePermissions()

  const handleEditDirectPersonal = (directPersonal) => {
    setSelectedDirectPersonal(directPersonal)
    setVisibleDirectPersonal(!visibleDirectPersonal)
  }

  useEffect(() => {
    let dir = []
    directPersonalQuery
      ?.filter((dp) => dp.deleted_at === null)
      .map((dp) => {
        dir.push({
          id: dp.id,
          name: dp.name,
        })
      })
    setDirectPersonalData(dir)
  }, [directPersonalQuery])

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
          {hasPermission(PERMISSIONS.DIRECT_PERSONAL.UPDATE) && (
            <>
              <CButton
                className="btn-action-edit"
                onClick={() => {
                  handleEditDirectPersonal(data.row.original)
                }}
              >
                <CIcon icon={cilPencil} />
              </CButton>
            </>
          )}
          {hasPermission(PERMISSIONS.DIRECT_PERSONAL.DELETE) && (
            <>
              <CButton
                className="btn-action-delete"
                onClick={() => {
                  deleteDirectPersonal(data.row.original.id)
                }}
              >
                <CIcon icon={cilTrash} />
              </CButton>
            </>
          )}
        </>
      ),
    },
  ]

  const table = useMaterialReactTable({
    columns,
    data: directPersonalData ? directPersonalData : [],
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
          handleEditDirectPersonal(row.original)
        }}
      >
        Editar
      </MenuItem>,
      <MenuItem key="delete" onClick={() => deleteDirectPersonal(row.original.id)}>
        Eliminar
      </MenuItem>,
    ],
    localization: MRT_Localization_ES,
  })

  return (
    <>
      {visibleDirectPersonal && (
        <ModalAddDirectPersonal
          visible={true}
          selectedDirectPersonal={selectedDirectPersonal}
          sendDataToParent={async (data) => {
            // await refetch()
            setVisibleDirectPersonal(data)
          }}
        />
      )}
      <MaterialReactTable table={table} />
    </>
  )
}

export default DirectPersonalList

import React, { useEffect, useState } from 'react'
import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import ModalAddIndirectPersonal from './ModalAddIndirectPersonal'
import useIndirectPersonal from 'src/hooks/useIndirectPersonal'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MenuItem } from '@mui/material'
import { MRT_Localization_ES } from 'material-react-table/locales/es'
import { usePermissions } from 'src/providers/PermissionsProvider'
import { PERMISSIONS } from 'src/utils/contant'

const IndirectPersonalList = () => {
  const { getData } = useGetCachedQueryData()
  const indirectPersonalQuery = getData('indirect-personal')
  const { deleteIndirectPersonal } = useIndirectPersonal()

  const { hasPermission } = usePermissions()

  const [visibleIndirectPersonal, setVisibleIndirectPersonal] = useState(false)
  const [selectedIndirectPersonal, setSelectedIndirectPersonal] = useState()
  const [indirectPersonalData, setIndirectPersonalData] = useState([])

  const handleEditIndirectPersonal = (indirectPersonal) => {
    setSelectedIndirectPersonal(indirectPersonal)
    setVisibleIndirectPersonal(!visibleIndirectPersonal)
  }

  useEffect(() => {
    const ind = []
    indirectPersonalQuery
      ?.filter((idp) => idp.deleted_at === null)
      .forEach((idp) => {
        ind.push({
          id: idp.id,
          name: idp.name,
        })
      })
    setIndirectPersonalData(ind)
  }, [indirectPersonalQuery])

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
          {hasPermission(PERMISSIONS.INDIRECT_PERSONAL.UPDATE) && (
            <CButton
              className="btn-action-edit"
              onClick={() => {
                handleEditIndirectPersonal(data.row.original)
              }}
            >
              <CIcon icon={cilPencil} />
            </CButton>
          )}
          {hasPermission(PERMISSIONS.INDIRECT_PERSONAL.DELETE) && (
            <CButton
              className="btn-action-delete"
              onClick={() => {
                deleteIndirectPersonal(data.row.original.id)
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
    data: indirectPersonalData ? indirectPersonalData : [],
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
          handleEditIndirectPersonal(row.original)
        }}
      >
        Editar
      </MenuItem>,
      <MenuItem key="delete" onClick={() => deleteIndirectPersonal(row.original.id)}>
        Eliminar
      </MenuItem>,
    ],
    localization: MRT_Localization_ES,
  })

  return (
    <>
      {visibleIndirectPersonal && (
        <ModalAddIndirectPersonal
          visible={true}
          selectedIndirectPersonal={selectedIndirectPersonal}
          sendDataToParent={async (data) => {
            // await refetch()
            setVisibleIndirectPersonal(data)
          }}
        />
      )}
      <MaterialReactTable table={table} />
    </>
  )
}

export default IndirectPersonalList

import React, { useEffect, useState } from 'react'
import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import useMachinery from 'src/hooks/useMachinery'
import ModalAddMachinery from './ModalAssignPermission'
import './css.scss'

import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es'

import { MenuItem } from '@mui/material'
import { usePermissions } from 'src/providers/PermissionsProvider'
import ModalAddRole from './ModalAssignPermission'
import useRole from 'src/hooks/useRole'
import ModalAssignPermission from './ModalAssignPermission'
import { PERMISSIONS } from 'src/utils/contant'

const PermissionAssignList = () => {
  const { getData } = useGetCachedQueryData()
  const userQuery = getData('user')
  const { hasPermission } = usePermissions()

  const [visibleUser, setVisibleUser] = useState(false)
  const [selectedUser, setSelectedUser] = useState()
  const [userData, setUserData] = useState([])

  const handleEditPermission = (user) => {
    setSelectedUser(user)
    setVisibleUser(!visibleUser)
  }

  useEffect(() => {
    let us = []
    userQuery
      ?.filter((role) => role.deleted_at === null)
      .map((usr) => {
        us.push({
          id: usr.id,
          name: usr.name,
          permissions: usr.permissions,
        })
      })
    setUserData(us)
  }, [userQuery])

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
          {hasPermission(PERMISSIONS.USER.UPDATE) && (
            <CButton
              className="btn-action-edit"
              onClick={() => {
                handleEditPermission(data.row.original)
              }}
            >
              <CIcon icon={cilPencil} />
            </CButton>
          )}
        </>
      ),
    },
  ]

  const table = useMaterialReactTable({
    columns,
    data: userData ? userData : [],
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
          handleEditPermission(row.original)
        }}
      >
        Editar
      </MenuItem>,
      // <MenuItem key="delete" onClick={() => deleteRole(row.original.id)}>
      //   Eliminar
      // </MenuItem>,
    ],
    localization: MRT_Localization_ES,
  })

  return (
    <>
      {visibleUser && (
        <ModalAssignPermission
          visible={true}
          selectedUser={selectedUser}
          sendDataToParent={async (data) => {
            // await refetch()
            setVisibleUser(data)
          }}
        />
      )}
      <MaterialReactTable table={table} />
    </>
  )
}

export default PermissionAssignList

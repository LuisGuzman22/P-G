import React, { useEffect, useState } from 'react'
import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import useMachinery from 'src/hooks/useMachinery'
import ModalAddMachinery from './ModalAddRole'
import './css.scss'

import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es'

import { MenuItem } from '@mui/material'
import { usePermissions } from 'src/providers/PermissionsProvider'
import ModalAddRole from './ModalAddRole'
import useRole from 'src/hooks/useRole'
import { PERMISSIONS } from 'src/utils/contant'

const RoleList = () => {
  const { getData } = useGetCachedQueryData()
  const roleQuery = getData('role')
  const { deleteRole } = useRole()
  const { hasPermission } = usePermissions()

  const [visibleRole, setVisibleRole] = useState(false)
  const [selectedRole, setSelectedRole] = useState()
  const [roleData, setRoleData] = useState([])

  const handleEditRole = (role) => {
    setSelectedRole(role)
    setVisibleRole(!visibleRole)
  }

  useEffect(() => {
    const rol = []
    roleQuery.forEach((role) => {
      rol.push({
        id: role.id,
        name: role.name,
        permissions: role.permissions,
      })
    })
    setRoleData(rol)
  }, [roleQuery])

  useEffect(() => {
    console.log('roleData', roleData)
  }, [roleData])

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
          {hasPermission(PERMISSIONS.ROLES.UPDATE) && (
            <CButton
              className="btn-action-edit"
              onClick={() => {
                handleEditRole(data.row.original)
              }}
            >
              <CIcon icon={cilPencil} />
            </CButton>
          )}

          {hasPermission(PERMISSIONS.ROLES.DELETE) && (
            <CButton
              className="btn-action-delete"
              onClick={() => {
                deleteRole(data.row.original.id)
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
    data: roleData ? roleData : [],
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
          handleEditRole(row.original)
        }}
      >
        Editar
      </MenuItem>,
      <MenuItem key="delete" onClick={() => deleteRole(row.original.id)}>
        Eliminar
      </MenuItem>,
    ],
    localization: MRT_Localization_ES,
  })

  return (
    <>
      {visibleRole && (
        <ModalAddRole
          visible={true}
          selectedRole={selectedRole}
          sendDataToParent={async (data) => {
            // await refetch()
            setVisibleRole(data)
          }}
        />
      )}
      <MaterialReactTable table={table} />
    </>
  )
}

export default RoleList

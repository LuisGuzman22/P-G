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
import useUser from 'src/hooks/useUser'
import ModalAddUser from './ModalAddUser'

import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es'

import { MenuItem } from '@mui/material'

const UserList = () => {
  const { getData } = useGetCachedQueryData()
  const userQuery = getData('user')
  const { deleteUser } = useUser()

  const [visibleUser, setVisibleUser] = useState(false)
  const [selectedUser, setSelectedUser] = useState()
  const [userData, setUserData] = useState([])

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setVisibleUser(!visibleUser)
  }

  useEffect(() => {
    let usr = []
    userQuery
      ?.filter((user) => user.deleted_at === null)
      .map((user) => {
        usr.push({
          id: user.id,
          name: user.name,
          email: user.email,
          company_id: user.company_id,
          email_verified_at: user.email_verified_at,
        })
      })
    setUserData(usr)
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
      accessorKey: 'email',
      header: 'Correo',
    },
    {
      header: 'Acciones',
      Cell: (data) => (
        <>
          <CButton
            className="btn-action-edit"
            onClick={() => {
              handleEditUser(data.row.original)
            }}
          >
            <CIcon icon={cilPencil} />
          </CButton>
          <CButton
            className="btn-action-delete"
            onClick={() => {
              deleteUser(data.row.original.id)
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
          handleEditUser(row.original)
        }}
      >
        Editar
      </MenuItem>,
      <MenuItem key="delete" onClick={() => deleteUser(row.original.id)}>
        Eliminar
      </MenuItem>,
    ],
    localization: MRT_Localization_ES,
  })

  return (
    <>
      {visibleUser && (
        <ModalAddUser
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

export default UserList

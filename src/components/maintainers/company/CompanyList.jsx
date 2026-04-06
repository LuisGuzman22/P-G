import React, { useEffect, useState } from 'react'
import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import './css.scss'

import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es'

import { MenuItem } from '@mui/material'
import useCompany from 'src/hooks/useCompany'
import ModalAddCompany from './ModalAddCompany'
import { usePermissions } from 'src/providers/PermissionsProvider'
import { PERMISSIONS } from 'src/utils/contant'

const CompanyList = () => {
  const { getData } = useGetCachedQueryData()
  const companyQuery = getData('company')
  const { deleteCompany } = useCompany()
  const { hasPermission } = usePermissions()

  const [visibleCompany, setVisibleCompany] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState()
  const [companyData, setCompanyData] = useState([])

  const handleEditCompany = (company) => {
    setSelectedCompany(company)
    setVisibleCompany(!visibleCompany)
  }

  useEffect(() => {
    const comp = []
    companyQuery
      ?.filter((company) => company.deleted_at === null)
      .forEach((company) => {
        comp.push({
          id: company.id,
          name: company.name,
        })
      })
    setCompanyData(comp)
  }, [companyQuery])

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
          {hasPermission(PERMISSIONS.COMPANY.UPDATE) && (
            <CButton
              className="btn-action-edit"
              onClick={() => {
                handleEditCompany(data.row.original)
              }}
            >
              <CIcon icon={cilPencil} />
            </CButton>
          )}
          {hasPermission(PERMISSIONS.COMPANY.DELETE) && (
            <CButton
              className="btn-action-delete"
              onClick={() => {
                deleteCompany(data.row.original.id)
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
    data: companyData ? companyData : [],
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
          handleEditCompany(row.original)
        }}
      >
        Editar
      </MenuItem>,
      <MenuItem key="delete" onClick={() => deleteCompany(row.original.id)}>
        Eliminar
      </MenuItem>,
    ],
    localization: MRT_Localization_ES,
  })

  return (
    <>
      {visibleCompany && (
        <ModalAddCompany
          visible={true}
          selectedCompany={selectedCompany}
          sendDataToParent={async (data) => {
            // await refetch()
            setVisibleCompany(data)
          }}
        />
      )}
      <MaterialReactTable table={table} />
    </>
  )
}

export default CompanyList

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
import ModalAddContract from './ModalAddContract'
import useContracts from 'src/hooks/useContracts'

import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es'

import { MenuItem } from '@mui/material'
import { usePermissions } from 'src/providers/PermissionsProvider'

const ContractList = () => {
  const { getData } = useGetCachedQueryData()
  const contractsQuery = getData('contracts')

  const { hasPermission } = usePermissions()

  const { deleteContract } = useContracts()

  const [visibleContract, setVisibleContract] = useState(false)
  const [selectedContract, setSelectedContract] = useState()
  const [contractData, setContractData] = useState([])

  const handleEditContract = (contract) => {
    setSelectedContract(contract)
    setVisibleContract(!visibleContract)
  }

  useEffect(() => {
    let contr = []
    contractsQuery
      // ?.filter((machinery) => machinery.deleted_at === null)
      .map((contract) => {
        contr.push({
          id: contract.id,
          name: contract.name,
          code: contract.code,
          company_id: contract.company_id,
          detail: contract.detail,
          email: contract.email,
          telephone: contract.telephone,
          url: contract.url,
        })
      })
    setContractData(contr)
  }, [contractsQuery])

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
      accessorKey: 'code',
      header: 'Código',
    },
    {
      header: 'Acciones',
      Cell: (data) => (
        <>
          {hasPermission('contract_update') && (
            <CButton
              className="btn-action-edit"
              onClick={() => {
                handleEditContract(data.row.original)
              }}
            >
              <CIcon icon={cilPencil} />
            </CButton>
          )}

          {hasPermission('contract_delete') && (
            <CButton
              className="btn-action-delete"
              onClick={() => {
                deleteContract(data.row.original.id)
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
    data: contractData ? contractData : [],
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
          handleEditContract(row.original)
        }}
      >
        Editar
      </MenuItem>,
      <MenuItem key="delete" onClick={() => deleteContract(row.original.id)}>
        Eliminar
      </MenuItem>,
    ],
    localization: MRT_Localization_ES,
  })

  return (
    <>
      {visibleContract && (
        <ModalAddContract
          visible={true}
          selectedContract={selectedContract}
          sendDataToParent={async (data) => {
            // await refetch()
            setVisibleContract(data)
          }}
        />
      )}
      <MaterialReactTable table={table} />
    </>
  )
}

export default ContractList

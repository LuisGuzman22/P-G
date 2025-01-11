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
import useMachinery from 'src/hooks/useMachinery'
import ModalAddMachinery from './ModalAddMachinery'
import './css.scss'

import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es' // Importar localización en español

import { MenuItem } from '@mui/material'

const MachineryList = () => {
  const { getData } = useGetCachedQueryData()
  const machineryQuery = getData('machinery')
  const { deleteMachinery } = useMachinery()

  const [visibleMachinery, setVisibleMachinery] = useState(false)
  const [selectedMachinery, setSelectedMachinery] = useState()
  const [machineryData, setMachineryData] = useState([])

  const getPlates = (plates) => {
    const platesJoin = []

    plates.forEach((plate) => {
      platesJoin.push(plate.label)
    })
    return platesJoin.join(' - ')
  }

  const handleEditMachinery = (machinery) => {
    setSelectedMachinery(machinery)
    setVisibleMachinery(!visibleMachinery)
  }

  useEffect(() => {
    let mac = []
    machineryQuery
      ?.filter((machinery) => machinery.deleted_at === null)
      .map((machinery) => {
        const plates = getPlates(machinery.plate)
        mac.push({
          id: machinery.id,
          name: machinery.name,
          plates: plates,
          plate: machinery.plate,
        })
      })
    setMachineryData(mac)
  }, [machineryQuery])

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
      accessorKey: 'plates',
      header: 'Patentes',
    },
    {
      header: 'Acciones',
      Cell: (data) => (
        <>
          <CButton
            className="btn-action-edit"
            onClick={() => {
              handleEditMachinery(data.row.original)
            }}
          >
            <CIcon icon={cilPencil} />
          </CButton>
          <CButton
            className="btn-action-delete"
            onClick={() => {
              deleteMachinery(data.row.original.id)
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
    data: machineryData ? machineryData : [],
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
          handleEditMachinery(row.original)
        }}
      >
        Editar
      </MenuItem>,
      <MenuItem key="delete" onClick={() => deleteMachinery(row.original.id)}>
        Eliminar
      </MenuItem>,
    ],
    localization: MRT_Localization_ES,
  })

  return (
    <>
      {visibleMachinery && (
        <ModalAddMachinery
          visible={true}
          selectedMachinery={selectedMachinery}
          sendDataToParent={async (data) => {
            // await refetch()
            setVisibleMachinery(data)
          }}
        />
      )}
      <MaterialReactTable table={table} />
    </>
  )
}

export default MachineryList

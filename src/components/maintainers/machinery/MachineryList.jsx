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
import { columns, data } from './makeData.ts'
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

  const table = useMaterialReactTable({
    columns,
    data: machineryData ? machineryData : data,
    enableColumnActions: false,
    enableSorting: false,
    enableToolbarInternalActions: false,
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
    enableRowActions: true,
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

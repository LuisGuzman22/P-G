import React, { useEffect, useState } from 'react'
import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import useAljibe from 'src/hooks/useAljibe'
import ModalAddAljibe from './ModalAddAljibe'
import './css.scss'

import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es'

import { MenuItem } from '@mui/material'
import { usePermissions } from 'src/providers/PermissionsProvider'
import { PERMISSIONS } from 'src/utils/contant'

const AljibeList = () => {
  const { getData } = useGetCachedQueryData()
  const aljibeQuery = getData('aljibe')
  const { deleteAljibe } = useAljibe()

  const [visibleAljibe, setVisibleAljibe] = useState(false)
  const [selectedAljibe, setSelectedAljibe] = useState()
  const [aljibeData, setAljibeData] = useState([])

  const { hasPermission } = usePermissions()

  const getPlates = (plates) => {
    const platesJoin = []

    plates?.forEach((plate) => {
      platesJoin.push(plate.label)
    })
    return platesJoin.join(' - ')
  }

  const handleEditAljibe = (aljibe) => {
    setSelectedAljibe(aljibe)
    setVisibleAljibe(!visibleAljibe)
  }

  useEffect(() => {
    const alj = []
    aljibeQuery
      ?.filter((aljibe) => aljibe.deleted_at === null)
      .forEach((aljibe) => {
        const plates = getPlates(aljibe.plate)
        alj.push({
          id: aljibe.id,
          name: aljibe.name,
          plates: plates,
          plate: aljibe.plate,
        })
      })
    setAljibeData(alj)
  }, [aljibeQuery])

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
          {hasPermission(PERMISSIONS.ALJIBE.UPDATE) && (
            <CButton
              className="btn-action-edit"
              onClick={() => {
                handleEditAljibe(data.row.original)
              }}
            >
              <CIcon icon={cilPencil} />
            </CButton>
          )}

          {hasPermission(PERMISSIONS.ALJIBE.DELETE) && (
            <CButton
              className="btn-action-delete"
              onClick={() => {
                deleteAljibe(data.row.original.id)
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
    data: aljibeData ? aljibeData : [],
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
          handleEditAljibe(row.original)
        }}
      >
        Editar
      </MenuItem>,
      <MenuItem key="delete" onClick={() => deleteAljibe(row.original.id)}>
        Eliminar
      </MenuItem>,
    ],
    localization: MRT_Localization_ES,
  })

  return (
    <>
      {visibleAljibe && (
        <ModalAddAljibe
          visible={true}
          selectedAljibe={selectedAljibe}
          sendDataToParent={async (data) => {
            // await refetch()
            setVisibleAljibe(data)
          }}
        />
      )}

      <MaterialReactTable table={table} />
    </>
  )
}

export default AljibeList

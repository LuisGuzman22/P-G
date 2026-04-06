import React, { useEffect, useState } from 'react'
import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import './css.scss'

import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es'

import { MenuItem } from '@mui/material'
import useWeather from 'src/hooks/useWeather'
import ModalAddWeather from './ModalAddWeather'
import { usePermissions } from 'src/providers/PermissionsProvider'
import { PERMISSIONS } from 'src/utils/contant'

const WeatherList = () => {
  const { getData } = useGetCachedQueryData()
  const weatherQuery = getData('weather')
  const { deleteWeather } = useWeather()
  const { hasPermission } = usePermissions()

  const [visibleWeather, setVisibleWeather] = useState(false)
  const [selectedWeather, setSelectedWeather] = useState()
  const [weatherData, setWeatherData] = useState([])

  const handleEditWeather = (weather) => {
    setSelectedWeather(weather)
    setVisibleWeather(!visibleWeather)
  }

  useEffect(() => {
    const wea = []
    weatherQuery
      ?.filter((weather) => weather.deleted_at === null)
      .forEach((weather) => {
        wea.push({
          id: weather.id,
          name: weather.name,
        })
      })
    setWeatherData(wea)
  }, [weatherQuery])

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
          {hasPermission(PERMISSIONS.WEATHER.UPDATE) && (
            <CButton
              className="btn-action-edit"
              onClick={() => {
                handleEditWeather(data.row.original)
              }}
            >
              <CIcon icon={cilPencil} />
            </CButton>
          )}
          {hasPermission(PERMISSIONS.WEATHER.DELETE) && (
            <CButton
              className="btn-action-delete"
              onClick={() => {
                deleteWeather(data.row.original.id)
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
    data: weatherData ? weatherData : [],
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
          handleEditWeather(row.original)
        }}
      >
        Editar
      </MenuItem>,
      <MenuItem key="delete" onClick={() => deleteWeather(row.original.id)}>
        Eliminar
      </MenuItem>,
    ],
    localization: MRT_Localization_ES,
  })

  return (
    <>
      {visibleWeather && (
        <ModalAddWeather
          visible={true}
          selectedWeather={selectedWeather}
          sendDataToParent={async (data) => {
            // await refetch()
            setVisibleWeather(data)
          }}
        />
      )}
      <MaterialReactTable table={table} />
    </>
  )
}

export default WeatherList

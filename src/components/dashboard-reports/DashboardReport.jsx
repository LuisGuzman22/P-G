import { React, useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CButton,
} from '@coreui/react'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import { useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilNotes, cilPencil } from '@coreui/icons'
import './css.scss'

import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es'
import { usePermissions } from 'src/providers/PermissionsProvider'
import { PERMISSIONS } from 'src/utils/contant'

const DashboardReport = () => {
  const { getData } = useGetCachedQueryData()
  const reportsQuery = getData('reports')
  let navigate = useNavigate()
  const { hasPermission } = usePermissions()
  const [reportsData, setReportsData] = useState([])

  const handleSelectReport = (report, action) => {
    localStorage.setItem('daily_report', report.id)
    navigate(`/informe-diario/${action}`)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!hasPermission(PERMISSIONS.REPORTS.CREATE)) {
      navigate('/inicio')
    }
  }, [])

  useEffect(() => {
    let rep = []
    reportsQuery.forEach((report) => {
      rep.push({
        id: report.id,
        date: report.company?.dailyReportDate,
        number: report.company?.dailyReportNumber,
      })
    })
    setReportsData(rep)
  }, [reportsQuery])

  const columns = [
    {
      accessorKey: 'date', //access nested data with dot notation
      header: 'Fecha',
      size: 10,
      // enableColumnFilter: false,
    },
    {
      accessorKey: 'number',
      header: 'Número',
    },
    {
      header: 'Acciones',
      Cell: (data) => (
        <>
          <CButton
            className="btn-project-action"
            onClick={() => {
              handleSelectReport(data.row.original, 'view')
            }}
          >
            <CIcon icon={cilNotes} />
          </CButton>
          <CButton
            className="btn-project-action"
            alt="Edit"
            onClick={() => {
              handleSelectReport(data.row.original, 'edit')
            }}
          >
            <CIcon icon={cilPencil} />
          </CButton>
        </>
      ),
    },
  ]

  const table = useMaterialReactTable({
    columns,
    data: reportsData ? reportsData : [],
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
      <CButton
        className="btn-project-action"
        key="edit"
        onClick={() => {
          handleSelectReport(row.original, 'view')
        }}
      >
        <CIcon icon={cilNotes} />
      </CButton>,
      <CButton
        className="btn-project-action"
        alt="Edit"
        key={'edit'}
        onClick={() => {
          handleSelectReport(row.original, 'edit')
        }}
      >
        <CIcon icon={cilPencil} />
      </CButton>,
    ],
    localization: MRT_Localization_ES,
  })

  return (
    <div className="report-dashboard">
      <CCard className="action-buttons">
        <CCardBody>
          <MaterialReactTable table={table} />
        </CCardBody>
      </CCard>
    </div>
  )
}

export default DashboardReport

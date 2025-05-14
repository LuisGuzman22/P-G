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
import useVehicle from 'src/hooks/useVehicle'
import ModalAddProject from 'src/components/maintainers/project/ModalAddProject'
import useProjects from 'src/hooks/useProjects'

import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es'

import { MenuItem } from '@mui/material'
import { usePermissions } from 'src/providers/PermissionsProvider'
import { PERMISSIONS } from 'src/utils/contant'

const ProjectList = () => {
  const { getData } = useGetCachedQueryData()
  const projectsQuery = getData('projects')

  const { deleteProject } = useProjects()

  const { hasPermission } = usePermissions()

  const [visibleProject, setVisibleProject] = useState(false)
  const [selectedProject, setSelectedProject] = useState()
  const [projectData, setProjectData] = useState([])

  const handleEditProject = (project) => {
    setSelectedProject(project)
    setVisibleProject(!visibleProject)
  }

  useEffect(() => {
    let proj = []
    projectsQuery
      // ?.filter((project) => project.deleted_at === null)
      .map((project) => {
        proj.push({
          id: project.id,
          projectName: project.name,
          projectManager: project.manager,
          projectDescription: project.description,
        })
      })
    setProjectData(proj)
  }, [projectsQuery])

  const columns = [
    {
      accessorKey: 'id', //access nested data with dot notation
      header: 'ID',
      size: 10,
      // enableColumnFilter: false,
    },
    {
      accessorKey: 'projectName',
      header: 'Nombre',
    },
    {
      accessorKey: 'projectManager',
      header: 'Encargado',
    },
    {
      header: 'Acciones',
      Cell: (data) => (
        <>
          {hasPermission(PERMISSIONS.PROJECT.UPDATE) && (
            <CButton
              className="btn-action-edit"
              onClick={() => {
                handleEditProject(data.row.original)
              }}
            >
              <CIcon icon={cilPencil} />
            </CButton>
          )}

          {hasPermission(PERMISSIONS.PROJECT.DELETE) && (
            <CButton
              className="btn-action-delete"
              onClick={() => {
                deleteProject(data.row.original.id)
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
    data: projectData ? projectData : [],
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
          handleEditProject(row.original)
        }}
      >
        Editar
      </MenuItem>,
      <MenuItem key="delete" onClick={() => deleteProject(row.original.id)}>
        Eliminar
      </MenuItem>,
    ],
    localization: MRT_Localization_ES,
  })

  return (
    <>
      {visibleProject && (
        <ModalAddProject
          visible={true}
          selectedProject={{
            id: selectedProject.id,
            projectName: selectedProject.projectName,
            projectManager: selectedProject.projectManager,
            projectDescription: selectedProject.projectDescription,
            isActive: selectedProject.isActive,
          }}
          sendDataToParent={async (data) => {
            // await refetch()
            setVisibleProject(data)
          }}
        />
      )}
      <MaterialReactTable table={table} />
    </>
  )
}

export default ProjectList

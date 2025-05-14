import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBarChart,
  cilPencil,
  cilClipboard,
  cilHome,
  cilInfo,
  cilBriefcase,
  cilStorage,
  cilAlignCenter,
  cilGraph,
  cilChart,
  cibWhenIWork,
} from '@coreui/icons'
import { CNavItem, CNavTitle, CNavGroup } from '@coreui/react'
import { usePermissions } from './providers/PermissionsProvider'
import { PERMISSIONS } from './utils/contant'

const useNavItems = () => {
  const { hasPermission } = usePermissions()

  const navItems = [
    {
      component: CNavTitle,
      name: 'Proyectos',
    },
    {
      component: CNavGroup,
      name: 'Panel',
      to: '/base',
      icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Inicio',
          to: '/inicio',
          icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Panel Informativo',
          to: '/panel-informativo',
          icon: <CIcon icon={cilInfo} customClassName="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Proyecto',
          to: '/proyecto',
          icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Informe diario',
          to: '/informe-diario',
          icon: <CIcon icon={cilStorage} customClassName="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Actividades Trisemanal',
          to: '/trisemanal',
          icon: <CIcon icon={cilAlignCenter} customClassName="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Carta Gantt',
          to: '/carta-gantt',
          icon: <CIcon icon={cilBarChart} customClassName="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Detalles de avance',
          to: '/avance',
          icon: <CIcon icon={cilGraph} customClassName="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Dashboard',
          to: '/dashboard',
          icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
        },
      ],
    },
    {
      component: CNavTitle,
      name: 'Administración',
    },
    {
      component: CNavGroup,
      name: 'Mantenedores',
      to: '/base',
      icon: <CIcon icon={cibWhenIWork} customClassName="nav-icon" />,
      items: [
        {
          component: CNavGroup,
          name: 'Informe Diario',
          to: '/base',
          icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
          items: [],
        },
        {
          component: CNavGroup,
          name: 'Administrativos',
          to: '/base',
          icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
          items: [
            {
              component: CNavItem,
              name: 'Asignar contrato',
              to: '/maintainer/contract-asign',
              icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
            },
          ],
        },
      ],
    },
  ]

  if (hasPermission(PERMISSIONS.DIRECT_PERSONAL.VIEW)) {
    navItems[3].items[0].items.push({
      component: CNavItem,
      name: 'Personal Directo',
      to: '/maintainer/direct-personal',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    })
  }

  if (hasPermission(PERMISSIONS.INDIRECT_PERSONAL.VIEW)) {
    navItems[3].items[0].items.push({
      component: CNavItem,
      name: 'Personal Indirecto',
      to: '/maintainer/indirect-personal',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    })
  }

  if (hasPermission(PERMISSIONS.DIRECT_STAFF_SHIFT.VIEW)) {
    navItems[3].items[0].items.push({
      component: CNavItem,
      name: 'Turno Per. Directo',
      to: '/maintainer/direct-staff-shift',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    })
  }

  if (hasPermission(PERMISSIONS.INDIRECT_STAFF_SHIFT.VIEW)) {
    navItems[3].items[0].items.push({
      component: CNavItem,
      name: 'Turno Per. Indirecto',
      to: '/maintainer/indirect-staff-shift',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    })
  }

  if (hasPermission(PERMISSIONS.EQUIPMENT.VIEW)) {
    navItems[3].items[0].items.push({
      component: CNavItem,
      name: 'Equipo',
      to: '/maintainer/equipment',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    })
  }

  if (hasPermission(PERMISSIONS.MACHINERY.VIEW)) {
    navItems[3].items[0].items.push({
      component: CNavItem,
      name: 'Maquinaria',
      to: '/maintainer/machinery',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    })
  }

  if (hasPermission(PERMISSIONS.VEHICLE.VIEW)) {
    navItems[3].items[0].items.push({
      component: CNavItem,
      name: 'Vehículo',
      to: '/maintainer/vehicle',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    })
  }

  if (hasPermission(PERMISSIONS.ALJIBE.VIEW)) {
    navItems[3].items[0].items.push({
      component: CNavItem,
      name: 'Aljibe',
      to: '/maintainer/aljibe',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    })
  }

  if (hasPermission(PERMISSIONS.RESTRICTIONS.VIEW)) {
    navItems[3].items[0].items.push({
      component: CNavItem,
      name: 'Motivos',
      to: '/maintainer/restriction',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    })
  }

  if (hasPermission(PERMISSIONS.SHIFT.VIEW)) {
    navItems[3].items[0].items.push({
      component: CNavItem,
      name: 'Jornada',
      to: '/maintainer/shifts',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    })
  }

  if (hasPermission(PERMISSIONS.WORK_FRONT.VIEW)) {
    navItems[3].items[0].items.push({
      component: CNavItem,
      name: 'Frentes de trabajo',
      to: '/maintainer/work-front',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    })
  }

  if (hasPermission(PERMISSIONS.WEATHER.VIEW)) {
    navItems[3].items[0].items.push({
      component: CNavItem,
      name: 'Clima',
      to: '/maintainer/weather',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    })
  }

  if (hasPermission(PERMISSIONS.COMPANY.VIEW)) {
    navItems[3].items[1].items.push({
      component: CNavItem,
      name: 'Adm. Empresas',
      to: '/maintainer/company',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    })
  }

  if (hasPermission(PERMISSIONS.CONTRACT.VIEW)) {
    navItems[3].items[1].items.push({
      component: CNavItem,
      name: 'Administrar Contratos',
      to: '/maintainer/contract',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    })
  }

  if (hasPermission(PERMISSIONS.ROLES.VIEW)) {
    navItems[3].items[1].items.push({
      component: CNavItem,
      name: 'Asignar Roles',
      to: '/maintainer/role',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    })
  }

  if (hasPermission(PERMISSIONS.USER.VIEW)) {
    navItems[3].items[1].items.push({
      component: CNavItem,
      name: 'Asignar Permisos',
      to: '/maintainer/permissions-assign',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    })
  }

  if (hasPermission(PERMISSIONS.USER.VIEW)) {
    navItems[3].items[1].items.push({
      component: CNavItem,
      name: 'Administrar usuarios',
      to: '/maintainer/users',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    })
  }

  if (hasPermission(PERMISSIONS.PROJECT.VIEW)) {
    navItems[3].items[1].items.push({
      component: CNavItem,
      name: 'Administrar Proyectos',
      to: '/maintainer/project',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    })
  }

  if (hasPermission(PERMISSIONS.TECHNICAL_DOCUMENTATION.VIEW)) {
    navItems[3].items[1].items.push({
      component: CNavItem,
      name: 'Adm. Doc. Técnica',
      to: '/maintainer/technical-doc',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    })
  }

  if (hasPermission(PERMISSIONS.CAROUSEL.VIEW)) {
    navItems[3].items[1].items.push({
      component: CNavItem,
      name: 'Adm. imágenes carrusel',
      to: '/maintainer/carousel',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    })
  }

  return navItems
}

export default useNavItems

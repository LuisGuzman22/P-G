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
} from '@coreui/icons'
import { CNavItem, CNavTitle, CNavGroup } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Proyectos',
  },
  {
    component: CNavGroup,
    name: 'Dashboard',
    to: '/base',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Inicio',
        to: '/dashboard',
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
    ],
  },
  // {
  //   component: CNavItem,
  //   name: 'Proyectos en curso',
  //   to: '/dashboard',
  //   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  // },
  {
    component: CNavTitle,
    name: 'Administración',
  },
  {
    component: CNavGroup,
    name: 'Mantenedores',
    to: '/base',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
    items: [
      {
        component: CNavGroup,
        name: 'Informe Diario',
        to: '/base',
        icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Maquinaria',
            to: '/maintainer/machinery',
            icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
          },
          {
            component: CNavItem,
            name: 'Vehículo',
            to: '/maintainer/vehicle',
            icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
          },
          {
            component: CNavItem,
            name: 'Equipo',
            to: '/maintainer/equipment',
            icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
          },
          {
            component: CNavItem,
            name: 'Aljibe',
            to: '/maintainer/aljibe',
            icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
          },
          // {
          //   component: CNavItem,
          //   name: 'Personal Directo',
          //   to: '/maintainer/direct-personal',
          //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
          // },
          // {
          //   component: CNavItem,
          //   name: 'Personal Indirecto',
          //   to: '/maintainer/indirect-personal',
          //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
          // },
        ],
      },
      {
        component: CNavGroup,
        name: 'Administrativos',
        to: '/base',
        icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Administrar Proyectos',
            to: '/administrar_proyectos',
            icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
          },
          {
            component: CNavItem,
            name: 'Administrar Contratos',
            to: '/administrar_contratos',
            icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
          },
          {
            component: CNavItem,
            name: 'Administrar usuarios',
            to: '/maintainer/users',
            icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
          },
          {
            component: CNavItem,
            name: 'Adm. Doc. Técnica',
            to: '/maintainer/technical-doc',
            icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
          },
        ],
      },
    ],
  },
]

export default _nav

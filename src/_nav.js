import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilDrop, cilPencil } from '@coreui/icons'
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
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Inicio',
        to: '/dashboard',
      },
      {
        component: CNavItem,
        name: 'Panel Informativo',
        to: '/panel-informativo',
      },
      {
        component: CNavItem,
        name: 'Proyecto',
        to: '/proyecto',
      },
      {
        component: CNavItem,
        name: 'Informe diario',
        to: '/informe-diario',
      },
      {
        component: CNavItem,
        name: 'Actividades Trisemanal',
        to: '/trisemanal',
      },
      {
        component: CNavItem,
        name: 'Carta Gantt',
        to: '/carta-gantt',
      },
      {
        component: CNavItem,
        name: 'Detalles de avance',
        to: '/avance',
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
    component: CNavTitle,
    name: 'Usuarios',
  },
  {
    component: CNavItem,
    name: 'Mis datos',
    to: '/mis_datos',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
]

export default _nav

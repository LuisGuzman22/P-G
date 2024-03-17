import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilDrop, cilPencil } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Proyectos',
  },
  {
    component: CNavItem,
    name: 'Proyectos en curso',
    to: '/dashboard',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
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

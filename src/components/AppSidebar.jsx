import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarNav,
  CSidebarToggler,
} from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import CIcon from '@coreui/icons-react'
import { cilExitToApp } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  let navigate = useNavigate()

  return (
    <CSidebar
      className="border-end"
      colorScheme="light"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          {/* <CIcon customClassName="sidebar-brand-full" icon={cilClipboard} height={32} /> */}
          {/* <CIcon customClassName="sidebar-brand-narrow" icon={cilClipboard} height={32} /> */}
          <span>P&G Project Control</span>
        </CSidebarBrand>
        {/* <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        /> */}
      </CSidebarHeader>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarFooter
        className="border-top d-lg-flex"
        onClick={() => {
          navigate(`/`)
          // FALTA LIMPIAR CACHE, REACT QUERY Y LOCAL STORAGE AL CERRAR SESION
        }}
      >
        Cerrar sesión
        <CIcon icon={cilExitToApp} size="sm" />
      </CSidebarFooter>
      {/* <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter> */}
    </CSidebar>
  )
}

export default React.memo(AppSidebar)

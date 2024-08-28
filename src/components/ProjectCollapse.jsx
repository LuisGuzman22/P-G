import React, { useState } from 'react'
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'

import DashboardPanel from './DashboardPanel'
import Page404 from 'src/views/pages/page404/Page404'
import ProjectDescription from './ProjectDescription'
import Skynav from './Skynav'
import TechnicalDocumentation from './tabs/technical-doc/TechnicalDocumentation'
import TurnOverPackage from './TurnOverPackage'
import TeamChat from './TeamChat'
import PIE from './PIE'

const ProjectCollapse = () => {
  const [activeKey, setActiveKey] = useState(2)

  return (
    <>
      <CNav variant="tabs">
        {/* <CNavLink
          active={activeKey === 1}
          aria-selected={activeKey === 1}
          onClick={() => {
            setActiveKey(1)
          }}
        >
          Dashboard
        </CNavLink> */}
        <CNavLink
          active={activeKey === 2}
          aria-selected={activeKey === 2}
          onClick={() => {
            setActiveKey(2)
          }}
        >
          Descripción del proyecto
        </CNavLink>
        {/* <CNavLink
          active={activeKey === 3}
          aria-selected={activeKey === 3}
          onClick={() => {
            setActiveKey(3)
          }}
        >
          SKYNAV
        </CNavLink> */}
        <CNavLink
          active={activeKey === 4}
          aria-selected={activeKey === 4}
          onClick={() => {
            setActiveKey(4)
          }}
        >
          Documentación técnica
        </CNavLink>
        {/* <CNavLink
          active={activeKey === 5}
          aria-selected={activeKey === 5}
          onClick={() => {
            setActiveKey(5)
          }}
        >
          Cumplimiento P.I.E.
        </CNavLink>
        <CNavLink
          active={activeKey === 6}
          aria-selected={activeKey === 6}
          onClick={() => {
            setActiveKey(6)
          }}
        >
          Turn Over Package
        </CNavLink>
        <CNavLink
          active={activeKey === 7}
          aria-selected={activeKey === 7}
          onClick={() => {
            setActiveKey(7)
          }}
        >
          Chat de equipo
        </CNavLink> */}
      </CNav>
      <CTabContent>
        {/* <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={activeKey === 1}>
          <DashboardPanel />
        </CTabPane> */}
        <CTabPane role="tabpanel" aria-labelledby="profile-tab-pane" visible={activeKey === 2}>
          <ProjectDescription />
        </CTabPane>
        {/* <CTabPane role="tabpanel" aria-labelledby="contact-tab-pane" visible={activeKey === 3}>
          <Skynav />
        </CTabPane> */}
        <CTabPane role="tabpanel" aria-labelledby="contact-tab-pane" visible={activeKey === 4}>
          <TechnicalDocumentation />
        </CTabPane>
        {/* <CTabPane role="tabpanel" aria-labelledby="contact-tab-pane" visible={activeKey === 5}>
          <PIE />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="contact-tab-pane" visible={activeKey === 6}>
          <TurnOverPackage />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="contact-tab-pane" visible={activeKey === 7}>
          <TeamChat />
        </CTabPane> */}
      </CTabContent>
    </>
  )
}

export default ProjectCollapse

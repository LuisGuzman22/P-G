import React from 'react'
import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem } from '@coreui/react'
import CompanyReport from './daily-report/company-report'
import IndirectWorkForce from './daily-report/indirect-work-force'
import TotalIndirectWorkForce from './daily-report/total-indirect-work-force'
import TotalDirectWorkForce from './daily-report/total-direct-work-force'
import IndirectDotationWorkForce from './daily-report/indirect-dotation-work-force'
import DirectDotationWorkForce from './daily-report/direct-dotation-work-force'
import DotationWorkForce from './daily-report/dotation-work-force'
import Machinery from './daily-report/machinery'
import MachineryWorkForce from './daily-report/machinery-work-force'
import EquipmentMachinery from './daily-report/equipment-machinery'
import EquipmentWorkForce from './daily-report/equipment-work-force'
import Vehicle from './daily-report/vehicle'
import VehicleWorkForce from './daily-report/vehicle-work-force'
import Activities from './daily-report/activities'
import Comments from './daily-report/comments'
import Graphs from './daily-report/graphs'
import Incidents from './daily-report/incidents'
import DirectWorkForce from './daily-report/direct-work-force'
const DailyReportCollapse = () => {
  return (
    <div className="dailyReport">
      <CAccordion className="dailyReport-accordion" activeItemKey={1}>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>Empresa</CAccordionHeader>
          <CAccordionBody className="dailyReport-accordion">
            <CompanyReport />
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={2}>
          <CAccordionHeader>Fuerza de trabajo personal indirecto</CAccordionHeader>
          <CAccordionBody className="dailyReport-accordion">
            <IndirectWorkForce />
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={3}>
          <CAccordionHeader>Fuerza laboral total personal indirecto</CAccordionHeader>
          <CAccordionBody className="dailyReport-accordion">
            <TotalIndirectWorkForce />
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={4}>
          <CAccordionHeader>Fuerza laboral contratista personal directo</CAccordionHeader>
          <CAccordionBody className="dailyReport-accordion">
            <DirectWorkForce />
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={5}>
          <CAccordionHeader>Fuerza laboral total personal directo</CAccordionHeader>
          <CAccordionBody className="dailyReport-accordion">
            <TotalDirectWorkForce />
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={6}>
          <CAccordionHeader>Dotación por frente de trabajo personal indirecto</CAccordionHeader>
          <CAccordionBody className="dailyReport-accordion">
            <IndirectDotationWorkForce />
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={7}>
          <CAccordionHeader>Dotación por frente de trabajo personal directo</CAccordionHeader>
          <CAccordionBody className="dailyReport-accordion">
            <DirectDotationWorkForce />
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={8}>
          <CAccordionHeader>Dotación por frente de trabajo</CAccordionHeader>
          <CAccordionBody className="dailyReport-accordion">
            <DotationWorkForce />
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={9}>
          <CAccordionHeader>Maquinarias contratistas</CAccordionHeader>
          <CAccordionBody className="dailyReport-accordion">
            <Machinery />
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={10}>
          <CAccordionHeader>Maquinarias por frente de trabajo</CAccordionHeader>
          <CAccordionBody className="dailyReport-accordion">
            <MachineryWorkForce />
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={11}>
          <CAccordionHeader>Equipos y maquinarias contratistas</CAccordionHeader>
          <CAccordionBody className="dailyReport-accordion">
            <EquipmentMachinery />
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={12}>
          <CAccordionHeader>Equipos por frente de trabajo</CAccordionHeader>
          <CAccordionBody className="dailyReport-accordion">
            <EquipmentWorkForce />
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={13}>
          <CAccordionHeader>Equipos, maquinarias y vehiculos menores contratistas</CAccordionHeader>
          <CAccordionBody className="dailyReport-accordion">
            <Vehicle />
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={14}>
          <CAccordionHeader>
            Equipos, maquinarias y vehiculos menores por frente de trabajo
          </CAccordionHeader>
          <CAccordionBody className="dailyReport-accordion">
            <VehicleWorkForce />
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={15}>
          <CAccordionHeader>Descripción de actividades desarrolladas</CAccordionHeader>
          <CAccordionBody className="dailyReport-accordion">
            <Activities />
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={16}>
          <CAccordionHeader>Comentarios y alertas en general</CAccordionHeader>
          <CAccordionBody className="dailyReport-accordion">
            <Comments />
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={17}>
          <CAccordionHeader>Graficos del día</CAccordionHeader>
          <CAccordionBody className="dailyReport-accordion">
            <Graphs />
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={18}>
          <CAccordionHeader>Incidentes, lesiones o eventos</CAccordionHeader>
          <CAccordionBody className="dailyReport-accordion">
            <Incidents />
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={19}>
          <CAccordionHeader>Firmas</CAccordionHeader>
          <CAccordionBody className="dailyReport-accordion">
            <></>
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </div>
  )
}

export default DailyReportCollapse

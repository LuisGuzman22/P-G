import React from 'react'

const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const DailyReport = React.lazy(() => import('./pages/DailyReportPage'))
const DailyReportView = React.lazy(() => import('./pages/DailyReportViewPage'))
const DailyReportEdit = React.lazy(() => import('./pages/DailyReportEditPage'))
const Detail = React.lazy(() => import('./pages/DetailPage'))
const Gantt = React.lazy(() => import('./pages/GanttPage'))
const Project = React.lazy(() => import('./pages/ProjectPage'))
const InformativePanel = React.lazy(() => import('./pages/InformativePanelPage'))
const Trisemanal = React.lazy(() => import('./pages/TrisemanalPage'))
// const ProjectSelector = React.lazy(() => import('./pages/ProjectSelector'))
// const ContractSelector = React.lazy(() => import('./pages/ContractSelector'))
// const Login = React.lazy(() => import('./pages/Login'))
const ProjectAdministration = React.lazy(() => import('./pages/ProjectAdministrationPage'))
const ContractAdministration = React.lazy(() => import('./pages/ContractAdministrationPage'))
const Pdf = React.lazy(() => import('./components/Pdf'))
const MachineryMaintainer = React.lazy(() => import('./pages/MachineryMaintainerPage'))
const VehicleMaintainer = React.lazy(() => import('./pages/VehicleMaintainerPage'))
const EquipmentMaintainer = React.lazy(() => import('./pages/EquipmentMaintainerPage'))
const DirectPersonalMaintainer = React.lazy(() => import('./pages/DirectPersonalMaintainerPage'))
const IndirectPersonalMaintainer = React.lazy(
  () => import('./pages/IndirectPersonalMaintainerPage'),
)
const AljibeMaintainerPage = React.lazy(() => import('./pages/AljibeMaintainerPage'))
const TechnicalDocMaintainerPage = React.lazy(() => import('./pages/TechnicalDocMaintainerPage'))
const UserMaintainerPage = React.lazy(() => import('./pages/UserMaintainerPage'))
const DashboardReportesPage = React.lazy(() => import('./pages/DashboardReportesPage'))
const ExportPage = React.lazy(() => import('./pages/ExportPage'))

const routes = [
  { path: '/', name: 'Login' },
  { path: '/login', name: 'Login' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/trisemanal', name: 'Trisemanal', element: Trisemanal },
  { path: '/panel-informativo', name: 'Panel Informativo', element: InformativePanel },
  { path: '/proyecto', name: 'Proyecto', element: Project },
  { path: '/informe-diario', name: 'Informe Diario', element: DailyReport },
  { path: '/informe-diario/view', name: 'Informe Diario', element: DailyReportView },
  { path: '/informe-diario/edit', name: 'Informe Diario', element: DailyReportEdit },
  { path: '/informe-diario/pdf', name: 'Informe Diario', element: Pdf },

  { path: '/trisemanal', name: 'Actividades Trisemanal', element: Trisemanal },
  { path: '/carta-gantt', name: 'Carta Gantt', element: Gantt },
  { path: '/avance', name: 'Detalles de avance', element: Detail },
  { path: '/administrar_proyectos', name: 'Administrar Proyectos', element: ProjectAdministration },

  {
    path: '/administrar_contratos',
    name: 'Administrar Contratos',
    element: ContractAdministration,
  },
  { path: '/maintainer/machinery', name: 'Administrar Maquinaria', element: MachineryMaintainer },
  { path: '/maintainer/vehicle', name: 'Administrar Vehículo', element: VehicleMaintainer },
  { path: '/maintainer/equipment', name: 'Administrar Vehículo', element: EquipmentMaintainer },
  { path: '/maintainer/users', name: 'Administrar Usuarios', element: UserMaintainerPage },
  // {
  //   path: '/maintainer/direct-personal',
  //   name: 'Administrar Vehículo',
  //   element: DirectPersonalMaintainer,
  // },
  // {
  //   path: '/maintainer/indirect-personal',
  //   name: 'Administrar Vehículo',
  //   element: IndirectPersonalMaintainer,
  // },
  {
    path: '/maintainer/aljibe',
    name: 'Administrar Aljibes',
    element: AljibeMaintainerPage,
  },
  {
    path: '/maintainer/technical-doc',
    name: 'Administrar Documentación técnica',
    element: TechnicalDocMaintainerPage,
  },
  {
    path: '/dashboard-reportes',
    name: 'Dashboard reportes',
    element: DashboardReportesPage,
  },
  {
    path: '/exportar-datos',
    name: 'Exportar datos',
    element: ExportPage,
  },
]

export default routes

import React from 'react'

const HomePage = React.lazy(() => import('./pages/HomePage'))
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
const RestrictionMaintainer = React.lazy(() => import('./pages/RestrictionMaintainerPage'))
const DirectPersonalMaintainer = React.lazy(() => import('./pages/DirectPersonalMaintainerPage'))
const IndirectPersonalMaintainer = React.lazy(
  () => import('./pages/IndirectPersonalMaintainerPage'),
)
const CompanyMaintainer = React.lazy(() => import('./pages/CompanyMaintainerPage'))
const ShiftMaintainer = React.lazy(() => import('./pages/ShiftMaintainerPage'))
const IndirectStaffShiftMaintainer = React.lazy(
  () => import('./pages/IndirectStaffShiftMaintainerPage'),
)
const WorkFrontMaintainer = React.lazy(() => import('./pages/WorkFrontMaintainerPage'))

const DirectStaffShiftMaintainer = React.lazy(
  () => import('./pages/DirectStaffShiftMaintainerPage'),
)
const WeatherMaintainer = React.lazy(() => import('./pages/WeatherMaintainerPage'))

const AljibeMaintainerPage = React.lazy(() => import('./pages/AljibeMaintainerPage'))
const TechnicalDocMaintainerPage = React.lazy(() => import('./pages/TechnicalDocMaintainerPage'))
const CarouselMaintainerPage = React.lazy(() => import('./pages/CarouselMaintainerPage'))
const UserMaintainerPage = React.lazy(() => import('./pages/UserMaintainerPage'))
const ContractAsignPage = React.lazy(() => import('./pages/ContractAsignPage'))
const RolePage = React.lazy(() => import('./pages/RoleMaintainerPage'))
const PermissionAssignMaintainerPage = React.lazy(
  () => import('./pages/PermissionAssignMaintainerPage'),
)
const DashboardReportesPage = React.lazy(() => import('./pages/DashboardReportesPage'))
const ExportPage = React.lazy(() => import('./pages/ExportPage'))
const ChartsPage = React.lazy(() => import('./pages/ChartsPage'))

const routes = [
  { path: '/', name: 'Login', protected: false },
  { path: '/login', name: 'Login', protected: false },
  { path: '/inicio', name: 'Inicio', element: HomePage, protected: true },
  { path: '/trisemanal', name: 'Trisemanal', element: Trisemanal, protected: true },
  {
    path: '/panel-informativo',
    name: 'Panel Informativo',
    element: InformativePanel,
    protected: true,
  },
  { path: '/proyecto', name: 'Proyecto', element: Project, protected: true },
  { path: '/informe-diario', name: 'Informe Diario', element: DailyReport, protected: true },
  {
    path: '/informe-diario/view',
    name: 'Informe Diario',
    element: DailyReportView,
    protected: true,
  },
  {
    path: '/informe-diario/edit',
    name: 'Informe Diario',
    element: DailyReportEdit,
    protected: true,
  },
  { path: '/informe-diario/pdf', name: 'Informe Diario', element: Pdf, protected: true },

  { path: '/trisemanal', name: 'Actividades Trisemanal', element: Trisemanal, protected: true },
  { path: '/carta-gantt', name: 'Carta Gantt', element: Gantt, protected: true },
  { path: '/avance', name: 'Detalles de avance', element: Detail, protected: true },
  {
    path: '/maintainer/project',
    name: 'Administrar Proyectos',
    element: ProjectAdministration,
    protected: true,
  },

  {
    path: '/maintainer/contract',
    name: 'Administrar Contratos',
    element: ContractAdministration,
    protected: true,
  },
  {
    path: '/maintainer/machinery',
    name: 'Administrar Maquinaria',
    element: MachineryMaintainer,
    protected: true,
  },
  {
    path: '/maintainer/vehicle',
    name: 'Administrar Vehículo',
    element: VehicleMaintainer,
    protected: true,
  },
  {
    path: '/maintainer/equipment',
    name: 'Administrar Vehículo',
    element: EquipmentMaintainer,
    protected: true,
  },
  {
    path: '/maintainer/restriction',
    name: 'Administrar Motivos',
    element: RestrictionMaintainer,
    protected: true,
  },
  {
    path: '/maintainer/users',
    name: 'Administrar Usuarios',
    element: UserMaintainerPage,
    protected: true,
  },
  {
    path: '/maintainer/direct-personal',
    name: 'Administrar Personal directo',
    element: DirectPersonalMaintainer,
    protected: true,
  },
  {
    path: '/maintainer/indirect-personal',
    name: 'Administrar Personal Indirecto',
    element: IndirectPersonalMaintainer,
    protected: true,
  },
  {
    path: '/maintainer/company',
    name: 'Administrar Empresas',
    element: CompanyMaintainer,
    protected: true,
  },
  {
    path: '/maintainer/indirect-staff-shift',
    name: 'Administrar Turno Per. Indirecto',
    element: IndirectStaffShiftMaintainer,
    protected: true,
  },
  {
    path: '/maintainer/shifts',
    name: 'Administrar Jornada',
    element: ShiftMaintainer,
    protected: true,
  },
  {
    path: '/maintainer/direct-staff-shift',
    name: 'Administrar Turno Per. Directo',
    element: DirectStaffShiftMaintainer,
    protected: true,
  },
  {
    path: '/maintainer/work-front',
    name: 'Administrar Frentes de trabajo',
    element: WorkFrontMaintainer,
    protected: true,
  },
  {
    path: '/maintainer/weather',
    name: 'Administrar Clima',
    element: WeatherMaintainer,
    protected: true,
  },
  {
    path: '/maintainer/aljibe',
    name: 'Administrar Aljibes',
    element: AljibeMaintainerPage,
    protected: true,
  },
  {
    path: '/maintainer/technical-doc',
    name: 'Administrar Documentación técnica',
    element: TechnicalDocMaintainerPage,
    protected: true,
  },
  {
    path: '/maintainer/carousel',
    name: 'Administrar imágenes carrusel',
    element: CarouselMaintainerPage,
    protected: true,
  },
  {
    path: '/dashboard-reportes',
    name: 'Dashboard reportes',
    element: DashboardReportesPage,
    protected: true,
  },
  {
    path: '/exportar-datos',
    name: 'Exportar datos',
    element: ExportPage,
    protected: true,
  },
  {
    path: '/maintainer/contract-asign',
    name: 'Asignar contrato',
    element: ContractAsignPage,
    protected: true,
  },
  {
    path: '/maintainer/role',
    name: 'Asignar Roles',
    element: RolePage,
    protected: true,
  },
  {
    path: '/maintainer/permissions-assign',
    name: 'Asignar Permisos',
    element: PermissionAssignMaintainerPage,
    protected: true,
  },
  {
    path: '/dashboard',
    name: 'Dashboard graficos',
    element: ChartsPage,
    protected: true,
  },
]

export default routes

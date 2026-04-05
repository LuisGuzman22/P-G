# CLAUDE.md — P&G Control Estratégico (Frontend)

Guía de contexto completo para el proyecto. Léela para ponerte al día rápidamente.

---

## Descripción General

**P&G Control Estratégico** es una aplicación React para gestión y control de proyectos de construcción/infraestructura. Permite:
- Crear y gestionar **informes diarios** de obra (mano de obra, maquinaria, actividades, etc.)
- Visualizar **avance de proyectos** con gráficos, curva S y Gantt
- Administrar entidades (personal, maquinaria, vehículos, turnos, contratos, usuarios, etc.)
- Controlar accesos mediante un sistema de **permisos granular**

Versión: `v0.9.0-test` | Autor original: Luis Guzman | Rama activa: `dev`

---

## Stack Tecnológico

| Categoría | Tecnología |
|-----------|-----------|
| Framework UI | React 18.2.0 (Create React App) |
| UI Components | CoreUI React 5 (basado en Bootstrap 5) |
| Estado servidor | @tanstack/react-query 5 (con persistencia en localStorage) |
| Estado global UI | Redux 4 + react-redux 8 |
| Estado local complejo | React Context API |
| Routing | react-router-dom 6 (HashRouter) |
| HTTP client | Axios 1.6 |
| Tablas avanzadas | material-react-table 3 |
| Gráficos | Chart.js 4 + react-google-charts + @coreui/react-chartjs |
| PDF | @react-pdf/renderer 3 |
| Estilos | SCSS + CoreUI + @mui/material |
| Animaciones | lottie-react |
| Build | react-scripts 5 + env-cmd |
| Deploy | gh-pages |

**IMPORTANTE**: El proyecto usa JavaScript puro, NO TypeScript.

---

## Ambientes y URLs

| Ambiente | URL | Script |
|----------|-----|--------|
| QA | `https://qa.pgproject.cl/` | `npm start` |
| Dev | `https://dev.pgproject.cl/` | `npm run start:dev` |
| Prod | `https://mpm.pgproject.cl/` | `npm run start:prod` |
| SIMIM | (especial) | `npm run start:simim` |

Variable de entorno clave: `REACT_APP_BASE_URL`

### Builds
```bash
npm run build:qa     # build apuntando a QA
npm run build:dev    # build apuntando a Dev
npm run build:prod   # build apuntando a Prod
```

---

## Estructura de Carpetas

```
src/
├── assets/              # Imágenes, íconos, branding
├── components/
│   ├── maintainers/     # 23 módulos CRUD de administración
│   ├── charts/          # Gráficos: GeneralProgress, SCurve, Hitos
│   ├── daily-report/    # Formularios de informe diario (Create/View/Edit)
│   ├── dashboard-reports/
│   ├── export-data/
│   ├── gantt-chart/
│   ├── header/          # AppHeader, AppHeaderDropdown
│   ├── tabs/
│   └── trisemanal/
├── context/
│   ├── DailyReportContext.jsx   # Estado del informe diario (muy grande)
│   └── PermissionsContext.jsx   # Permisos del usuario
├── hooks/               # 37 custom hooks
├── layout/
│   └── DefaultLayout.jsx        # Layout con sidebar + header + footer
├── pages/               # 37 páginas (wrapper de componentes)
├── providers/           # PermissionsProvider
├── scss/                # Estilos globales
├── utils/
│   ├── contant.js       # Todas las claves de permisos (125 permisos)
│   ├── regex.js         # Regex de validación (email)
│   └── validate.js      # Validar solo números/puntos
├── App.js               # Router principal con lazy loading
├── index.js             # Entry point
└── store.js             # Redux store
```

---

## Flujo de Navegación Principal

```
/login
  → POST /api/v1/login
  → guarda token + company_id + permisos en localStorage
  → /project_selector
    → guarda project en localStorage
    → /contrato
      → guarda contract en localStorage
      → /inicio (HomePage - Dashboard)
        → /informe-diario       (crear)
        → /informe-diario/view  (ver)
        → /informe-diario/edit  (editar)
        → /carta-gantt
        → /dashboard
        → /actividades
        → /maintainer/*         (si es admin)
```

---

## Rutas Definidas (55 total)

### Públicas
| Ruta | Descripción |
|------|-------------|
| `/login` | Autenticación |
| `/project_selector` | Selección de proyecto |
| `/contrato` | Selección de contrato |

### Protegidas - Principales
| Ruta | Descripción |
|------|-------------|
| `/inicio` | Dashboard/Home principal |
| `/informe-diario` | Crear informe diario |
| `/informe-diario/view` | Ver informe diario |
| `/informe-diario/edit` | Editar informe diario |
| `/proyecto` | Información del proyecto |
| `/actividades` | Actividades trisenales |
| `/panel-informativo` | Panel informativo |
| `/carta-gantt` | Gráfico de Gantt |
| `/avance` | Detalles de avance |
| `/dashboard` | Dashboard con gráficos |
| `/dashboard-reportes` | Historial de reportes |
| `/exportar-datos` | Exportación de datos |

### Protegidas - Mantenedores
| Ruta | Entidad |
|------|---------|
| `/maintainer/project` | Proyectos |
| `/maintainer/contract` | Contratos |
| `/maintainer/machinery` | Maquinaria |
| `/maintainer/vehicle` | Vehículos |
| `/maintainer/equipment` | Equipos |
| `/maintainer/restriction` | Motivos/Restricciones |
| `/maintainer/users` | Usuarios |
| `/maintainer/direct-personal` | Personal directo |
| `/maintainer/indirect-personal` | Personal indirecto |
| `/maintainer/company` | Empresas |
| `/maintainer/shifts` | Jornadas |
| `/maintainer/direct-staff-shift` | Turnos personal directo |
| `/maintainer/indirect-staff-shift` | Turnos personal indirecto |
| `/maintainer/work-front` | Frentes de trabajo |
| `/maintainer/weather` | Clima |
| `/maintainer/aljibe` | Aljibes/Cisternas |
| `/maintainer/technical-doc` | Documentación técnica |
| `/maintainer/carousel` | Imágenes carrusel |
| `/maintainer/gantt` | Subir Gantt |
| `/maintainer/role` | Roles |
| `/maintainer/permissions-assign` | Asignar permisos |
| `/maintainer/contract-asign` | Asignar contratos |

---

## Gestión de Estado

### 1. Redux Store (`src/store.js`)
Mínimo: solo maneja UI global.
```javascript
{ sidebarShow: boolean, theme: 'light' | 'dark' }
// Reducer único con type: 'set'
```

### 2. React Query (estado del servidor)
- Cache en localStorage (`REACT_QUERY_OFFLINE_CACHE`)
- `cacheTime: 24h`, `staleTime: 1h`, `refetchInterval: 1h`, retry 3x
- Claves principales: `['projects']`, `['contracts']`, `['basics']`, `['reports']`, `['activities']`, `['machinery']`, `['vehicle']`, `['equipment']`, `['shifts']`, `['work-front']`, `['weather']`, etc.

### 3. DailyReportContext (`src/context/DailyReportContext.jsx`)
Contexto gigante que almacena todo el estado de un informe diario en construcción:
- Datos empresa, fecha, número de informe, clima
- Listas de mano de obra directa e indirecta
- Listas de maquinaria, vehículos, equipos
- Actividades, incidentes, comentarios
- Aljibes (con m³ acumulados), gráficos, fotos
- Métodos: `store*()`, `remove*()`, `clearContext()`

### 4. PermissionsContext (`src/context/PermissionsContext.jsx`)
```javascript
{ userPermissions: string[], hasPermission(key): boolean, updatePermissions(), clearPermissions() }
```

### 5. localStorage (fuente de verdad para sesión)
```javascript
token           // JWT
company_user    // ID empresa
project         // JSON {id, name, manager}
contract        // JSON {id, name, code}
USER_TYPE       // 'basic' | 'admin'
daily_report    // ID del reporte en edición
userPermissions // JSON array de permisos
color           // tema light/dark
```

---

## API y Servicios

### Hook principal de HTTP: `useCallApi`
```javascript
const { get, post, put, patch, delete } = useCallApi()
// Todos los métodos añaden automáticamente el Authorization: Bearer token
```

### Endpoints principales (`/api/v1/...`)

**Auth**: `POST /login`

**Proyectos/Contratos**:
- `GET /projects`, `POST /projects`, `PUT /projects/{id}`, `DELETE /projects/{id}`
- `GET /contracts/byProject/{projectId}`, `GET /contracts/search`

**Datos de contrato**:
- `GET /basicData/{contractId}`
- `GET /plannings/search`, `GET /activities/search`, `GET /clusters`

**Activos**:
- `GET /machineries/byContract/{id}`, `/vehicles/...`, `/equipments/...`, `/restrictions/...`

**Personal**:
- `GET /direct-personals/byContract/{id}`, `/indirect-personals/...`
- `GET /users`, `GET /companies-with-trashed`

**Configuración**:
- `GET /shifts/byContract/{id}`, `/directStaffShifts/...`, `/indirectStaffShifts/...`
- `GET /workFronts/byContract/{id}`, `/weathers/...`, `/waterTrucks/...`

**Reportes**:
- `GET /reports/search`, `GET /reports/{id}`

**Gráficos**:
- `GET /projects/curvaS/{projectId}/{contractId}`
- `GET /projects/generalAdvance/{projectId}/{contractId}`

**Multimedia**:
- `GET /documentation/getTechnicalDocumentationUrls/{projectId}/{contractId}`
- `GET /carrusel/getCarouselUrls/{projectId}`
- `GET /gantt/getGanttUrls/{projectId}/{contractId}`
- `GET /categories/byContract/{id}`

**Admin**: `GET /roles`, `GET /permissions`

---

## Sistema de Permisos

Definidos en `src/utils/contant.js` (~125 permisos).

Estructura: `ENTIDAD_ACCION`, ejemplos:
```javascript
'direct_personal_view', 'direct_personal_create', 'direct_personal_update', 'direct_personal_delete'
'machinery_view', 'machinery_create', ...
'reports_create'
'dashboard_view'
'export_data'
'gantt_view', 'gantt_create', 'gantt_delete'
...
```

**Uso**:
```javascript
const { hasPermission } = usePermission()
if (hasPermission('reports_create')) { ... }
```

Los permisos llegan del backend en el login y se almacenan en Context + localStorage.

---

## Autenticación

1. `POST /api/v1/login` con `{ email, password }`
2. Response: `{ data: { token, user: { company_id }, permissions: [] } }`
3. Se guarda token, company_id, permisos
4. `USER_TYPE` se determina según permisos (admin tiene acceso a mantenedores)
5. DefaultLayout verifica localStorage; sin proyecto/contrato redirige al selector

**Tipos de usuario**:
- `'basic'`: solo puede crear informes y ver dashboards
- `'admin'`: acceso completo + mantenedores

---

## Patrón de Mantenedores

Los 23 módulos de administración siguen el mismo patrón:

```
components/maintainers/{recurso}/
├── {Recurso}Maintainer.jsx    # Componente principal (orquesta)
├── {Recurso}List.jsx          # Tabla con filtros (material-react-table)
├── ModalAdd{Recurso}.jsx      # Modal crear/editar con validación
└── css.scss                   # Estilos locales
```

Para crear un nuevo mantenedor, seguir este patrón idéntico y agregar la ruta en `App.js`.

---

## Informe Diario — Flujo y Estructura

El informe diario es la funcionalidad central y más compleja.

**Componentes principales**:
- `DailyReportCollapse.jsx` — Formulario de creación (25KB, ~20 secciones)
- `DailyReportViewCollapse.jsx` — Vista de solo lectura (25KB)
- `DailyReportEditCollapse.jsx` — Edición (20KB)

**Secciones del informe** (sub-componentes en `components/daily-report/`):
- `company-report.jsx` — Datos generales empresa
- `direct-work-force.jsx` — Mano de obra directa
- `indirect-work-force.jsx` — Mano de obra indirecta
- `machinery.jsx` — Maquinaria
- `vehicle.jsx` — Vehículos
- `equipment-machinery.jsx` — Equipos
- `activities.jsx` — Actividades (25KB, muy complejo)
- `incidents.jsx` — Incidentes
- `comments.jsx` — Comentarios
- `industrial-water-control.jsx` — Control agua/aljibes
- `graphs.jsx` — Gráficos embebidos
- `photo-record.jsx` — Registro fotográfico

Todo el estado del formulario vive en **DailyReportContext**. Al guardar se hace POST a la API.

---

## Custom Hooks Importantes

| Hook | Propósito |
|------|-----------|
| `useCallApi` | Cliente HTTP con auth automática |
| `useLogin` | Login (con modo mock para dev) |
| `useRegisterGeneralData` | Guardar/leer project y contract en localStorage |
| `useGetCachedQueryData` | Obtener datos del cache de React Query |
| `usePermission` | Wrapper sobre PermissionsContext |
| `useFetch*` | Hooks de fetch para cada entidad (useGetProjects, useGetContracts, etc.) |
| `useRegister*` | Hooks de mutación para cada entidad |
| `useAsign*` | Hooks de asignación (contratos a usuarios, permisos, etc.) |

---

## Consideraciones Importantes para Desarrollo

1. **Flujo obligatorio**: Login → ProjectSelector → ContractSelector. Sin `project` y `contract` en localStorage, DefaultLayout redirige.

2. **React Query es la fuente de verdad para datos del servidor**. No hacer fetches directos si ya hay un hook de React Query para esa entidad.

3. **DailyReportContext es muy grande**. Cualquier cambio ahí puede tener efectos ampliamente distribuidos.

4. **Verificar permisos** antes de mostrar botones o rutas de mantenimiento.

5. **Routing usa HashRouter** (`#/`), no BrowserRouter. Las URLs tienen `#` antes de la ruta.

6. **Lazy loading en App.js**: todos los componentes de página se cargan con `React.lazy()` y `Suspense`.

7. **Múltiples ambientes**: recordar usar el `.env` correcto al iniciar el servidor local.

8. **Sin TypeScript**: el proyecto es JS puro. No añadir TS sin discutirlo.

9. **CoreUI + Bootstrap**: usar clases de CoreUI/Bootstrap antes de escribir CSS custom.

10. **Trisemanal vs Actividades**: "trisemanal" es el término del negocio para períodos de 3 semanas de planificación.

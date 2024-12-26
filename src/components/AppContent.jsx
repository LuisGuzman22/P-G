import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import Skeleton from 'react-loading-skeleton'
import ProtectedRoute from 'src/protectedRoute'

const AppContent = () => {
  const isAuthenticated = Boolean(localStorage.getItem('token')) // O tu lógica para validar sesión

  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<Skeleton count={3} />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={
                    route.protected ? (
                      <ProtectedRoute isAuthenticated={isAuthenticated}>
                        <route.element />
                      </ProtectedRoute>
                    ) : (
                      <route.element />
                    )
                  }
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="login" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)

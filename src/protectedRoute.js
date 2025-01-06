/* eslint-disable react/prop-types */
import React, { Suspense, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = (props) => {
  if (!props.isAuthenticated) {
    // Redirige al login si no está autenticado
    return <Navigate to="/login" replace />
  }

  // Si está autenticado, renderiza los hijos (children)
  return props.children
}

export default ProtectedRoute

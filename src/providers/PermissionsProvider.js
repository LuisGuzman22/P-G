/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState, useEffect } from 'react'

const PermissionsContext = createContext(null)

export const PermissionsProvider = ({ children }) => {
  const [userPermissions, setUserPermissions] = useState([])

  // 🔹 Cargar permisos guardados al iniciar
  useEffect(() => {
    const storedPermissions = localStorage.getItem('userPermissions')
    if (storedPermissions) {
      setUserPermissions(JSON.parse(storedPermissions))
    }
  }, [])

  // 🔹 Guardar permisos en localStorage cada vez que cambien
  const updatePermissions = (permissions) => {
    setUserPermissions(permissions)
    localStorage.setItem('userPermissions', JSON.stringify(permissions))
  }

  // 🔹 Función para borrar permisos al hacer logout
  const clearPermissions = () => {
    setUserPermissions([])
    localStorage.removeItem('userPermissions')
  }

  const hasPermission = (permission) => userPermissions.includes(permission)

  return (
    <PermissionsContext.Provider
      value={{ userPermissions, updatePermissions, clearPermissions, hasPermission }}
    >
      {children}
    </PermissionsContext.Provider>
  )
}

export const usePermissions = () => {
  const context = useContext(PermissionsContext)
  if (!context) {
    throw new Error('usePermissions debe usarse dentro de un PermissionsProvider')
  }
  return context
}

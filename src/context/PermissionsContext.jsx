import { createContext, useContext } from 'react'

const PermissionsContext = createContext(null)

export const usePermissions = () => {
  const context = useContext(PermissionsContext)
  if (!context) {
    throw new Error('usePermissions debe usarse dentro de un PermissionsProvider')
  }
  return context
}

export default PermissionsContext

import { React, useEffect, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import './css.scss'
import useCompany from 'src/hooks/useCompany'
import CompanyList from './CompanyList'
import ModalAddCompany from './ModalAddCompany'
import ModalRestoreCompany from './ModalRestoreCompany'
import { useNavigate } from 'react-router-dom'
import { usePermissions } from 'src/providers/PermissionsProvider'
import { PERMISSIONS } from 'src/utils/contant'

const CompanyMaintainer = () => {
  const { isLoading, refetch, isRefetching } = useCompany()
  let navigate = useNavigate()

  const [visibleCompany, setVisibleCompany] = useState(false)
  const [visibleRestoreCompany, setVisibleRestoreCompany] = useState(false)

  const { hasPermission } = usePermissions()

  const redirectTo = (url) => {
    navigate(url)
  }

  useEffect(() => {
    if (!hasPermission(PERMISSIONS.COMPANY.CREATE)) {
      redirectTo('/inicio')
    }
  }, [])

  return (
    <div className="company-maintainer">
      <h2 className="title">Administrar Empresas</h2>
      {visibleCompany && (
        <ModalAddCompany
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleCompany(data)
            await refetch()
          }}
        />
      )}

      {visibleRestoreCompany && (
        <ModalRestoreCompany
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleRestoreCompany(data)
            await refetch()
          }}
        />
      )}
      <CCard className="action-buttons">
        <CCardBody>
          <CButton className="btn-modal" onClick={() => setVisibleCompany(!visibleCompany)}>
            Añadir Empresa
          </CButton>
          <CButton
            className="btn-modal"
            onClick={() => setVisibleRestoreCompany(!visibleRestoreCompany)}
          >
            Ver eliminados
          </CButton>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          {isLoading || isRefetching ? <Skeleton count={5} /> : <CompanyList />}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default CompanyMaintainer

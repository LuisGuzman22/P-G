import { React, useEffect, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import './css.scss'
import useTechnicalDoc from 'src/hooks/useTechnicalDoc'
import TechnicalDocList from './TechnicalDocList'
import ModalAddTechnicalDoc from './ModalAddTechnicalDoc'
import ModalAddCategory from './ModalAddCategory'
import { usePermissions } from 'src/providers/PermissionsProvider'
import { useNavigate } from 'react-router-dom'
import { PERMISSIONS } from 'src/utils/contant'

const TechnicalDocMaintainer = () => {
  const { isLoading, refetch, isRefetching, categoryRefetch } = useTechnicalDoc()
  let navigate = useNavigate()

  const [visibleTechDoc, setVisibleTecDoc] = useState(false)
  const [visibleCategory, setVisibleCategory] = useState(false)

  const { hasPermission } = usePermissions()

  useEffect(() => {
    if (!hasPermission(PERMISSIONS.TECHNICAL_DOCUMENTATION.VIEW)) {
      navigate('/inicio')
    }
  }, [hasPermission, navigate])

  return (
    <div className="technical-doc-maintainer">
      <h2 className="title">Administrar Documentación Técnica</h2>
      {visibleTechDoc && (
        <ModalAddTechnicalDoc
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleTecDoc(data)
            await refetch()
          }}
        />
      )}

      <>
        {visibleCategory && (
          <ModalAddCategory
            visible={true}
            sendDataToParent={async (data) => {
              setVisibleCategory(data)
              await categoryRefetch()
            }}
          />
        )}
      </>
      {hasPermission(PERMISSIONS.TECHNICAL_DOCUMENTATION.CREATE) && (
        <CCard className="action-buttons">
          <CCardBody>
            <CButton className="btn-modal" onClick={() => setVisibleTecDoc(!visibleTechDoc)}>
              Añadir Documento
            </CButton>
            {hasPermission(PERMISSIONS.CATEGORY.CREATE) && (
              <CButton className="btn-modal" onClick={() => setVisibleCategory(!visibleCategory)}>
                Añadir Categoría
              </CButton>
            )}
          </CCardBody>
        </CCard>
      )}

      <CCard>
        <CCardBody>
          {isLoading || isRefetching ? <Skeleton count={5} /> : <TechnicalDocList />}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default TechnicalDocMaintainer

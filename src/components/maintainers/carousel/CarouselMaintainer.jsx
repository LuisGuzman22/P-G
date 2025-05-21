import { React, useEffect, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import './css.scss'
import useTechnicalDoc from 'src/hooks/useTechnicalDoc'
import CarouselList from './CarouselList'
import ModalAddImage from './ModalAddImage'
import useCarousel from 'src/hooks/useCarousel'
import { usePermissions } from 'src/providers/PermissionsProvider'
import { useNavigate } from 'react-router-dom'
import { PERMISSIONS } from 'src/utils/contant'

const CarouselMaintainer = () => {
  const { isLoading, refetch, isRefetching } = useCarousel()
  let navigate = useNavigate()

  const [visibleCategory, setVisibleCategory] = useState(false)

  const { hasPermission } = usePermissions()

  const redirectTo = (url) => {
    navigate(url)
  }

  useEffect(() => {
    if (!hasPermission(PERMISSIONS.CAROUSEL.CREATE)) {
      redirectTo('/inicio')
    }
  }, [])

  return (
    <div className="technical-doc-maintainer">
      <h2 className="title">Administrar Imágenes</h2>

      {visibleCategory && (
        <ModalAddImage
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleCategory(data)
            // await categoryRefetch()
          }}
        />
      )}

      <CCard className="action-buttons">
        <CCardBody>
          <CButton className="btn-modal" onClick={() => setVisibleCategory(!visibleCategory)}>
            Añadir Imagen
          </CButton>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          {isLoading || isRefetching ? <Skeleton count={5} /> : <CarouselList />}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default CarouselMaintainer

import React from 'react'
import { CCarousel, CCarouselItem, CImage, CButton } from '@coreui/react'
const InformativePanel = () => {
  return (
    <>
      <CButton>Inicio seguro de SSO</CButton>

      <CCarousel controls indicators>
        <CCarouselItem>
          <CImage
            className="d-block w-100"
            src={'https://coreui.io/react/docs/static/angular-2f3764e2ec8b0b47ebe68f2f80260ef1.jpg'}
            alt="slide 1"
          />
        </CCarouselItem>
        <CCarouselItem>
          <CImage
            className="d-block w-100"
            src={'https://coreui.io/react/docs/static/angular-2f3764e2ec8b0b47ebe68f2f80260ef1.jpg'}
            alt="slide 2"
          />
        </CCarouselItem>
        <CCarouselItem>
          <CImage
            className="d-block w-100"
            src={'https://coreui.io/react/docs/static/angular-2f3764e2ec8b0b47ebe68f2f80260ef1.jpg'}
            alt="slide 3"
          />
        </CCarouselItem>
      </CCarousel>
      <CButton>Subir Imagen</CButton>
    </>
  )
}

export default InformativePanel

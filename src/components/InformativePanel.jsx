import React from 'react'
import { CCarousel, CCarouselItem, CImage, CButton } from '@coreui/react'
import organigrama_canal_contorno from 'src/assets/images/organigrama-canal-contorno.jpeg'
import organigrama_ruta_oriente from 'src/assets/images/organigrama-ruta-oriente.jpeg'
const InformativePanel = () => {
  return (
    <>
      <CButton>Inicio seguro de SSO</CButton>

      <CCarousel controls indicators>
        <CCarouselItem>
          <CImage className="d-block w-100" src={organigrama_canal_contorno} alt="slide 1" />
        </CCarouselItem>
        <CCarouselItem>
          <CImage className="d-block w-100" src={organigrama_ruta_oriente} alt="slide 1" />
        </CCarouselItem>
      </CCarousel>
      <CButton>Subir Imagen</CButton>
    </>
  )
}

export default InformativePanel

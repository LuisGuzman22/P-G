import React from 'react'
import { CCarousel, CCarouselItem, CImage, CButton } from '@coreui/react'
import organigrama_canal_contorno from 'src/assets/images/organigrama-canal-contorno.jpeg'
import organigrama_ruta_oriente from 'src/assets/images/organigrama-ruta-oriente.jpeg'
import organigrama_ruta_norte from 'src/assets/images/organigrama-canal-contorno-norte.jpeg'
const InformativePanel = () => {
  return (
    <>
      <CCarousel controls indicators>
        <CCarouselItem>
          <CImage className="d-block w-100" src={organigrama_canal_contorno} alt="slide 1" />
        </CCarouselItem>
        <CCarouselItem>
          <CImage className="d-block w-100" src={organigrama_ruta_oriente} alt="slide 2" />
        </CCarouselItem>
        <CCarouselItem>
          <CImage className="d-block w-100" src={organigrama_ruta_norte} alt="slide 3" />
        </CCarouselItem>
      </CCarousel>
      <CButton>Subir Imagen</CButton>
    </>
  )
}

export default InformativePanel

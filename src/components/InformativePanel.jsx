import React from 'react'
import { CCarousel, CCarouselItem, CImage, CButton } from '@coreui/react'
import organigrama_canal_contorno from 'src/assets/images/organigrama-canal-contorno.jpeg'
import organigrama_ruta_oriente from 'src/assets/images/organigrama-ruta-oriente.jpeg'
import organigrama_ruta_norte from 'src/assets/images/organigrama-canal-contorno-norte.jpeg'
import img1 from 'src/assets/images/img1.jpeg'
import useCarousel from 'src/hooks/useCarousel'
import Skeleton from 'react-loading-skeleton'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
const InformativePanel = () => {
  const { isLoading, refetch, isRefetching } = useCarousel()
  const { getData } = useGetCachedQueryData()
  const carouselQuery = getData('carousel')

  return (
    <div className="carousel-container">
      {!isLoading || !isRefetching ? (
        <CCarousel controls indicators>
          {carouselQuery?.map((doc, index) => {
            return (
              <CCarouselItem key={doc.id}>
                <CImage
                  key={doc.id}
                  className="d-block w-100"
                  src={doc.url}
                  alt={doc.name}
                  width={500}
                  height={500}
                  style={{ objectFit: 'contain' }}
                />
              </CCarouselItem>
            )
          })}
        </CCarousel>
      ) : (
        <Skeleton count={5} />
      )}
    </div>
  )
}

export default InformativePanel

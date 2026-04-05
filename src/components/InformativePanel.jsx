import React from 'react'
import { CCarousel, CCarouselItem, CImage } from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
const InformativePanel = () => {
  const { isLoading, isRefetching } = useCarousel()
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

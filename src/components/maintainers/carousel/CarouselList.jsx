import React, { useState } from 'react'
import {
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import useTechnicalDoc from 'src/hooks/useTechnicalDoc'
import useCarousel from 'src/hooks/useCarousel'

const CarouselList = () => {
  const { getData } = useGetCachedQueryData()
  const carouselQuery = getData('carousel')
  const { deleteDoc } = useCarousel()

  return (
    <>
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {carouselQuery?.map((doc, index) => {
            return (
              <CTableRow key={doc.id}>
                <CTableDataCell>
                  <a href={doc.url} target="_blank" rel="noreferrer">
                    {doc.name}
                  </a>
                </CTableDataCell>
                <CTableDataCell>
                  <CButton
                    className="btn-action-delete"
                    onClick={() => {
                      deleteDoc(doc.id)
                    }}
                  >
                    <CIcon icon={cilTrash} />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
    </>
  )
}

export default CarouselList

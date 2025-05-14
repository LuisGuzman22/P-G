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
import { usePermissions } from 'src/providers/PermissionsProvider'
import { PERMISSIONS } from 'src/utils/contant'

const CarouselList = () => {
  const { getData } = useGetCachedQueryData()
  const carouselQuery = getData('carousel')
  const { deleteDoc } = useCarousel()
  const { hasPermission } = usePermissions()

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
                  {hasPermission(PERMISSIONS.CAROUSEL.DELETE) && (
                    <CButton
                      className="btn-action-delete"
                      onClick={() => {
                        deleteDoc(doc.id)
                      }}
                    >
                      <CIcon icon={cilTrash} />
                    </CButton>
                  )}
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

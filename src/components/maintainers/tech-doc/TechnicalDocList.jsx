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

const TechnicalDocList = () => {
  const { getData } = useGetCachedQueryData()
  const techDocQuery = getData('technical-documentation')
  const { deleteVehicle } = useTechnicalDoc()

  return (
    <>
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
            <CTableHeaderCell scope="col">Categoría</CTableHeaderCell>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {techDocQuery.map((doc, index) => {
            return (
              <CTableRow key={doc.id}>
                <CTableDataCell> {doc.url.split('/')[4]}</CTableDataCell>
                <CTableDataCell>{doc.category}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    className="btn-action-delete"
                    onClick={() => {
                      deleteVehicle(doc.id)
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

export default TechnicalDocList

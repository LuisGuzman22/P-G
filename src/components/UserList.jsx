import React, { useEffect } from 'react'
import {
  CTable,
  CTableHead,
  CButton,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const ProjectList = () => {
  const fetchProducts = async () => {
    const res = await axios.get('https://701c573ff182421aa80bd97b52e34a3f.api.mockbin.io/')
    return res.data.data
  }

  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      return fetchProducts()
    },
  })

  return (
    <CTable>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">ID</CTableHeaderCell>
          <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
          <CTableHeaderCell scope="col">Correo</CTableHeaderCell>
          <CTableHeaderCell scope="col">Proyecto</CTableHeaderCell>
          <CTableHeaderCell scope="col">Contrato</CTableHeaderCell>
          <CTableHeaderCell scope="col">Acción</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow>
          <CTableDataCell>1</CTableDataCell>
          <CTableDataCell>Juan Perez</CTableDataCell>
          <CTableDataCell>asd@asd.cl</CTableDataCell>
          <CTableDataCell>Proyecto 1</CTableDataCell>
          <CTableDataCell>Contrato 1</CTableDataCell>
          <CTableDataCell>
            <CButton className="btn-edit">Editar</CButton>
            <CButton className="btn-del">Eliminar</CButton>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
  )
}

export default ProjectList

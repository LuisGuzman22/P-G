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
import useVehicle from 'src/hooks/useVehicle'
import ModalAddProject from 'src/components/maintainers/project/ModalAddProject'
import useProjects from 'src/hooks/useProjects'
import ModalAddContract from './ModalAsignContract'
import useContracts from 'src/hooks/useContracts'

const ContractAsignList = () => {
  const { getData } = useGetCachedQueryData()
  const projectsQuery = getData('projects')

  return (
    <>
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
            <CTableHeaderCell scope="col">Contrato</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {projectsQuery.map((project, index) => {
            return project.contracts.map((contract, index) => {
              return (
                <CTableRow key={project.id}>
                  <CTableDataCell>{project.name}</CTableDataCell>
                  <CTableDataCell>{contract.name}</CTableDataCell>
                </CTableRow>
              )
            })
          })}
        </CTableBody>
      </CTable>
    </>
  )
}

export default ContractAsignList

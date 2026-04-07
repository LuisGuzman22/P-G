import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'

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

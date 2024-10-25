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
import ModalAddContract from './ModalAddContract'
import useContracts from 'src/hooks/useContracts'

const ContractList = () => {
  const { getData } = useGetCachedQueryData()
  const contractsQuery = getData('contracts')

  const { deleteContract } = useContracts()

  const [visibleContract, setVisibleContract] = useState(false)
  const [selectedContract, setSelectedContract] = useState()

  const handleEditContract = (contract) => {
    setSelectedContract(contract)
    setVisibleContract(!visibleContract)
  }

  return (
    <>
      {visibleContract && (
        <ModalAddContract
          visible={true}
          selectedContract={selectedContract}
          sendDataToParent={async (data) => {
            // await refetch()
            setVisibleContract(data)
          }}
        />
      )}
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
            <CTableHeaderCell scope="col">Código</CTableHeaderCell>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {contractsQuery.map((contract, index) => {
            return (
              <CTableRow key={contract.id}>
                <CTableDataCell>{contract.name}</CTableDataCell>
                <CTableDataCell>{contract.code}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    className="btn-action-edit"
                    onClick={() => {
                      handleEditContract(contract)
                    }}
                  >
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <CButton
                    className="btn-action-delete"
                    onClick={() => {
                      deleteContract(contract.id)
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

export default ContractList

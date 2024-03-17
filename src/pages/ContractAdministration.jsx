import { React, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import ContractList from 'src/components/ContractList'
import ModalAddContract from 'src/components/ModalAddContract'

const ContractAdministration = () => {
  const [visibleContract, setVisibleContract] = useState(false)

  return (
    <div className="contract-administration">
      <h2>Administrar Contratos</h2>

      {visibleContract && (
        <ModalAddContract
          visible={true}
          sendDataToParent={(data) => {
            setVisibleContract(data)
          }}
        />
      )}

      <CCard className="action-buttons">
        <CCardBody>
          <CButton onClick={() => setVisibleContract(!visibleContract)}>Añadir contrato</CButton>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          <ContractList />
        </CCardBody>
      </CCard>
    </div>
  )
}

export default ContractAdministration

import { React, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import './css.scss'
import useContracts from 'src/hooks/useContracts'
import ContractList from './ContractList'
import ModalAddContract from './ModalAddContract'

const ContractAsignMaintainer = () => {
  const { isLoading, refetch, isRefetching } = useContracts()

  const [visibleContract, setVisibleContract] = useState(false)

  return (
    <div className="contract-maintainer">
      <h2 className="title">Administrar Contratos</h2>
      {visibleContract && (
        <ModalAddContract
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleContract(data)
            await refetch()
          }}
        />
      )}

      <CCard className="action-buttons">
        <CCardBody>
          <CButton className="btn-modal" onClick={() => setVisibleContract(!visibleContract)}>
            Añadir Contrato
          </CButton>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          {isLoading || isRefetching ? <Skeleton count={5} /> : <ContractList />}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default ContractAsignMaintainer

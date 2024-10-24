import { React, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import './css.scss'
import useContracts from 'src/hooks/useContracts'
import useProjects from 'src/hooks/useProjects'
import ContractAsignList from './ContractAsignList'
import ModalAsignContract from './ModalAsignContract'

const ContractAsignMaintainer = () => {
  const { isLoading, refetch, isRefetching } = useProjects()
  const {
    isLoading: contractLoading,
    refetch: contractRefetch,
    isRefetching: contractIsFetching,
  } = useContracts()

  const [visibleContract, setVisibleContract] = useState(false)

  return (
    <div className="contract-maintainer">
      <h2 className="title">Asignar contratos a proyecto</h2>
      {visibleContract && (
        <ModalAsignContract
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleContract(data)
            await refetch()
            await contractRefetch()
          }}
        />
      )}

      <CCard className="action-buttons">
        <CCardBody>
          <CButton className="btn-modal" onClick={() => setVisibleContract(!visibleContract)}>
            Asignar Contrato
          </CButton>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          {isLoading || isRefetching ? <Skeleton count={5} /> : <ContractAsignList />}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default ContractAsignMaintainer

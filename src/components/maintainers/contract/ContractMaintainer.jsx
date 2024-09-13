import { React, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import './css.scss'
import useContracts from 'src/hooks/useContracts'
import ContractList from './ContractList'

const ContractMaintainer = () => {
  const { isLoading, refetch, isRefetching } = useContracts()

  //   const [visibleProject, setVisibleProject] = useState(false)

  return (
    <div className="contract-maintainer">
      <h2 className="title">Administrar Contratos</h2>
      {/* {visibleProject && (
        <ModalAddProject
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleProject(data)
            await refetch()
          }}
        />
      )} */}

      <CCard className="action-buttons">
        <CCardBody>
          {/* <CButton className="btn-modal" onClick={() => setVisibleProject(!visibleProject)}>
            Añadir Proyecto
          </CButton> */}
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

export default ContractMaintainer

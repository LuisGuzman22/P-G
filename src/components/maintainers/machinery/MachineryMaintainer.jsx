import { React, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import ModalAddProject from 'src/components/ModalAddProject'
import ModalAddCategories from 'src/components/ModalAddCategories'
import useGetProjects from 'src/hooks/useGetProjects'
import MachineryList from './MachineryList'
import ModalAddMachinery from './ModalAddMachinery'
import useMachinery from 'src/hooks/useMachinery'
import Skeleton from 'react-loading-skeleton'
import ModalRestoreMachinery from './ModalRestoreMachinery'

const MachineryMaintainer = () => {
  const { isLoading, refetch, isRefetching } = useMachinery()

  const [visibleMachinery, setVisibleMachinery] = useState(false)
  const [visibleRestoreMachinery, setVisibleRestoreMachinery] = useState(false)

  return (
    <div className="proyect-administration">
      <h2>Administrar Maquinaria</h2>

      {visibleMachinery && (
        <ModalAddMachinery
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleMachinery(data)
            await refetch()
          }}
        />
      )}

      {visibleRestoreMachinery && (
        <ModalRestoreMachinery
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleRestoreMachinery(data)
            await refetch()
          }}
        />
      )}

      <CCard className="action-buttons">
        <CCardBody>
          <CButton onClick={() => setVisibleMachinery(!visibleMachinery)}>
            Añadir maquinaria
          </CButton>
          <CButton onClick={() => setVisibleRestoreMachinery(!visibleRestoreMachinery)}>
            Ver eliminados
          </CButton>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          {isLoading || isRefetching ? <Skeleton count={5} /> : <MachineryList />}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default MachineryMaintainer

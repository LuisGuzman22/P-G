import { React, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import ModalAddProject from 'src/components/ModalAddProject'
import ModalAddCategories from 'src/components/ModalAddCategories'
import useGetProjects from 'src/hooks/useGetProjects'
import MachineryList from './MachineryList'
import ModalAddMachinery from './ModalAddMachinery'
import useMachinery from 'src/hooks/useMachinery'
import Skeleton from 'react-loading-skeleton'

const MachineryMaintainer = () => {
  const { isLoading, refetch, isRefetching } = useMachinery()

  const [visibleCategories, setVisibleCategories] = useState(false)
  const [visibleProject, setVisibleProject] = useState(false)

  return (
    <div className="proyect-administration">
      <h2>Administrar Maquinaria</h2>

      {visibleProject && (
        <ModalAddMachinery
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleProject(data)
            await refetch()
          }}
        />
      )}

      {visibleCategories && (
        <ModalAddCategories
          visible={true}
          sendDataToParent={(data) => {
            setVisibleCategories(data)
          }}
        />
      )}

      <CCard className="action-buttons">
        <CCardBody>
          <CButton onClick={() => setVisibleProject(!visibleProject)}>Añadir maquinaria</CButton>
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

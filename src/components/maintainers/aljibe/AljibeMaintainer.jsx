import { React, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import ModalAddAljibe from './ModalAddAljibe'
import AljibeList from './AljibeList'
import useAljibe from 'src/hooks/useAljibe'

const AljibeMaintainer = () => {
  const { isLoading, refetch, isRefetching } = useAljibe()

  const [visibleAljibe, setVisibleAljibe] = useState(false)

  return (
    <div className="proyect-administration">
      <h2>Administrar Aljibes</h2>
      {visibleAljibe && (
        <ModalAddAljibe
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleAljibe(data)
            await refetch()
          }}
        />
      )}
      <CCard className="action-buttons">
        <CCardBody>
          <CButton onClick={() => setVisibleAljibe(!visibleAljibe)}>Añadir Aljibe</CButton>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>{isLoading || isRefetching ? <Skeleton count={5} /> : <AljibeList />}</CCardBody>
      </CCard>
    </div>
  )
}

export default AljibeMaintainer
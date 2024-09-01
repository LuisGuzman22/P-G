import { React, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import ModalAddAljibe from './ModalAddAljibe'
import AljibeList from './AljibeList'
import useAljibe from 'src/hooks/useAljibe'
import ModalRestoreAljibe from './ModalRestoreAljibe'
import './css.scss'

const AljibeMaintainer = () => {
  const { isLoading, refetch, isRefetching } = useAljibe()

  const [visibleAljibe, setVisibleAljibe] = useState(false)
  const [visibleRestoreAljibe, setVisibleRestoreAljibe] = useState(false)

  return (
    <div className="aljibe-maintainer">
      <h2 className="title">Administrar Aljibes</h2>
      {visibleAljibe && (
        <ModalAddAljibe
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleAljibe(data)
            await refetch()
          }}
        />
      )}

      {visibleRestoreAljibe && (
        <ModalRestoreAljibe
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleRestoreAljibe(data)
            await refetch()
          }}
        />
      )}
      <CCard className="action-buttons">
        <CCardBody>
          <CButton className="btn-modal" onClick={() => setVisibleAljibe(!visibleAljibe)}>
            Añadir Aljibe
          </CButton>
          <CButton
            className="btn-modal"
            onClick={() => setVisibleRestoreAljibe(!visibleRestoreAljibe)}
          >
            Ver eliminados
          </CButton>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>{isLoading || isRefetching ? <Skeleton count={5} /> : <AljibeList />}</CCardBody>
      </CCard>
    </div>
  )
}

export default AljibeMaintainer

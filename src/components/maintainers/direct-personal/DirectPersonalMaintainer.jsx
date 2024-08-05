import { React, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import ModalAddDirectPersonal from './ModalAddDirectPersonal'
import DirectPersonalList from './DirectPersonalList'
import useDirectPersonal from 'src/hooks/useDirectPersonal'
import ModalRestoreDirectPersonal from './ModalRestoreDirectPersonal'

const DirectPersonalMaintainer = () => {
  const { isLoading, refetch, isRefetching } = useDirectPersonal()

  const [visibleDirectPersonal, setVisibleDirectPersonal] = useState(false)
  const [visibleRestoreDirectPersonal, setVisibleRestoreDirectPersonal] = useState(false)

  return (
    <div className="proyect-administration">
      <h2>Administrar Personal Directo</h2>
      {visibleDirectPersonal && (
        <ModalAddDirectPersonal
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleDirectPersonal(data)
            await refetch()
          }}
        />
      )}

      {visibleRestoreDirectPersonal && (
        <ModalRestoreDirectPersonal
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleRestoreDirectPersonal(data)
            await refetch()
          }}
        />
      )}
      <CCard className="action-buttons">
        <CCardBody>
          <CButton onClick={() => setVisibleDirectPersonal(!visibleDirectPersonal)}>
            Añadir personal directo
          </CButton>
          <CButton onClick={() => setVisibleRestoreDirectPersonal(!visibleRestoreDirectPersonal)}>
            Ver eliminados
          </CButton>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          {isLoading || isRefetching ? <Skeleton count={5} /> : <DirectPersonalList />}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default DirectPersonalMaintainer

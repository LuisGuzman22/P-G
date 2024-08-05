import { React, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import IndirectPersonalList from './IndirectPersonalList'
import useIndirectPersonal from 'src/hooks/useIndirectPersonal'
import ModalAddIndirectPersonal from './ModalAddIndirectPersonal'
import ModalRestoreIndirectPersonal from './ModalRestoreIndirectPersonal'

const IndirectPersonalMaintainer = () => {
  const { isLoading, refetch, isRefetching } = useIndirectPersonal()

  const [visibleIndirectPersonal, setVisibleIndirectPersonal] = useState(false)
  const [visibleRestoreIndirectPersonal, setVisibleRestoreIndirectPersonal] = useState(false)

  return (
    <div className="proyect-administration">
      <h2>Administrar Personal Indirecto</h2>
      {visibleIndirectPersonal && (
        <ModalAddIndirectPersonal
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleIndirectPersonal(data)
            await refetch()
          }}
        />
      )}
      {visibleRestoreIndirectPersonal && (
        <ModalRestoreIndirectPersonal
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleRestoreIndirectPersonal(data)
            await refetch()
          }}
        />
      )}
      <CCard className="action-buttons">
        <CCardBody>
          <CButton onClick={() => setVisibleIndirectPersonal(!visibleIndirectPersonal)}>
            Añadir personal indirecto
          </CButton>
          <CButton
            onClick={() => setVisibleRestoreIndirectPersonal(!visibleRestoreIndirectPersonal)}
          >
            Ver eliminados
          </CButton>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          {isLoading || isRefetching ? <Skeleton count={5} /> : <IndirectPersonalList />}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default IndirectPersonalMaintainer

import { React, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import './css.scss'
import useTechnicalDoc from 'src/hooks/useTechnicalDoc'
import TechnicalDocList from './TechnicalDocList'
import ModalAddTechnicalDoc from './ModalAddTechnicalDoc'

const TechnicalDocMaintainer = () => {
  const { isLoading, refetch, isRefetching } = useTechnicalDoc()

  const [visibleTechDoc, setVisibleTecDoc] = useState(false)
  //   const [visibleRestoreVehicle, setVisibleRestoreVehicle] = useState(false)

  return (
    <div className="technical-doc-maintainer">
      <h2 className="title">Administrar Documentación Técnica</h2>
      {visibleTechDoc && (
        <ModalAddTechnicalDoc
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleTecDoc(data)
            await refetch()
          }}
        />
      )}

      <CCard className="action-buttons">
        <CCardBody>
          <CButton className="btn-modal" onClick={() => setVisibleTecDoc(!visibleTechDoc)}>
            Añadir Documento
          </CButton>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          {isLoading || isRefetching ? <Skeleton count={5} /> : <TechnicalDocList />}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default TechnicalDocMaintainer

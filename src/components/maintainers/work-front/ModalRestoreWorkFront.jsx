/* eslint-disable react/prop-types */
import { React } from 'react'
import {
  CButton,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CModal,
  CModalBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import './css.scss'
import useWorkFront from 'src/hooks/useWorkFront'

const ModalRestoreWorkFront = (props) => {
  const { getData } = useGetCachedQueryData()
  const workFrontQuery = getData('workFront')
  const { restoreWorkFront } = useWorkFront()

  const handleClick = () => {
    props.sendDataToParent(false)
  }

  return (
    <CModal
      scrollable
      visible={props.visible}
      onClose={() => handleClick()}
      aria-labelledby="ScrollingLongContentExampleLabel2"
      size="xl"
      className="restore-modal"
    >
      <CModalHeader>
        <CModalTitle id="ScrollingLongContentExampleLabel2">
          Restaurar Frente de trabajo
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        {workFrontQuery?.filter((wf) => wf.deleted_at !== null).length === 0 ? (
          <>No hay frentes de trabajo eliminados</>
        ) : (
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {workFrontQuery
                ?.filter((wf) => wf.deleted_at !== null)
                .map((wf, index) => {
                  return (
                    <CTableRow key={wf.id}>
                      <CTableDataCell>{wf.name}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          className="btn-action-restore"
                          onClick={() => {
                            restoreWorkFront(wf.id)
                          }}
                        >
                          Restaurar
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
            </CTableBody>
          </CTable>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => handleClick()}>
          Cerrar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalRestoreWorkFront

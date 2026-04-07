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
import useIndirectPersonal from 'src/hooks/useIndirectPersonal'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'

const ModalRestoreIndirectPersonal = (props) => {
  const { getData } = useGetCachedQueryData()
  const indirectPersonalQuery = getData('indirect-personal')
  const { restoreIndirectPersonal } = useIndirectPersonal()

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
      className="project-creation-modal"
    >
      <CModalHeader>
        <CModalTitle id="ScrollingLongContentExampleLabel2">
          Restaurar Personal indirecto
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        {indirectPersonalQuery?.filter((personal) => personal.deleted_at !== null).length === 0 ? (
          <>No hay personal eliminado</>
        ) : (
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {indirectPersonalQuery
                ?.filter((personal) => personal.deleted_at !== null)
                .map((idpersonal, index) => {
                  return (
                    <CTableRow key={idpersonal.id}>
                      <CTableDataCell>{idpersonal.name}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="warning"
                          onClick={() => {
                            restoreIndirectPersonal(idpersonal.id)
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

export default ModalRestoreIndirectPersonal

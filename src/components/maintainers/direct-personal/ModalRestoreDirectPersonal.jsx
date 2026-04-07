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
import useDirectPersonal from 'src/hooks/useDirectPersonal'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'

const ModalRestoreDirectPersonal = (props) => {
  const { getData } = useGetCachedQueryData()
  const directPersonalQuery = getData('direct-personal')
  const { restoreDirectPersonal } = useDirectPersonal()

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
        <CModalTitle id="ScrollingLongContentExampleLabel2">Restaurar Personal directo</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {directPersonalQuery?.filter((personal) => personal.deleted_at !== null).length === 0 ? (
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
              {directPersonalQuery
                ?.filter((personal) => personal.deleted_at !== null)
                .map((idpersonal, index) => {
                  return (
                    <CTableRow key={idpersonal.id}>
                      <CTableDataCell>{idpersonal.name}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="warning"
                          onClick={() => {
                            restoreDirectPersonal(idpersonal.id)
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

export default ModalRestoreDirectPersonal

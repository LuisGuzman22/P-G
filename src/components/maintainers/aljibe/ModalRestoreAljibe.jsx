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
import useAljibe from 'src/hooks/useAljibe'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import './css.scss'

const ModalRestoreAljibe = (props) => {
  const { getData } = useGetCachedQueryData()
  const aljibeQuery = getData('aljibe')
  const { restoreAljibe } = useAljibe()

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
        <CModalTitle id="ScrollingLongContentExampleLabel2">Restaurar Aljibes</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {aljibeQuery?.filter((aljibe) => aljibe.deleted_at !== null).length === 0 ? (
          <>No hay aljibes eliminado</>
        ) : (
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {aljibeQuery
                ?.filter((aljibe) => aljibe.deleted_at !== null)
                .map((aljibe, index) => {
                  return (
                    <CTableRow key={aljibe.id}>
                      <CTableDataCell>{aljibe.name}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          className="btn-action-restore"
                          onClick={() => {
                            restoreAljibe(aljibe.id)
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

export default ModalRestoreAljibe

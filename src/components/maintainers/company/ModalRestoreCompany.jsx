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
import useCompany from 'src/hooks/useCompany'

const ModalRestoreCompany = (props) => {
  const { getData } = useGetCachedQueryData()
  const companyQuery = getData('company')
  const { restoreCompany } = useCompany()

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
        <CModalTitle id="ScrollingLongContentExampleLabel2">Restaurar Empresa</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {companyQuery?.filter((company) => company.deleted_at !== null).length === 0 ? (
          <>No hay empresas eliminadas</>
        ) : (
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {companyQuery
                ?.filter((company) => company.deleted_at !== null)
                .map((company, index) => {
                  return (
                    <CTableRow key={company.id}>
                      <CTableDataCell>{company.name}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          className="btn-action-restore"
                          onClick={() => {
                            restoreCompany(company.id)
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

export default ModalRestoreCompany

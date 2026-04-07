import React from 'react'
import {
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import { usePermissions } from 'src/providers/PermissionsProvider'
import { PERMISSIONS } from 'src/utils/contant'
import useGantt from 'src/hooks/useGantt'

const GanttList = () => {
  const { getData } = useGetCachedQueryData()
  const ganttQuery = getData('gantt')
  const { deleteDoc } = useGantt()
  const { hasPermission } = usePermissions()

  return (
    <>
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {ganttQuery?.map((doc, index) => {
            return (
              <CTableRow key={doc.id}>
                <CTableDataCell>
                  <a href={doc.url} target="_blank" rel="noreferrer">
                    {doc.name}
                  </a>
                </CTableDataCell>
                <CTableDataCell>
                  {hasPermission(PERMISSIONS.GANTT.DELETE) && (
                    <CButton
                      className="btn-action-delete"
                      onClick={() => {
                        deleteDoc(doc.id)
                      }}
                    >
                      <CIcon icon={cilTrash} />
                    </CButton>
                  )}
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
    </>
  )
}

export default GanttList

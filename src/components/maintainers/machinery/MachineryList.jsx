import React, { useState } from 'react'
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
import { cilPencil, cilTrash } from '@coreui/icons'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import useMachinery from 'src/hooks/useMachinery'
import ModalAddMachinery from './ModalAddMachinery'
import './css.scss'

const MachineryList = () => {
  const { getData } = useGetCachedQueryData()
  const machineryQuery = getData('machinery')
  const { deleteMachinery } = useMachinery()

  const [visibleMachinery, setVisibleMachinery] = useState(false)
  const [selectedMachinery, setSelectedMachinery] = useState()

  const getPlates = (plates) => {
    const platesJoin = []

    plates.forEach((plate) => {
      platesJoin.push(plate.label)
    })
    return platesJoin.join(' - ')
  }

  const handleEditMachinery = (machinery) => {
    setSelectedMachinery(machinery)
    setVisibleMachinery(!visibleMachinery)
  }

  return (
    <>
      {visibleMachinery && (
        <ModalAddMachinery
          visible={true}
          selectedMachinery={selectedMachinery}
          sendDataToParent={async (data) => {
            // await refetch()
            setVisibleMachinery(data)
          }}
        />
      )}
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">ID</CTableHeaderCell>
            <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
            <CTableHeaderCell scope="col">Patentes</CTableHeaderCell>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {machineryQuery
            ?.filter((machinery) => machinery.deleted_at === null)
            .map((machinery, index) => {
              const plates = getPlates(machinery.plate)
              return (
                <CTableRow key={machinery.id}>
                  <CTableDataCell scope="row">{machinery.id}</CTableDataCell>
                  <CTableDataCell>{machinery.name}</CTableDataCell>
                  <CTableDataCell>{plates}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      className="btn-action-edit"
                      onClick={() => {
                        handleEditMachinery(machinery)
                      }}
                    >
                      <CIcon icon={cilPencil} />
                    </CButton>
                    <CButton
                      className="btn-action-delete"
                      onClick={() => {
                        deleteMachinery(machinery.id)
                      }}
                    >
                      <CIcon icon={cilTrash} />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
    </>
  )
}

export default MachineryList

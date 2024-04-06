import React, { useEffect, useState } from 'react'
import {
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'
import { v4 as uuidv4 } from 'uuid'
import { validate } from 'src/utils/validate'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'

const DirectWorkForce = () => {
  const initialStatee = {
    directWorkForce: undefined,
    directWorkForceOfferedNumber: undefined,
    directWorkForceContractedNumber: undefined,
    directWorkForceCertifiedNumber: undefined,
    directWorkForceBreakNumber: undefined,
    directWorkForceWorkNumber: undefined,
    directWorkForceHHNumber: undefined,
  }

  const { getData } = useGetCachedQueryData()
  const basicQuery = getData('basics')

  const [directWorkForce, setDirectWorkForce] = useState(initialStatee)
  const [directWorkForceList, setDirectWorkForceList] = useState([])

  const {
    storeDirectWorkForce,
    removeDirectWorkForce,
    directWorkForceList: directWorkForceListContext,
  } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    if (e.target.id === 'directWorkForce') {
      setDirectWorkForce(initialStatee) // Clear the object
      setDirectWorkForce({ [e.target.id]: e.target.value })
    }
    if (validate(e.target.value)) {
      setDirectWorkForce({ ...directWorkForce, [e.target.id]: e.target.value })
    }
  }

  const registerDirectWorkForce = () => {
    const directWorkForceInitialState = {
      id: uuidv4(),
      directWorkForce: directWorkForce.directWorkForce,
      actions: {
        offeredNumber: directWorkForce.directWorkForceOfferedNumber,
        contractedNumber: directWorkForce.directWorkForceContractedNumber,
        certified: directWorkForce.directWorkForceCertifiedNumber,
        breakNumber: directWorkForce.directWorkForceBreakNumber,
        workNumber: directWorkForce.directWorkForceWorkNumber,
        hh: directWorkForce.directWorkForceHHNumber,
      },
    }
    setDirectWorkForce(initialStatee) // Clear the object
    setDirectWorkForceList([...directWorkForceList, directWorkForceInitialState])
  }

  const deleteDirectWorkForce = (id) => {
    const newData = directWorkForceList.filter((item) => item.id !== id)
    setDirectWorkForceList(newData)

    removeDirectWorkForce(id)
  }

  useEffect(() => {
    storeDirectWorkForce(directWorkForceList)
  }, [directWorkForceList])

  return (
    <div className="work-force-report">
      <CFormSelect
        aria-label="Default select example"
        id="directWorkForce"
        onChange={(e) => {
          onChangeData(e)
        }}
      >
        <option>Seleccione</option>
        {basicQuery.directPersonal.map((directPersonalCached) => {
          return (
            <option key={directPersonalCached.id} value={directPersonalCached.id}>
              {directPersonalCached.name}
            </option>
          )
        })}
      </CFormSelect>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">N° Ofertado</CTableHeaderCell>
            <CTableHeaderCell scope="col">N° Contratados</CTableHeaderCell>
            <CTableHeaderCell scope="col">N° Acreditados</CTableHeaderCell>
            <CTableHeaderCell scope="col">N° Descanso</CTableHeaderCell>
            <CTableHeaderCell scope="col">N° Obra</CTableHeaderCell>
            <CTableHeaderCell scope="col">HH (Turno)</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="directWorkForceOfferedNumber"
                placeholder="N° Ofertado"
                value={directWorkForce.directWorkForceOfferedNumber || ''}
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="directWorkForceContractedNumber"
                placeholder="N° Contratados"
                value={directWorkForce.directWorkForceContractedNumber || ''}
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="directWorkForceCertifiedNumber"
                placeholder="N° Acreditados"
                value={directWorkForce.directWorkForceCertifiedNumber || ''}
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="directWorkForceBreakNumber"
                placeholder="N° Descanso"
                value={directWorkForce.directWorkForceBreakNumber || ''}
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="directWorkForceWorkNumber"
                placeholder="N° Obra"
                value={directWorkForce.directWorkForceWorkNumber || ''}
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="directWorkForceHHNumber"
                placeholder="HH (Turno)"
                value={directWorkForce.directWorkForceHHNumber || ''}
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>

      {directWorkForceListContext.length > 0 && directWorkForceListContext[0].directWorkForce && (
        <CTable className="resume-table">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Cargo</CTableHeaderCell>
              <CTableHeaderCell scope="col">N° Ofertado</CTableHeaderCell>
              <CTableHeaderCell scope="col">N° Contratados</CTableHeaderCell>
              <CTableHeaderCell scope="col">Acreditados</CTableHeaderCell>
              <CTableHeaderCell scope="col">N° Descanso</CTableHeaderCell>
              <CTableHeaderCell scope="col">N° Obra</CTableHeaderCell>
              <CTableHeaderCell scope="col">HH (Turno)</CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {directWorkForceListContext.map((item, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{item.directWorkForce}</CTableDataCell>
                  <CTableDataCell>{item.actions.offeredNumber}</CTableDataCell>
                  <CTableDataCell>{item.actions.contractedNumber}</CTableDataCell>
                  <CTableDataCell>{item.actions.certified}</CTableDataCell>
                  <CTableDataCell>{item.actions.breakNumber}</CTableDataCell>
                  <CTableDataCell>{item.actions.workNumber}</CTableDataCell>
                  <CTableDataCell>{item.actions.hh}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      className="btn-project-action"
                      onClick={() => {
                        deleteDirectWorkForce(item.id)
                      }}
                    >
                      eliminar
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
          </CTableBody>
        </CTable>
      )}

      <CButton
        className="btn-project-action"
        onClick={() => {
          registerDirectWorkForce()
        }}
      >
        Registrar
      </CButton>
    </div>
  )
}

export default DirectWorkForce

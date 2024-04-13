import { React, useState, useEffect } from 'react'
import {
  CFormInput,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableBody,
  CTableDataCell,
  CFormSelect,
  CButton,
  CToast,
  CToastBody,
} from '@coreui/react'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'
import { v4 as uuidv4 } from 'uuid'
import { validate } from 'src/utils/validate'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'

const IndirectWorkForce = () => {
  const initialState = {
    indirectWorkForce: undefined,
    indirectWorkForceOfferedNumber: undefined,
    indirectWorkForceContractedNumber: undefined,
    indirectWorkForceCertifiedNumber: undefined,
    indirectWorkForceBreakNumber: undefined,
    indirectWorkForceWorkNumber: undefined,
    indirectWorkForceHHNumber: undefined,
  }
  const { getData } = useGetCachedQueryData()
  const basicQuery = getData('basics')

  const [indirectWorkForce, setIndirectWorkForce] = useState(initialState)
  const [indirectWorkForceList, setIndirectWorkForceList] = useState([])
  const [error, setError] = useState(false)

  const {
    storeIndirectWorkForceData,
    removeIndirectWorkForce,
    indirectWorkForceList: indirectWorkForceListContext,
  } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    setError(false)

    if (e.target.id === 'indirectWorkForce') {
      setIndirectWorkForce(initialState) // Clear the object
      setIndirectWorkForce({ [e.target.id]: e.target.value })
    }
    if (validate(e.target.value)) {
      setIndirectWorkForce({ ...indirectWorkForce, [e.target.id]: e.target.value })
    }
  }

  const registerIndirectWorkForce = () => {
    if (!indirectWorkForce.indirectWorkForce) {
      setError(true)
    } else {
      const indirectWorkForceInitialState = {
        id: uuidv4(),
        indirectWorkForce: indirectWorkForce.indirectWorkForce,
        offeredNumber: indirectWorkForce.contractAdministratorOfferedNumber,
        contractedNumber: indirectWorkForce.contractAdministratorContractedNumber,
        certified: indirectWorkForce.contractAdministratorCertified,
        breakNumber: indirectWorkForce.contractAdministratorBreakNumber,
        workNumber: indirectWorkForce.contractAdministratorWorkNumber,
        hh: indirectWorkForce.contractAdministratorHHNumber,
      }
      console.log('indirectWorkForceInitialState', indirectWorkForceInitialState)
      setIndirectWorkForce(initialState) // Clear the object
      setIndirectWorkForceList([...indirectWorkForceList, indirectWorkForceInitialState])
    }
  }

  useEffect(() => {
    storeIndirectWorkForceData(indirectWorkForceList)
  }, [indirectWorkForceList])

  const deleteIndirectWorkForce = (id) => {
    const newData = indirectWorkForceList.filter((item) => item.id !== id)
    setIndirectWorkForceList(newData)

    removeIndirectWorkForce(id)
  }

  return (
    <div className="work-force-report">
      {error && (
        <CToast
          autohide={true}
          visible={error}
          color="danger"
          onClose={() => {
            setError(false)
          }}
          className="text-white align-items-center"
        >
          <div className="d-flex">
            <CToastBody>Debe seleccionar el cargo para generar el registro</CToastBody>
          </div>
        </CToast>
      )}
      <CFormSelect
        aria-label="Default select example"
        id="indirectWorkForce"
        label="Cargo"
        value={indirectWorkForce.indirectWorkForce || ''}
        onChange={(e) => {
          onChangeData(e)
        }}
      >
        <option value={0}>Seleccione</option>
        {basicQuery.indirectPersonal.map((indirectPersonalCached) => {
          return (
            <option key={indirectPersonalCached.id} value={indirectPersonalCached.id}>
              {indirectPersonalCached.name}
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
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="contractAdministratorOfferedNumber"
                placeholder="N° Ofertado"
                value={indirectWorkForce.contractAdministratorOfferedNumber || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="contractAdministratorContractedNumber"
                placeholder="N° Contratados"
                value={indirectWorkForce.contractAdministratorContractedNumber || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="contractAdministratorCertified"
                placeholder="Acreditados"
                value={indirectWorkForce.contractAdministratorCertified || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="col">N° Descanso</CTableHeaderCell>
            <CTableHeaderCell scope="col">N° Obra</CTableHeaderCell>
            <CTableHeaderCell scope="col">HH (Turno)</CTableHeaderCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="contractAdministratorBreakNumber"
                placeholder="N° Descanso"
                value={indirectWorkForce.contractAdministratorBreakNumber || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="contractAdministratorWorkNumber"
                placeholder="N° Obra"
                value={indirectWorkForce.contractAdministratorWorkNumber || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CFormInput
                type="text"
                id="contractAdministratorHHNumber"
                placeholder="HH (Turno)"
                value={indirectWorkForce.contractAdministratorHHNumber || ''}
                text=""
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>

      <CButton
        className="btn-project-action"
        onClick={() => {
          registerIndirectWorkForce()
        }}
      >
        Registrar
      </CButton>

      {indirectWorkForceListContext.length > 0 &&
        indirectWorkForceListContext[0].indirectWorkForce && (
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
              {indirectWorkForceListContext.map((item, index) => {
                console.log('item', item)
                const charge = basicQuery.indirectPersonal.find((personal) => {
                  return personal.id == item.indirectWorkForce
                })
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{charge.name}</CTableDataCell>
                    <CTableDataCell>{item.offeredNumber}</CTableDataCell>
                    <CTableDataCell>{item.contractedNumber}</CTableDataCell>
                    <CTableDataCell>{item.certified}</CTableDataCell>
                    <CTableDataCell>{item.breakNumber}</CTableDataCell>
                    <CTableDataCell>{item.workNumber}</CTableDataCell>
                    <CTableDataCell>{item.hh}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        className="btn-project-action"
                        onClick={() => {
                          deleteIndirectWorkForce(item.id)
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
    </div>
  )
}

export default IndirectWorkForce

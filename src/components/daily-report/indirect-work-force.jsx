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
} from '@coreui/react'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'
import { v4 as uuidv4 } from 'uuid'
import { validate } from 'src/utils/validate'

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
  const [indirectWorkForce, setIndirectWorkForce] = useState(initialState)
  const [indirectWorkForceList, setIndirectWorkForceList] = useState([])

  const {
    storeIndirectWorkForceData,
    removeIndirectWorkForce,
    indirectWorkForceList: indirectWorkForceListContext,
  } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    if (e.target.id === 'indirectWorkForce') {
      setIndirectWorkForce(initialState) // Clear the object
      setIndirectWorkForce({ [e.target.id]: e.target.value })
    }
    if (validate(e.target.value)) {
      setIndirectWorkForce({ ...indirectWorkForce, [e.target.id]: e.target.value })
    }
  }

  const registerIndirectWorkForce = () => {
    const indirectWorkForceInitialState = {
      id: uuidv4(),
      indirectWorkForce: indirectWorkForce.indirectWorkForce,
      actions: {
        offeredNumber: indirectWorkForce.contractAdministratorOfferedNumber,
        contractedNumber: indirectWorkForce.contractAdministratorContractedNumber,
        certified: indirectWorkForce.contractAdministratorCertified,
        breakNumber: indirectWorkForce.contractAdministratorBreakNumber,
        workNumber: indirectWorkForce.contractAdministratorWorkNumber,
        hh: indirectWorkForce.contractAdministratorHHNumber,
      },
    }
    setIndirectWorkForce(initialState) // Clear the object
    setIndirectWorkForceList([...indirectWorkForceList, indirectWorkForceInitialState])
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
      <CFormSelect
        aria-label="Default select example"
        id="indirectWorkForce"
        value={indirectWorkForce.indirectWorkForce || ''}
        onChange={(e) => {
          onChangeData(e)
        }}
      >
        <option value={0}>Seleccione</option>
        <option value="Administrador_de_contrato">Administrador de contrato</option>
        <option value="Jefe_de_Oficina_Técnica">Jefe de Oficina Técnica</option>
        <option value="Jefe_de_Terreno">Jefe de Terreno</option>
        <option value="Jefe_de_Calidad">Jefe de Calidad</option>
        <option value="Jefe_HSEC">Jefe HSEC</option>
        <option value="Ingeniero_Costos">Ingeniero Costos</option>
        <option value="Ingeniero_Programación_y_Control">Ingeniero Programación y Control</option>
        <option value="Encargado_Control_Documentos">Encargado Control Documentos</option>
        <option value="Asistente_Oficina_Técnica">Asistente Oficina Técnica</option>
        <option value="Asesor_HSEC">Asesor HSEC</option>
        <option value="Topógrafo">Topógrafo</option>
        <option value="Alarife">Alarife</option>
        <option value="Supervisor_Logística">Supervisor Logística</option>
        <option value="Supervisor_Bodega">Supervisor Bodega</option>
        <option value="Bodeguero">Bodeguero</option>
        <option value="Jefe_de_Área">Jefe de Área</option>
        <option value="Supervisor_Civil_v_Estructura">Supervisor Civil v Estructura</option>
        <option value="Supervisor_Mecánico_y_Piping">Supervisor Mecánico y Piping</option>
        <option value="Supervisor_Elétrico">Supervisor Elétrico</option>
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
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{item.indirectWorkForce}</CTableDataCell>
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

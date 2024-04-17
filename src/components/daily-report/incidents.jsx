import { React, useState, useEffect } from 'react'
import {
  CFormTextarea,
  CFormInput,
  CButton,
  CFormSelect,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableBody,
  CTableDataCell,
  CToast,
  CToastBody,
} from '@coreui/react'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'
import { v4 as uuidv4 } from 'uuid'

const INCIDENT_LIMIT = 200
const NON_CONFORMITY_LIMIT = 200

const Incidents = () => {
  const initialState = {
    incident: '',
    nonConformity: '',
  }

  const [incident, setIncident] = useState(initialState)
  const [incidentList, setIncidentList] = useState([])
  const [error, setError] = useState(false)

  const {
    storeIncident,
    removeIncident,
    incident: incidentContext,
  } = useRegisterDailyReportCompany()

  const onChangeData = (e) => {
    setError(false)
    switch (e.target.id) {
      case 'incident':
        if (e.target.value.length <= INCIDENT_LIMIT)
          setIncident({ ...incident, incident: e.target.value })
        break
      case 'nonConformity':
        if (e.target.value.length <= NON_CONFORMITY_LIMIT)
          setIncident({ ...incident, nonConformity: e.target.value })
        break
      default:
        break
    }
  }

  const registerIncident = () => {
    const incidentInitialState = {
      id: uuidv4(),
      incident: incident.incident,
      nonConformity: incident.nonConformity,
    }
    setIncident(initialState)
    setIncidentList([...incidentList, incidentInitialState])
  }

  const deleteIncident = (id) => {
    const newData = incidentList.filter((item) => item.id !== id)
    setIncident(newData)
    removeIncident(id)
  }

  useEffect(() => {
    storeIncident(incidentList)
  }, [incidentList])

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
            <CToastBody>
              Debe ingresar un incidente o una no conformidad para generar el registro
            </CToastBody>
          </div>
        </CToast>
      )}
      <CFormTextarea
        id="incident"
        label="Incidentes lesiones y eventos"
        rows={3}
        value={incident.incident}
        text={`${incident?.incident?.length ?? 0} de ${INCIDENT_LIMIT} caracteres`}
        onChange={(e) => {
          onChangeData(e)
        }}
      ></CFormTextarea>

      <CFormTextarea
        id="nonConformity"
        label="No conformidades o interferencias"
        rows={3}
        text={`${incident?.nonConformity?.length ?? 0} de ${NON_CONFORMITY_LIMIT} caracteres`}
        value={incident.nonConformity}
        onChange={(e) => {
          onChangeData(e)
        }}
      ></CFormTextarea>
      <br />
      <CButton
        className="btn-project-action"
        onClick={() => {
          registerIncident()
        }}
      >
        Registrar
      </CButton>

      {incidentContext.length > 0 && incidentContext[0].id && (
        <>
          <CTable className="resume-table">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Incidente, lesión y evento</CTableHeaderCell>
                <CTableHeaderCell scope="col">No conformidad o interferencia</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {incidentContext.map((item, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{item.incident}</CTableDataCell>
                    <CTableDataCell>{item.nonConformity}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        className="btn-project-action"
                        onClick={() => {
                          deleteIncident(item.id)
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
        </>
      )}
    </div>
  )
}

export default Incidents

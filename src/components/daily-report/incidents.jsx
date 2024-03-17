import { React, useState, useEffect } from 'react'
import { CFormTextarea } from '@coreui/react'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'
const Incidents = () => {
  const initialState = {
    incident: '',
    nonConformity: '',
  }

  const [incident, setIncident] = useState(initialState)

  const onChangeData = (e) => {
    switch (e.target.id) {
      case 'incident':
        setIncident({ ...incident, incident: e.target.value })
        break
      case 'nonConformity':
        setIncident({ ...incident, nonConformity: e.target.value })
        break
      default:
        break
    }
  }

  const { storeIncident } = useRegisterDailyReportCompany()

  useEffect(() => {
    storeIncident(incident)
  }, [incident])

  return (
    <div className="work-force-report">
      <CFormTextarea
        id="incident"
        label="Incidentes lesiones y eventos"
        rows={3}
        text=""
        onChange={(e) => {
          onChangeData(e)
        }}
      ></CFormTextarea>

      <CFormTextarea
        id="nonConformity"
        label="No conformidades o interferencias"
        rows={3}
        text=""
        onChange={(e) => {
          onChangeData(e)
        }}
      ></CFormTextarea>
    </div>
  )
}

export default Incidents

import { React } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CWidgetStatsD, CRow, CCol, CContainer } from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'

import CIcon from '@coreui/icons-react'

const ProjectSelector = () => {
  const navigate = useNavigate()

  const onClickHandler = () => navigate(`/contrato`)

  return (
    <CRow>
      <CCol xs={6}>
        <CWidgetStatsD
          onClick={() => {
            onClickHandler()
          }}
          className="mb-3"
          icon={
            <CIcon
              className="my-4 text-white"
              icon={'https://pgproject.cl/uploads/1705996608_a41c61e65ecf2a35c699.jpg'}
              height={52}
            />
          }
          chart={
            <CContainer className="project-selector-container">
              <CRow>
                <span className="project-title">Proyecto Normativa Eléctrica SIAM Etapa Nº3</span>
              </CRow>
              <CRow>
                <span className="project-manager">Encargado: Claudio Gonzalez Carvajal</span>
              </CRow>
            </CContainer>
          }
          style={{ '--cui-card-cap-bg': '#1A4D55' }}
          values={[{ title: 'Contratos', value: '1' }]}
        />
      </CCol>
    </CRow>
  )
}

export default ProjectSelector

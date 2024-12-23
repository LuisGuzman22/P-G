import { React } from 'react'
import { CCard, CCardBody } from '@coreui/react'

import GeneralProgressChart from './GeneralProgressChart'
import SCurveChart from './SCurveChart'
import HitosTable from './HitosTable'

const Charts = () => {
  return (
    <div className="proyect-administration">
      <CCard className="action-buttons">
        <CCardBody>
          <GeneralProgressChart />
        </CCardBody>
      </CCard>
      <CCard className="action-buttons">
        <CCardBody>
          <SCurveChart />
        </CCardBody>
      </CCard>
      <CCard className="action-buttons">
        <CCardBody>
          <HitosTable />
        </CCardBody>
      </CCard>
    </div>
  )
}

export default Charts

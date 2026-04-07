import { React, useEffect } from 'react'
import { CCard, CCardBody } from '@coreui/react'

import GeneralProgressChart from './GeneralProgressChart'
import SCurveChart from './SCurveChart'
import { useNavigate } from 'react-router-dom'
import { usePermissions } from 'src/providers/PermissionsProvider'
import { PERMISSIONS } from 'src/utils/contant'

const Charts = () => {
  let navigate = useNavigate()
  const { hasPermission } = usePermissions()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!hasPermission(PERMISSIONS.DASHBOARD.VIEW)) {
      navigate('/inicio')
    }
  }, [])

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
      {/* <CCard className="action-buttons">
        <CCardBody>
          <HitosTable />
        </CCardBody>
      </CCard> */}
    </div>
  )
}

export default Charts

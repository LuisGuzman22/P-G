import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <span className="ms-1">
          Copyright © 2023 P&G PROJECT CONTROL ESTRATEGICO. All rights reserved. v
          {process.env.REACT_APP_VERSION}
        </span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)

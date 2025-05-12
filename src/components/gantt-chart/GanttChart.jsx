import { React, useEffect, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'

const GanttChart = () => {
  return (
    <div className="proyect-administration">
      <h2>Carta Gantt</h2>

      <CCard className="action-buttons">
        <CCardBody>
          <object
            data="https://cdn.simplepdf.com/simple-pdf/assets/sample.pdf"
            type="application/pdf"
            width="100%"
            height="500px"
          >
            <iframe
              src="https://cdn.simplepdf.com/simple-pdf/assets/sample.pdf"
              width="100%"
              height="100%"
              // style="border: none;"
            >
              <p>
                Your browser does not support PDFs.
                <a href="https://cdn.simplepdf.com/simple-pdf/assets/sample.pdf">
                  Download the PDF
                </a>
                .
              </p>
            </iframe>
          </object>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default GanttChart

// https://cdn.simplepdf.com/simple-pdf/assets/sample.pdf

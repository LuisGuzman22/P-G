/* eslint-disable react/prop-types */
import {
  CButton,
  CCol,
  CFormInput,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useRef, useState } from 'react'
import useGetTrisemanalData from 'src/hooks/useGetTrisemanalData'

const BaseTrisemanal = () => {
  const { data, isLoading, error } = useGetTrisemanalData()

  const [file, setFile] = useState()

  const onHandleSubmit = () => {
    console.log('submit', file)
  }

  return (
    <div className="">
      <CFormInput
        type="file"
        id={`trisemanal`}
        aria-describedby="inputGroupFileAddon03"
        onChange={(e) => {
          setFile(e.target.files[0])
        }}
        label="Cargar trisemanal"
        aria-label="Upload"
        accept="application/vnd.ms-excel"
      />
      <CButton className="confirm-btn" onClick={onHandleSubmit()}>
        Subir Trisemanal
      </CButton>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">RUTA ORIENTE</CTableHeaderCell>
            <CTableHeaderCell scope="col">Activity Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Original Duration</CTableHeaderCell>
            <CTableHeaderCell scope="col">Forecast Duration</CTableHeaderCell>
            <CTableHeaderCell scope="col">Schedule % Complete</CTableHeaderCell>
            <CTableHeaderCell scope="col">BL Project Start</CTableHeaderCell>
            <CTableHeaderCell scope="col">BL Project Finish</CTableHeaderCell>
            <CTableHeaderCell scope="col">Start</CTableHeaderCell>
            <CTableHeaderCell scope="col">Finish</CTableHeaderCell>
            <CTableHeaderCell scope="col">Q total</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data &&
            !isLoading &&
            !error &&
            data.map((item, index) => {
              const activities = item.activities
              return (
                <>
                  <CTableRow key={index} className="node">
                    <CTableDataCell>{item.name}</CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                  </CTableRow>
                  {activities.map((activity, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableDataCell>{activity.id}</CTableDataCell>
                        <CTableDataCell>{activity.name}</CTableDataCell>
                        <CTableDataCell>{activity.hh}</CTableDataCell>
                        <CTableDataCell></CTableDataCell>
                        <CTableDataCell></CTableDataCell>
                        <CTableDataCell></CTableDataCell>
                        <CTableDataCell></CTableDataCell>
                        <CTableDataCell>{activity.start}</CTableDataCell>
                        <CTableDataCell>{activity.finish}</CTableDataCell>
                        <CTableDataCell></CTableDataCell>
                      </CTableRow>
                    )
                  })}
                </>
              )
            })}
          {/* "id": 1, 
          "name": "voluptatem", 
          "start": "1989-06-08", 
          "finish": "1972-11-02",
          "original_duration": 197, 
          "quantity_work": 93, 
          "unit": "esse", 
          "started": "2018-10-06",
          "hh": 858, 
          "id_primavera": 3 */}
        </CTableBody>
      </CTable>
    </div>
  )
}

export default BaseTrisemanal

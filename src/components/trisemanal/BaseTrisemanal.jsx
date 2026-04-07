/* eslint-disable react/prop-types */
import {
  CAlert,
  CButton,
  CFormInput,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableRow,
  CToast,
  CToastBody,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import useGetTrisemanalData from 'src/hooks/useGetTrisemanalData'
import './css.scss'
import { useNavigate } from 'react-router-dom'
import { PERMISSIONS } from 'src/utils/contant'
import { usePermissions } from 'src/providers/PermissionsProvider'
import CIcon from '@coreui/icons-react'
import { cilCheckCircle, cilInfo } from '@coreui/icons'

const BaseTrisemanal = () => {
  const {
    data,
    success,
    errorMutate,
    isLoading,
    error,
    uploadTrisemanal,
    loadingPlanning,
    loadingTrisemanal,
  } = useGetTrisemanalData()
  let navigate = useNavigate()
  const { hasPermission } = usePermissions()

  const [file, setFile] = useState()

  const onHandleSubmit = () => {
    uploadTrisemanal(file)
  }

  const handleUploadFile = (e) => {
    const xls = e.target.files
    setFile(xls[0])
  }

  useEffect(() => {
    if (!hasPermission(PERMISSIONS.ACTIVITY.VIEW)) {
      navigate('/inicio')
    }
  }, [hasPermission, navigate])

  return (
    <div className="">
      <CToast
        autohide={true}
        visible={errorMutate}
        color="danger"
        className="text-white align-items-center"
      >
        <div className="d-flex">{errorMutate && <CToastBody>{errorMutate}</CToastBody>}</div>
      </CToast>
      {hasPermission(PERMISSIONS.ACTIVITY.CREATE) && (
        <>
          <CFormInput
            type="file"
            id={`trisemanal`}
            aria-describedby="inputGroupFileAddon03"
            disabled={isLoading}
            onChange={(e) => {
              handleUploadFile(e)
            }}
            label="Cargar Actividades"
            aria-label="Upload"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          />
          <CButton
            className="confirm-btn"
            disabled={isLoading}
            onClick={() => {
              onHandleSubmit()
            }}
          >
            Subir Actividades
          </CButton>
          {isLoading && (
            <>
              <br />
              <CAlert color="primary" className="d-flex align-items-center">
                <CIcon icon={cilInfo} className="flex-shrink-0 me-2" width={24} height={24} />
                <div>Subiendo listado de actividades</div>
              </CAlert>
            </>
          )}
          {success && (
            <>
              <br />
              <CAlert color="success">
                <CIcon
                  icon={cilCheckCircle}
                  className="flex-shrink-0 me-2"
                  width={24}
                  height={24}
                />
                <div>{success}</div>
              </CAlert>
            </>
          )}
        </>
      )}

      {isLoading || loadingPlanning || loadingTrisemanal ? (
        <Skeleton count={5} />
      ) : (
        <CTable className="trisemanal-table">
          {/* <CTableHead>
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
          </CTableHead> */}
          <CTableBody>
            {data &&
              !isLoading &&
              !error &&
              data.map((item, index) => {
                const activities = item.activities
                return (
                  <>
                    <CTableRow key={index} className="node">
                      <CTableDataCell style={{ whiteSpace: 'normal', maxWidth: '200px' }}>
                        {item.name}
                      </CTableDataCell>
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
                          <CTableDataCell style={{ whiteSpace: 'normal', maxWidth: '200px' }}>
                            {activity.name}
                          </CTableDataCell>
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
      )}
    </div>
  )
}

export default BaseTrisemanal

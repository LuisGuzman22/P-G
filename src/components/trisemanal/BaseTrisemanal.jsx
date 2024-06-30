/* eslint-disable react/prop-types */
import { CCol, CRow } from '@coreui/react'
import React, { useEffect, useRef, useState } from 'react'
import useGetTrisemanalData from 'src/hooks/useGetTrisemanalData'

const BaseTrisemanal = () => {
  const { data, isLoading, error } = useGetTrisemanalData()

  return (
    <div className="">
      <CRow>
        <CCol sm={1}>RUTA ORIENTE </CCol>
        <CCol sm={1}>Activity Name</CCol>
        <CCol sm={1}>Original Duration</CCol>
        <CCol sm={1}>Forecast Duration</CCol>
        <CCol sm={1}>Schedule % Complete</CCol>
        <CCol sm={1}>BL Project Start</CCol>
        <CCol sm={1}>BL Project Finish</CCol>
        <CCol sm={1}>Start</CCol>
        <CCol sm={1}>Finish</CCol>
        <CCol sm={1}>Q total </CCol>
      </CRow>

      {data &&
        !isLoading &&
        !error &&
        data.map((item, index) => {
          const childrens = item.childrens
          return (
            <>
              <CRow key={index}>
                <CCol sm={1}>{item.name}</CCol>
              </CRow>
              {childrens.map((child, index) => {
                return (
                  <CRow key={index}>
                    <CCol sm={1}>{child.name}</CCol>
                  </CRow>
                )
              })}
              {}
            </>
          )
        })}
    </div>
  )
}

export default BaseTrisemanal

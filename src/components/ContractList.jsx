import React from 'react'
import {
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CRow,
  CCol,
  CButton,
} from '@coreui/react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const ContractList = () => {
  const fetchContracts = async () => {
    const res = await axios.get('https://run.mocky.io/v3/9b3c50eb-0ea0-40b8-bf42-a6221aeab3da')
    return res.data.data
  }

  const { data, isLoading } = useQuery({
    queryKey: ['contracts'],
    queryFn: async () => {
      return fetchContracts()
    },
  })

  return (
    <>
      <CRow>
        <CCol>Nombre</CCol>
        <CCol>Detalle</CCol>
        <CCol>URL</CCol>
        <CCol>Teléfono</CCol>
        <CCol>Email</CCol>
      </CRow>

      <CAccordion className="contract-list">
        {!isLoading &&
          data?.map((contract, index) => {
            return (
              <CAccordionItem itemKey={contract.id} key={contract.id}>
                <CAccordionHeader>
                  <CRow>
                    <CCol>{contract.contractName}</CCol>
                    <CCol>{contract.contractDetail}</CCol>
                    <CCol>{contract.contractUrl}</CCol>
                    <CCol>{contract.contractPhone}</CCol>
                    <CCol>{contract.contractMail}</CCol>
                  </CRow>
                </CAccordionHeader>
                <CAccordionBody>
                  <CButton className="btn-project-action">Editar</CButton>
                  <CButton className="btn-project-action">Curva S</CButton>
                </CAccordionBody>
              </CAccordionItem>
            )
          })}
      </CAccordion>
    </>
  )
}

export default ContractList

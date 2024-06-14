import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CWidgetStatsD,
  CRow,
  CCol,
  CContainer,
  CCard,
  CCardBody,
  CCardText,
  CCardTitle,
} from '@coreui/react'
import useRegisterGeneralData from 'src/hooks/useRegisterGeneralData'

import CIcon from '@coreui/icons-react'
import useGetContracts from 'src/hooks/useGetContracts'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import ModalAddContract from 'src/components/ModalAddContract'

const ContractSelector = () => {
  const navigate = useNavigate()
  const { getProject, saveContract } = useRegisterGeneralData()
  const [contractList, setContractList] = useState()
  const { getData } = useGetCachedQueryData()

  const projectsQuery = getData('projects')
  const userType = localStorage.getItem('USER_TYPE')
  const { data: contractData } = useGetContracts(1)
  const projectLS = JSON.parse(getProject())

  const [visibleContract, setVisibleContract] = useState(false)

  const onClickHandler = (contract) => {
    if (userType !== 'admin') {
      const data = {
        name: contract.name,
        id: contract.id,
        code: contract.code,
      }
      saveContract(data)
      navigate(`/dashboard`)
    } else {
      const data = {
        name: contract.name,
        id: contract.id,
        code: contract.code,
      }
      saveContract(data)
      navigate(`/project_selector`)
    }
  }

  const onClickNewContract = () => {
    setVisibleContract(!visibleContract)
  }

  useEffect(() => {
    if (userType !== 'admin') {
      if (projectLS && projectsQuery) {
        const projectFinded = projectsQuery.find((projectData) => {
          return projectData.id === projectLS.id
        })
        setContractList(projectFinded.contracts)
      } else {
        navigate(`/project_selector`)
      }
    }
  }, [projectsQuery, projectLS])

  useEffect(() => {
    userType === 'admin' && contractData?.contract && setContractList(contractData.contract)
  }, [contractData])

  return (
    <>
      {visibleContract && (
        <ModalAddContract
          visible={true}
          sendDataToParent={(data) => {
            setVisibleContract(data)
          }}
        />
      )}
      <CCol sm={6} className="contract-selector-container">
        <CCard>
          <CCardTitle>
            <h3>Seleccion de Contrato</h3>
          </CCardTitle>
          <CCardBody>
            <CCardText>
              <CRow key={1000}>
                <CCol>
                  <CWidgetStatsD
                    onClick={() => {
                      // onClickNewContract()
                      localStorage.removeItem('project')
                      navigate(`/project_selector`)
                    }}
                    className="mb-3"
                    chart={
                      <CContainer className="project-selector-container">
                        <CRow>
                          <span className="project-title-back">
                            Volver a la selección de proyecto
                          </span>
                        </CRow>
                      </CContainer>
                    }
                    style={{ '--cui-card-cap-bg': '#1A4D55', cursor: 'pointer' }}
                  />
                </CCol>
              </CRow>
              {contractList === undefined && <h3>No se encontraron contratos asociados</h3>}
              {contractList &&
                contractList?.map((contract, index) => {
                  return (
                    <CRow key={index}>
                      <CCol>
                        <CWidgetStatsD
                          onClick={() => {
                            onClickHandler(contract)
                          }}
                          className="mb-3"
                          icon={
                            <CIcon
                              className="my-4 text-white"
                              icon={
                                'https://pgproject.cl/uploads/1705996608_a41c61e65ecf2a35c699.jpg'
                              }
                              height={52}
                            />
                          }
                          chart={
                            <CContainer className="project-selector-container">
                              <CRow>
                                <span className="project-title">{contract.name}</span>
                              </CRow>
                            </CContainer>
                          }
                          style={{ '--cui-card-cap-bg': '#1A4D55', cursor: 'pointer' }}
                          values={[
                            { title: 'Trisemanales', value: contract.trisemanal },
                            { title: 'Avance', value: contract.progress },
                          ]}
                        />
                      </CCol>
                    </CRow>
                  )
                })}
              <CRow key={0}>
                <CCol>
                  <CWidgetStatsD
                    onClick={() => {
                      onClickNewContract()
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
                          <span className="project-title">Crear nuevo contrato</span>
                        </CRow>
                      </CContainer>
                    }
                    style={{ '--cui-card-cap-bg': '#1A4D55', cursor: 'pointer' }}
                  />
                </CCol>
              </CRow>
            </CCardText>
          </CCardBody>
        </CCard>
      </CCol>
    </>
  )
}

export default ContractSelector

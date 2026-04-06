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
import CIcon from '@coreui/icons-react'
import useRegisterGeneralData from 'src/hooks/useRegisterGeneralData'
import useCompany from 'src/hooks/useCompany'
import ModalAddCompany from 'src/components/maintainers/company/ModalAddCompany'

const CompanySelector = () => {
  const navigate = useNavigate()
  const { getProject } = useRegisterGeneralData()
  const [companyList, setCompanyList] = useState()

  const userType = localStorage.getItem('USER_TYPE')

  const { data: companyData, isLoading: companyLoading, refetch, createdCompanyId } = useCompany()

  const [visibleCompany, setVisibleCompany] = useState(false)

  const onClickHandler = (company) => {
    localStorage.setItem('company_user', company.id)
    localStorage.setItem('company_user_name', company.name)
    navigate(`/contrato`)
  }

  const handleCompanyCreated = () => {
    setVisibleCompany(false)
    if (createdCompanyId) {
      localStorage.setItem('company_user', createdCompanyId)
      navigate(`/contrato`)
    } else {
      refetch()
      setTimeout(() => {
        navigate(`/contrato`)
      }, 500)
    }
  }

  const onClickNewCompany = () => {
    setVisibleCompany(!visibleCompany)
  }

  useEffect(() => {
    if (companyData && companyData.length > 0) {
      setCompanyList(companyData)
      navigate(`/contrato`)
    } else if (!companyLoading && companyData && companyData.length === 0) {
      setVisibleCompany(true)
    }
  }, [companyData, companyLoading])

  return (
    <>
      {visibleCompany && (
        <ModalAddCompany
          visible={true}
          onCompanyCreated={handleCompanyCreated}
          sendDataToParent={(data) => {
            if (!data) {
              refetch()
            }
            setVisibleCompany(data)
          }}
        />
      )}
      <CCol sm={6} className="contract-selector-container">
        <CCard>
          <CCardTitle>
            <h3>Selección de Empresa</h3>
          </CCardTitle>
          <CCardBody>
            <CCardText>
              <CRow key={1000}>
                <CCol>
                  <CWidgetStatsD
                    onClick={() => {
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
                    style={{ '--cui-card-cap-bg': '#00778B', cursor: 'pointer' }}
                  />
                </CCol>
              </CRow>
              {companyLoading && <h3>Cargando empresas...</h3>}
              {!companyLoading && companyList === undefined && <h3>No se encontraron empresas</h3>}
              {!companyLoading &&
                companyList &&
                companyList.map((company, index) => {
                  return (
                    <CRow key={index}>
                      <CCol>
                        <CWidgetStatsD
                          onClick={() => {
                            onClickHandler(company)
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
                                <span className="project-title">{company.name}</span>
                              </CRow>
                            </CContainer>
                          }
                          style={{ '--cui-card-cap-bg': '#00778B', cursor: 'pointer' }}
                        />
                      </CCol>
                    </CRow>
                  )
                })}
              {!companyLoading && (
                <>
                  <CRow key={0}>
                    <CCol>
                      <CWidgetStatsD
                        onClick={() => {
                          navigate(`/contrato`)
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
                              <span className="project-title">Crear Contrato</span>
                            </CRow>
                          </CContainer>
                        }
                        style={{ '--cui-card-cap-bg': '#00778B', cursor: 'pointer' }}
                      />
                    </CCol>
                  </CRow>
                  <CRow key={1}>
                    <CCol>
                      <CWidgetStatsD
                        onClick={() => {
                          onClickNewCompany()
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
                              <span className="project-title">Crear nueva Empresa</span>
                            </CRow>
                          </CContainer>
                        }
                        style={{ '--cui-card-cap-bg': '#00778B', cursor: 'pointer' }}
                      />
                    </CCol>
                  </CRow>
                </>
              )}
            </CCardText>
          </CCardBody>
        </CCard>
      </CCol>
    </>
  )
}

export default CompanySelector

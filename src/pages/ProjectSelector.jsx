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
import Loading from 'src/components/loading'
import useGetProjects from 'src/hooks/useProjects'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import ModalAddProject from 'src/components/maintainers/project/ModalAddProject'
import useCompany from 'src/hooks/useCompany'

const ProjectSelector = () => {
  const navigate = useNavigate()
  const userType = localStorage.getItem('USER_TYPE')
  const companyUser = localStorage.getItem('company_user')
  const { getData } = useGetCachedQueryData()

  const contractsQuery = getData('contracts')
  const { getContract, saveProject } = useRegisterGeneralData()
  const contractLS = JSON.parse(getContract())

  const { data: projectData, isLoading } = useGetProjects(1)

  const { data: companyData, isLoading: companyLoading } = useCompany()
  const [companyList, setCompanyList] = useState()

  const [projectList, setProjectList] = useState()

  const [visibleProject, setVisibleProject] = useState(false)

  const onClickHandler = (project) => {
    const data = {
      name: project.name,
      id: project.id,
      manager: project.manager || '',
    }
    saveProject(data)
    if (companyData && companyUser) {
      navigate(`/contrato`)
    } else if (companyData && companyData.length === 0) {
      navigate(`/empresa`)
    }
  }

  const onClickNewProject = () => {
    setVisibleProject(!visibleProject)
  }

  useEffect(() => {
    if (companyData && companyUser) {
      navigate(`/contrato`)
    } else if (companyData && companyData.length === 0) {
      navigate(`/empresa`)
    }
  }, [companyData, companyUser, navigate])

  useEffect(() => {
    if (userType !== 'admin') {
      if (contractsQuery && contractLS) {
      } else {
        navigate(`/project_selector`)
      }
    } else {
      const contractFinded = contractsQuery?.contract?.find((contractData) => {
        return contractData.id === contractLS?.id
      })
      if (contractFinded?.project) {
        setProjectList(contractFinded.project)
      }
    }
  }, [contractsQuery, contractLS, navigate, userType])

  useEffect(() => {
    userType !== 'admin' && projectData && setProjectList(projectData)
  }, [projectData, userType])

  useEffect(() => {
    if (!isLoading && projectList && projectList.length === 0) {
      setVisibleProject(true)
    }
  }, [isLoading, projectList])

  return (
    <>
      {visibleProject && (
        <ModalAddProject
          visible={true}
          sendDataToParent={(data) => {
            setVisibleProject(data)
          }}
        />
      )}
      <CCol sm={6} className="project-selector-container">
        <CCard>
          <CCardTitle>
            <h3>Selección de Proyecto</h3>
          </CCardTitle>
          <CCardBody>
            <CCardText>
              {isLoading && <Loading />}
              {!isLoading && projectList && projectList.length === 0 && (
                <CRow className="mb-3">
                  <CCol>
                    <p className="text-muted text-center">
                      No hay proyectos registrados. Crea el primero para comenzar.
                    </p>
                  </CCol>
                </CRow>
              )}
              {!isLoading &&
                projectList &&
                projectList.map((project, index) => {
                  return (
                    <CRow key={index}>
                      <CCol>
                        <CWidgetStatsD
                          onClick={() => {
                            onClickHandler(project)
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
                                <span className="project-title">{project.name}</span>
                              </CRow>
                              {project.manager && (
                                <CRow>
                                  <span className="project-manager">
                                    Encargado: {project.manager}
                                  </span>
                                </CRow>
                              )}
                            </CContainer>
                          }
                          style={{ '--cui-card-cap-bg': '#00778B', cursor: 'pointer' }}
                          values={[{ title: 'Contratos', value: project?.contracts?.length || 0 }]}
                        />
                      </CCol>
                    </CRow>
                  )
                })}
              {companyUser === 'null' && (
                <>
                  <CRow key={0}>
                    <CCol>
                      <CWidgetStatsD
                        onClick={() => {
                          onClickNewProject()
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
                              <span className="project-title">Crear nuevo proyecto</span>
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

export default ProjectSelector

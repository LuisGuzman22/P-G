import { React, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
import useGetProjects from 'src/hooks/useGetProjects'
import useGetCachedQueryData from './ContractSelector'

const ProjectSelector = () => {
  const navigate = useNavigate()
  const userType = localStorage.getItem('USER_TYPE')
  const { getData } = useGetCachedQueryData()

  const contractsQuery = getData('contracts')
  const { getContract, saveProject, saveContract } = useRegisterGeneralData()
  const contractLS = JSON.parse(getContract())

  const { data: projectData, isLoading, error } = useGetProjects(1)

  const [selectedContract, setSelectedContract] = useState()
  const [projectList, setProjectList] = useState()

  const onClickHandler = (project) => {
    if (userType !== 'admin') {
      const data = {
        name: project.name,
        id: project.id,
      }
      saveProject(data)
      navigate(`/contrato`)
    } else {
      const data = {
        name: project.name,
        id: project.id,
      }
      saveProject(data)
      navigate(`/dashboard`)
    }
  }

  useEffect(() => {
    if (userType !== 'admin') {
      console.log('no es admin')
      if (contractsQuery && contractLS) {
      } else {
        navigate(`/project_selector`)
      }
    } else {
      console.log('es admin')
      const contractFinded = contractsQuery.contract.find((contractData) => {
        return contractData.id === contractLS.id
      })
      setSelectedContract(contractFinded)
      setProjectList(contractFinded.project)
    }
  }, [contractsQuery, contractLS])

  useEffect(() => {
    userType !== 'admin' && projectData?.projects && setProjectList(projectData.projects)
  }, [projectData])

  return (
    <>
      <CCol sm={6} className="project-selector-container">
        <CCard>
          <CCardTitle>
            <h3>Seleccion de Proyecto</h3>
          </CCardTitle>
          <CCardBody>
            <CCardText>
              {isLoading && <Loading />}
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
                              <CRow>
                                <span className="project-manager">
                                  Encargado: {project.manager}
                                </span>
                              </CRow>
                            </CContainer>
                          }
                          style={{ '--cui-card-cap-bg': '#1A4D55' }}
                          values={[{ title: 'Contratos', value: project?.contracts?.length || 0 }]}
                        />
                      </CCol>
                    </CRow>
                  )
                })}
            </CCardText>
          </CCardBody>
        </CCard>
      </CCol>
    </>
  )
}

export default ProjectSelector

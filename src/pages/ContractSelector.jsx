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
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import useRegisterGeneralData from 'src/hooks/useRegisterGeneralData'

import CIcon from '@coreui/icons-react'

const ProjectSelector = () => {
  const navigate = useNavigate()
  const { getProject, saveContract } = useRegisterGeneralData()
  const [selectedProject, setSelectedProject] = useState()
  const projectsQuery = useGetCachedQueryData('projects')

  const onClickHandler = (contract) => {
    const data = {
      name: contract.name,
      id: contract.id,
    }
    saveContract(data)
    navigate(`/dashboard`)
  }
  const projectLS = JSON.parse(getProject())

  useEffect(() => {
    if (projectLS && projectsQuery) {
      const projectFinded = projectsQuery.projects.find((projectData) => {
        return projectData.id === projectLS.id
      })
      setSelectedProject(projectFinded)
    } else {
      navigate(`/project_selector`)
    }
  }, [projectsQuery, projectLS])

  return (
    <>
      <CCol sm={6} className="contract-selector-container">
        <CCard>
          <CCardTitle>
            <h3>Seleccion de Contrato</h3>
          </CCardTitle>
          <CCardBody>
            <CCardText>
              {selectedProject?.contracts === undefined && (
                <h3>No se encontraron contratos asociados</h3>
              )}
              {selectedProject &&
                selectedProject?.contracts?.map((contract, index) => {
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
                          style={{ '--cui-card-cap-bg': '#1A4D55' }}
                          values={[
                            { title: 'Trisemanales', value: contract.trisemanal },
                            { title: 'Avance', value: contract.progress },
                          ]}
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

// First create a helper function
export const useGetCachedQueryData = (key) => {
  const queryClient = useQueryClient()

  // Make sure that the key is wrapped in an array for this to work
  const data = queryClient.getQueryData([key])
  return data
}

export default ProjectSelector

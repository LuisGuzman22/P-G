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
import useGetContracts from 'src/hooks/useGetContracts'
import Loading from 'src/components/loading'

const ContractSelector = () => {
  const navigate = useNavigate()
  const { getProject, saveContract } = useRegisterGeneralData()
  const [selectedProject, setSelectedProject] = useState()
  const [contractList, setContractList] = useState()
  const projectsQuery = useGetCachedQueryData('projects')
  const userType = localStorage.getItem('USER_TYPE')
  const { data: contractData, isLoading, error } = useGetContracts(1)
  const projectLS = JSON.parse(getProject())

  const onClickHandler = (contract) => {
    if (userType !== 'admin') {
      const data = {
        name: contract.name,
        id: contract.id,
      }
      saveContract(data)
      navigate(`/dashboard`)
    } else {
      navigate(`/project_selector`)
    }
  }

  useEffect(() => {
    console.log('projectLS', projectLS)
    console.log('projectsQuery', projectsQuery)

    if (userType !== 'admin') {
      if (projectLS && projectsQuery) {
        const projectFinded = projectsQuery.projects.find((projectData) => {
          return projectData.id === projectLS.id
        })
        console.log('no es admin')
        console.log('projectFinded.contracts', projectFinded.contracts)
        setSelectedProject(projectFinded)
        setContractList(projectFinded.contracts)
      } else {
        navigate(`/project_selector`)
      }
    } else {
      console.log('ir a buscar los contratos')
    }
  }, [projectsQuery, projectLS])

  useEffect(() => {
    userType === 'admin' && contractData?.contract && setContractList(contractData.contract)
  }, [contractData])

  return (
    <>
      <CCol sm={6} className="contract-selector-container">
        <CCard>
          <CCardTitle>
            <h3>Seleccion de Contrato</h3>
          </CCardTitle>
          <CCardBody>
            <CCardText>
              {/* {isLoading && <Loading />} */}
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

export default ContractSelector

import { React } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CWidgetStatsD, CRow, CCol, CContainer } from '@coreui/react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import CIcon from '@coreui/icons-react'
import useRegisterGeneralData from 'src/hooks/useRegisterGeneralData'

const ProjectSelector = () => {
  const navigate = useNavigate()
  const { saveProject } = useRegisterGeneralData()

  const onClickHandler = (project) => {
    const data = {
      name: project.name,
      id: project.id,
    }
    saveProject(data)
    navigate(`/contrato`)
  }

  const fetchProducts = async () => {
    const res = await axios.get('https://42c56e69edd041d8afddac6929f0ea8b.api.mockbin.io/')
    return res.data.data
  }

  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      return fetchProducts()
    },
  })

  return (
    <>
      {!isLoading &&
        data?.projects.map((project, index) => {
          return (
            <CRow key={index}>
              <CCol xs={6}>
                <CWidgetStatsD
                  onClick={() => {
                    onClickHandler(project)
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
                        <span className="project-title">{project.name}</span>
                      </CRow>
                      <CRow>
                        <span className="project-manager">Encargado: {project.manager}</span>
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
    </>
  )
}

export default ProjectSelector

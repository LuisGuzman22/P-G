/* eslint-disable react/prop-types */
import { React, useEffect, useState } from 'react'
import {
  CButton,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CModal,
  CModalBody,
  CForm,
  CFormInput,
  CRow,
  CCol,
  CFormTextarea,
  CFormCheck,
  CToast,
  CToastBody,
} from '@coreui/react'
import useProjects from 'src/hooks/useProjects'
const ModalAddProject = (props) => {
  const initialState = {
    projectName: undefined,
    projectManager: undefined,
    projectDescription: undefined,
    isActive: undefined,
  }
  const handleClick = () => {
    props.sendDataToParent(false)
  }

  const [project, setProject] = useState(
    props.selectedProject ? props.selectedProject : initialState,
  )
  const [errorForm, setErrorForm] = useState(0)
  const [projectNameError, setProjectNameError] = useState(false)
  const [projectManagerError, setProjectManagerError] = useState(false)
  const [projectDescriptionError, setProjectDescriptionError] = useState(false)

  const { register, error, isError, update, errorMessage } = useProjects()

  const onChangeData = (e) => {
    setErrorForm(0)
    setProject({ ...project, [e.target.id]: e.target.value })
  }

  const handleRegisterProject = () => {
    if (!project.projectName || project.projectName === '') {
      // setErrorForm(1)
      setProjectNameError(true)
    } else {
      // setErrorForm(3)
      setProjectNameError(false)
    }
    if (!project.projectManager || project.projectManager === '') {
      // setErrorForm(1)
      setProjectManagerError(true)
    } else {
      // setErrorForm(3)
      setProjectManagerError(false)
    }
    if (!project.projectDescription || project.projectDescription === '') {
      // setErrorForm(1)
      setProjectDescriptionError(true)
    } else {
      // setErrorForm(3)
      setProjectDescriptionError(false)
    }

    if (
      !project.projectName ||
      project.projectName === '' ||
      !project.projectManager ||
      project.projectManager === '' ||
      !project.projectDescription ||
      project.projectDescription === ''
    ) {
      setErrorForm(1)
    } else {
      setErrorForm(3)
    }
  }

  useEffect(() => {
    if (errorForm === 3) {
      if (project?.id) {
        update({
          id: project?.id,
          name: project.projectName,
          description: project.projectDescription,
          manager: project.projectManager,
        })
        // props.sendDataToParent(false)
      } else {
        register(project)
        // props.sendDataToParent(false)
      }
    }
  }, [errorForm])

  useEffect(() => {
    if (errorForm === 3) {
      console.log('1')
      if (errorMessage) {
        console.log('2')
        if (errorMessage.length === 0) {
          console.log('se cierra')
          props.sendDataToParent(false)
        } else {
          console.log('3')
        }
      } else {
        console.log('4')
      }
    } else {
      console.log('5')
    }
  }, [errorMessage, errorForm])

  return (
    <CModal
      scrollable
      visible={props.visible}
      onClose={() => handleClick()}
      aria-labelledby="ScrollingLongContentExampleLabel2"
      size="xl"
      className="project-creation-modal"
    >
      <CModalHeader>
        <CModalTitle id="ScrollingLongContentExampleLabel2">
          {props.selectedProject?.projectName ? 'Editar Proyecto' : 'Registrar Proyecto'}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CToast
          autohide={true}
          visible={isError}
          color="danger"
          className="text-white align-items-center"
        >
          <div className="d-flex">
            {error && <CToastBody>{error}</CToastBody>}
            {errorMessage && <CToastBody>{errorMessage}</CToastBody>}
          </div>
        </CToast>
        <CToast
          autohide={true}
          visible={errorForm === 1}
          color="danger"
          onClose={() => {
            setErrorForm(2)
          }}
          className="text-white align-items-center"
        >
          <div className="d-flex">
            <CToastBody>Debe completar todos los datos para crear el proyecto</CToastBody>
          </div>
        </CToast>
        <CForm>
          <CRow>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="projectName"
                label="Nombre de proyecto"
                placeholder="Nombre de proyecto"
                invalid={projectNameError}
                value={project.projectName || ''}
                text=""
                onBlur={(e) => {
                  if (e.target.value !== '') {
                    setProjectNameError(false)
                  } else {
                    setProjectNameError(true)
                  }
                }}
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CCol>
            {/* <CCol sm={6}>
              <CFormInput
                type="text"
                id="contract"
                label="Contrato"
                placeholder="Contrato"
                text=""
                // aria-describedby="exampleFormControlInputHelpInline"
              />
            </CCol> */}
          </CRow>
          <CRow>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="projectManager"
                label="Encargado"
                placeholder="Encargado"
                invalid={projectManagerError}
                value={project.projectManager || ''}
                text=""
                onBlur={(e) => {
                  if (e.target.value !== '') {
                    setProjectManagerError(false)
                  } else {
                    setProjectManagerError(true)
                  }
                }}
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CCol>
            {/* <CCol sm={6}>
              <CFormInput type="file" id="formFile" label="Elegir archivo" />
            </CCol> */}
          </CRow>
          <CRow>
            <CCol sm={12}>
              <CFormTextarea
                id="projectDescription"
                label="Descripción"
                rows={3}
                invalid={projectDescriptionError}
                value={project.projectDescription || ''}
                text=""
                onBlur={(e) => {
                  if (e.target.value !== '') {
                    setProjectDescriptionError(false)
                  } else {
                    setProjectDescriptionError(true)
                  }
                }}
                onChange={(e) => {
                  onChangeData(e)
                }}
              ></CFormTextarea>
            </CCol>
          </CRow>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => handleClick()}>
          Cerrar
        </CButton>
        <CButton className="btn-add" onClick={() => handleRegisterProject()}>
          {props.selectedProject?.projectName ? 'Editar' : 'Registrar'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalAddProject

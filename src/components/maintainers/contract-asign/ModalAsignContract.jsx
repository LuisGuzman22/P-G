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
  CFormSelect,
} from '@coreui/react'
import useContracts from 'src/hooks/useContracts'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import useAsignContracts from 'src/hooks/useAsignContract'
const ModalAsignContract = (props) => {
  const initialState = {
    project: undefined,
    contract: undefined,
  }
  const { getData } = useGetCachedQueryData()
  const projectsQuery = getData('projects')
  const contractQuery = getData('contracts')

  const { errorMutate, isError, register, errorMessage } = useAsignContracts()

  const [projectContract, setProjectContract] = useState(initialState)

  const [projectError, setProjectError] = useState(false)
  const [contractError, setContractError] = useState(false)
  const [errorForm, setErrorForm] = useState(0)

  const handleClick = () => {
    props.sendDataToParent(false)
  }

  const onChangeData = (e) => {
    setProjectContract({ ...projectContract, [e.target.id]: e.target.value })
  }

  const handleRegisterContract = () => {
    console.log('data', projectContract)
    if (!projectContract.project || projectContract.project === '') {
      setProjectError(true)
    } else {
      setProjectError(false)
    }
    if (!projectContract.contract || projectContract.contract === '') {
      setContractError(true)
    } else {
      setContractError(false)
    }

    if (
      !projectContract.project ||
      projectContract.project === '' ||
      !projectContract.contract ||
      projectContract.contract === ''
    ) {
      setErrorForm(1)
    } else {
      setErrorForm(3)
    }
  }

  useEffect(() => {
    if (errorForm === 3) {
      register(projectContract)
      // props.sendDataToParent(false)
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
        <CModalTitle id="ScrollingLongContentExampleLabel2">Asociar contrato</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CToast
          autohide={true}
          visible={isError}
          color="danger"
          className="text-white align-items-center"
        >
          <div className="d-flex">{errorMessage && <CToastBody>{errorMessage}</CToastBody>}</div>
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
            <CCol sm={12}>
              <CFormSelect
                aria-label="Default select example"
                label="Proyecto"
                id="project"
                text={projectError && 'Seleccione un proyecto'}
                onChange={(e) => {
                  onChangeData(e)
                }}
              >
                <option value={0}>Seleccione</option>
                {projectsQuery.map((project) => {
                  return (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  )
                })}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={12}>
              <CFormSelect
                aria-label="Default select example"
                label="Contrato"
                id="contract"
                text={contractError && 'Seleccione un contrato'}
                onChange={(e) => {
                  onChangeData(e)
                }}
              >
                <option value={0}>Seleccione</option>
                {contractQuery.map((contract) => {
                  return (
                    <option key={contract.id} value={contract.id}>
                      {contract.name}
                    </option>
                  )
                })}
              </CFormSelect>
            </CCol>
          </CRow>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => handleClick()}>
          Cerrar
        </CButton>
        <CButton className="btn-add" onClick={() => handleRegisterContract()}>
          Asociar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalAsignContract

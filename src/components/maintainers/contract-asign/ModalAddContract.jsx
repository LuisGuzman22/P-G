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
import useContracts from 'src/hooks/useContracts'
const ModalAddContract = (props) => {
  const initialState = {
    name: undefined,
    code: undefined,
    detail: undefined,
    url: undefined,
    telephone: undefined,
    email: undefined,
    company_id: 2,
  }

  const { register, error, isError, update, errorMessage } = useContracts()

  const [contract, setContract] = useState(
    props.selectedContract ? props.selectedContract : initialState,
  )

  const [errorForm, setErrorForm] = useState(0)
  const [contractNameError, setContractNameError] = useState(false)
  const [contractDetailError, setContractDetailError] = useState(false)
  const [contractUrlError, setContractUrlError] = useState(false)
  const [contractTelephoneError, setContractTelephoneError] = useState(false)
  const [contractEmailError, setContractEmailError] = useState(false)
  const [contractCodeError, setContractCodeError] = useState(false)

  const handleClick = () => {
    props.sendDataToParent(false)
  }

  const onChangeData = (e) => {
    setContract({ ...contract, [e.target.id]: e.target.value })
  }

  const handleRegisterContract = () => {
    if (!contract.name || contract.name === '') {
      setContractNameError(true)
    } else {
      setContractNameError(false)
    }

    if (!contract.detail || contract.detail === '') {
      setContractDetailError(true)
    } else {
      setContractDetailError(false)
    }

    if (!contract.url || contract.url === '') {
      setContractUrlError(true)
    } else {
      setContractUrlError(false)
    }

    if (!contract.telephone || contract.telephone === '') {
      setContractTelephoneError(true)
    } else {
      setContractTelephoneError(false)
    }

    if (!contract.email || contract.email === '') {
      setContractEmailError(true)
    } else {
      setContractEmailError(false)
    }

    if (!contract.code || contract.code === '') {
      setContractCodeError(true)
    } else {
      setContractCodeError(false)
    }

    if (
      !contract.name ||
      contract.name === '' ||
      !contract.detail ||
      contract.detail === '' ||
      !contract.url ||
      contract.url === '' ||
      !contract.telephone ||
      contract.telephone === '' ||
      !contract.email ||
      contract.email === '' ||
      !contract.code ||
      contract.code === ''
    ) {
      setErrorForm(1)
    } else {
      setErrorForm(3)
    }
  }

  useEffect(() => {
    if (errorForm === 3) {
      if (contract?.id) {
        update(contract)
        // props.sendDataToParent(false)
      } else {
        register(contract)
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
          {' '}
          {props.selectedContract?.name ? 'Editar Proyecto' : 'Registrar Proyecto'}
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
                id="name"
                label="Nombre"
                placeholder="Nombre"
                invalid={contractNameError}
                value={contract.name || ''}
                text=""
                onBlur={(e) => {
                  if (e.target.value !== '') {
                    setContractNameError(false)
                  } else {
                    setContractNameError(true)
                  }
                }}
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CCol>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="detail"
                label="Detalle"
                placeholder="Detalle"
                invalid={contractDetailError}
                value={contract.detail || ''}
                text=""
                onBlur={(e) => {
                  if (e.target.value !== '') {
                    setContractDetailError(false)
                  } else {
                    setContractDetailError(true)
                  }
                }}
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="url"
                label="URL"
                placeholder="URL"
                invalid={contractUrlError}
                value={contract.url || ''}
                text=""
                onBlur={(e) => {
                  if (e.target.value !== '') {
                    setContractUrlError(false)
                  } else {
                    setContractUrlError(true)
                  }
                }}
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CCol>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="telephone"
                label="Teléfono"
                placeholder="Teléfono"
                invalid={contractTelephoneError}
                value={contract.telephone || ''}
                text=""
                onBlur={(e) => {
                  if (e.target.value !== '') {
                    setContractTelephoneError(false)
                  } else {
                    setContractTelephoneError(true)
                  }
                }}
                onChange={(e) => {
                  onChangeData(e)
                }}
              />{' '}
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="email"
                label="Email"
                placeholder="Email"
                invalid={contractEmailError}
                value={contract.email || ''}
                text=""
                onBlur={(e) => {
                  if (e.target.value !== '') {
                    setContractEmailError(false)
                  } else {
                    setContractEmailError(true)
                  }
                }}
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CCol>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="code"
                label="Código"
                placeholder="Código"
                invalid={contractCodeError}
                value={contract.code || ''}
                text=""
                onBlur={(e) => {
                  if (e.target.value !== '') {
                    setContractCodeError(false)
                  } else {
                    setContractCodeError(true)
                  }
                }}
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CCol>
          </CRow>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => handleClick()}>
          Cerrar
        </CButton>
        <CButton className="btn-add" onClick={() => handleRegisterContract()}>
          {props.selectedContract?.name ? 'Editar' : 'Registrar'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalAddContract

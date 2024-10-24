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
  CToast,
  CToastBody,
} from '@coreui/react'
import { v4 as uuidv4 } from 'uuid'
import useRegisterGeneralData from 'src/hooks/useRegisterGeneralData'
import useVehicle from 'src/hooks/useVehicle'
import './css.scss'

const ModalAddVehicle = (props) => {
  const { getProject, getContract } = useRegisterGeneralData()
  const projectLS = JSON.parse(getProject())
  const contractLS = JSON.parse(getContract())

  const handleClick = () => {
    props.sendDataToParent(false)
  }

  const [vehicleName, setVehicleName] = useState(props?.selectedVehicle?.name || undefined)
  const [vehicleError, setVehicleError] = useState(false)
  const [plate, setPlate] = useState()
  const [plateList, setPlateList] = useState(props?.selectedVehicle?.plate || [])
  const [errorForm, setErrorForm] = useState(0)
  const [plateError, setPlateError] = useState(false)

  const { register, errorVehicle: error, isError, updateVehicle, errorMessage } = useVehicle()

  const onChangeData = (e) => {
    setVehicleName(e.target.value)
  }

  const onChangePlate = (e) => {
    setPlate({ id: uuidv4(), label: e.target.value, contract_id: contractLS.contractId })
  }

  const handleRegisterPlate = () => {
    if (!plate || !plate.label || plate.label === '') {
      setPlateError(true)
    } else {
      setPlateList([...plateList, plate])
      setPlate()
    }
  }

  const handleDeletePlate = (id) => {
    setPlateList(plateList.filter((plate) => plate.id !== id))
  }

  const handleRegisterVehicle = () => {
    if (!vehicleName || vehicleName === '') {
      setVehicleError(true)
    } else {
      setVehicleError(false)
    }

    if (!vehicleName || vehicleName === '' || plateList.length === 0) {
      setErrorForm(1)
    } else {
      setErrorForm(3)
    }
  }

  useEffect(() => {
    if (errorForm === 3) {
      if (props?.selectedVehicle?.name) {
        updateVehicle({
          id: props.selectedVehicle.id,
          name: vehicleName,
          plates: plateList,
        })
        // props.sendDataToParent(false)
      } else {
        register({
          name: vehicleName,
          plates: plateList,
        })
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
      className="creation-modal"
    >
      <CModalHeader>
        <CModalTitle id="ScrollingLongContentExampleLabel2">
          {props?.selectedVehicle?.name ? 'Editar Vehículo' : 'Registrar Vehículo'}
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
            <CToastBody>Debe completar todos los datos para registrar el vehículo</CToastBody>
          </div>
        </CToast>
        <CForm>
          <CRow>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="vehicleName"
                label="Nombre vehículo"
                placeholder="Nombre vehículo"
                invalid={vehicleError}
                value={vehicleName || ''}
                text=""
                onBlur={(e) => {
                  if (e.target.value !== '') {
                    setVehicleError(false)
                  } else {
                    setVehicleError(true)
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
                id="plate"
                label="Patente"
                placeholder="Patente"
                invalid={plateError}
                value={plate?.label || ''}
                text=""
                onBlur={(e) => {
                  if (e.target.value !== '') {
                    setPlateError(false)
                  } else {
                    setPlateError(true)
                  }
                }}
                onChange={(e) => {
                  onChangePlate(e)
                }}
              />
            </CCol>
            <CCol sm={6}>
              <CButton className="btn-add" onClick={() => handleRegisterPlate()}>
                Agregar patente
              </CButton>
            </CCol>
          </CRow>
        </CForm>
        {plateList.length > 0 &&
          plateList.map((plate, index) => {
            return (
              <CRow key={index}>
                <CCol>{plate.label}</CCol>
                <CCol>
                  <CButton className="btn-add" onClick={() => handleDeletePlate(plate.id)}>
                    Eliminar
                  </CButton>
                </CCol>
              </CRow>
            )
          })}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => handleClick()}>
          Cerrar
        </CButton>
        <CButton className="btn-add" onClick={() => handleRegisterVehicle()}>
          {props?.selectedVehicle?.name ? 'Editar' : 'Registrar'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalAddVehicle

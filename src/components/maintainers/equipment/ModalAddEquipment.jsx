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
import useEquipment from 'src/hooks/useEquipment'
import './css.scss'

const ModalAddEquipment = (props) => {
  const { getProject, getContract } = useRegisterGeneralData()
  const projectLS = JSON.parse(getProject())
  const contractLS = JSON.parse(getContract())

  const handleClick = () => {
    props.sendDataToParent(false)
  }

  const [equipmentName, setEquipmentName] = useState(props?.selectedEquipment?.name || undefined)
  const [equipmentError, setEquipmentError] = useState(false)
  const [plate, setPlate] = useState()
  const [plateList, setPlateList] = useState(props?.selectedEquipment?.plate || [])
  const [errorForm, setErrorForm] = useState(0)
  const [plateError, setPlateError] = useState(false)

  const { register, errorEquipment: error, isError, updateEquipment } = useEquipment()

  const onChangeData = (e) => {
    setEquipmentName(e.target.value)
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

  const handleRegisterEquipment = () => {
    if (!equipmentName || equipmentName === '') {
      setEquipmentError(true)
    } else {
      setEquipmentError(false)
    }

    if (!equipmentName || equipmentName === '' || plateList.length === 0) {
      setErrorForm(1)
    } else {
      setErrorForm(3)
    }
  }

  useEffect(() => {
    if (errorForm === 3) {
      if (props?.selectedEquipment?.name) {
        updateEquipment({
          id: props.selectedEquipment.id,
          name: equipmentName,
          plates: plateList,
        })
        props.sendDataToParent(false)
      } else {
        register({
          name: equipmentName,
          plates: plateList,
        })
        props.sendDataToParent(false)
      }
    }
  }, [errorForm])

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
          {props?.selectedEquipment?.name ? 'Editar Equipo' : 'Registrar Equipo'}
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
            <CToastBody>{error}</CToastBody>
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
            <CToastBody>Debe completar todos los datos para registrar el equipo</CToastBody>
          </div>
        </CToast>
        <CForm>
          <CRow>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="equipmentName"
                label="Nombre equipo"
                placeholder="Nombre equipo"
                invalid={equipmentError}
                value={equipmentName || ''}
                text=""
                onBlur={(e) => {
                  if (e.target.value !== '') {
                    setEquipmentError(false)
                  } else {
                    setEquipmentError(true)
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
                Registrar patente
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
        <CButton className="btn-add" onClick={() => handleRegisterEquipment()}>
          {props?.selectedEquipment?.name ? 'Editar' : 'Registrar'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalAddEquipment

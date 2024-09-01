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
import useRegisterProject from 'src/hooks/useRegisterProject'
import { v4 as uuidv4 } from 'uuid'
import useMachinery from 'src/hooks/useMachinery'
import useRegisterGeneralData from 'src/hooks/useRegisterGeneralData'
import './css.scss'

const ModalAddMachinery = (props) => {
  const { getProject, getContract } = useRegisterGeneralData()
  const projectLS = JSON.parse(getProject())
  const contractLS = JSON.parse(getContract())

  const handleClick = () => {
    props.sendDataToParent(false)
  }

  const [machineryName, setMachineryName] = useState(props?.selectedMachinery?.name || undefined)
  const [machineryError, setMachineryError] = useState(false)
  const [plate, setPlate] = useState()
  const [plateList, setPlateList] = useState(props?.selectedMachinery?.plate || [])
  const [errorForm, setErrorForm] = useState(0)
  const [plateError, setPlateError] = useState(false)

  const { register, errorMachinery: error, isError, updateMachinery } = useMachinery()

  const onChangeData = (e) => {
    setMachineryName(e.target.value)
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

  const handleRegisterMachinery = () => {
    if (!machineryName || machineryName === '') {
      setMachineryError(true)
    } else {
      setMachineryError(false)
    }

    if (!machineryName || machineryName === '' || plateList.length === 0) {
      setErrorForm(1)
    } else {
      setErrorForm(3)
    }
  }

  useEffect(() => {
    if (errorForm === 3) {
      if (props?.selectedMachinery?.name) {
        updateMachinery({
          id: props.selectedMachinery.id,
          name: machineryName,
          plates: plateList,
        })
        props.sendDataToParent(false)
      } else {
        register({
          name: machineryName,
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
          {props?.selectedMachinery?.name ? 'Editar Maquinaria' : 'Registrar Maquinaria'}
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
            <CToastBody>Debe completar todos los datos para registrar la maquinaria</CToastBody>
          </div>
        </CToast>
        <CForm>
          <CRow>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="machineryName"
                label="Nombre maquinaria"
                placeholder="Nombre maquinaria"
                invalid={machineryError}
                value={machineryName || ''}
                text=""
                onBlur={(e) => {
                  if (e.target.value !== '') {
                    setMachineryError(false)
                  } else {
                    setMachineryError(true)
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
        <CButton className="btn-add" onClick={() => handleRegisterMachinery()}>
          {props?.selectedMachinery?.name ? 'Editar' : 'Registrar'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalAddMachinery

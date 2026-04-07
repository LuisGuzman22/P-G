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
import useRegisterGeneralData from 'src/hooks/useRegisterGeneralData'
import './css.scss'
import useWeather from 'src/hooks/useWeather'

const ModalAddWeather = (props) => {
  const { getProject, getContract } = useRegisterGeneralData()
  const contractLS = JSON.parse(getContract())

  const handleClick = () => {
    props.sendDataToParent(false)
  }

  const [weatherName, setWeatherName] = useState(props?.selectedWeather?.name || undefined)
  const [weatherError, setWeatherError] = useState(false)
  const [errorForm, setErrorForm] = useState(0)

  const { register, errorShift: error, isError, updateWeather, errorMessage } = useWeather()

  const onChangeData = (e) => {
    setWeatherName(e.target.value)
  }

  const handleRegisterWeather = () => {
    if (!weatherName || weatherName === '') {
      setWeatherError(true)
    } else {
      setWeatherError(false)
    }

    if (!weatherName || weatherName === '') {
      setErrorForm(1)
    } else {
      setErrorForm(3)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (errorForm === 3) {
      if (props?.selectedWeather?.name) {
        updateWeather({
          id: props.selectedWeather.id,
          name: weatherName,
          contract_id: contractLS?.id,
        })
        // props.sendDataToParent(false)
      } else {
        register({
          name: weatherName,
          contract_id: contractLS?.id,
        })
        // props.sendDataToParent(false)
      }
    }
  }, [errorForm])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (errorForm === 3) {
      // console.log('1')
      if (errorMessage) {
        // console.log('2')
        if (errorMessage.length === 0) {
          // console.log('se cierra')
          props.sendDataToParent(false)
        } else {
          // console.log('3')
        }
      } else {
        // console.log('4')
      }
    } else {
      // console.log('5')
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
          {props?.selectedWeather?.name ? 'Editar Clima' : 'Registrar Clima'}
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
            <CToastBody>Debe completar todos los datos para registrar el clima</CToastBody>
          </div>
        </CToast>
        <CForm>
          <CRow>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="weatherName"
                label="Nombre clima"
                placeholder="Nombre clima"
                invalid={weatherError}
                value={weatherName || ''}
                text=""
                onBlur={(e) => {
                  if (e.target.value !== '') {
                    setWeatherError(false)
                  } else {
                    setWeatherError(true)
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
        <CButton className="btn-add" onClick={() => handleRegisterWeather()}>
          Guardar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalAddWeather

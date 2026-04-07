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
  CRow,
  CCol,
  CFormCheck,
  CToast,
  CToastBody,
} from '@coreui/react'
import './css.scss'
import useRole from 'src/hooks/useRole'
import usePermission from 'src/hooks/usePermission'
import useUser from 'src/hooks/useUser'

const ModalAssignPermission = (props) => {
  const handleClick = () => {
    props.sendDataToParent(false)
  }

  const [userId] = useState(props?.selectedUser?.id || undefined)
  const [userName] = useState(props?.selectedUser?.name || undefined)
  const [userPermissions, setUserPermissions] = useState(
    props?.selectedUser?.permissions || undefined,
  )

  const [, setRoleError] = useState(false)
  const [errorForm, setErrorForm] = useState(0)

  const { errorRole: error, isError } = useRole()
  const { updateUser, errorMessage: userErrorMessage } = useUser()
  const { data: dataPermission } = usePermission()

  const onChangeSelectPermission = (e) => {
    const isChecked = userPermissions?.some((p) => p === e.target.name)
    if (!isChecked) {
      if (userPermissions) {
        setUserPermissions((prev) => [...prev, e.target.name])
      } else {
        setUserPermissions([e.target.name])
      }
    } else {
      console.log('4')
      setUserPermissions((prev) => prev.filter((p) => p !== e.target.name))
    }
  }

  const handleRegisterRole = () => {
    if (!userName || userName === '') {
      setRoleError(true)
    } else {
      setRoleError(false)
    }

    if (!userName || userName === '') {
      setErrorForm(1)
    } else {
      setErrorForm(3)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (errorForm === 3) {
      const permissionsNameList = []
      userPermissions?.forEach((permission) => {
        permissionsNameList.push(permission)
      })
      console.log('permissionsNameList', permissionsNameList)
      updateUser({
        id: userId,
        name: userName,
        permissions: permissionsNameList,
      })
    }
  }, [errorForm])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (errorForm === 3) {
      if (userErrorMessage) {
        if (userErrorMessage.length === 0) {
          props.sendDataToParent(false)
        } else {
        }
      } else {
      }
    } else {
    }
  }, [userErrorMessage, errorForm])

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
          Asignar permisos al usuario: {userName}
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
            {userErrorMessage && <CToastBody>{userErrorMessage}</CToastBody>}
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
            <CToastBody>Debe completar todos los datos para registrar el rol</CToastBody>
          </div>
        </CToast>
        <CForm>
          {dataPermission?.map((permission) => {
            const isChecked = userPermissions?.some((p) => p === permission.name)
            return (
              <CRow key={permission.id}>
                <CCol sm={6}>
                  <CFormCheck
                    type="checkbox"
                    id={permission.id}
                    label={permission.name}
                    className="mb-3"
                    defaultChecked={isChecked}
                    checked={isChecked}
                    name={permission.name}
                    onChange={(e) => {
                      onChangeSelectPermission(e)
                    }}
                  />
                </CCol>
              </CRow>
            )
          })}
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => handleClick()}>
          Cerrar
        </CButton>
        <CButton className="btn-add" onClick={() => handleRegisterRole()}>
          Guardar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalAssignPermission

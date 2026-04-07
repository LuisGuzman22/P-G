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
  CFormCheck,
  CToast,
  CToastBody,
} from '@coreui/react'
import './css.scss'
import useRole from 'src/hooks/useRole'
import usePermission from 'src/hooks/usePermission'

const ModalAddRole = (props) => {
  const handleClick = () => {
    props.sendDataToParent(false)
  }

  const [roleName, setRoleName] = useState(props?.selectedRole?.name || undefined)
  const [rolePermissions, setRolePermissions] = useState(
    props?.selectedRole?.permissions || undefined,
  )

  const [roleError, setRoleError] = useState(false)
  const [errorForm, setErrorForm] = useState(0)

  const { register, errorRole: error, isError, updateRole, errorMessage } = useRole()
  const { data: dataPermission } = usePermission()

  const onChangeData = (e) => {
    setRoleName(e.target.value)
  }

  const onChangeSelectPermission = (e) => {
    const isChecked = rolePermissions?.some((p) => p.id === e.target.id)

    if (!isChecked) {
      if (rolePermissions) {
        setRolePermissions((prev) => [...prev, { id: e.target.id, name: e.target.name }])
      } else {
        setRolePermissions([{ id: e.target.id, name: e.target.name }])
      }
    } else {
      setRolePermissions((prev) => prev.filter((p) => p.id !== e.target.id))
    }
  }

  const handleRegisterRole = () => {
    if (!roleName || roleName === '') {
      setRoleError(true)
    } else {
      setRoleError(false)
    }

    if (!roleName || roleName === '') {
      setErrorForm(1)
    } else {
      setErrorForm(3)
    }
  }

  useEffect(() => {
    if (errorForm === 3) {
      const permissionsNameList = []
      rolePermissions?.forEach((permission) => {
        permissionsNameList.push({ name: permission.name })
      })
      if (props?.selectedRole?.name) {
        updateRole({
          id: props.selectedRole.id,
          name: roleName,
          permissions: permissionsNameList,
        })
      } else {
        register({
          name: roleName,
          permissions: permissionsNameList,
        })
      }
    }
  }, [errorForm, props, roleName, rolePermissions, register, updateRole])

  useEffect(() => {
    if (errorForm === 3) {
      if (errorMessage) {
        if (errorMessage.length === 0) {
          props.sendDataToParent(false)
        }
      }
    }
  }, [errorForm, errorMessage, props])

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
          {props?.selectedRole?.name ? 'Editar Rol' : 'Registrar Rol'}
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
            <CToastBody>Debe completar todos los datos para registrar el rol</CToastBody>
          </div>
        </CToast>
        <CForm>
          <CRow>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="roleName"
                label="Nombre rol"
                placeholder="Nombre rol"
                invalid={roleError}
                value={roleName || ''}
                text=""
                onBlur={(e) => {
                  if (e.target.value !== '') {
                    setRoleError(false)
                  } else {
                    setRoleError(true)
                  }
                }}
                onChange={(e) => {
                  onChangeData(e)
                }}
              />
            </CCol>
          </CRow>
          {dataPermission?.map((permission) => {
            const isChecked = rolePermissions?.some((p) => p.id === permission.id)
            console.log('isChecked', isChecked)
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

export default ModalAddRole
